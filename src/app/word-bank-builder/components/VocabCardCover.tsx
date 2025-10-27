import React, { useState } from 'react';
import { VocabWord } from '../page';
import { AiOutlineAim } from "react-icons/ai";
import { getLessonColor } from '@/utils/helper';

interface VocabCardProps {
  title: string
  word?: string
  lesson?: number 
}

export function VocabCardCover({ title , word="" , lesson}: VocabCardProps) {
  const [pron, setPron] = useState<'us' | 'uk' | 'aus'>('uk');
  const [flipped, setFlipped] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const images = ['/stem-hub/eng/aware.png', '/stem-hub/eng/analyze.png', '/stem-hub/eng/accustom.png', '/stem-hub/eng/art.png', '/stem-hub/eng/artistic.png', '/stem-hub/eng/assign.png', '/stem-hub/eng/benefit.png', '/stem-hub/eng/brave.png', '/stem-hub/eng/brief.png', '/stem-hub/eng/capable.png', '/stem-hub/eng/complete.png', '/stem-hub/eng/confident.png','/stem-hub/eng/dinosaurs.png',"/stem-hub/eng/healthy.png"];
  const imgSrc = `/stem-hub/eng/${word?.toLowerCase()}.png` || images[Math.floor(Math.random() * images.length)];

  return (
    <div className={'relative w-full mx-auto h-[391px] cursor-pointer perspective group bg-white'} >
      <div className={'relative flex inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d]' + ((flipped || testMode) ? ' rotate-y-180' : '')}>
        {/* Front */}
        <div className="relative w-full h-full bg-yellow-50/90 pt-3 pl-4 pr-4 overflow-y-auto">
          <div className="flex h-full">

            <div className='flex flex-col items-center h-full gap-1/2 overflow-hidden'>
              <img alt="Word Bank Builder" className="w-[60px] h-[60px] -mb-2 max-w-[60px] max-h-[60px]" src="/stem-hub/word-bank-builder.png"></img>
              <div className="font-extrabold text-sky-800 items-center justify-end flex text-lg sm:text-2xl">
                Word Bank Builder
              </div>
              <div className={`text-white items-center justify-end flex text-lg sm:text-2xl px-4 py-1/2 rounded-lg print-color-exact ${getLessonColor(lesson)}`}>
                {title}
              </div>
              <div className='h-full flex items-center justify-center mt-2'>
                <img src={imgSrc} className="max-w-48 rounded-lg aspect-auto" draggable={false} />
                </div>
            </div>
          </div>
        </div>

        <div className='absolute top-6 left-6 text-xl flex items-center gap-1'>
          <AiOutlineAim />
        </div>

      </div>
    </div>
  );
}
