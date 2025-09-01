import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Plus } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface Note {
  id: string;
  content: string;
  created_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchNotes(session.user.id);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  const fetchNotes = async (userId: string) => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
    } else {
      setNotes(data || []);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim() === '' || !user) return;

    const { data, error } = await supabase
      .from('notes')
      .insert([{ content: newNote, user_id: user.id }])
      .select();

    if (error) {
      console.error('Error adding note:', error);
    } else if (data) {
      setNotes([data[0], ...notes]);
      setNewNote('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {user?.email}</p>
          </div>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        <main>
          <Card className="bg-card border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="font-heading">Add a New Note</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNote} className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Your new note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="bg-background"
                />
                <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading">Your Notes</h2>
            {notes.length > 0 ? (
              notes.map((note) => (
                <Card key={note.id} className="bg-card p-4">
                  <p>{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                You don't have any notes yet.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;