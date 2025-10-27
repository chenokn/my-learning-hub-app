import React from 'react';

const dashboardStats = [
  {
    title: "Total Study Time",
    value: "12.5 hours",
    change: "+2.3 hours",
    changeType: "positive",
    icon: "⏰",
    color: "bg-blue-500"
  },
  {
    title: "Completed Lessons",
    value: "24",
    change: "+3 this week",
    changeType: "positive",
    icon: "📚",
    color: "bg-green-500"
  },
  {
    title: "Average Score",
    value: "87%",
    change: "+5%",
    changeType: "positive",
    icon: "📊",
    color: "bg-purple-500"
  },
  {
    title: "Streak Days",
    value: "7 days",
    change: "🔥",
    changeType: "neutral",
    icon: "🔥",
    color: "bg-orange-500"
  }
];

const recentAchievements = [
  { name: "Math Master", description: "Completed 10 math lessons", icon: "🏆", date: "2 hours ago" },
  { name: "Science Explorer", description: "Finished chemistry module", icon: "🔬", date: "1 day ago" },
  { name: "Reading Champion", description: "Read 5 books this week", icon: "📖", date: "3 days ago" }
];

export function ParentDashboard() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-2xl shadow-black">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-700' :
                stat.changeType === 'negative' ? 'text-red-700' : 'text-gray-700'
                }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-700">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Achievements</h3>
        <div className="space-y-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">{achievement.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                <p className="text-sm text-gray-700">{achievement.description}</p>
              </div>
              <span className="text-xs text-gray-600">{achievement.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 