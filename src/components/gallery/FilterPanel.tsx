'use client';

import React from 'react';
import { PlatformType, PriorityType, CategoryGroup } from '@/types/component';
import { CATEGORIES } from '@/data/components';
import { X, Filter, Star, Smartphone, Monitor, Layers, RotateCcw } from 'lucide-react';

export interface FilterState {
  platforms: PlatformType[];
  priorities: PriorityType[];
  categories: CategoryGroup[];
  favoritesOnly: boolean;
  searchQuery: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const togglePlatform = (p: PlatformType) => {
    const next = filters.platforms.includes(p)
      ? filters.platforms.filter((item) => item !== p)
      : [...filters.platforms, p];
    onFilterChange({ ...filters, platforms: next });
  };

  const togglePriority = (pr: PriorityType) => {
    const next = filters.priorities.includes(pr)
      ? filters.priorities.filter((item) => item !== pr)
      : [...filters.priorities, pr];
    onFilterChange({ ...filters, priorities: next });
  };

  const toggleCategory = (cat: CategoryGroup) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((item) => item !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: next });
  };

  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.priorities.length > 0 ||
    filters.categories.length > 0 ||
    filters.favoritesOnly ||
    filters.searchQuery.length > 0;

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-xs mb-6">
      {/* Top Filter Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">필터 옵션</h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>필터 초기화</span>
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="flex flex-wrap items-center gap-6 text-sm">
        {/* Platform */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Platform:</span>
          <div className="flex gap-1.5">
            {(['Web', 'Mobile', 'Both'] as PlatformType[]).map((p) => {
              const active = filters.platforms.includes(p);
              return (
                <button
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Priority:</span>
          <div className="flex gap-1.5">
            {(['P0', 'P1', 'P2'] as PriorityType[]).map((pr) => {
              const active = filters.priorities.includes(pr);
              return (
                <button
                  key={pr}
                  onClick={() => togglePriority(pr)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  {pr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Favorites toggle */}
        <button
          onClick={() => onFilterChange({ ...filters, favoritesOnly: !filters.favoritesOnly })}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
            filters.favoritesOnly
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${filters.favoritesOnly ? 'fill-white' : ''}`} />
          <span>즐겨찾기만 보기</span>
        </button>
      </div>

      {/* Active Filter Chips Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-semibold text-gray-400 mr-1">선택된 필터:</span>

          {filters.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60"
            >
              Platform: {p}
              <button onClick={() => togglePlatform(p)} className="hover:text-blue-800 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.priorities.map((pr) => (
            <span
              key={pr}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/60"
            >
              Priority: {pr}
              <button onClick={() => togglePriority(pr)} className="hover:text-purple-800 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60"
            >
              Category: {cat}
              <button onClick={() => toggleCategory(cat)} className="hover:text-emerald-800 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.favoritesOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
              즐겨찾기
              <button
                onClick={() => onFilterChange({ ...filters, favoritesOnly: false })}
                className="hover:text-amber-800 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
              검색: "{filters.searchQuery}"
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="hover:text-gray-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
