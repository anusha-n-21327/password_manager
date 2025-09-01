import { useState } from 'react';
import React from 'react';
import { Account, useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { DecryptModal } from './DecryptModal';
import { EditPasswordForm } from './EditPasswordForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Copy, Lock, Trash2, Pencil } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { getIconForWebsite } from '@/lib/icon-map';

interface PasswordTableProps {
  accounts: Account[];
  searchTerm: string;
}

export const PasswordTable = ({ accounts, searchTerm }: PasswordTableProps) => {
  const { deleteAccount } = useVault();
  const [modalState, setModalState] = useState<{ open: boolean; account: Account | null; action: 'decrypt' | 'copy' }>({ open: false, account: null, action: 'decrypt' });
  const [editState, setEditState] = useState<{ open: boolean; account: Account | null }>({ open: false, account: null });

  const filteredAccounts = accounts.filter(
    (account) =>
      (account.website && typeof account.website === 'string' && account.website.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (account.username && typeof account.username === 'string' && account.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCopySuccess = (password: string) => {
    navigator.clipboard.writeText(password);
    showSuccess('Password copied to clipboard!');
    setModalState({ open: false, account: null, action: 'decrypt' }); // Close modal
  };

  const openModal = (account: Account, action: 'decrypt' | 'copy') => {
    setModalState({ open: true, account, action });
  };

  const openEditDialog = (account: Account) => {
    setEditState({ open: true, account });
  };

  if (filteredAccounts.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
        <h2 className="text-xl font-semibold text-foreground">Your vault is empty or no results found.</h2>
        <p className="text-muted-foreground mt-2">Try adding a new account or refining your search.</p>
      </div>
    );
  }

  return (
    <>
      <Card className="bg-card border-primary/20">
        <Table>
          <TableHeader>
            <TableRow className="border-b-primary/20">
              <TableHead className="text-foreground">Website/App</TableHead>
              <TableHead className="text-foreground">Username</TableHead>
              <TableHead className="text-foreground">Password</TableHead>
              <TableHead className="text-right text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account, index) => {
              const Icon = getIconForWebsite(account.website);
              return (
                <TableRow 
                  key={account.id} 
                  className="border-b-primary/20 hover:bg-primary/5 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{account.website}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{account.username}</TableCell>
                  <TableCell className="font-mono tracking-wider text-primary">
                    {'••••••••••••'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openModal(account, 'decrypt')} className="group hover:text-black transition-colors">
                      <Lock className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:scale-125" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openModal(account, 'copy')} className="group hover:text-black transition-colors">
                      <Copy className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:scale-125" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(account)} className="group hover:text-black transition-colors">
                      <Pencil className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:scale-125" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteAccount(account.id)} className="group hover:text-black transition-colors">
                      <Trash2 className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:scale-125" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
      
      {modalState.account && (
        <DecryptModal
          isOpen={modalState.open}
          onClose={() => setModalState({ ...modalState, open: false })}
          onCopySuccess={handleCopySuccess}
          accountToVerify={modalState.account}
          action={modalState.action}
        />
      )}

      {editState.account && (
        <Dialog open={editState.open} onOpenChange={(isOpen) => setEditState({ ...editState, open: isOpen })}>
          <DialogContent className="sm:max-w-[425px] bg-card border-primary/20 animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-primary">Edit Account</DialogTitle>
              <DialogDescription>Make changes to your saved account details.</DialogDescription>
            </Header>
            <EditPasswordForm 
              account={editState.account} 
              onSave={() => setEditState({ open: false, account: null })} 
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};