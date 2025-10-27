import React, { useEffect, useState } from 'react';
import { CircleProgress } from '../common/CircleProgress';

interface SubjectHeaderProps {
  emoji?: string;
  title: string;
  message: string;
  progress?: number;
  completed?: number;
  remaining?: number;
  children?: React.ReactNode;
  className?: string;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  emoji,
  title,
  message,
  progress,
  completed,
  remaining,
  children,
  className = ""
}) => {
  const [percent, setPercent] = useState(progress);

  useEffect(() => {
    setPercent(progress);
  }, [progress]);


  return (
    <section className={`backdrop-blur-sm bg-white/50 rounded-2xl p-3 shadow-xl mb-6 md:mb-0 ${className}`} aria-labelledby="subject-heading">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-6 md:gap-10">
        <div className="flex flex-1 w-ful items-center gap-4 md:gap-6 min-w-[220px]">

          {!emoji ? (
            <div className="relative h-[120px] w-[120px] ">
              <img
                src={"/stem-hub/" + title.toLowerCase().replace(/\s+/g, '-') + ".png"}
                alt={title}
                className="w-[120px] h-[120px] max-w-[120px] max-h-[120px]"
              />
            </div>
          ) : (
            <span className="text-4xl md:text-8xl">{emoji}</span>
          )}

          <div className="space-y-3 w-full">
            <div className="flex flex-row items-center gap-3">
              <h2 id="subject-heading" className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                {title}
              </h2>
            </div>
            <div className="text-gray-600 text-md mt-1 max-w-lg">
              {message}
            </div>
          </div>
        </div>
        {/* Progress Overview */}
        <div className="flex items-center lg:flex-nowrap justify-end gap-3 md:gap-4 min-w-0">

          {percent !== undefined && (
            <div className="text-center min-w-[120px] text-xl text-gray-700">
              <CircleProgress
                progress={percent}
                color={"#FFD700"} // can be a hex string or Tailwind class
                bgColor="text-gray-100"
                size={80}
                name="Overall-Progress"
              />
              <div className="mt-2 text-xs text-gray-700">Overall Progress</div>
            </div>)}

          {completed !== undefined && (
            <div className="text-center p-2 backdrop-blur-md rounded-xl min-w-[120px]">
              <div className="flex flex-col items-center justify-center text-xl font-bold text-gray-600">
                <img src="/stem-hub/lessons-completed.png" alt="Lessons Completed" className="h-10" />
                {completed}
              </div>
              <div className="text-xs text-gray-700">Lessons Completed</div>
            </div>)}

          {remaining !== undefined && (
            <div className="text-center p-2 backdrop-blur-md rounded-xl min-w-[120px]">
              <div className="flex flex-col items-center justify-center text-xl font-bold text-gray-600">
                <img src="/stem-hub/lessons-remaining.png" alt="Lessons Remaining" className="h-10" />
                {remaining}
              </div>
              <div className="text-xs text-gray-700">Lessons Remaining</div>
            </div>)}

          {/* <div className="text-center p-4 bg-white/30 backdrop-blur-md rounded-xl min-w-[120px] shadow">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-purple-600 mb-1">📚 {topics}</div>
            <div className="text-xs text-gray-700">Topics Available</div>
          </div> */}
          {children}
        </div>
      </div>
    </section>
  );
}; 