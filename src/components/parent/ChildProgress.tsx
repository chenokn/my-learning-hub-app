import React from 'react';

const subjects = [
  {
    name: "Mathematics",
    icon: "🧮",
    progress: 85,
    completed: 12,
    total: 15,
    color: "bg-red-500"
  },
  {
    name: "Science",
    icon: "⚛️",
    progress: 72,
    completed: 8,
    total: 12,
    color: "bg-green-500"
  },
  {
    name: "English",
    icon: "📝",
    progress: 90,
    completed: 15,
    total: 18,
    color: "bg-blue-500"
  },
  {
    name: "Technology",
    icon: "💻",
    progress: 65,
    completed: 6,
    total: 10,
    color: "bg-purple-500"
  }
];

const weeklyProgress = [
  { day: "Mon", hours: 2.5, lessons: 3 },
  { day: "Tue", hours: 1.8, lessons: 2 },
  { day: "Wed", hours: 3.2, lessons: 4 },
  { day: "Thu", hours: 2.1, lessons: 2 },
  { day: "Fri", hours: 2.8, lessons: 3 },
  { day: "Sat", hours: 1.5, lessons: 2 },
  { day: "Sun", hours: 0.8, lessons: 1 }
];

export function ChildProgress() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Child&apos;s Progress</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Progress */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Subject Progress</h3>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{subject.name}</h4>
                      <p className="text-sm text-gray-600">
                        {subject.completed} of {subject.total} lessons completed
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${subject.color}`}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Weekly Activity</h3>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-800 w-8">{day.day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">⏰ {day.hours}h</span>
                    <span className="text-sm text-gray-600">📚 {day.lessons} lessons</span>
                  </div>
                </div>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${(day.hours / 4) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">Total This Week</h4>
                <p className="text-sm text-gray-600">14.7 hours • 17 lessons</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">🔥</div>
                <div className="text-xs text-gray-600">Great week!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 