import { useState } from 'react';
import { useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { PasswordGenerator } from './PasswordGenerator';

export const AddAccountDialog = () => {
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const { addAccount } = useVault();

  const handleSubmit = () => {
    if (accountName && password) {
      addAccount({ name: accountName, value: password });
      setAccountName('');
      setPassword('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">Add New Account</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the details for the new account you want to save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-300">
              Account
            </Label>
            <Input
              id="name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="col-span-3 bg-gray-900 border-gray-600 h-11 text-base"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3 bg-gray-900 border-gray-600 h-11 text-base"
            />
          </div>
          <div className="col-start-2 col-span-3">
             <PasswordGenerator setPassword={setPassword} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit} className="bg-cyan-600 hover:bg-cyan-700">
              Save Account
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};