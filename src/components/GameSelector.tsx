import React from 'react';
import { 
  GamepadIcon, 
  Brain, 
  Languages, 
  BookOpen, 
  Palette, 
  Music 
} from 'lucide-react';
import { gameItems } from './GameItems';

const gameIcons = {
  matching: GamepadIcon,
  memory: Brain,
  language: Languages,
  quiz: BookOpen,
  coloring: Palette,
  music: Music
};

interface GameSelectorProps {
  onSelectGame: (gameId: string) => void;
}

function GameSelector({ onSelectGame }: GameSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-8">
        Choose a Game
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameItems.map((game) => {
          const Icon = gameIcons[game.id as keyof typeof gameIcons];
          return (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
                transition-all transform hover:-translate-y-1 
                flex flex-col items-center gap-4"
            >
              <Icon className="w-12 h-12 text-indigo-600" />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {game.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {game.description}
                </p>
              </div>
              {!['matching', 'language'].includes(game.id) && (
                <span className="mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GameSelector;