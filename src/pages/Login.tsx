import { useState } from 'react';
import { useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const { login, vaultExists } = useVault();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      login(password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-gray-800/50 border-gray-700">
        <CardHeader className="text-center">
          <div className="mx-auto bg-cyan-900/50 rounded-full p-3 w-fit mb-4">
            <KeyRound className="h-8 w-8 text-cyan-400" />
          </div>
          <CardTitle className="text-2xl text-cyan-400">
            {vaultExists ? 'Unlock Vault' : 'Create Your Vault'}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {vaultExists
              ? 'Enter your master password to continue.'
              : 'Choose a strong master password to secure your new vault.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Master Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900 border-gray-600 text-white focus:ring-cyan-500"
              required
            />
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
              {vaultExists ? 'Unlock' : 'Create'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;