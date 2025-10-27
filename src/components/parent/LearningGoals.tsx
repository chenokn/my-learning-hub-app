import React from 'react';

const learningGoals = [
  {
    id: 1,
    title: "Complete Math Module",
    description: "Finish all 15 lessons in the mathematics module",
    target: 15,
    completed: 12,
    deadline: "2024-01-15",
    priority: "high",
    icon: "🧮"
  },
  {
    id: 2,
    title: "Read 10 Books",
    description: "Complete reading 10 books this month",
    target: 10,
    completed: 7,
    deadline: "2024-01-31",
    priority: "medium",
    icon: "📚"
  },
  {
    id: 3,
    title: "Science Experiments",
    description: "Complete 5 hands-on science experiments",
    target: 5,
    completed: 3,
    deadline: "2024-01-20",
    priority: "low",
    icon: "🔬"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getDaysRemaining = (deadline: string) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function LearningGoals() {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Learning Goals</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningGoals.map((goal) => {
          const progress = (goal.completed / goal.target) * 100;
          const daysRemaining = getDaysRemaining(goal.deadline);

          return (
            <div
              key={goal.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                  {goal.priority}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{goal.completed} / {goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${daysRemaining < 0 ? 'text-red-600' :
                    daysRemaining <= 3 ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                  {daysRemaining < 0 ? 'Overdue' :
                    daysRemaining === 0 ? 'Due today' :
                      `${daysRemaining} days left`}
                </span>
                <span className="text-gray-500">
                  {Math.round(progress)}% complete
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm">
                  Update Progress
                </button>
                <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 