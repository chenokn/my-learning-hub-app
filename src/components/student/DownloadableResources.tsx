import React from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';

const resources = [
  { name: 'Math Study Guide', type: 'PDF', size: '2.3 MB', icon: '📚' },
  { name: 'Science Worksheets', type: 'PDF', size: '1.8 MB', icon: '🧪' },
  { name: 'Grammar Practice', type: 'PDF', size: '1.5 MB', icon: '📝' },
  { name: 'Coding Templates', type: 'ZIP', size: '4.2 MB', icon: '💻' },
  { name: 'Video Tutorials', type: 'MP4', size: '15.7 MB', icon: '🎥' },
  { name: 'Interactive Games', type: 'HTML', size: '3.1 MB', icon: '🎮' },
];

export function DownloadableResources() {
  return (
    <section className="backdrop-blur-sm bg-white/20 rounded-2xl p-6 shadow-xl" aria-labelledby="resources-heading">
      <h2 id="resources-heading" className="text-xl font-bold mb-4 flex items-center gap-2">
        <AiOutlineCloudDownload className="w-8 h-8" />
        Downloadable Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center gap-3 p-4 bg-white/70 rounded-lg hover:text-blue-600 text-blue-900 hover:bg-white transition-all duration-200 hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Download ${resource.name} (${resource.type}, ${resource.size})`}
          >
            <img src={`/stem-hub/icons/${resource?.type?.toLowerCase()}.png`} alt={resource.subject} className="h-auto max-h-11 max-w-10" />

            <div className="flex-1">
              <div className="font-medium">{resource.name}</div>
              <div className="text-sm text-gray-600">{resource.type} • {resource.size}</div>
            </div>
            <AiOutlineCloudDownload className="w-8 h-8" />
          </a>
        ))}
      </div>
    </section>
  );
} 