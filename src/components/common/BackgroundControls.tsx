import React from 'react';

interface BackgroundControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export function BackgroundControls({ onPrevious, onNext }: BackgroundControlsProps) {
  return (
    <>
      <button
        onClick={onPrevious}
        className="p-3 bg-white/70 rounded-lg hover:bg-white text-black shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous background"
      >
        ←
      </button>
      <button
        onClick={onNext}
        className="p-3 bg-white/70 rounded-lg hover:bg-white text-black shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next background"
      >
        →
      </button>
    </>
  );
} 