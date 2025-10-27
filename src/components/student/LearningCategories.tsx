import React, { useState } from 'react';
import Link from 'next/link';
import { LearningCategoriesProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: "all", name: "All Subjects", image: "" },
  { id: "english", name: "English", image: "/stem-hub/english.png" },
  { id: "mathematics", name: "Mathematics", image: "/stem-hub/mathematics.png" },
  { id: "science", name: "Science", image: "/stem-hub/science.png" },
  { id: "languages", name: "Languages", image: "/stem-hub/languages.png" },
  { id: "technology", name: "Technology", image: "/stem-hub/technology.png" },
  { id: "engineering", name: "Engineering", image: "/stem-hub/engineering.png" },
  { id: "history", name: "History", image: "/stem-hub/history.png" },
  { id: "geography", name: "Geography", image: "/stem-hub/geography.png" },
  { id: "music", name: "Music", image: "/stem-hub/music.png" },
];

export function LearningCategories({
  learningCategories,
  activeTab = "all",
  onTabChange,
  searchQuery = ""
}: LearningCategoriesProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);

  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;
  const currentSearchQuery = searchQuery || "";

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  const filteredCategories = learningCategories.filter(category =>
    currentActiveTab === "all" || category.id === currentActiveTab
  );

  // Filter search results based on both search query and selected tab
  const searchResults = learningCategories
    .filter(category =>
      currentActiveTab === "all" || category.id === currentActiveTab
    )
    .flatMap(category =>
      category.links.filter(link =>
        (link.name && link.name.toLowerCase().includes(currentSearchQuery.toLowerCase())) ||
        (link.description && link.description.toLowerCase().includes(currentSearchQuery.toLowerCase()))
      )
    );

  return (
    <section className="mb-8">
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">Learning Categories</h2> */}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1 ${currentActiveTab === tab.id
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-md"
              }`}
          >
            {tab.image && (
              <img
                src={tab.image}
                alt={tab.name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />)}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Search Results */}
      {currentSearchQuery ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Search Results {currentActiveTab !== "all" && `in ${tabs.find(tab => tab.id === currentActiveTab)?.name}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.length > 0 ? (
              searchResults.map((link) => (
                <Link
                  key={link.name + link.id}
                  href={link.href}
                  className="bg-white/90 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-gray-300"
                >
                  <div className="flex items-center gap-3">
                    <img src={"/stem-hub/" + link.name.toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, "-") + ".png"}
                      alt={link.name}
                      className="w-[56px] h-[56px] max-w-[56px] max-h-[56px]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }
                      }
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{link.name}</h4>
                      <p className="text-sm text-gray-600">{link.description}</p>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                <p className="text-lg">No results found for &quot;{currentSearchQuery}&quot; in <span className='capitalize'>{currentActiveTab}</span>.</p>
                {currentActiveTab !== "all" && (
                  <p className="text-sm mt-2">Try searching in &quot;All Subjects&quot; or different keywords</p>
                )}
              </div>
            )}
          </div>
        </div>
      ) :
        (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentActiveTab + '-' + filteredCategories.length}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className={`grid ${filteredCategories.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}
            >
              {/* Category Cards */}
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.bgcolor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Link href={category.mainHref} className="flex items-center gap-3 hover:opacity-80 transition-opacity hover:scale-105">
                      <span className="text-7xl">
                        <img src={"/stem-hub/" + category.name.toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, "_") + ".png"} alt={category.name} className="w-[80px] h-[80px] max-w-[80px] max-h-[80px]" />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </Link>
                  </div>
                  <div className={`grid ${filteredCategories.length !== 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-3 transition-all duration-300`}>
                    {(filteredCategories.length === 1 ? category.links : category.links.slice(0, 3)).map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 p-4 rounded-lg bg-white/70 hover:bg-white hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:scale-105"
                      >
                        <img src={"/stem-hub/" + link.name.toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, "-") + ".png"} alt={link.name} className="w-[56px] h-[56px] max-w-[56px] max-h-[56px]" />

                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{link.name}</div>
                          <div className="text-xs text-gray-600">{link.description}</div>
                        </div>
                        <span className="text-gray-400">→</span>
                      </Link>
                    ))}
                    {filteredCategories.length !== 1 && category.links.length > 3 && (
                      <Link
                        href={category.mainHref}
                        className="inline-flex items-center gap-1 p-0 rounded hover:bg-white/60 text-blue-600 hover:pl-3 text-xs font-medium transition-all duration-200"
                      >
                        <span>View all {category.links.length} topics</span>
                        <span className="text-sm">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
    </section >
  );
} 