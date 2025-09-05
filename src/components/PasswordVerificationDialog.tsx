import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useVault, Account } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { showError, showSuccess } from '@/utils/toast';
import { Eye, EyeOff, ShieldCheck, Copy } from 'lucide-react';

interface PasswordVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
}

export const PasswordVerificationDialog = ({ open, onOpenChange, account }: PasswordVerificationDialogProps) => {
  const { session } = useVault();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<'verify' | 'revealed'>('verify');

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setPassword('');
        setIsLoading(false);
        setShowPassword(false);
        setView('verify');
      }, 300);
    }
  }, [open]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email || !password) return;

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password: password,
    });
    setIsLoading(false);

    if (error) {
      showError('Incorrect password. Please try again.');
    } else {
      setView('revealed');
    }
  };

  const handleCopy = () => {
    if (account?.password_text) {
      navigator.clipboard.writeText(account.password_text);
      showSuccess('Password copied to clipboard!');
    }
  };

  if (!account) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
        {view === 'verify' ? (
          <form onSubmit={handleVerify}>
            <DialogHeader>
              <DialogTitle className="text-primary font-heading">Verify Your Identity</DialogTitle>
              <DialogDescription>
                For your security, please enter your master password to view this item.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="space-y-2">
                <Label htmlFor="master-password">Master Password</Label>
                <div className="relative">
                  <Input
                    id="master-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background pr-10 font-mono"
                    autoComplete="current-password"
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
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-[0_0_15px_hsl(var(--secondary))] transition-shadow"
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                {isLoading ? 'Verifying...' : 'Confirm'}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary font-heading">{account.website}</DialogTitle>
              <DialogDescription>{account.username}</DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <Label htmlFor="revealed-password">Password</Label>
              <div className="relative">
                <Input
                  id="revealed-password"
                  readOnly
                  value={account.password_text}
                  className="bg-background pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} className="w-full">Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};