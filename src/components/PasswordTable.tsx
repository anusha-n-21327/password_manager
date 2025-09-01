import { useState } from 'react';
import { Account, useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DecryptModal } from './DecryptModal';
import { Copy, Lock, Trash2, Pencil } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface PasswordTableProps {
  accounts: Account[];
  searchTerm: string;
}

export const PasswordTable = ({ accounts, searchTerm }: PasswordTableProps) => {
  const { deleteAccount } = useVault();
  const [decryptedPasswords, setDecryptedPasswords] = useState<Record<string, string>>({});
  const [modalState, setModalState] = useState<{ open: boolean; account: Account | null; action: 'decrypt' | 'copy' }>({ open: false, account: null, action: 'decrypt' });

  const filteredAccounts = accounts.filter(
    (account) =>
      account.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDecryptSuccess = (password: string) => {
    if (!modalState.account) return;

    if (modalState.action === 'decrypt') {
      setDecryptedPasswords(prev => ({ ...prev, [modalState.account!.id]: password }));
      showSuccess('Password decrypted.');
    } else if (modalState.action === 'copy') {
      navigator.clipboard.writeText(password);
      showSuccess('Password copied to clipboard!');
    }
    setModalState({ open: false, account: null, action: 'decrypt' });
  };

  const openModal = (account: Account, action: 'decrypt' | 'copy') => {
    setModalState({ open: true, account, action });
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
            {filteredAccounts.map((account) => (
              <TableRow key={account.id} className="border-b-primary/20 hover:bg-primary/5">
                <TableCell className="font-medium">{account.website}</TableCell>
                <TableCell className="text-muted-foreground">{account.username}</TableCell>
                <TableCell className="font-mono tracking-wider text-primary">
                  {decryptedPasswords[account.id] || '••••••••••••'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openModal(account, 'decrypt')} className="hover:text-primary transition-colors">
                    <Lock className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openModal(account, 'copy')} className="hover:text-primary transition-colors">
                    <Copy className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteAccount(account.id)} className="hover:text-destructive transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {modalState.account && (
        <DecryptModal
          isOpen={modalState.open}
          onClose={() => setModalState({ ...modalState, open: false })}
          onSuccess={handleDecryptSuccess}
          accountToVerify={modalState.account}
        />
      )}
    </>
  );
};