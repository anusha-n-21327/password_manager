import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { showError, showSuccess } from '@/utils/toast';

export interface Account {
  id: string;
  website: string;
  username: string;
  password_text: string;
}

interface VaultContextType {
  session: Session | null;
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => Promise<void>;
  updateAccount: (updatedAccount: Account) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  logout: () => Promise<void>;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchAccounts();
    } else {
      setAccounts([]);
    }
  }, [session]);

  const fetchAccounts = async () => {
    if (!session) return;
    const { data, error } = await supabase
      .from('passwords')
      .select('id, website, username, password_text')
      .order('created_at', { ascending: false });

    if (error) {
      showError('Could not fetch passwords.');
      console.error(error);
    } else {
      setAccounts(data || []);
    }
  };

  const addAccount = async (account: Omit<Account, 'id'>) => {
    if (!session) return;
    const { error } = await supabase.from('passwords').insert({ ...account, user_id: session.user.id });
    if (error) {
      showError('Failed to add account.');
    } else {
      showSuccess('Account added.');
      fetchAccounts();
    }
  };

  const updateAccount = async (updatedAccount: Account) => {
    const { error } = await supabase
      .from('passwords')
      .update({ 
        website: updatedAccount.website, 
        username: updatedAccount.username, 
        password_text: updatedAccount.password_text 
      })
      .eq('id', updatedAccount.id);
    
    if (error) {
      showError('Failed to update account.');
    } else {
      showSuccess('Account updated.');
      fetchAccounts();
    }
  };

  const deleteAccount = async (id: string) => {
    const { error } = await supabase.from('passwords').delete().eq('id', id);
    if (error) {
      showError('Failed to delete account.');
    } else {
      showSuccess('Account deleted.');
      fetchAccounts();
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    logout,
  };

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};