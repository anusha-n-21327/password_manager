import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVault } from "@/context/VaultContext";
import { Plus, Search, LogOut, KeyRound } from "lucide-react";

interface HeaderProps {
  onAddClick: () => void;
  onSearch: (term: string) => void;
}

export const Header = ({ onAddClick, onSearch }: HeaderProps) => {
  const { logout } = useVault();

  return (
    <header className="bg-card p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 self-start">
        <KeyRound className="h-6 w-6 text-primary" />
        <h1 className="font-bold text-xl text-foreground font-heading">Password Vault</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-background"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <nav className="flex items-center gap-2">
          <Button variant="outline" onClick={onAddClick} className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Plus className="h-4 w-4 mr-2" /> Add New
          </Button>
          <Button variant="destructive" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </nav>
      </div>
    </header>
  );
};