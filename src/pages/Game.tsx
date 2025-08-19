import { useParams, useNavigate } from 'react-router-dom';
import { getLevelById } from '@/game/levels';
import { useEffect, useState } from 'react';
import { GameGrid } from '@/components/GameGrid';
import { useGameProgress } from '@/hooks/useGameProgress';
import { showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Game = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { markLevelAsCompleted } = useGameProgress();
  const [gameKey, setGameKey] = useState(0);

  const level = getLevelById(Number(levelId));

  useEffect(() => {
    if (!level) {
      navigate('/');
    }
  }, [level, navigate]);

  const handleComplete = () => {
    markLevelAsCompleted(level!.id);
    showSuccess(`Level ${level!.id} completed!`);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  const handleReset = () => {
    setGameKey(prev => prev + 1);
  };

  if (!level) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Level not found. Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800/30 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to levels</span>
            </Button>
            <CardTitle className="text-2xl text-cyan-400">Level {level.id}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleReset}>
              <RotateCcw className="h-5 w-5" />
              <span className="sr-only">Reset level</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <GameGrid key={gameKey} level={level} onComplete={handleComplete} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;