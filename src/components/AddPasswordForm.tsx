import { useState } from 'react';
import { useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Save } from 'lucide-react';

interface AddPasswordFormProps {
  onSave: () => void;
}

export const AddPasswordForm = ({ onSave }: AddPasswordFormProps) => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { addAccount } = useVault();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website && username && password) {
      addAccount({ website, username, password });
      onSave();
    }
  };

  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-primary font-heading">Add New Password</CardTitle>
        <CardDescription>Enter the details for the new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="website">Website/App Name</Label>
            <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} required className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username/Email</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background pr-10"
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
            <Save className="h-4 w-4 mr-2" /> Save Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};