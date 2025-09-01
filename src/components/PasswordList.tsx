import { useState } from 'react';
import { Account, useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditPasswordForm } from './EditPasswordForm';
import { Copy, Trash2, Eye, EyeOff, Pencil } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface PasswordListProps {
  accounts: Account[];
  searchTerm: string;
}

export const PasswordList = ({ accounts, searchTerm }: PasswordListProps) => {
  const { deleteAccount } = useVault();
  const [visiblePasswords, setVisiblePasswords] = useState<string[]>([]);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredAccounts = accounts.filter(
    (account) =>
      account.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (password: string) => {
    navigator.clipboard.writeText(password);
    showSuccess('Password copied to clipboard!');
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleEditClick = (account: Account) => {
    setEditingAccount(account);
    setIsEditDialogOpen(true);
  };

  if (filteredAccounts.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
        <h2 className="text-xl font-semibold text-foreground font-heading">Your vault is empty or no results found.</h2>
        <p className="text-muted-foreground mt-2">Try adding a new account or refining your search.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {filteredAccounts.map((account) => (
          <Card key={account.id} className="bg-card border-primary/20">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground font-heading">{account.website}</h3>
                <p className="text-sm text-muted-foreground">{account.username}</p>
                <p className="text-sm font-mono text-primary mt-2 tracking-wider">
                  {visiblePasswords.includes(account.id) ? account.password : '••••••••••••••••'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(account.id)}>
                  {visiblePasswords.includes(account.id) ? (
                    <EyeOff className="h-5 w-5 text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(account.password)}>
                  <Copy className="h-5 w-5 text-primary" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleEditClick(account)}>
                  <Pencil className="h-5 w-5 text-primary" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteAccount(account.id)}>
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-primary font-heading">Edit Account</DialogTitle>
          </DialogHeader>
          {editingAccount && (
            <EditPasswordForm
              account={editingAccount}
              onSave={() => {
                setIsEditDialogOpen(false);
                setEditingAccount(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};