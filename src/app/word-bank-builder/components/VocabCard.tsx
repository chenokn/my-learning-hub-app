import React, { useState } from 'react';
import { VocabWord } from '../page';
import { AiOutlineAim } from "react-icons/ai";
import { getLessonColor } from '@/utils/helper';

interface VocabCardProps {
  word: VocabWord;
  onTestComplete: () => void;
  isPrint?: boolean; // Optional prop to indicate print mode
  index?: number; // Optional index for print mode
  grade?: number; // Optional grade for print mode
  lesson?: number; // Optional level for print mode
}

export function VocabCard({ word, onTestComplete, index, grade, lesson }: VocabCardProps) {
  const [pron, setPron] = useState<'us' | 'uk' | 'aus'>('uk');
  const [flipped, setFlipped] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [testCompleted, setTestCompleted] = useState<'correct' | 'incorrect' | ''>(() => {
    const stored = localStorage.getItem(`spelling-correct-${word.word}`);
    try {
      const parsed = JSON.parse(stored || '');
      if (parsed?.status === 'correct' || parsed?.status === 'incorrect') return parsed.status;
    } catch { }
    return '';
  });
  const imgSrc = `/stem-hub/eng/${word.word.toLowerCase().replace(" ","-")}.png`;

  const cyclePron = () => {
    setPron(p => {
      if (p === 'us') return 'uk';
      if (p === 'uk') return 'aus';
      return 'us';
    });
  };

  const getPronTextWithType = () => {
    let pronText = '';
    switch (pron) {
      case 'us':
        pronText = word.pronunciation.us;
        break;
      case 'uk':
      case 'aus':
        pronText = word.pronunciation.uk;
        break;
      default:
        return [];
    }
    const parts = pronText.split(', ').map(p => p.trim());
    return parts;
  };

  return (
    <div className={'relative w-full mx-auto h-[391px] cursor-pointer perspective group bg-white'} tabIndex={0} aria-label={`Flip card for ${word.word}`}>
      <div className={'relative flex inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d]' + ((flipped || testMode) ? ' rotate-y-180' : '')}>
        {/* Front border border-gray-200 rounded-lg */}
        <div className="relative w-full h-full bg-yellow-50/90 flex flex-col gap-2 pt-4 pl-4 pr-4 overflow-y-auto">
          <div className="flex">

            <div className="flex flex-col w-full">
              <div className="font-semibold text-sky-800 items-center justify-end flex text-lg sm:text-2xl">
                  {word.word}
              </div>
              <div className="flex justify-between items-center w-full">
              <div onClick={e => { e.stopPropagation(); cyclePron(); }} className="block flex-1 text-gray-500 self-end cursor-pointer m-0.5 italic font-mono text-sm">
                {getPronTextWithType().map((part, idx) => (
                  getPronTextWithType().length === 1 && (
                    word.type
                  )
                ))}
              </div>
              <div className='flex flex-col '>
                
                <div className='lowercase'>
                  {
                    getPronTextWithType().map((part, idx) => (
                      <div key={idx} className="text-base text-gray-400">
                        {part}
                      </div>
                    ))
                  }
                </div>
              </div>
              </div>
            </div>
          </div>
          <hr className='border-gray-200' />
          <div className="text-gray-700 text-lg min-h-24 drop-shadow-[1px_1px_rgba(255,251,235,1)] z-10">{word.definition}</div>

          <div className='absolute top-6 left-6 text-xl flex items-center gap-1'>
            <AiOutlineAim />
          </div>

          <div className="absolute h-48 justify-center items-center left-0 bottom-2 w-full flex">
            <img src={imgSrc} alt={word.word} className="max-h-44 max-w-44 rounded-lg aspect-auto" onError={() => setImgError(true)} draggable={false} />
          </div>
        </div>

        {/* Back border border-gray-200 rounded-lg */}
        <div className="relative w-full h-full text-gray-500 bg-yellow-50/90 flex flex-col gap-1 pt-4 pl-3 pr-6 overflow-y-auto">
          {testMode ? (
            <div>Test Mode</div>
          ) : (
            <>
              <div className="font-semibold text-gray-800 text-lg pl-2">{word.word}</div>
              <div className="flex w-40 justify-end flex-wrap gap-1 text-xs absolute right-3 bottom-1">
                <span className="text-gray-400 px-2 py-1 rounded">Tier: {word.extra.tier}</span>
                <span className="text-gray-400 px-2 py-1 rounded">ESL: {word.extra.eslLevel}</span>
              </div>
              <div className="text-gray-500">
                <table className="table-auto w-full my-2 border-collapse border border-gray-300 text-sky-800 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-1 py-1 text-left">#</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">Example Sentence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {word.examples.map((ex, i) => (
                      <tr key={i} className="cursor-pointer hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-1 py-1 align-top">{i + 1}</td>
                        <td className="border border-gray-300 px-2 py-1">{ex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {word.extra.tenses && (
                <div className="text-sm text-gray-500 -mx-3 z-10 pr-1">
                  <table className="table-auto border-collapse border-gray-100 border text-xs w-full">
                    <thead>
                      <tr>
                        <th className="border text-orange-400 border-gray-300 px-2 py-1 font-normal">Past</th>
                        <th className="border text-green-500 border-gray-300 px-2 py-1 font-normal">Present</th>
                        <th className="border text-blue-500 border-gray-300 px-2 py-1 font-normal">Participle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 py-1 text-center">
                          {Array.isArray(word.extra.tenses) ? word.extra.tenses[1] : word.extra.tenses.past}
                        </td>
                        <td className="border border-gray-300 py-1 text-center">
                          {Array.isArray(word.extra.tenses) ? word.extra.tenses[0] : word.extra.tenses.present}
                        </td>
                        <td className="border border-gray-300 py-1 text-center">
                          {Array.isArray(word.extra.tenses) ? word.extra.tenses[2] : word.extra.tenses.participle}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="text-sm"><span className="font-semibold text-green-500 text-xs">Synonyms:</span> {word.extra.synonyms.join(', ') || '-'}</div>
              {word.extra.antonyms.join(', ') && <div className="text-sm"><span className="font-semibold text-orange-400 text-xs">Antonyms:</span> {word.extra.antonyms.join(', ') || '-'}</div>}
              <div className="text-sm flex"><span className="font-semibold mr-1 text-blue-400 flex items-center">Tip: </span>{word.extra.memory_tip}</div>

            </>
          )}
        </div>
        <div
          className={`absolute left-1/2 -ml-3 mt-4 rounded-full flex justify-center items-center text-white font-bold w-6 h-6 print-color-exact ${getLessonColor(lesson)}`}
        >
          {grade} 
        </div>
        <div
          className={`absolute left-1/2 -ml-1 rounded-sm w-2 top-11 print-color-exact bg-stone-100`}
          style={{ height: `${21 * 16.4}px` }}
        >
        </div>
        <div
          className={`absolute left-1/2 -ml-0.5 rounded-sm w-1 top-11 print-color-exact ${getLessonColor(lesson)}`}
          style={{ height: lesson ? `${(lesson + 1) * 16.4}px` : '16.5px' }}
        >
        </div>
      </div>
    </div>
  );
}
