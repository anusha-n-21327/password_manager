import { useState, useEffect, useCallback } from 'react';
import type { Level } from '@/game/levels';

type Difficulty = Level['difficulty'];
type HintState = Record<Difficulty, number>;

const HINT_KEY = 'single-line-draw-hints';
const INITIAL_HINTS: HintState = {
  easy: 500,
  medium: 500,
  hard: 500,
};

const getSavedHints = (): HintState => {
  try {
    const saved = localStorage.getItem(HINT_KEY);
    if (saved === null) {
      localStorage.setItem(HINT_KEY, JSON.stringify(INITIAL_HINTS));
      return INITIAL_HINTS;
    }
    const parsed = JSON.parse(saved);
    // Basic validation to ensure it has the right shape
    if (parsed && typeof parsed.easy === 'number' && typeof parsed.medium === 'number' && typeof parsed.hard === 'number') {
      return parsed;
    }
    // If shape is wrong, reset to default
    localStorage.setItem(HINT_KEY, JSON.stringify(INITIAL_HINTS));
    return INITIAL_HINTS;
  } catch (error) {
    console.error('Failed to parse hints from localStorage', error);
    return INITIAL_HINTS;
  }
};

export const useHintSystem = () => {
  const [hintCounts, setHintCounts] = useState<HintState>(INITIAL_HINTS);

  useEffect(() => {
    setHintCounts(getSavedHints());
  }, []);

  const useHint = useCallback((difficulty: Difficulty) => {
    setHintCounts(prev => {
      if (prev[difficulty] > 0) {
        const newCounts = { ...prev, [difficulty]: prev[difficulty] - 1 };
        localStorage.setItem(HINT_KEY, JSON.stringify(newCounts));
        return newCounts;
      }
      return prev;
    });
  }, []);
  
  const addHints = useCallback((difficulty: Difficulty, amount: number) => {
    setHintCounts(prev => {
      const newCounts = { ...prev, [difficulty]: prev[difficulty] + amount };
      localStorage.setItem(HINT_KEY, JSON.stringify(newCounts));
      return newCounts;
    });
  }, []);

  const resetHints = useCallback(() => {
    localStorage.setItem(HINT_KEY, JSON.stringify(INITIAL_HINTS));
    setHintCounts(INITIAL_HINTS);
  }, []);

  return { hintCounts, useHint, addHints, resetHints };
};