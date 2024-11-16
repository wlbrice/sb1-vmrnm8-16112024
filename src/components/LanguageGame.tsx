import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { languageItems } from './LanguageItems';

interface Word {
  id: number;
  french: string;
  english: string;
}

interface Connection {
  frenchId: number;
  englishId: number;
  color: string;
}

interface LanguageGameProps {
  onBack: () => void;
}

const MATCH_COLORS = [
  'bg-pink-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-purple-100',
  'bg-yellow-100',
  'bg-orange-100',
  'bg-teal-100',
  'bg-red-100',
  'bg-indigo-100',
  'bg-cyan-100'
];

function LanguageGame({ onBack }: LanguageGameProps) {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedFrench, setSelectedFrench] = useState<number | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    selectRandomWords();
  }, []);

  const selectRandomWords = () => {
    const shuffled = [...languageItems].sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, 5));
    setConnections([]);
    setSelectedFrench(null);
    setSelectedEnglish(null);
  };

  const getConnectionColor = (id: number, type: 'french' | 'english'): string => {
    const connection = connections.find(
      c => type === 'french' ? c.frenchId === id : c.englishId === id
    );
    return connection ? connection.color : '';
  };

  const handleWordClick = (id: number, type: 'french' | 'english') => {
    if (type === 'french') {
      setSelectedFrench(selectedFrench === id ? null : id);
    } else {
      setSelectedEnglish(selectedEnglish === id ? null : id);
    }
  };

  useEffect(() => {
    if (selectedFrench !== null && selectedEnglish !== null) {
      const colorIndex = connections.length % MATCH_COLORS.length;
      const newConnection = {
        frenchId: selectedFrench,
        englishId: selectedEnglish,
        color: MATCH_COLORS[colorIndex]
      };
      setConnections([...connections, newConnection]);
      setSelectedFrench(null);
      setSelectedEnglish(null);
    }
  }, [selectedFrench, selectedEnglish]);

  const checkMatches = () => {
    const allCorrect = connections.every(({ frenchId, englishId }) => {
      const french = words.find(w => w.id === frenchId);
      const english = words.find(w => w.id === englishId);
      return french && english && french.id === english.id;
    });

    setShowResult(true);
    if (allCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextRound = () => {
    setShowResult(false);
    selectRandomWords();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-indigo-600" />
          </button>
          <h2 className="text-2xl font-bold text-indigo-800">
            Matching Words
          </h2>
        </div>
        <div className="px-4 py-2 bg-indigo-100 rounded-lg">
          <span className="font-semibold text-indigo-800">Score: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">French</h3>
          {words.map((word) => {
            const connectionColor = getConnectionColor(word.id, 'french');
            return (
              <button
                key={`french-${word.id}`}
                onClick={() => handleWordClick(word.id, 'french')}
                className={`w-full p-4 rounded-lg border-2 transition-all
                  ${connectionColor || 'bg-white'}
                  ${
                    selectedFrench === word.id
                      ? 'border-indigo-600 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-indigo-300'
                  } 
                  ${connections.some(c => c.frenchId === word.id) ? 'cursor-not-allowed' : ''}
                `}
                disabled={connections.some(c => c.frenchId === word.id)}
              >
                {word.french}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">English</h3>
          {[...words].sort(() => Math.random() - 0.5).map((word) => {
            const connectionColor = getConnectionColor(word.id, 'english');
            return (
              <button
                key={`english-${word.id}`}
                onClick={() => handleWordClick(word.id, 'english')}
                className={`w-full p-4 rounded-lg border-2 transition-all
                  ${connectionColor || 'bg-white'}
                  ${
                    selectedEnglish === word.id
                      ? 'border-indigo-600 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-indigo-300'
                  }
                  ${connections.some(c => c.englishId === word.id) ? 'cursor-not-allowed' : ''}
                `}
                disabled={connections.some(c => c.englishId === word.id)}
              >
                {word.english}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={checkMatches}
          disabled={connections.length !== words.length}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
            connections.length !== words.length
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Check Matches
        </button>
      </div>

      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full">
            <h3 className={`text-2xl font-bold mb-4 ${
              connections.every(({ frenchId, englishId }) => {
                const french = words.find(w => w.id === frenchId);
                const english = words.find(w => w.id === englishId);
                return french && english && french.id === english.id;
              })
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {connections.every(({ frenchId, englishId }) => {
                const french = words.find(w => w.id === frenchId);
                const english = words.find(w => w.id === englishId);
                return french && english && french.id === english.id;
              })
                ? 'Perfect Match!'
                : 'Try Again!'}
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              {connections.every(({ frenchId, englishId }) => {
                const french = words.find(w => w.id === frenchId);
                const english = words.find(w => w.id === englishId);
                return french && english && french.id === english.id;
              })
                ? 'Great job! All words are correctly matched!'
                : 'Some matches are incorrect. Keep trying!'}
            </p>
            <button
              onClick={handleNextRound}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg"
            >
              {connections.every(({ frenchId, englishId }) => {
                const french = words.find(w => w.id === frenchId);
                const english = words.find(w => w.id === englishId);
                return french && english && french.id === english.id;
              })
                ? 'Next Round'
                : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageGame;