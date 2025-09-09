
import React, 'react';
import { useState, useEffect, useCallback } from 'react';
import { Choice, Result, ChoiceData } from './types';
import { CHOICES, CHOICE_DATA_MAP, RULES, RESULT_MESSAGES } from './constants';
import ChoiceDisplay from './components/ChoiceDisplay';

const App: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<Choice>(CHOICES[0]);
  const [result, setResult] = useState<Result | null>(null);
  const [gameInProgress, setGameInProgress] = useState<boolean>(true);

  useEffect(() => {
    if (gameInProgress) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * CHOICES.length);
        setOpponentChoice(CHOICES[randomIndex]);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameInProgress]);

  const determineWinner = useCallback((player: Choice, opponent: Choice): Result => {
    if (player === opponent) {
      return Result.Draw;
    }
    if (RULES[player] === opponent) {
      return Result.Win;
    }
    return Result.Lose;
  }, []);

  const handlePlayerChoice = (choice: Choice) => {
    if (!gameInProgress) return;
    
    setGameInProgress(false);
    setPlayerChoice(choice);
    
    // The final opponent choice is already set by the interval, we just use it.
    const gameResult = determineWinner(choice, opponentChoice);
    setResult(gameResult);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setResult(null);
    setGameInProgress(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          가위바위보
        </h1>
        <p className="text-gray-400 mt-2 text-lg">당신의 선택은?</p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center">
        <div className="flex items-center justify-around w-full mb-10">
          <ChoiceDisplay label="YOU" choice={playerChoice} isWinner={result === Result.Win} />
          <div className="text-4xl md:text-6xl font-black text-gray-500 mx-4">VS</div>
          <ChoiceDisplay label="OPPONENT" choice={opponentChoice} isWinner={result === Result.Lose} isAnimating={gameInProgress} />
        </div>

        {result && (
          <div className="text-center mb-8 transition-opacity duration-500 animate-fade-in">
            <h2 className={`text-5xl font-bold ${RESULT_MESSAGES[result].color}`}>{RESULT_MESSAGES[result].message}</h2>
          </div>
        )}

        <div className="flex flex-col items-center w-full mt-4">
          {!gameInProgress ? (
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              다시하기
            </button>
          ) : (
            <div className="flex justify-center gap-4 md:gap-8">
              {CHOICES.map((choice) => {
                const choiceData = CHOICE_DATA_MAP[choice];
                return (
                  <button
                    key={choice}
                    onClick={() => handlePlayerChoice(choice)}
                    className={`p-4 md:p-6 rounded-full bg-gray-800 border-2 ${choiceData.color} text-white hover:bg-gray-700 hover:scale-110 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${choiceData.color.replace('border-', 'ring-')}`}
                    aria-label={`Select ${choice}`}
                  >
                    {choiceData.icon}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>간단한 가위바위보 게임</p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
