import React from 'react';

interface SearchHeaderProps {
  title: string;
  subtitle: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  rightComponent?: React.ReactNode;
}

export function SearchHeader({
  title,
  subtitle,
  searchQuery,
  onSearchChange,
  rightComponent
}: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/90 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800" id="main-heading">
              {title}
            </h1>
            <p className="text-sm text-gray-600 hidden md:block">
              {subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md lg:max-w-lg">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for topics, lessons, or activities..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                aria-label="Search learning content"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Right Component (e.g., Background Controls) */}
          {rightComponent && (
            <div className="flex items-center gap-2">
              {rightComponent}
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 