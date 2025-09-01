import { useState } from 'react';
import { useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, vaultExists, resetVault } = useVault();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      login(password);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm bg-card border-primary/20 animate-fade-in-up">
        <CardHeader className="text-center">
          <div className="mx-auto bg-background rounded-full p-3 w-fit mb-4 border border-primary/30">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-primary font-heading">
            Secure Your Digital Life
          </CardTitle>
          <CardDescription>
            {vaultExists
              ? 'Enter your master password to unlock your encrypted vault.'
              : 'Create a single master password to protect all your accounts.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Master Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-primary/30 text-foreground focus:ring-primary pr-10 font-mono"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <Button type="submit" className="w-full" variant="secondary">
              {vaultExists ? 'Unlock' : 'Create'}
            </Button>
          </form>
          {vaultExists && (
            <div className="mt-4 text-center">
              <Button variant="link" className="text-sm text-muted-foreground" onClick={resetVault}>
                Forgot Password? Reset Vault
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;