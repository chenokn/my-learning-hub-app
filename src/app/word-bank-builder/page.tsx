'use client';

import { BackgroundImage } from '@/components/common/BackgroundImage';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { ScrollHeader } from '@/components/common/ScrollHeader';
import { SubjectHeader } from '@/components/student/SubjectHeader';
import React, { useEffect, useState, useRef } from 'react';

import { AiFillSound, AiOutlineClose, AiOutlineRight } from 'react-icons/ai';
import { TbPencilQuestion, TbCheck, TbInputX } from "react-icons/tb";
import { MdFlip } from "react-icons/md";
import { create } from 'zustand';
import { Span } from 'next/dist/trace';
import { LuBrain } from 'react-icons/lu';
import { loadLesson } from '@/lib/loadLesson';


const lessonsByGrade: Record<number, number> = {
  0: 12,  // K
  1: 15,
  2: 15,
  3: 15,
  4: 15,
  5: 20,
  6: 20,
  7: 20,
  8: 20,
  9: 20,
  10: 20,
  11: 20,
  12: 20,
};

// TypeScript interfaces for vocabulary
interface Pronunciation {
  us: string;
  uk: string;
}

interface Extra {
  synonyms: string[];
  antonyms: string[];
  memory_tip: string;
  tier: number;
  tenses: {
    present: string;
    past: string;
    participle: string;
  };
  eslLevel: 'easy' | 'medium' | 'hard';
}

export interface VocabWord {
  word: string;
  type: string;
  definition: string;
  pronunciation: Pronunciation;
  examples: string[];
  extra: Extra;
}

// Loads a lesson by ID (for now, just loads vocabulary.json as a mock)
// loadLesson is provided from `src/lib/loadLesson.ts` to avoid exporting extra symbols from the page module

// Zustand store for vocabulary
interface VocabStore {
  words: VocabWord[];
  loading: boolean;
  setWords: (words: VocabWord[]) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

const useVocabStore = create<VocabStore>((set) => ({
  words: [],
  loading: false,
  setWords: (words) => set({ words }),
  setLoading: (loading) => set({ loading }),
  clear: () => set({ words: [] }),
}));

// Helper: spaced repetition (SM-2 lite)
function getNextInterval(grade: number, prevInterval: number) {
  // grade: 0=Again, 1=Hard, 2=Good, 3=Easy
  // prevInterval: days
  if (grade === 0) return 1; // Again: 1 day
  if (grade === 1) return Math.max(2, prevInterval); // Hard: repeat soon
  if (grade === 2) return prevInterval === 0 ? 2 : Math.round(prevInterval * 2.5); // Good: grow interval
  if (grade === 3) return prevInterval === 0 ? 4 : Math.round(prevInterval * 3.5); // Easy: grow more
  return 1;
}

// Progress persistence
const PROGRESS_KEY = 'vocab-progress';
function loadProgress(): Record<string, { nextReview: number; interval: number }> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}
function saveProgress(progress: Record<string, { nextReview: number; interval: number }>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// Helper: get today's reviewed count
function getTodayProgress(progress: Record<string, { nextReview: number; interval: number }>, words: VocabWord[]) {
  const now = Date.now();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const today = startOfDay.getTime();
  let reviewed = 0;
  words.forEach(w => {
    const p = progress[w.word];
    if (p && p.nextReview > now && p.nextReview - p.interval * 24 * 60 * 60 * 1000 >= today) {
      reviewed++;
    }
  });
  return { reviewed, total: words.length };
}

function getVoice(lang: 'en-US' | 'en-GB' | 'en-AU'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const langVoices = voices.filter(v => v.lang === lang);
  if (langVoices.length === 0) return null;

  // 1. Try to find a female voice by keyword
  let voice = langVoices.find(v => v.name.toLowerCase().includes('female'));
  if (voice) return voice;

  // 2. Try specific known female names
  if (lang === 'en-AU') {
    // 'Karen' is a common Australian voice name
    voice = langVoices.find(v => v.name.includes('Karen'));
    if (voice) return voice;
  } else if (lang === 'en-US') {
    voice = langVoices.find(v => v.name.includes("Aria") || v.name.includes("Jenny"));
    if (voice) return voice;
  }

  // 3. Fallback to Google voice for quality
  voice = langVoices.find(v => v.name.includes('Google'));
  if (voice) return voice;

  // 4. Fallback to the first available voice for the language
  return langVoices[0];
}

// Helper: speak a word using SpeechSynthesis
function speakWord(word: string, accent: 'us' | 'uk' | 'aus') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const utter = new window.SpeechSynthesisUtterance(word);
  const langMap = { us: 'en-US', uk: 'en-GB', aus: 'en-AU' } as const;
  const lang = langMap[accent];
  utter.lang = lang;
  utter.rate = 1.0;

  const voice = getVoice(lang);
  if (voice) {
    utter.voice = voice;
  }

  window.speechSynthesis.cancel(); // stop any current speech
  window.speechSynthesis.speak(utter);
}

