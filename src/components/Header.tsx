import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVault } from "@/context/VaultContext";
import { Plus, List, Search, LogOut } from "lucide-react";

interface HeaderProps {
  onViewChange: (view: 'view' | 'add') => void;
  onSearch: (term: string) => void;
}

export const Header = ({ onViewChange, onSearch }: HeaderProps) => {
  const { logout } = useVault();

  return (
    <header className="bg-card p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center justify-end gap-4">
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
          <Button variant="outline" onClick={() => onViewChange('add')}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
          <Button variant="outline" onClick={() => onViewChange('view')}>
            <List className="h-4 w-4 mr-2" /> View All
          </Button>
          <Button variant="destructive" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </nav>
      </div>
    </header>
  );
};