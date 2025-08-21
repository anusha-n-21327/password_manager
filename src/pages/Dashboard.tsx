import { useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { AccountList } from '@/components/AccountList';
import { AddAccountDialog } from '@/components/AddAccountDialog';

const Dashboard = () => {
  const { logout, accounts } = useVault();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Password Vault</h1>
            <p className="text-gray-400">Your secure accounts.</p>
          </div>
          <div className="flex items-center gap-4">
            <AddAccountDialog />
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="sr-only">Lock Vault</span>
            </Button>
          </div>
        </header>

        <main>
          <AccountList accounts={accounts} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;