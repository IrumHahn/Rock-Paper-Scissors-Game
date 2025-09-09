
import React from 'react';
import { Choice } from '../types';
import { CHOICE_DATA_MAP } from '../constants';

interface ChoiceDisplayProps {
  choice: Choice | null;
  label: string;
  isWinner?: boolean;
  isAnimating?: boolean;
}

const ChoiceDisplay: React.FC<ChoiceDisplayProps> = ({ choice, label, isWinner = false, isAnimating = false }) => {
  const choiceData = choice ? CHOICE_DATA_MAP[choice] : null;
  
  const baseClasses = "relative flex flex-col items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full transition-all duration-300";
  const colorClasses = choiceData ? choiceData.color : 'border-gray-600';
  const winnerClasses = isWinner ? 'border-4 shadow-lg scale-110 shadow-yellow-500/50' : 'border-2';
  const animatingClasses = isAnimating ? 'animate-pulse' : '';

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-300">{label}</h2>
      <div className={`${baseClasses} ${colorClasses} ${winnerClasses} ${animatingClasses} bg-gray-800/50`}>
        {choiceData ? (
          <div className="transform transition-transform duration-300">
            {choiceData.icon}
          </div>
        ) : (
          <div className="text-4xl text-gray-500">?</div>
        )}
         {isWinner && (
          <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 rounded-full h-10 w-10 flex items-center justify-center font-bold text-sm transform rotate-12">
            WIN
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoiceDisplay;
