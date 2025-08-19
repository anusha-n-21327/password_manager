import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LevelCardProps {
  levelId: number;
  isCompleted: boolean;
}

export const LevelCard = ({ levelId, isCompleted }: LevelCardProps) => {
  return (
    <Link to={`/play/${levelId}`} className="focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg">
      <Card
        className={cn(
          "transition-all hover:scale-105 hover:shadow-lg dark:hover:shadow-cyan-500/20",
          isCompleted ? "bg-green-900/50 border-green-500" : "dark:bg-gray-800",
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-gray-200">Level {levelId}</CardTitle>
          {isCompleted && <CheckCircle2 className="h-6 w-6 text-green-400" />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cyan-400">Play</div>
        </CardContent>
      </Card>
    </Link>
  );
};