import { useState } from 'react';
import React from 'react';
import { Account, useVault } from '@/context/VaultContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { EditPasswordForm } from './EditPasswordForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Copy, Trash2, Pencil, MoreVertical } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { getIconForWebsite } from '@/lib/icon-map';

interface PasswordTableProps {
  accounts: Account[];
  searchTerm: string;
}

export const PasswordTable = ({ accounts, searchTerm }: PasswordTableProps) => {
  const { deleteAccount } = useVault();
  const [editState, setEditState] = useState<{ open: boolean; account: Account | null }>({ open: false, account: null });

  const filteredAccounts = accounts.filter(
    (account) =>
      (account.website && typeof account.website === 'string' && account.website.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (account.username && typeof account.username === 'string' && account.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCopy = (password: string) => {
    navigator.clipboard.writeText(password);
    showSuccess('Password copied to clipboard!');
  };

  const openEditDialog = (account: Account) => {
    setEditState({ open: true, account });
  };

  if (filteredAccounts.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-primary/20 rounded-lg">
        <h2 className="text-xl font-semibold text-foreground font-heading">Your vault is empty or no results found.</h2>
        <p className="text-muted-foreground mt-2">Try adding a new account or refining your search.</p>
      </div>
    );
  }

  return (
    <>
      <Card className="bg-card border-primary/20">
        <Table>
          <TableHeader>
            <TableRow className="border-b-primary/20">
              <TableHead className="text-foreground font-heading">Website/App</TableHead>
              <TableHead className="text-foreground font-heading">Username</TableHead>
              <TableHead className="text-foreground font-heading">Password</TableHead>
              <TableHead className="text-right text-foreground font-heading">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account, index) => {
              const Icon = getIconForWebsite(account.website);
              return (
                <TableRow 
                  key={account.id} 
                  className="border-b-primary/20 hover:bg-primary/5 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{account.website}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{account.username}</TableCell>
                  <TableCell className="font-mono tracking-wider text-primary">
                    {'••••••••••••'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-foreground">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-primary/20 animate-scale-in">
                        <DropdownMenuItem 
                          onClick={() => handleCopy(account.password_text)} 
                          className="focus:bg-secondary/20 focus:text-foreground opacity-0 animate-fade-in-up"
                          style={{ animationDelay: '100ms' }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Copy Password</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => openEditDialog(account)} 
                          className="focus:bg-secondary/20 focus:text-foreground opacity-0 animate-fade-in-up"
                          style={{ animationDelay: '150ms' }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-primary/20" />
                        <DropdownMenuItem 
                          onClick={() => deleteAccount(account.id)} 
                          className="text-destructive focus:bg-secondary/20 focus:text-foreground opacity-0 animate-fade-in-up"
                          style={{ animationDelay: '200ms' }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
      
      {editState.account && (
        <Dialog open={editState.open} onOpenChange={(isOpen) => setEditState({ ...editState, open: isOpen })}>
          <DialogContent className="sm:max-w-[425px] bg-card border-primary/20 animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-primary font-heading">Edit Account</DialogTitle>
              <DialogDescription>Make changes to your saved account details.</DialogDescription>
            </DialogHeader>
            <EditPasswordForm 
              account={editState.account} 
              onSave={() => setEditState({ open: false, account: null })} 
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};