'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Search, Sun, Moon, Wand2, Columns3 } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  searchQuery?: string;
  promptCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenSearch,
  searchQuery,
  promptCount = 0,
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu Button & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
            Vibe Coding Library
          </span>
        </div>
      </div>

      {/* Middle: Global Search Bar Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-150 dark:hover:bg-gray-750 text-gray-500 dark:text-gray-400 text-sm transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="truncate">
              {searchQuery ? `검색: "${searchQuery}"` : '컴포넌트, ID, 태그 검색... (Cmd+K)'}
            </span>
          </div>
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Prompt Builder Link & Theme Toggle */}
      <div className="flex items-center gap-2">
        <Link
          href="/prompt-builder"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold transition-all border border-indigo-200 dark:border-indigo-900/60"
        >
          <Wand2 className="w-4 h-4" />
          <span className="hidden sm:inline">Prompt Builder</span>
          {promptCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-indigo-600 text-white font-mono">
              {promptCount}
            </span>
          )}
        </Link>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <Sun className="w-5 h-5 hidden dark:block text-amber-400" />
          <Moon className="w-5 h-5 block dark:hidden text-slate-700" />
        </button>
      </div>
    </header>
  );
};