// Helper: speak definition using SpeechSynthesis
function speakDefinition(definition: string, accent: 'us' | 'uk' | 'aus') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const utter = new window.SpeechSynthesisUtterance(definition);
  const langMap = { us: 'en-US', uk: 'en-GB', aus: 'en-AU' } as const;
  const lang = langMap[accent];
  utter.lang = lang;

  const voice = getVoice(lang);
  if (voice) {
    utter.voice = voice;
  }

  window.speechSynthesis.cancel(); // stop any current speech
  window.speechSynthesis.speak(utter);
}

// Helper: speak word and definition with pause
function speakWordAndDefinition(word: string, definition: string, accent: 'us' | 'uk' | 'aus') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  const langMap = { us: 'en-US', uk: 'en-GB', aus: 'en-AU' } as const;
  const lang = langMap[accent];
  const voice = getVoice(lang);

  // Speak the word first
  const wordUtter = new window.SpeechSynthesisUtterance(word);
  wordUtter.lang = lang;
  wordUtter.rate = 1.0;
  if (voice) {
    wordUtter.voice = voice;
  }

  // Speak definition after 500ms pause
  wordUtter.onend = () => {
    setTimeout(() => {
      const defUtter = new window.SpeechSynthesisUtterance(definition);
      defUtter.lang = lang;
      defUtter.rate = 1.0;
      if (voice) {
        defUtter.voice = voice;
      }
      window.speechSynthesis.speak(defUtter);
    }, 500);
  };

  window.speechSynthesis.cancel(); // stop any current speech
  window.speechSynthesis.speak(wordUtter);
}

