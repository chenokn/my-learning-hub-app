import React from 'react';
import { CircleProgress } from '../common/CircleProgress';
import { AiOutlineHistory } from 'react-icons/ai'

const recentActivities = [
  {
    id: 1,
    title: "Completed Math Quiz",
    subject: "Mathematics",
    time: "2 hours ago",
    type: "practice"
  },
  {
    id: 2,
    title: "Started Science Lab",
    subject: "Science",
    time: "1 day ago",
    type: "microscope"
  },
  {
    id: 3,
    title: "Earned Achievement",
    subject: "General",
    time: "2 days ago",
    type: "gold-trophy"
  },
  {
    id: 4,
    title: "Completed Assignment",
    subject: "English",
    time: "3 days ago",
    type: "assignments"
  },
  {
    name: "Addition Practice",
    progress: 95,
    status: "completed",
    type: "practice",
    subject: "Mathematics",
    timeAgo: "2 hours ago"
  },
  {
    name: "Subtraction Quiz",
    progress: 60,
    status: "in-progress",
    type: "quiz",
    subject: "Mathematics",
    timeAgo: "1 day ago"
  },
  {
    name: "Geometry Challenge",
    progress: 30,
    status: "new",
    type: "challenge",
    subject: "Mathematics",
    timeAgo: "3 days ago"
  },
  {
    name: "Science Experiment",
    progress: 0,
    status: "locked",
    type: "experiment",
    subject: "Science",
    timeAgo: "1 week ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-700 bg-green-200 border border-green-300';
    case 'in-progress':
      return 'text-blue-700 bg-blue-200 border border-blue-300';
    case 'new':
      return 'text-orange-700 bg-orange-200 border border-orange-300';
    case 'locked':
      return 'text-gray-700 bg-gray-200 border border-gray-300';
    default:
      return 'text-gray-700 bg-gray-200 border border-gray-300';
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'text-green-500';
  if (progress >= 60) return 'text-blue-500';
  if (progress >= 40) return 'text-yellow-500';
  return 'text-red-500';
};

export function RecentActivities() {
  return (
    <section className="backdrop-blur-sm bg-white/20 rounded-2xl p-6 shadow-xl" aria-labelledby="resources-heading">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><AiOutlineHistory className="w-8 h-8" /> Recent Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentActivities.map((activity, index) => {
          // Check if it's the new format (with id and title)
          const isNewFormat = 'id' in activity && 'title' in activity;

          if (isNewFormat) {
            // Render new format activities
            return (
              <div
                key={"recent-activity-" + activity.id}
                className="bg-white/70 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img src={`/stem-hub/icons/${activity?.type?.toLowerCase()}.png`} alt={activity.subject} className="h-auto max-h-11 max-w-10" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                    <p className="text-gray-600">{activity.subject} • {activity.time}</p>
                  </div>
                </div>
              </div>
            );
          } else {
            // Render existing format activities (with progress and status)
            return (
              <div
                key={`progress-${index}`}
                className="bg-white/70 p-4 pr-7 rounded-xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <img src={`/stem-hub/icons/${activity?.type?.toLowerCase()}.png`} alt={activity.subject} className="h-auto max-h-11 max-w-10" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{activity.name}</h3>
                        <p className="text-gray-600">{activity.subject} • {activity.timeAgo}</p>
                      </div>
                    </div>
                    {activity.status !== 'locked' && (
                      <button className="text-blue-600 w-fit hover:text-blue-800 text-sm font-medium">
                        Continue
                      </button>
                    )}

                  </div>
                  <div className='flex flex-col gap-1'>
                    <CircleProgress
                      progress={activity.progress}
                      color={getProgressColor(activity.progress)} // can be a hex string or Tailwind class
                      strokeWidth={7}
                      // bgColor={getProgressColor(activity.progress)}
                      size={75}
                      name={activity.name}
                    />

                    <span className={`absolute -top-3.5 -right-[39px] justify-items-center px-2 py-2 w-28 rotate-38 h-12 text-xs font-bold text-center ${getStatusColor(activity.status || 'locked')}`}>
                      <div className='w-17 text-center absolute bottom-0.5 uppercase text-[10px]'>
                        {(activity.status || 'locked').replace('-', ' ')}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </section >
  );
} 