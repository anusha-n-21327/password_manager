import { useState, useEffect } from 'react';
import { useVault, Account } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Eye, EyeOff, Copy } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

interface DecryptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopySuccess: (password: string) => void;
  accountToVerify: Account;
  action: 'decrypt' | 'copy';
}

export const DecryptModal = ({ isOpen, onClose, onCopySuccess, accountToVerify, action }: DecryptModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState<string | null>(null);
  const { verifyMasterPassword } = useVault();

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPassword('');
        setShowPassword(false);
        setDecryptedPassword(null);
      }, 200); // Delay to allow for closing animation
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyMasterPassword(password)) {
      const plainPassword = accountToVerify.password;
      if (action === 'decrypt') {
        setDecryptedPassword(plainPassword);
      } else {
        onCopySuccess(plainPassword);
      }
    } else {
      showError('Incorrect master password.');
      onClose();
    }
    setPassword('');
  };

  const handleCopy = () => {
    if (decryptedPassword) {
      navigator.clipboard.writeText(decryptedPassword);
      showSuccess('Password copied to clipboard!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-primary/20 animate-scale-in">
        {!decryptedPassword ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary">Vault Verification</DialogTitle>
              <DialogDescription>
                Please re-enter your master password to proceed.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Master Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background border-primary/30 text-foreground focus:ring-primary pr-10"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <Button type="submit" className="w-full" variant="secondary">
                Confirm
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary">Decrypted Password</DialogTitle>
              <DialogDescription>
                For website: {accountToVerify.website}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-between gap-4 p-4 my-4 bg-background rounded-md border border-primary/20">
              <p className="font-mono text-lg tracking-wider text-foreground break-all">
                {decryptedPassword}
              </p>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="hover:text-primary">
                <Copy className="h-5 w-5" />
              </Button>
            </div>
            <Button onClick={onClose} className="w-full" variant="outline">Close</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};