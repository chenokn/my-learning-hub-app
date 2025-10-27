
export function getLessonColor(lesson?: number | string) {
  // 20 visually distinct Tailwind colors
  const colors = [
    "bg-stone-400",   // K or 0
    "bg-red-400",     // 1
    "bg-orange-400",  // 2
    "bg-yellow-400",  // 3
    "bg-lime-400",    // 4
    "bg-green-400",   // 5
    "bg-teal-400",    // 6
    "bg-sky-400",     // 7
    "bg-blue-400",    // 8
    "bg-purple-400",  // 9
    "bg-pink-400",    // 10
    "bg-fuchsia-400", // 11
    "bg-rose-400",    // 12
    "bg-amber-400",   // 13
    "bg-cyan-400",    // 14
    "bg-indigo-400",  // 15
    "bg-emerald-400", // 16
    "bg-violet-400",  // 17
    "bg-lime-400",    // 18
    "bg-blue-300",    // 19
    "bg-gray-500",    // 20
  ];
  if (lesson === 'K' || lesson === 0) return colors[0];
  const idx = typeof lesson === 'number' ? lesson : parseInt(lesson as string, 10);
  return colors[idx] || "bg-gray-300";
}