import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Level, Point } from '@/game/levels';
import { cn } from '@/lib/utils';

interface GameGridProps {
  level: Level;
  onComplete: () => void;
}

const PADDING = 50;
const STROKE_WIDTH = 8;

export const GameGrid = ({ level, onComplete }: GameGridProps) => {
  const [path, setPath] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { gridSize, points, connections } = level;

  const { width, height, getCanvasCoords } = useMemo(() => {
    const width = (gridSize.cols - 1) * 100 + PADDING * 2;
    const height = (gridSize.rows - 1) * 100 + PADDING * 2;
    const getCanvasCoords = (p: Point) => ({
      x: p.x * 100 + PADDING,
      y: p.y * 100 + PADDING,
    });
    return { width, height, getCanvasCoords };
  }, [gridSize]);

  const drawnConnections = useMemo(() => {
    const drawn = new Set<string>();
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i + 1];
      const key = [p1, p2].sort().join('-');
      drawn.add(key);
    }
    return drawn;
  }, [path]);

  useEffect(() => {
    if (drawnConnections.size === connections.length) {
      onComplete();
    }
  }, [drawnConnections, connections, onComplete]);

  const getPointIndexFromCoords = (x: number, y: number) => {
    if (!svgRef.current) return -1;
    const svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;
    const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM()?.inverse());

    for (let i = 0; i < points.length; i++) {
      const p = getCanvasCoords(points[i]);
      const dist = Math.sqrt(Math.pow(p.x - transformedPoint.x, 2) + Math.pow(p.y - transformedPoint.y, 2));
      if (dist < 20) { // Click radius
        return i;
      }
    }
    return -1;
  };

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    const pointIndex = getPointIndexFromCoords(clientX, clientY);
    if (pointIndex !== -1) {
      setIsDrawing(true);
      setPath([pointIndex]);
    }
  };

  const handleInteractionMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !svgRef.current) return;
    e.preventDefault();
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    
    const svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = clientX;
    svgPoint.y = clientY;
    const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    setMousePos({ x: transformedPoint.x, y: transformedPoint.y });

    const pointIndex = getPointIndexFromCoords(clientX, clientY);
    const lastPoint = path[path.length - 1];

    if (pointIndex !== -1 && pointIndex !== lastPoint) {
      const connectionKey = [lastPoint, pointIndex].sort().join('-');
      const isValidConnection = connections.some(c => [c[0], c[1]].sort().join('-') === connectionKey);
      const isAlreadyDrawn = drawnConnections.has(connectionKey);

      if (isValidConnection && !isAlreadyDrawn) {
        setPath(prev => [...prev, pointIndex]);
      }
    }
  };

  const handleInteractionEnd = () => {
    setIsDrawing(false);
    setMousePos(null);
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        onMouseDown={handleInteractionStart}
        onMouseMove={handleInteractionMove}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchMove={handleInteractionMove}
        onTouchEnd={handleInteractionEnd}
        className="cursor-pointer touch-none rounded-lg bg-gray-800/50"
      >
        {connections.map(([p1, p2], i) => {
          const start = getCanvasCoords(points[p1]);
          const end = getCanvasCoords(points[p2]);
          return (
            <line
              key={i}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="hsl(220 13% 31%)"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
            />
          );
        })}

        {path.length > 1 && path.map((p, i) => {
          if (i === 0) return null;
          const start = getCanvasCoords(points[path[i - 1]]);
          const end = getCanvasCoords(points[p]);
          return (
            <line
              key={i}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              className="stroke-cyan-400"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
            />
          );
        })}
        
        {isDrawing && mousePos && path.length > 0 && (
            <line
                x1={getCanvasCoords(points[path[path.length - 1]]).x}
                y1={getCanvasCoords(points[path[path.length - 1]]).y}
                x2={mousePos.x}
                y2={mousePos.y}
                className="stroke-fuchsia-500"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                strokeDasharray="10 10"
            />
        )}

        {points.map((p, i) => {
          const { x, y } = getCanvasCoords(p);
          const isStartPoint = path.length > 0 && path[0] === i;
          const isEndPoint = path.length > 0 && path[path.length - 1] === i;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="12"
              className={cn(
                "fill-gray-500 transition-colors",
                isStartPoint && "fill-green-500",
                isEndPoint && !isStartPoint && "fill-yellow-500",
                path.includes(i) && !isStartPoint && !isEndPoint && "fill-cyan-500"
              )}
            />
          );
        })}
      </svg>
    </div>
  );
};