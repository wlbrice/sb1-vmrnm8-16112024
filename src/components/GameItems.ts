interface GameItem {
  id: string;
  name: string;
  description: string;
  topics?: string[];
}

export const gameItems: GameItem[] = [
  {
    id: 'matching',
    name: 'Matching Game',
    description: 'Match items with their corresponding images',
    topics: ['animals', 'kitchen', 'house']
  },
  {
    id: 'language',
    name: 'Matching Words',
    description: 'Connect French and English words'
  },
  {
    id: 'memory',
    name: 'Memory Game',
    description: 'Test your memory by finding matching pairs'
  },
  {
    id: 'quiz',
    name: 'Quiz Game',
    description: 'Test your knowledge with fun quizzes'
  },
  {
    id: 'coloring',
    name: 'Coloring Game',
    description: 'Express your creativity with colors'
  },
  {
    id: 'music',
    name: 'Music Game',
    description: 'Play with rhythm and melodies'
  }
];