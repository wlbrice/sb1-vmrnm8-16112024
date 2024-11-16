import React from 'react';
import { Bird, UtensilsCrossed, Home, ArrowLeft } from 'lucide-react';

const topicIcons = {
  animals: Bird,
  kitchen: UtensilsCrossed,
  house: Home
};

const topicNames = {
  animals: 'Animals',
  kitchen: 'Kitchen Items',
  house: 'House Items'
};

interface TopicSelectorProps {
  topics: string[];
  onSelectTopic: (topicId: string) => void;
  onBack: () => void;
}

function TopicSelector({ topics, onSelectTopic, onBack }: TopicSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-indigo-600" />
        </button>
        <h2 className="text-2xl font-bold text-indigo-800">
          Choose a Topic
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const Icon = topicIcons[topic as keyof typeof topicIcons];
          return (
            <button
              key={topic}
              onClick={() => onSelectTopic(topic)}
              className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md 
                hover:shadow-lg transition-all transform hover:-translate-y-1 
                flex flex-col items-center gap-4"
            >
              <Icon className="w-12 h-12 text-indigo-600" />
              <span className="text-lg font-semibold text-gray-800">
                {topicNames[topic as keyof typeof topicNames]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TopicSelector;