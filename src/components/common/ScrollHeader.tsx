'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ScrollHeaderProps } from '@/types';

export function ScrollHeader({ searchQuery = '', onSearchChange }: ScrollHeaderProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header at the top
      if (currentScrollY <= 100) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(currentScrollY < lastScrollY);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInternalSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  // Check if we're on a home page
  const isOnStudentHome = pathname === '/student';
  const isOnParentHome = pathname === '/parent';
  const isOnHomePage = isOnStudentHome || isOnParentHome;

  // Determine which home page to navigate to
  const getHomePageLink = () => {
    if (pathname?.startsWith('/student')) {
      return '/student';
    } else if (pathname?.startsWith('/parent')) {
      return '/parent';
    }
    // Default to student home if not in a specific section
    return '/student';
  };

  let navItems = [
    { href: '/student', label: 'Student', icon: '🎓' },
    { href: '/parent', label: 'Parent', icon: '👨‍👩‍👧‍👦' },
  ];

  if (pathname?.startsWith('/student')) {
    navItems = [navItems[0]];
  } else if (pathname?.startsWith('/parent')) {
    navItems = [navItems[1]];
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <Link href={getHomePageLink()} className="flex items-center space-x-3 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            <Image
              src="/images/hub-logo.png"
              alt="My Stem+ Hub"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">
              My Stem
              <span className="text-orange-300">+</span>
              &nbsp;
              Hub
            </span>
          </Link>

          {/* Search Input - Only show on home pages */}
          {isOnHomePage && (
            <div className="flex-1 max-w-md lg:max-w-lg mx-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search for topics, lessons, or activities..."
                  className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  aria-label="Search learning content"
                  value={onSearchChange ? searchQuery : internalSearchQuery}
                  onChange={handleSearchChange}
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
          )}

          {/* Navigation Links - Hidden on home pages */}
          {!isOnHomePage && (
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 