'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  MousePointerClick,
  TextCursorInput,
  CheckSquare,
  CalendarDays,
  Navigation,
  Layers,
  LayoutGrid,
  Search,
  AlertCircle,
  Touchpad,
  Sparkles,
  Boxes,
  Star,
  X,
  Zap,
  Wand2,
  Columns3,
} from 'lucide-react';
import { CategoryGroup } from '@/types/component';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  favoritesCount?: number;
  selectedCategory?: CategoryGroup | null;
  onSelectCategory?: (cat: CategoryGroup | null) => void;
  isFavoritesFilterActive?: boolean;
}

const CATEGORY_ITEMS: { id: CategoryGroup; name: string; icon: any }[] = [
  { id: 'Actions', name: 'Actions', icon: MousePointerClick },
  { id: 'Input', name: 'Input', icon: TextCursorInput },
  { id: 'Selection', name: 'Selection', icon: CheckSquare },
  { id: 'Date & Time', name: 'Date & Time', icon: CalendarDays },
  { id: 'Navigation', name: 'Navigation', icon: Navigation },
  { id: 'Overlay', name: 'Overlay', icon: Layers },
  { id: 'Lists & Cards', name: 'Lists & Cards', icon: LayoutGrid },
  { id: 'Search & Filter', name: 'Search & Filter', icon: Search },
  { id: 'Feedback & States', name: 'Feedback & States', icon: AlertCircle },
];

const INTERACTION_ITEMS: { id: CategoryGroup; name: string; icon: any }[] = [
  { id: 'Gesture', name: 'Gestures', icon: Touchpad },
  { id: 'Motion', name: 'Motion', icon: Sparkles },
  { id: 'Patterns', name: 'Patterns', icon: Boxes },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  favoritesCount = 0,
  selectedCategory,
  onSelectCategory,
  isFavoritesFilterActive = false,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleCategoryClick = (cat: CategoryGroup | null) => {
    onSelectCategory?.(cat);
    if (cat) {
      router.push(`/?category=${encodeURIComponent(cat)}`);
    } else {
      router.push('/');
    }
    if (isOpen) onClose?.();
  };

  const handleFavoritesClick = () => {
    router.push('/?filter=favorites');
    onSelectCategory?.(null);
    if (isOpen) onClose?.();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => handleCategoryClick(null)}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight leading-none">
              VIBE UI KIT
            </h1>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              Pattern Reference
            </span>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-none">
        {/* All Components */}
        <div>
          <button
            onClick={() => handleCategoryClick(null)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === null && pathname === '/' && !isFavoritesFilterActive
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span>전체 컴포넌트</span>
          </button>
        </div>

        {/* AI Tools */}
        <div>
          <h2 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            AI Tools & Compare
          </h2>
          <div className="space-y-1">
            <Link
              href="/prompt-builder"
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/prompt-builder'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Prompt Builder</span>
            </Link>

            <Link
              href="/compare"
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/compare'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Columns3 className="w-4 h-4" />
              <span>Component Compare</span>
            </Link>
          </div>
        </div>

        {/* Components Group */}
        <div>
          <h2 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Components
          </h2>
          <div className="space-y-1">
            {CATEGORY_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedCategory === item.id && !isFavoritesFilterActive;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactions */}
        <div>
          <h2 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Interactions
          </h2>
          <div className="space-y-1">
            {INTERACTION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedCategory === item.id && !isFavoritesFilterActive;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Favorites Section */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleFavoritesClick}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFavoritesFilterActive
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-400/50'
                : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <Star className={`w-4 h-4 ${isFavoritesFilterActive ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'}`} />
              <span>Favorites</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              isFavoritesFilterActive
                ? 'bg-white/20 text-white'
                : 'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
            }`}>
              {favoritesCount}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
