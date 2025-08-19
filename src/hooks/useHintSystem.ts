import { useState, useEffect, useCallback } from 'react';

const HINT_KEY = 'single-line-draw-hints';
const INITIAL_HINTS = 500;

const getSavedHints = (): number => {
  try {
    const saved = localStorage.getItem(HINT_KEY);
    if (saved === null) {
      // If no value is saved, initialize with default
      localStorage.setItem(HINT_KEY, String(INITIAL_HINTS));
      return INITIAL_HINTS;
    }
    return parseInt(saved, 10);
  } catch (error) {
    console.error('Failed to parse hints from localStorage', error);
    return INITIAL_HINTS;
  }
};

export const useHintSystem = () => {
  const [hintCount, setHintCount] = useState<number>(0);

  useEffect(() => {
    setHintCount(getSavedHints());
  }, []);

  const useHint = useCallback(() => {
    setHintCount(prev => {
      if (prev > 0) {
        const newCount = prev - 1;
        localStorage.setItem(HINT_KEY, String(newCount));
        return newCount;
      }
      return prev;
    });
  }, []);
  
  const addHints = useCallback((amount: number) => {
    setHintCount(prev => {
      const newCount = prev + amount;
      localStorage.setItem(HINT_KEY, String(newCount));
      return newCount;
    });
  }, []);

  const resetHints = useCallback(() => {
    localStorage.setItem(HINT_KEY, String(INITIAL_HINTS));
    setHintCount(INITIAL_HINTS);
  }, []);

  return { hintCount, useHint, addHints, resetHints };
};