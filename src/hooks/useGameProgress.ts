import { useState, useEffect, useCallback } from 'react';

const PROGRESS_KEY = 'single-line-draw-progress';

const getSavedProgress = (): number[] => {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse game progress from localStorage', error);
    return [];
  }
};

export const useGameProgress = () => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    setCompletedLevels(getSavedProgress());
  }, []);

  const markLevelAsCompleted = useCallback((levelId: number) => {
    setCompletedLevels(prev => {
      const newProgress = [...new Set([...prev, levelId])];
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
      return newProgress;
    });
  }, []);

  const isLevelCompleted = useCallback((levelId: number) => {
    return completedLevels.includes(levelId);
  }, [completedLevels]);
  
  const resetProgress = useCallback(() => {
    localStorage.removeItem(PROGRESS_KEY);
    setCompletedLevels([]);
  }, []);

  return { completedLevels, markLevelAsCompleted, isLevelCompleted, resetProgress };
};