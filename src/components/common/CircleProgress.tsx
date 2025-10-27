import React from 'react';

// Utility to lighten or darken a hex color
function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);
  R = Math.min(255, Math.max(0, R + Math.round(255 * percent)));
  G = Math.min(255, Math.max(0, G + Math.round(255 * percent)));
  B = Math.min(255, Math.max(0, B + Math.round(255 * percent)));
  return `#${(R.toString(16)).padStart(2, '0')}${(G.toString(16)).padStart(2, '0')}${(B.toString(16)).padStart(2, '0')}`;
}

interface CircleProgressProps {
  progress: number; // 0-100
  size?: number; // px
  strokeWidth?: number; // px
  /**
   * color: Can be a Tailwind color class (e.g. 'text-blue-500') or a hex color string (e.g. '#f87171')
   */
  color?: string;
  bgColor?: string; // Tailwind color class, e.g. 'text-gray-200'
  name?: string;
  /**
   * gradient: Optional array of color stops for a linear gradient (e.g. ['#f87171', '#fbbf24', '#34d399'])
   */
  gradient?: string[];
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  progress,
  size = 48,
  strokeWidth = 12,
  color = 'text-blue-500',
  bgColor = 'text-gray-50',
  name,
  gradient,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  // Determine if color is a hex or Tailwind class
  const isHex = color.startsWith('#');
  let effectiveGradient = gradient;
  if (!gradient && isHex) {
    // Generate a two-stop gradient from a lighter to the original color
    effectiveGradient = [shadeColor(color, 0.5), color];
  }
  const gradientId = `circle-progress-gradient-${name}`;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="block" style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          {effectiveGradient && effectiveGradient.length > 1 && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {effectiveGradient.map((stop, i) => (
                <stop key={i} offset={`${(i / (effectiveGradient.length - 1)) * 100}%`} stopColor={stop} />
              ))}
            </linearGradient>
          )}
        </defs>
        <circle
          className={bgColor}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={effectiveGradient ? '' : isHex ? '' : color}
          stroke={effectiveGradient ? `url(#${gradientId})` : isHex ? color : 'currentColor'}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
      </svg>
      <span className="absolute text-center w-full font-bold" style={{ top: size / 2 - 15 }}>
        {progress}%
      </span>
      {/* {label && <span className="text-xs mt-1">{label}</span>} */}
    </div>
  );
};