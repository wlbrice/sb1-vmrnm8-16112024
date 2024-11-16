import React, { useState } from 'react';
import GameSelector from './components/GameSelector';
import TopicSelector from './components/TopicSelector';
import MatchingGame from './components/MatchingGame';
import LanguageGame from './components/LanguageGame';
import { gameItems } from './components/GameItems';

type GameState = {
  game: string | null;
  topic: string | null;
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    game: null,
    topic: null
  });

  const handleGameSelect = (game: string) => {
    const selectedGame = gameItems.find(g => g.id === game);
    if (selectedGame?.topics) {
      setGameState({ game, topic: null });
    } else {
      setGameState({ game, topic: 'none' });
    }
  };

  const handleTopicSelect = (topic: string) => {
    setGameState({ ...gameState, topic });
  };

  const handleBack = () => {
    if (gameState.topic) {
      // If we're in a game/topic, go back to topic selection if game has topics
      const selectedGame = gameItems.find(g => g.id === gameState.game);
      if (selectedGame?.topics) {
        setGameState({ ...gameState, topic: null });
      } else {
        setGameState({ game: null, topic: null });
      }
    } else {
      // If we're in topic selection, go back to game selection
      setGameState({ game: null, topic: null });
    }
  };

  const renderGame = () => {
    if (!gameState.game) {
      return <GameSelector onSelectGame={handleGameSelect} />;
    }

    const selectedGame = gameItems.find(g => g.id === gameState.game);
    
    if (selectedGame?.topics && !gameState.topic) {
      return (
        <TopicSelector 
          topics={selectedGame.topics}
          onSelectTopic={handleTopicSelect}
          onBack={handleBack}
        />
      );
    }

    switch (gameState.game) {
      case 'matching':
        return <MatchingGame topic={gameState.topic!} onBack={handleBack} />;
      case 'language':
        return <LanguageGame onBack={handleBack} />;
      default:
        return (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
            <button
              onClick={handleBack}
              className="mb-4 px-4 py-2 text-indigo-600 hover:text-indigo-800"
            >
              ← Back to Games
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              Game Under Development
            </h2>
            <p className="text-gray-600 mt-2">
              This game is coming soon! Please check back later.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      {renderGame()}
    </div>
  );
}

export default App;