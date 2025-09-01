import { useState, useEffect } from 'react';
import { useVault, Account } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Save } from 'lucide-react';

interface EditPasswordFormProps {
  account: Account;
  onSave: () => void;
}

export const EditPasswordForm = ({ account, onSave }: EditPasswordFormProps) => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { updateAccount } = useVault();

  useEffect(() => {
    if (account) {
      setWebsite(account.website);
      setUsername(account.username);
      setPassword(account.password);
    }
  }, [account]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website && username && password) {
      updateAccount({ id: account.id, website, username, password });
      onSave();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="website-edit">Website/App Name</Label>
        <Input id="website-edit" value={website} onChange={(e) => setWebsite(e.target.value)} required className="bg-background" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username-edit">Username/Email</Label>
        <Input id="username-edit" value={username} onChange={(e) => setUsername(e.target.value)} required className="bg-background" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-edit">Password</Label>
        <div className="relative">
          <Input
            id="password-edit"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-background pr-10 font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <Button type="submit" variant="secondary" className="w-full">
        <Save className="h-4 w-4 mr-2" /> Save Changes
      </Button>
    </form>
  );
};