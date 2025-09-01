import { useState } from 'react';
import { useVault } from '@/context/VaultContext';
import { Header } from '@/components/Header';
import { PasswordTable } from '@/components/PasswordTable';
import { AddPasswordForm } from '@/components/AddPasswordForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Dashboard = () => {
  const { accounts } = useVault();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <Header
          onAddClick={() => setIsAddDialogOpen(true)}
          onSearch={setSearchTerm}
        />
        <main>
          <PasswordTable accounts={accounts} searchTerm={searchTerm} />
        </main>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-primary">Add New Password</DialogTitle>
            <DialogDescription>Enter the details for the new account.</DialogDescription>
          </DialogHeader>
          <AddPasswordForm onSave={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;