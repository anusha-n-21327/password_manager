import { useState } from 'react';
import { useVault } from '@/context/VaultContext';
import { Header } from '@/components/Header';
import { PasswordList } from '@/components/PasswordList';
import { AddPasswordForm } from '@/components/AddPasswordForm';

const Dashboard = () => {
  const { accounts } = useVault();
  const [activeView, setActiveView] = useState<'view' | 'add'>('view');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Header
          onViewChange={setActiveView}
          onSearch={setSearchTerm}
        />
        <main>
          {activeView === 'view' && (
            <PasswordList accounts={accounts} searchTerm={searchTerm} />
          )}
          {activeView === 'add' && (
            <AddPasswordForm onSave={() => setActiveView('view')} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;