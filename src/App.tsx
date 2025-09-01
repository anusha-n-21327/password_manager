import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VaultProvider, useVault } from './context/VaultContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ParticlesBackground } from './components/ParticlesBackground';

const AppContent = () => {
  const { isUnlocked } = useVault();
  return isUnlocked ? <Dashboard /> : <Login />;
};

const App = () => (
  <>
    <ParticlesBackground />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <VaultProvider>
        <AppContent />
      </VaultProvider>
    </TooltipProvider>
  </>
);

export default App;