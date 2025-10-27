import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface NavigationTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div className="py-3 mb-4 hidden md:block">
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors backdrop-blur-md ${activeTab === tab.id
              ? 'bg-yellow-500/90 text-white'
              : 'bg-gray-200/60 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <img src={`/stem-hub/icons/${tab.label.replace(/\s+/g, '-').toLowerCase()}.png`}
              alt={tab.label} className="h-6" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 