import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Search } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { showError, showSuccess } from '@/utils/toast';
import { AddPasswordDialog } from '@/components/AddPasswordDialog';
import { Password, PasswordCard } from '@/components/PasswordCard';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserAndPasswords = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchPasswords(session.user.id);
      }
      setLoading(false);
    };

    fetchUserAndPasswords();
  }, []);

  const fetchPasswords = async (userId: string) => {
    const { data, error } = await supabase
      .from('passwords')
      .select('*')
      .eq('user_id', userId)
      .order('website', { ascending: true });

    if (error) {
      showError('Error fetching passwords');
      console.error('Error fetching passwords:', error);
    } else {
      setPasswords(data || []);
    }
  };

  const handleAddPassword = async (values: { website: string; username: string; password_text: string }) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('passwords')
      .insert([{ ...values, user_id: user.id }])
      .select();

    if (error) {
      showError('Error adding password');
      console.error('Error adding password:', error);
    } else if (data) {
      setPasswords([...passwords, data[0]].sort((a, b) => a.website.localeCompare(b.website)));
      showSuccess('Password added successfully!');
    }
  };

  const handleDeletePassword = async (id: string) => {
    const { error } = await supabase
      .from('passwords')
      .delete()
      .eq('id', id);

    if (error) {
      showError('Error deleting password');
      console.error('Error deleting password:', error);
    } else {
      setPasswords(passwords.filter((p) => p.id !== id));
      showSuccess('Password deleted successfully!');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const filteredPasswords = useMemo(() => {
    return passwords.filter(p =>
      p.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [passwords, searchQuery]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-heading text-primary">Vault</h1>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        <main>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <AddPasswordDialog onAddPassword={handleAddPassword} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPasswords.length > 0 ? (
              filteredPasswords.map((password) => (
                <PasswordCard
                  key={password.id}
                  password={password}
                  onDelete={handleDeletePassword}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground col-span-full py-16">
                <p>No passwords found.</p>
                <p className="text-sm">Click "Add Password" to get started.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;