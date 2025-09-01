import { useState } from 'react';
import { useVault } from '@/context/VaultContext';
import { Header } from '@/components/Header';
import { PasswordTable } from '@/components/PasswordTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AddPasswordForm } from '@/components/AddPasswordForm';
import { Footer } from '@/components/Footer';

const Dashboard = () => {
  const { accounts } = useVault();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 flex flex-col">
      <div className="max-w-6xl mx-auto opacity-0 animate-fade-in w-full flex-grow">
        <Header
          onAddClick={() => setIsAddDialogOpen(true)}
          onSearch={setSearchTerm}
        />
        <main className="mt-8 opacity-0 animate-fade-in-up [animation-delay:200ms]">
          <PasswordTable accounts={accounts} searchTerm={searchTerm} />
        </main>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-primary/20 animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-primary font-heading">Add New Password</DialogTitle>
            <DialogDescription>Enter the details for the new account.</DialogDescription>
          </DialogHeader>
          <AddPasswordForm onSave={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Dashboard;