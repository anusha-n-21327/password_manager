import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from './integrations/supabase/client';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { Session } from '@supabase/supabase-js';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!session ? <AuthPage /> : <Dashboard key={session.user.id} />}
      </TooltipProvider>
    </>
  );
};

export default App;