import { useState } from 'react';
import { useVault, Account } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Eye, EyeOff } from 'lucide-react';
import { showError } from '@/utils/toast';

interface DecryptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (password: string) => void;
  accountToVerify: Account;
}

export const DecryptModal = ({ isOpen, onClose, onSuccess, accountToVerify }: DecryptModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { verifyMasterPassword } = useVault();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyMasterPassword(password)) {
      onSuccess(accountToVerify.password);
    } else {
      showError('Incorrect master password.');
    }
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
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
      </DialogContent>
    </Dialog>
  );
};