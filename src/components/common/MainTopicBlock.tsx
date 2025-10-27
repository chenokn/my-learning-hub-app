import React, { useState } from 'react';
import Link from 'next/link';

interface MainTopicBlockProps {
  topic: {
    id: number;
    name: string;
    icon: string;
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

export const MainTopicBlock: React.FC<MainTopicBlockProps> = ({ topic }) => {
  const [showAllTopics, setShowAllTopics] = useState(false);

  const displayedTopics = showAllTopics ? topic.topics : topic.topics.slice(0, 5);
  const hasMore = topic.topics.length > 5;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg text-white text-2xl`}>
            {topic.icon}
          </div>
          <h3 className="text-xl font-semibold w-full text-gray-800">{topic.name}</h3>
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

        {topic.nativeName && <p className="text-lg text-gray-600 mb-2">{topic.nativeName}</p>}
        <p className="text-gray-600 mb-4">{topic.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{topic.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${topic.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${topic.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {displayedTopics.map((subtopic, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              {subtopic}
            </div>
          ))}
          {hasMore && !showAllTopics && (
            <button
              type="button"
              className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-blue-50 focus:outline-none px-2 py-1 rounded cursor-pointer transition-colors"
              onClick={() => setShowAllTopics(true)}
            >
              +{topic.topics.length - 5} more
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
        <div className="flex-1" />
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
          <span className="text-sm text-gray-600">
            {topic.completed}/{topic.lessons} lessons
          </span>
          <Link href={topic.href || '#'} passHref legacyBehavior>
            <a className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center">
              {topic.progress > 0 ? 'Continue Learning' : 'Start Learning'}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}; 