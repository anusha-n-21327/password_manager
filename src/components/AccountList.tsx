import { useState } from 'react';
import { Account, useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface AccountListProps {
  accounts: Account[];
}

export const AccountList = ({ accounts }: AccountListProps) => {
  const { deleteAccount } = useVault();
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    showSuccess('Password copied to clipboard!');
  };

  if (accounts.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-400">Your vault is empty.</h2>
        <p className="text-gray-500 mt-2">Click "Add Account" to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accounts.map(account => (
        <Card key={account.id} className="bg-gray-800/30 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-200">{account.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Input
              type={visiblePasswords[account.id] ? 'text' : 'password'}
              value={account.value}
              readOnly
              className="bg-gray-900 border-gray-600 text-white flex-grow"
            />
            <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(account.id)}>
              {visiblePasswords[account.id] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleCopy(account.value)}>
              <Copy className="h-5 w-5 text-cyan-400" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => deleteAccount(account.id)}>
              <Trash2 className="h-5 w-5 text-red-500" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};