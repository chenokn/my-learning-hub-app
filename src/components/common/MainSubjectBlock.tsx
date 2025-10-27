import React, { useState } from 'react';
import Link from 'next/link';
import { CircleProgress } from '@/components/common/CircleProgress';

interface MainSubjectBlockProps {
  topic: {
    id: number;
    name: string;
    icon: string;
    thumbnail?: string;
    color: string;
    progress: number;
    lessons: number;
    completed: number;
    description: string;
    topics: string[];
    href: string;
    nativeName?: string;
    difficulty?: string;
    speakers?: string;
  };
}

export const MainSubjectBlock: React.FC<MainSubjectBlockProps> = ({ topic }) => {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const showItems = 4;

  const displayedTopics = showAllTopics ? topic.topics : topic.topics.slice(0, showItems);
  const hasMore = topic.topics.length > showItems;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="p-5 flex-1 flex flex-col">

        <Link className='flex items-center gap-3 hover:opacity-90 transition-opacity hover:scale-105' href={topic.href || '#'}>
          <div className="flex items-center justify-between">

            <div className={`py-1 p-3 rounded-lg text-white text-5xl`}>
              {/* {topic.icon} */}

              {!topic.icon ? (
                <div className="relative h-[90px] w-[90px] ">
                  <img
                    src={"/stem-hub/" + topic.name.toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, "-") + ".png"}
                    alt={topic.name}
                    className="w-[90px] h-[90px] max-w-[90px] max-h-[90px]"
                  />
                </div>
              ) : (
                <span >{topic.icon}</span>
              )}

            </div>

            <h3 className="text-2xl font-semibold w-full text-gray-800">{topic.name}</h3>
            <div className="text-right">
              {topic.difficulty && (
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${topic.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {topic.difficulty}
                </span>
              )}
              {topic.speakers && (
                <div className="text-sm text-gray-600 mt-1">{topic.speakers}</div>
              )}
            </div>
          </div>

        </Link>

        {topic.nativeName && <p className="text-lg text-gray-600 mb-2">{topic.nativeName}</p>}
        <p className="text-gray-600 mb-2 text-sm font-semibold ">{topic.description}</p>


        <div className="flex flex-row gap-4">
          <div className="space-y-1 flex-1">
            {displayedTopics.map((subtopic, index) => (
              <div key={index}
                style={{
                  backgroundColor: topic.color.startsWith('#') ? topic.color + '30' : undefined,
                  backgroundImage: topic.color.startsWith('#') ? undefined : `linear-gradient(135deg, ${topic.color}, ${topic.color.replace('500', '600')})`,
                }}
                className="px-2 items-center gap-1 flex py-1 rounded-lg text-xs">
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                {subtopic}
              </div>
            ))}
            {hasMore && !showAllTopics && (
              <button
                type="button"
                className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-blue-50 focus:outline-none px-2 py-1 rounded cursor-pointer transition-colors"
                onClick={() => setShowAllTopics(true)}
              >
                +{topic.topics.length - showItems} more
              </button>
            )}
            {hasMore && showAllTopics && (
              <button
                type="button"
                className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-blue-50 focus:outline-none px-2 py-1 rounded cursor-pointer transition-colors"
                onClick={() => setShowAllTopics(false)}
              >
                Show less
              </button>
            )}
          </div>

          <div className="mb-4 flex flex-col items-center text-2xl text-gray-700">
            <CircleProgress
              progress={topic.progress}
              color={topic.color} // can be a hex string or Tailwind class
              bgColor="text-gray-100"
              size={120}
              name={topic.name}
            />
          </div>

        </div>
        <div className="flex-1" />
        <div className="flex justify-between items-center border-t border-gray-100 mt-1">
          <span className="text-sm text-gray-600">
            {topic.completed}/{topic.lessons} lessons
          </span>
          <Link href={topic.href || '#'}
            className="text-white font-medium py-2 mt-1 px-4 rounded-lg transition-colors text-center"
            style={{
              backgroundColor: topic.color.startsWith('#') ? topic.color : undefined,
              backgroundImage: topic.color.startsWith('#') ? undefined : `linear-gradient(135deg, ${topic.color}, ${topic.color.replace('500', '600')})`,
            }}
          >
            {topic.progress > 0 ? 'Continue Learning' : 'Start Learning'}

          </Link>
        </div>
      </div>
    </div >
  );
}; 