import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';
import { Footer } from '@/components/Footer';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <main className="flex-grow flex items-center justify-center w-full">
        <Card className="w-full max-w-sm bg-card border-primary/20 animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="mx-auto bg-background rounded-full p-3 w-fit mb-4 border border-primary/30">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-primary font-heading">
              Secure Your Digital Life
            </CardTitle>
            <CardDescription>
              Sign in to access your encrypted vault from any device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--primary))',
                      brandAccent: 'hsl(var(--secondary))',
                      brandButtonText: 'white',
                      defaultButtonBackground: 'hsl(var(--card))',
                      defaultButtonBackgroundHover: 'hsl(var(--muted))',
                      defaultButtonBorder: 'hsl(var(--border))',
                      inputBackground: 'hsl(var(--background))',
                      inputBorder: 'hsl(var(--border))',
                      inputBorderHover: 'hsl(var(--primary))',
                      inputText: 'white',
                      inputLabelText: 'hsl(var(--muted-foreground))',
                      inputPlaceholder: 'hsl(var(--muted-foreground))',
                    },
                    radii: {
                      borderRadiusButton: 'var(--radius)',
                      buttonBorderRadius: 'var(--radius)',
                      inputBorderRadius: 'var(--radius)',
                    },
                  },
                },
              }}
              providers={[]}
              theme="dark"
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;