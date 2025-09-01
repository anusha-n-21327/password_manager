import React, { createContext, useState, useContext, ReactNode } from 'react';
import { encryptAndSave, loadAndDecrypt, vaultExists as checkVaultExists } from '@/lib/crypto';
import { showError, showSuccess } from '@/utils/toast';

export interface Account {
  id: string;
  website: string;
  username: string;
  password: string;
}

interface VaultContextType {
  isUnlocked: boolean;
  accounts: Account[];
  vaultExists: boolean;
  login: (masterPassword: string) => void;
  logout: () => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  deleteAccount: (id: string) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider = ({ children }: { children: ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [masterPassword, setMasterPassword] = useState('');
  const [vaultExists, setVaultExists] = useState(checkVaultExists());

  const login = (password: string) => {
    if (vaultExists) {
      const decryptedData = loadAndDecrypt(password);
      if (decryptedData) {
        setAccounts(decryptedData);
        setIsUnlocked(true);
        setMasterPassword(password);
        showSuccess('Vault unlocked!');
      } else {
        showError('Incorrect master password.');
      }
    } else {
      // First time setup
      setAccounts([]);
      setIsUnlocked(true);
      setMasterPassword(password);
      encryptAndSave([], password);
      setVaultExists(true);
      showSuccess('Vault created and unlocked!');
    }
  };

  const logout = () => {
    setIsUnlocked(false);
    setAccounts([]);
    setMasterPassword('');
  };

  const saveData = (updatedAccounts: Account[]) => {
    if (encryptAndSave(updatedAccounts, masterPassword)) {
      setAccounts(updatedAccounts);
    } else {
      showError('Failed to save data.');
    }
  };

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = { ...account, id: crypto.randomUUID() };
    const updatedAccounts = [...accounts, newAccount];
    saveData(updatedAccounts);
    showSuccess('Account added.');
  };

  const deleteAccount = (id: string) => {
    const updatedAccounts = accounts.filter(acc => acc.id !== id);
    saveData(updatedAccounts);
    showSuccess('Account deleted.');
  };

  const value = {
    isUnlocked,
    accounts,
    vaultExists,
    login,
    logout,
    addAccount,
    deleteAccount,
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