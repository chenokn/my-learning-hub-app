import React, { useState } from 'react';
import Link from 'next/link';
import { LearningLink } from '@/types';

interface TopicBlockProps {
  topic: LearningLink;
}

export const TopicBlock: React.FC<TopicBlockProps> = ({ topic }) => {
  const [showAllTopics, setShowAllTopics] = useState(false);

  const displayedTopics = showAllTopics ? topic.topics : topic.topics.slice(0, 3);
  const hasMore = topic.topics.length > 3;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`${topic.color} p-3 rounded-lg text-white text-2xl`}>
            {topic.icon}
          </div>
          <span className="text-sm font-medium text-gray-600">
            {topic.completed}/{topic.lessons} lessons
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h3>
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
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {displayedTopics.map((subtopic: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {subtopic}
            </span>
          ))}
          {hasMore && !showAllTopics && (
            <button
              type="button"
              className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-blue-50 focus:outline-none px-2 py-1 rounded cursor-pointer transition-colors"
              onClick={() => setShowAllTopics(true)}
            >
              +{topic.topics.length - 3} more
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
        <Link href={topic.href || '#'} passHref legacyBehavior>
          <a className="w-full block px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-center">
            {topic.progress > 0 ? 'Continue Learning' : 'Start Learning'}
          </a>
        </Link>
      </div>
    </div>
  );
}; 