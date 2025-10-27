import React from 'react';

interface SettingsModalProps {
  settings: {
    grade: number;
    lesson: number;
    autoplay?: boolean;
    [key: string]: any;
  };
  setSettingsOpen: (open: boolean) => void;
  handleGradeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLessonChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  grades: number[];
  lessons: number[];
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ settings, setSettingsOpen, handleGradeChange, handleLessonChange, grades, lessons }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2"
    onClick={() => setSettingsOpen(false)}
  >
    <div
      className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md relative overflow-y-auto max-h-[90vh] transition-shadow"
      onClick={e => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl transition-colors"
        onClick={() => setSettingsOpen(false)}
        aria-label="Close settings"
      >
        ×
      </button>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="mb-4 flex gap-2">
        <div>
          <label className="block text-xs font-semibold mb-1">Grade</label>
          <select
            className="border rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            value={settings.grade}
            onChange={handleGradeChange}
          >
            {grades.map((g: number) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Lesson</label>
          <select
            className="border rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            value={settings.lesson}
            onChange={handleLessonChange}
          >
            {lessons.map((l: number) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
);
