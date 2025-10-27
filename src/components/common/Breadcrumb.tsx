'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

export function Breadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (!pathname) return [];

    const segments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];

    // Add appropriate home based on section
    if (segments[0] === 'student') {
      breadcrumbs.push({
        label: '', // placeholder, will render icon
        href: '/student',
        isActive: segments.length === 1
      });
    } else if (segments[0] === 'parent') {
      breadcrumbs.push({
        label: '', // placeholder, will render icon
        href: '/parent',
        isActive: segments.length === 1
      });
    } else {
      breadcrumbs.push({
        label: '', // placeholder, will render icon
        href: '/',
        isActive: segments.length === 0
      });
    }

    // Add each segment as a breadcrumb
    for (let i = 1; i < segments.length; i++) {
      const isActive = i === segments.length - 1;
      const label = segments[i]
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      breadcrumbs.push({
        label,
        href: `/${segments.slice(0, i + 1).join('/')}`,
        isActive
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumb if we're just on home page
  }

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {breadcrumb.isActive ? (
              <span className="font-medium" aria-current="page">
                {index === 0 ? <AiFillHome className="inline align-text-bottom text-lg" /> : breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="hover:text-gray-200 hover:underline transition-colors"
              >
                {index === 0 ? <AiFillHome className="inline align-text-bottom text-lg" /> : breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 