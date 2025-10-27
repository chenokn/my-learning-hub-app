import React from 'react';
import { VocabWord } from '../page';

interface SpellingTestInlineProps {
  word: VocabWord;
  onDone: () => void;
  onCheck: (result: 'correct' | 'incorrect' | '') => void;
  isTestMode: boolean;
}

export function SpellingTestInline({ word, onDone, onCheck, isTestMode }: SpellingTestInlineProps) {
  const [input, setInput] = React.useState('');
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [pron] = React.useState<'us' | 'uk' | 'aus'>('uk');
  const imgSrc = `/stem-hub/eng/${word.word.toLowerCase()}.png`;

  React.useEffect(() => {
    if (showAnswer) {
      const correct = input.trim().toLowerCase() === word.word.toLowerCase();
      const key = `spelling-correct-${word.word}`;
      localStorage.setItem(
        key,
        JSON.stringify({ status: correct ? 'correct' : 'incorrect', timestamp: Date.now() })
      );
    }
  }, [showAnswer]);

  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden bg-white">
      <div className="relative z-10 w-full flex flex-col text-yellow-900 flex-1">
        <div className="mb-2 text-xl font-bold text-gray-500 flex items-center gap-2">
          Spell the word for:
        </div>
        <hr className='border-gray-200 w-full my-2' />
        <div className="w-full min-h-24 text-lg">{word.definition}</div>
        <div
          className="ml-1 text-xl self-center mb-3 p-2 rounded-3xl bg-green-500 text-white hover:bg-green-200 transition-colors"
          onClick={() => { }}
          title="Hear the word"
        >
          {/* Sound Icon */}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            setShowAnswer(true);
            onCheck("")
          }}
          className="w-full"
        >
          <input
            type="text"
            className="w-full bg-amber-100 px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={showAnswer}
            placeholder="Type the word..."
          />
          {!showAnswer && (
            <button
              type="submit"
              className="px-4 py-2 w-full bg-orange-400 text-white rounded mb-4 hover:bg-orange-500 transition-colors"
            >
              Check
            </button>
          )}
        </form>
        {showAnswer && (
          <div className="mb-4">
            {input.trim().toLowerCase() === word.word.toLowerCase() ? (
              <span className="text-green-600 font-bold">Correct!</span>
            ) : (
              <span className="text-red-600 font-bold">Incorrect. The correct word is: {word.word}</span>
            )}
          </div>
        )}
      </div>
      {isTestMode && [
        <div className="absolute flex items-center text-xl py-2 rounded-3xl px-2 top-0 z-20 bg-blue-400 right-0 text-white cursor-pointer hover:underline transition-colors"
          onClick={() => onDone()}
        >
          ×
        </div>,
        <button
          className="absolute left-1/2 -translate-x-1/2 bottom-0 text-sm text-white bg-blue-400 rounded-3xl px-3 py-2 hover:bg-blue-500 z-20 transition-colors"
          onClick={() => onDone()}
        >
          Back to card
        </button>
      ]}
    </div>
  );
}
