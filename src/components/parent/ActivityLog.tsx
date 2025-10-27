import React from 'react';

const activities = [
  {
    id: 1,
    type: "lesson_completed",
    title: "Completed Addition Practice",
    description: "Finished lesson on basic addition with 95% accuracy",
    subject: "Mathematics",
    duration: "25 minutes",
    score: 95,
    timestamp: "2024-01-10T14:30:00Z",
    icon: "✅"
  },
  {
    id: 2,
    type: "quiz_taken",
    title: "Science Quiz - Chemistry",
    description: "Took quiz on chemical elements and reactions",
    subject: "Science",
    duration: "15 minutes",
    score: 87,
    timestamp: "2024-01-10T13:15:00Z",
    icon: "🧪"
  },
  {
    id: 3,
    type: "reading_session",
    title: "Reading Session",
    description: "Read chapter 3 of 'The Magic School Bus'",
    subject: "English",
    duration: "20 minutes",
    pages: 12,
    timestamp: "2024-01-10T11:45:00Z",
    icon: "📖"
  },
  {
    id: 4,
    type: "experiment_started",
    title: "Started Science Experiment",
    description: "Began volcano eruption experiment",
    subject: "Science",
    duration: "10 minutes",
    status: "in_progress",
    timestamp: "2024-01-10T10:20:00Z",
    icon: "🔬"
  },
  {
    id: 5,
    type: "achievement_earned",
    title: "Earned Math Master Badge",
    description: "Completed 10 math lessons successfully",
    subject: "Mathematics",
    timestamp: "2024-01-10T09:30:00Z",
    icon: "🏆"
  }
];

const getActivityColor = (type: string) => {
  switch (type) {
    case 'lesson_completed':
      return 'text-green-600 bg-green-100';
    case 'quiz_taken':
      return 'text-blue-600 bg-blue-100';
    case 'reading_session':
      return 'text-purple-600 bg-purple-100';
    case 'experiment_started':
      return 'text-orange-600 bg-orange-100';
    case 'achievement_earned':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  return `${diffInDays} days ago`;
};

export function ActivityLog() {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activity Log</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">
            Filter
          </button>
          <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${index === activities.length - 1 ? 'border-b-0' : ''
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-2xl">{activity.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                      {activity.type.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📚 {activity.subject}</span>
                    {activity.duration && <span>⏰ {activity.duration}</span>}
                    {activity.score && <span>📊 {activity.score}%</span>}
                    {activity.pages && <span>📄 {activity.pages} pages</span>}
                    <span className="ml-auto">{formatTimestamp(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {activities.length} recent activities</span>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 