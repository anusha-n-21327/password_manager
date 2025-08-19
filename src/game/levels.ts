export interface Point {
  x: number;
  y: number;
}

export interface Level {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gridSize: { rows: number; cols: number };
  points: Point[];
  connections: [number, number][];
}

// NOTE: The request was for 500 levels. This file contains a sample of 15 levels.
// The game is architected to easily support more levels by simply adding them to this array.
export const levels: Level[] = [
  // Easy
  {
    id: 1,
    difficulty: 'easy',
    gridSize: { rows: 3, cols: 3 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
    connections: [[0, 1], [1, 3], [3, 2], [2, 0]],
  },
  {
    id: 2,
    difficulty: 'easy',
    gridSize: { rows: 3, cols: 3 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
    connections: [[0, 1], [1, 2]],
  },
  {
    id: 3,
    difficulty: 'easy',
    gridSize: { rows: 3, cols: 3 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 2 }],
    connections: [[0, 1], [1, 2], [1, 3], [1, 4]],
  },
  {
    id: 4,
    difficulty: 'easy',
    gridSize: { rows: 4, cols: 3 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    connections: [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5]],
  },
  {
    id: 5,
    difficulty: 'easy',
    gridSize: { rows: 3, cols: 3 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }],
    connections: [[0, 1], [1, 2], [1, 3]],
  },
  // Medium
  {
    id: 6,
    difficulty: 'medium',
    gridSize: { rows: 4, cols: 4 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    connections: [[0, 1], [1, 2], [2, 5], [5, 4], [4, 3], [3, 0], [1, 4]],
  },
  {
    id: 7,
    difficulty: 'medium',
    gridSize: { rows: 4, cols: 4 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
    connections: [[0, 1], [1, 2], [2, 5], [5, 4], [4, 3], [3, 0], [1, 4], [4, 6]],
  },
  {
    id: 8,
    difficulty: 'medium',
    gridSize: { rows: 4, cols: 4 },
    points: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    connections: [[0, 1], [1, 2], [2, 3], [3, 5], [5, 4], [4, 0], [1, 4], [2, 5]],
  },
  {
    id: 9,
    difficulty: 'medium',
    gridSize: { rows: 3, cols: 4 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
    connections: [[0, 1], [1, 2], [2, 3], [3, 7], [7, 6], [6, 5], [5, 4], [4, 0], [1, 5], [2, 6]],
  },
  {
    id: 10,
    difficulty: 'medium',
    gridSize: { rows: 4, cols: 4 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    connections: [[0, 1], [0, 2], [1, 3], [2, 3], [2, 5], [3, 4], [3, 6], [5, 6]],
  },
  // Hard
  {
    id: 11,
    difficulty: 'hard',
    gridSize: { rows: 5, cols: 5 },
    points: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 2 }],
    connections: [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [4, 2], [3, 2]],
  },
  {
    id: 12,
    difficulty: 'hard',
    gridSize: { rows: 5, cols: 5 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    connections: [[0, 1], [1, 2], [2, 3], [3, 7], [7, 6], [6, 5], [5, 4], [4, 0], [4, 8], [5, 9], [6, 10], [7, 11], [8, 9], [9, 10], [10, 11]],
  },
  {
    id: 13,
    difficulty: 'hard',
    gridSize: { rows: 4, cols: 4 },
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    connections: [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8]],
  },
  {
    id: 14,
    difficulty: 'hard',
    gridSize: { rows: 5, cols: 5 },
    points: [{ x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }],
    connections: [[0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [2, 6], [3, 7], [4, 7], [5, 7], [6, 8], [7, 8]],
  },
  {
    id: 15,
    difficulty: 'hard',
    gridSize: { rows: 4, cols: 5 },
    points: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 5], [2, 6], [3, 7], [4, 7], [5, 6], [6, 7]],
  },
];

export const getLevelById = (id: number): Level | undefined => levels.find(level => level.id === id);