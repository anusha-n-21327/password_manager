import { Account, useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Trash2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface PasswordListProps {
  accounts: Account[];
  searchTerm: string;
}

export const PasswordList = ({ accounts, searchTerm }: PasswordListProps) => {
  const { deleteAccount } = useVault();

  const filteredAccounts = accounts.filter(
    (account) =>
      account.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (password: string) => {
    navigator.clipboard.writeText(password);
    showSuccess('Password copied to clipboard!');
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
    <div className="space-y-4">
      {filteredAccounts.map((account) => (
        <Card key={account.id} className="bg-card border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground">{account.website}</h3>
              <p className="text-sm text-muted-foreground">{account.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleCopy(account.password)}>
                <Copy className="h-5 w-5 text-primary" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteAccount(account.id)}>
                <Trash2 className="h-5 w-5 text-destructive" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};