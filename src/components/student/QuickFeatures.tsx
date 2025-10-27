import React from 'react';
import Link from 'next/link';

const quickFeatures = [
  {
    name: "Daily Challenge",
    icon: "🎯",
    href: "/student/daily-challenge",
    color: "bg-gradient-to-r from-fuchsia-300 to-fuchsia-400"
  },

  {
    name: "Progress Tracker",
    icon: "📊",
    href: "/student/progress",
    color: "bg-gradient-to-r from-sky-300 to-sky-400"
  },
  {
    name: "Assignments",
    icon: "📝",
    href: "/student/assignments",
    color: "bg-gradient-to-r from-lime-300 to-lime-400"
  },
  {
    name: "Achievements",
    icon: "🏆",
    href: "/student/achievements",
    color: "bg-gradient-to-r from-yellow-300 to-yellow-400"
  },
];

export function QuickFeatures() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-2xl shadow-black">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickFeatures.map((feature) => (
          <Link
            key={feature.name}
            href={feature.href}
            className={`${feature.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center text-white font-semibold`}
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <div className="text-sm">{feature.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
} 