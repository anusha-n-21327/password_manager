import { levels } from "@/game/levels";
import { useGameProgress } from "@/hooks/useGameProgress";
import { LevelCard } from "@/components/LevelCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useHintSystem } from "@/hooks/useHintSystem";
import { Lightbulb } from "lucide-react";

const LevelSelect = () => {
  const { isLevelCompleted, resetProgress } = useGameProgress();
  const { hintCount, resetHints } = useHintSystem();

  const easyLevels = levels.filter((l) => l.difficulty === 'easy');
  const mediumLevels = levels.filter((l) => l.difficulty === 'medium');
  const hardLevels = levels.filter((l) => l.difficulty === 'hard');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-wider">
            Single Line Draw
          </h1>
          <p className="text-gray-400 mt-2">Connect all the dots with a single line.</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-lg text-yellow-400">
            <Lightbulb className="h-5 w-5" />
            <span>{hintCount} Hints Available</span>
          </div>
        </header>

        <Tabs defaultValue="easy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>
          <TabsContent value="easy" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {easyLevels.map((level) => (
                <LevelCard key={level.id} levelId={level.id} isCompleted={isLevelCompleted(level.id)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="medium" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediumLevels.map((level) => (
                <LevelCard key={level.id} levelId={level.id} isCompleted={isLevelCompleted(level.id)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="hard" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {hardLevels.map((level) => (
                <LevelCard key={level.id} levelId={level.id} isCompleted={isLevelCompleted(level.id)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <Button variant="destructive" onClick={() => {
            if (window.confirm("Are you sure you want to reset all your progress and hints?")) {
              resetProgress();
              resetHints();
            }
          }}>
            Reset Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;