// SpellingTestInline: minimal spelling test for a single word
function SpellingTestInline({ word, onCheck, onDone, isTestMode }: { word: VocabWord, onDone: () => void, onCheck: (result: 'correct' | 'incorrect' | '') => void, isTestMode: boolean }) {
  const [input, setInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [pron] = useState<'us' | 'uk' | 'aus'>('uk');
  // Compose image src path
  const imgSrc = `/stem-hub/eng/${word.word.toLowerCase()}.png`;

  // Store result in localStorage and call onDone with result when answer is shown
  useEffect(() => {
    if (showAnswer) {
      const correct = input.trim().toLowerCase() === word.word.toLowerCase();
      const key = `spelling-correct-${word.word}`;
      localStorage.setItem(
        key,
        JSON.stringify({ status: correct ? 'correct' : 'incorrect', timestamp: Date.now() })
      );
      // onDone(correct ? 'correct' : 'incorrect');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAnswer]);

  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
      <div className="relative z-10 w-full flex flex-col text-yellow-900 flex-1">
        <div className="mb-2 text-xl font-bold text-gray-500 flex items-center gap-2">
          Spell the word for:
        </div>
        <hr className='border-gray-200 w-full my-2' />
        <div className="w-full min-h-24 text-lg">{word.definition}</div>

        <div
          className="ml-1 text-xl self-center mb-3 p-2 rounded-3xl  bg-green-500 text-white hover:bg-green-200"
          onClick={() => speakWord(word.word, pron)}
          title="Hear the word"
        >
          <AiFillSound />
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
            className="w-full bg-amber-100 px-4 py-2 border rounded mb-4"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={showAnswer}
            placeholder="Type the word..."
          />
          {!showAnswer && (
            <button
              type="submit"
              className="px-4 py-2 w-full bg-orange-400 text-white rounded mb-4"
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
        <div className="absolute flex items-center text-xl py-2 rounded-3xl px-2 top-0  z-20 bg-blue-400 right-0 text-white cursor-pointer hover:underline"
          onClick={() => onDone()}
        >
          <AiOutlineClose />
        </div>,
        <button
          className="absolute left-1/2 -translate-x-1/2 bottom-0 text-sm text-white bg-blue-400 rounded-3xl px-3 py-2 hover:bg-gray-300 z-20"
          onClick={() => onDone()}
        >
          Back to card
        </button>
      ]}


      {/* <button
        className="text-sm text-white bg-blue-400 rounded-3xl py-1 px-2 hover:bg-gray-300 z-20"
        onClick={() => onDone('')}
      >
        Back
      </button> */}
      {/* <button
        className="absolute top-1 right-1 text-gray-400 hover:text-gray-700 text-xl z-20"
        onClick={() => onDone('')}
        aria-label="Close test"
      >
        ×
      </button> */}
    </div>
  );
}

// Card component for a single word
function VocabCard({ word, onTestComplete }: { word: VocabWord, onTestComplete: () => void }) {
  const [pron, setPron] = useState<'us' | 'uk' | 'aus'>('uk');
  const [flipped, setFlipped] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  // Initialize testCompleted from localStorage for this word
  const [testCompleted, setTestCompleted] = useState<'correct' | 'incorrect' | ''>(() => {
    const stored = localStorage.getItem(`spelling-correct-${word.word}`);
    try {
      const parsed = JSON.parse(stored || '');
      if (parsed?.status === 'correct' || parsed?.status === 'incorrect') return parsed.status;
    } catch { }
    return '';
  });

  useEffect(() => {
    if (cardInnerRef.current) {
      cardInnerRef.current.focus();
    }
  }, []);

  // Compose image src path
  const imgSrc = `/stem-hub/eng/${word.word.toLowerCase().replace(" ", "-")}.png`;
  const fallbackImg = `https://source.unsplash.com/featured/?${encodeURIComponent(word.word)}`;

  const cyclePron = () => {
    setPron(p => {
      if (p === 'us') return 'uk';
      if (p === 'uk') return 'aus';
      return 'us';
    });
  };

  const getPronText = () => {
    switch (pron) {
      case 'us':
        return `${word.pronunciation.us}`;
      case 'uk':
        return `${word.pronunciation.uk}`;
      case 'aus':
        return `${word.pronunciation.uk}`;
      default:
        return '';
    }
  };

  // Helper: get pronunciation text with word type if only one part
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
    <div
      className={
        'relative w-full max-w-xs sm:max-w-xs md:max-w-xs mx-auto h-96 cursor-pointer perspective group'
      }
      aria-label={`Flip card for ${word.word}`}
    >
      {/* Card inner */}
      <div
        className={
          'inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d] z-20' +
          ((flipped || testMode) ? ' rotate-y-180' : '')
        }
        tabIndex={0}
        onKeyDown={e => {
          console.log('Key down:', e.key);
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            setFlipped(f => !f);
            setTestMode(false);

            e.stopPropagation(); speakWordAndDefinition(word.word, word.definition, pron);

            e.stopPropagation();
            navigator.clipboard.writeText(`Create a image of 2D Pixar-style with more colourful simple icon to shows ${word.word}: ${word.definition} Use a simple, beautiful, colourful, and cartoon style with soft shading.`);
          }
        }}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-yellow-50/90 border border-gray-200 rounded-lg shadow-lg flex flex-col gap-2 pt-4 pl-4 pr-4 overflow-y-auto [backface-visibility:hidden]">
          <div className="flex">
            <div className="flex flex-col w-full">
              <div className="font-semibold text-sky-800 items-center flex text-lg sm:text-2xl"
                onClick={e => {
                  e.stopPropagation(); speakWordAndDefinition(word.word, word.definition, pron);

                  e.stopPropagation();
                  navigator.clipboard.writeText(`Create a image of 2D Pixar-style with more colourful simple icon to shows ${word.word}: ${word.definition} Use a simple, beautiful, colourful, and cartoon style with soft shading.`);
                }}>
                {word.word}
                <div
                  className="ml-1 px-1 hover:bg-green-200"
                  title="Read definition">
                  <AiFillSound />
                </div>
              </div>

              <div onClick={e => { e.stopPropagation(); cyclePron(); }} className="block text-gray-500 cursor-pointer m-0.5 italic font-mono text-sm">
                {getPronTextWithType().map((part, idx) => (
                  <div className='w-max max-w-[260px] break-all lowercase' key={idx}>{part}

                    {getPronTextWithType().length === 1 && (
                      <span>
                        &nbsp;({word.type})
                      </span>
                    )}

                  </div>
                ))}
              </div>
            </div>

          </div>
          <hr className='border-gray-200' />
          <div className="text-gray-700 text-lg min-h-24 drop-shadow-[1px_1px_rgba(255,251,235,1)] z-10" onClick={e => { e.stopPropagation(); speakWordAndDefinition(word.definition, "", pron); }}
          >{word.definition}</div>

          <div className="absolute left-0 h-48 items-center bottom-2 w-full flex-1 flex justify-center">
            <img
              src={imgError ? fallbackImg : imgSrc}
              alt={word.word}
              className="max-h-48 max-w-48 rounded-lg aspect-auto"
              onError={() => setImgError(true)}
              draggable={false}
            />
          </div>
          <div className="absolute flex items-center py-2 rounded-3xl px-2 top-3 bg-blue-400 right-3 text-xl text-white cursor-pointer hover:underline" onClick={e => { e.stopPropagation(); setFlipped(f => !f); setTestMode(false); }}>
            {/* <AiOutlineRight /> */}

            <MdFlip />
          </div>
          <div
            className={`absolute bottom-4 left-3 text-xl text-white rounded-full py-2 px-2 cursor-pointer hover:underline ${testCompleted === 'correct'
              ? 'bg-emerald-500'
              : testCompleted === 'incorrect'
                ? 'bg-red-500'
                : 'bg-blue-400'
              }`}
            onClick={e => {
              e.stopPropagation();
              setTestMode(true);
              setFlipped(false);
              setTimeout(() => {
                const input = document.querySelector<HTMLInputElement>('input[type="text"]');
                input?.focus();
              }, 0);
            }}
          >
            {testCompleted === 'correct'
              ? <TbCheck />
              : testCompleted === 'incorrect'
                ? <TbInputX />
                : <TbPencilQuestion />}
          </div>
        </div>
        {/* Back border border-gray-200 rounded-lg */}
        <div className="relative w-full h-full text-gray-500 bg-yellow-50/90  shadow-md flex flex-col gap-1 p-4 overflow-y-auto [backface-visibility:hidden] rotate-y-180 z-20">
          {testMode ? (

            <SpellingTestInline
              word={word}
              onDone={() => {
                setTestMode(false);
              }}
              onCheck={(result: 'correct' | 'incorrect' | '') => {
                setTestCompleted(result);
                onTestComplete();
              }}
              isTestMode={true}
            />
          ) : (
            <>
              <div className="font-semibold text-gray-800 text-lg sm:text-xl"
                onClick={e => {
                  e.stopPropagation(); speakWordAndDefinition(word.word, word.definition, pron);

                  e.stopPropagation();
                  navigator.clipboard.writeText(`Create a image of 2D Pixar-style with more colourful simple icon to shows ${word.word}: ${word.definition} Use a simple, beautiful, colourful, and cartoon style with soft shading.`);
                }}
              >{word.word}</div>
              <div className="flex w-40 justify-end flex-wrap gap-2 text-xs absolute right-1 bottom-1">
                <span className="bg-green-100/50 px-2 py-1 rounded">Tier: {word.extra.tier}</span>
                <span className="bg-blue-100/50 px-2 py-1 rounded">ESL: {word.extra.eslLevel}</span>
              </div>

              <div className="text-gray-500">
                {/* <span className='text-sm font-semibold'>Examples:</span> */}
                <table className="table-auto w-full my-2 border-collapse border border-gray-300 text-sky-800 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-1 py-1 text-left">#</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">Example Sentence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {word.examples.map((ex, i) => (
                      <tr
                        key={i}
                        onClick={e => {
                          e.stopPropagation();
                          speakDefinition(ex, pron);
                          navigator.clipboard.writeText(`Create a image of 2D Pixar-style with more colourful simple icon to shows ${word.word}: ${ex} Use a simple, beautiful, colourful, and cartoon style with soft shading.`);
                        }}
                        className="cursor-pointer hover:bg-blue-50 transition-colors"
                      >
                        <td className="border border-gray-300 px-1 py-1 align-top">{i + 1}</td>
                        <td className="border border-gray-300 px-2 py-1">{ex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>



              {word.extra.tenses && (
                <div className="text-sm -mx-4 text-gray-500">
                  <table className="table-auto border-collapse border-gray-100  border text-xs w-full">
                    <thead>
                      <tr>
                        <th className="border text-orange-400 border-gray-300 px-1 py-1 font-normal">Past</th>
                        <th className="border text-green-500 border-gray-300 px-1 py-1 font-normal">Present</th>
                        <th className="border text-blue-500 border-gray-300 px-1 py-1 font-normal">Participle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-1 py-1 text-center">
                          {Array.isArray(word.extra.tenses) ? word.extra.tenses[1] : word.extra.tenses.past}
                        </td>
                        <td className="border border-gray-300 px-1 py-1 text-center">
                          {Array.isArray(word.extra.tenses) ? word.extra.tenses[0] : word.extra.tenses.present}
                        </td>
                        <td className="border border-gray-300 px-1 py-1 text-center">
                          {Array.isArray(word.extra.tenses) ? word.extra.tenses[2] : word.extra.tenses.participle}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="text-xs"
                onClick={e => {
                  e.stopPropagation();
                  speakDefinition('Synonyms: ' +word.extra.synonyms.join(', '), pron);
                }}
              >
                <span className="font-semibold text-green-500">Synonyms:
                </span> { word.extra.synonyms.join(', ') || '-'}
              </div>
              {word.extra.antonyms.join(', ') &&
                <div className="text-xs"
                  onClick={e => {
                    e.stopPropagation();
                    speakDefinition('Antonyms: ' + word.extra.antonyms.join(', '), pron);
                  }}>
                  <span className="font-semibold text-orange-400">Antonyms:
                  </span> { word.extra.antonyms.join(', ') || '-'}</div>}

                <div className="text-xs flex" onClick={e => {
                  e.stopPropagation();
                  let tipsString = "";
                    // Support multiple tips separated by semicolons
                    const tips = word.extra.memory_tip.split(';').map(t => t.trim()).filter(Boolean);
                    tips.forEach(tipStr => {
                      const tipParts = tipStr.split('=');
                      if (tipParts.length === 2) {
                        tipsString = tipsString + ('Think of ' + tipParts[0].trim() + ' as ' + tipParts[1].trim() + '. ');
                      }
                    });
                  
                  speakDefinition(tipsString, pron);
                  }}>
                  <span className="font-semibold mr-1 text-blue-400 flex items-center">
                    <LuBrain /> Tip: </span>{word.extra.memory_tip}
                </div>

              {/* <button
                className="absolute left-1/2 -translate-x-1/2 bottom-4 text-sm text-white bg-blue-400 rounded-3xl py-1 px-3 hover:bg-gray-300 z-20"
                onClick={e => { e.stopPropagation(); setFlipped(f => !f); }}
              >
                Flip
              </button> */}

              <div className="absolute flex items-center py-2 rounded-3xl px-2 top-4 bg-blue-400 right-3 text-xl text-white cursor-pointer hover:underline"
                onClick={e => { e.stopPropagation(); setFlipped(f => !f); }}
              >

                <MdFlip />
                {/* <AiOutlineClose /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


const getProgressColor = (percent: number) => {
  if (percent < 40) return 'bg-red-400';
  if (percent < 80) return 'bg-yellow-400';
  return 'bg-green-500';
};

const SETTINGS_KEY = 'vocab-settings';
function loadSettings() {
  if (typeof window === 'undefined') return { autoplay: false, grade: 3, lesson: 1 };
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{"autoplay":false,"grade":3,"lesson":1}');
  } catch {
    return { autoplay: false, grade: 3, lesson: 1 };
  }
}
function saveSettings(settings: { autoplay: boolean; grade: number; lesson: number }) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

const grades = [0, 1, 2, 3, 4, 5, 6];
const lessons = Array.from({ length: 20 }, (_, i) => i + 1);

const WordBankPage = () => {
  const { words, loading, setWords, setLoading } = useVocabStore();
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState('');
  const [esl, setEsl] = useState('');
  const [pos, setPos] = useState('');
  // Global test mode toggle
  const [globalTestMode, setGlobalTestMode] = useState(false);
  // Flashcard mode state
  const [flashMode, setFlashMode] = useState(false);
  const [progress, setProgress] = useState(loadProgress());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(loadSettings());

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    async function fetchLesson() {


      // Check if grade and lesson are valid
      if (!Number.isInteger(settings.grade) || settings.grade < 0 || settings.grade > 6) {
        alert('Invalid grade selected.');
        return;
      }
      const maxLesson = lessonsByGrade[settings.grade] || 20;
      if (!Number.isInteger(settings.lesson) || settings.lesson < 1 || settings.lesson > maxLesson) {
        setSettings((s: typeof settings) => ({ ...s, lesson: maxLesson }));
        // alert(`Invalid lesson selected for grade ${settings.grade}.`);
        return;
      }


      setLoading(true);
      // Try /data/grade{grade}_lesson{lesson}.json, fallback to /data/lesson{lesson}.json
      let path = `/data/grade${settings.grade}_lesson${settings.lesson}.json`;
      let res = await fetch(path);
      if (!res.ok) {
        path = `/data/lesson${settings.lesson}.json`;
        res = await fetch(path);
      }
      let data: VocabWord[] = [];
      if (res.ok) {
        data = await res.json();
      } else {
        alert('Could not load lesson data. Please try again later.1');
      }
      setWords(data);
      setLoading(false);
    }
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.grade, settings.lesson]);

  // When flashMode starts, compute due words
  useEffect(() => {
    if (flashMode) {
      const now = Date.now();
      const due = words.filter(w => {
        const p = progress[w.word];
        return !p || p.nextReview <= now;
      });
    }
  }, [flashMode, words, progress]);

  // Filter logic
  const filtered = words.filter(w => {
    const matchesSearch =
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.definition.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tier ? String(w.extra.tier) === tier : true;
    const matchesEsl = esl ? w.extra.eslLevel === esl : true;
    const matchesPos = pos ? w.type === pos : true;
    return matchesSearch && matchesTier && matchesEsl && matchesPos;
  });

  // Progress bar calculation
  function getCorrectProgress(words: VocabWord[]) {
    let correctCount = 0;
    words.forEach(w => {
      const key = `spelling-correct-${w.word}`;
      const stored = localStorage.getItem(key);
      try {
        const parsed = JSON.parse(stored || '');
        if (parsed?.status === 'correct') correctCount++;
      } catch { }
    });
    return { correct: correctCount, total: words.length };
  }
  const [percent, setPercent] = useState(0);

  // Shared updateProgress function
  function updateProgress() {
    const { correct, total } = getCorrectProgress(words);
    const updated = total > 0 ? Math.round((correct / total) * 100) : 0;
    setPercent(updated);
  }

  useEffect(() => {
    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  // Keyboard navigation for lesson switching (left/right arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const maxLesson = lessonsByGrade[settings.grade] || 20;
        const newLesson = Math.min(maxLesson, settings.lesson + 1);
        handleLessonChange({ target: { value: newLesson.toString() } } as React.ChangeEvent<HTMLSelectElement>);
      } else if (e.key === 'ArrowLeft') {
        const newLesson = Math.max(1, settings.lesson - 1);
        handleLessonChange({ target: { value: newLesson.toString() } } as React.ChangeEvent<HTMLSelectElement>);
      } else if (e.key === 'ArrowUp') {
        const newGrade = Math.min(6, settings.grade + 1);
        handleGradeChange({ target: { value: newGrade.toString() } } as React.ChangeEvent<HTMLSelectElement>);
      } else if (e.key === 'ArrowDown') {
        const newGrade = Math.max(0, settings.grade - 1);
        handleGradeChange({ target: { value: newGrade.toString() } } as React.ChangeEvent<HTMLSelectElement>);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.grade, settings.lesson]);


  // Update settings for grade/lesson
  function handleGradeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const grade = Number(e.target.value);
    const newSettings = { ...settings, grade };
    setSettings(newSettings);
    saveSettings(newSettings);
  }
  function handleLessonChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lesson = Number(e.target.value);
    const newSettings = { ...settings, lesson };
    setSettings(newSettings);
    saveSettings(newSettings);
  }

  // Settings Modal (responsive)
  const SettingsModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2"
      onClick={() => setSettingsOpen(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md relative overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={() => setSettingsOpen(false)}
          aria-label="Close settings"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="mb-4 flex gap-2">
          <div>
            <label className="block text-xs font-semibold mb-1">Grade</label>
            <select
              className="border rounded px-2 py-1 w-20"
              value={settings.grade}
              onChange={handleGradeChange}
            >
              {grades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Lesson</label>
            <select
              className="border rounded px-2 py-1 w-24"
              value={settings.lesson}
              onChange={handleLessonChange}
            >
              {lessons.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BackgroundImage bgIndex={28} autoRotate={false}>

      <div className="min-h-screen flex flex-col items-center">
        <ScrollHeader />

        {/* Main Content */}
        <main className="flex-1 w-full pt-16 max-w-7xl min-h-screen transition-colors">

          <div className="max-w-7xl  px-4 py-8">
            {/* Header */}
            <Breadcrumb />
            <SubjectHeader
              className="hidden lg:block"
              title="Word Bank Builder"
              message={`Grade ${settings.grade}, Lesson ${settings.lesson} — Build your vocabulary with interactive cards, audio, and spaced repetition practice!`}
              progress={percent}
            // completed={0}
            // remaining={0}
            // topics={englishTopics.length}
            >

              <div className='flex flex-col items-center mt-auto gap-4 text-xs text-gray-700'>
                <button
                  onClick={() => setGlobalTestMode(prev => !prev)}
                  className={`text-2xl py-4 px-4 rounded-full shadow  font-bold ${globalTestMode ? 'bg-red-400 text-white' : 'bg-green-500 text-white'
                    }`}
                >
                  <TbPencilQuestion />
                </button>
                {globalTestMode ? 'Test Mode' : 'Test Mode'}
              </div>
              <div className="flex items-center">
                <div className="ml-2 flex flex-col gap-1 items-center">
                  <button
                    className="px-2 py-0.5 bg-green-400 text-white rounded hover:bg-green-500 text-sm"
                    onClick={() => {
                      const maxLesson = lessonsByGrade[settings.grade] || 20;
                      const newLesson = Math.min(maxLesson, settings.lesson + 1);
                      handleLessonChange({ target: { value: newLesson.toString() } } as React.ChangeEvent<HTMLSelectElement>);
                    }}
                  >
                    ▲
                  </button>

                  <select
                    className="mt-1 mb-1 bg-white/60 text-sm rounded px-1 py-1 text-gray-700"
                    value={settings.grade}
                    onChange={handleGradeChange}
                  >
                    {grades.map(g => (
                      <option key={g} value={g}>{g === 0 ? 'K' : `G${g}`}</option>
                    ))}
                  </select>

                  <button
                    className="px-2 py-0.5 bg-green-400 text-white rounded hover:bg-green-500 text-sm"
                    onClick={() => {
                      const newLesson = Math.max(1, settings.lesson - 1);
                      handleLessonChange({ target: { value: newLesson.toString() } } as React.ChangeEvent<HTMLSelectElement>);
                    }}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </SubjectHeader>

            {/* Print Button */}
            <div className="flex justify-end mb-4">
              {/* <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 print:hidden"
              >
                Print Cards
              </button> */}
            </div>
            {loading ? (
              <div className="mt-8 text-center text-gray-500">Loading words...</div>
            ) : filtered.length === 0 ? (
              <div className="mt-8 text-center text-gray-400">No words found.</div>
            ) : (
              <div className="print:grid print:grid-cols-3 print:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-4 mt-8 overflow-x-auto print:grid-cols-3 print-area">
                  {filtered.map((w) =>
                    globalTestMode ? (
                      <div key={w.word} className="border border-yellow-300 rounded-xl h-96 bg-white/80 p-4 shadow-md">

                        <SpellingTestInline word={w} onDone={() => { }} isTestMode={false} onCheck={(result) => { }} />
                      </div>
                    ) : (
                      <VocabCard key={w.word} word={w} onTestComplete={updateProgress} />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {settingsOpen && (<SettingsModal />)}
      {/* Print styles */}
      {/* <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print-area .grid > * {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          @page {
            size: A4;
            margin: 10mm;
          }
        }
      `}</style> */}
    </BackgroundImage>
  );
};

export default WordBankPage; 