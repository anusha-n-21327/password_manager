import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RefreshCw, Copy } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface PasswordGeneratorProps {
  setPassword: (password: string) => void;
}

export const PasswordGenerator = ({ setPassword }: PasswordGeneratorProps) => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = lowerChars;
    if (includeUppercase) charPool += upperChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    setGeneratedPassword(newPassword);
    setPassword(newPassword);
  };
  
  const handleCopy = () => {
    if(generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      showSuccess('Generated password copied!');
    }
  }

  return (
    <div className="space-y-4 p-4 rounded-md border border-gray-700 bg-gray-900/50">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm truncate text-gray-300">{generatedPassword || 'Click generate...'}</p>
        <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!generatedPassword}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      
      <div>
        <Label>Length: {length}</Label>
        <Slider defaultValue={[16]} max={32} min={8} step={1} onValueChange={(value) => setLength(value[0])} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(!!checked)} />
          <Label htmlFor="uppercase">ABC</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(!!checked)} />
          <Label htmlFor="numbers">123</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(!!checked)} />
          <Label htmlFor="symbols">#$&</Label>
        </div>
      </div>

      <Button onClick={generatePassword} className="w-full" variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate
      </Button>
    </div>
  );
};