'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ComponentCard } from '@/components/gallery/ComponentCard';
import { FilterPanel, FilterState } from '@/components/gallery/FilterPanel';
import { CompareBar } from '@/components/compare/CompareBar';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import { COMPONENTS } from '@/data/components';
import { CategoryGroup } from '@/types/component';
import { useFavorites } from '@/hooks/useFavorites';
import { Wand2, Layers, Star, RotateCcw } from 'lucide-react';

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isFavoritesParam = searchParams.get('filter') === 'favorites';

  const { favorites, toggleFavorite } = useFavorites();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [promptCheckIds, setPromptCheckIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryGroup | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    platforms: [],
    priorities: [],
    categories: [],
    favoritesOnly: isFavoritesParam,
    searchQuery: '',
  });

  // Sync favoritesOnly when URL query changes
  useEffect(() => {
    if (isFavoritesParam && !filters.favoritesOnly) {
      setFilters((prev) => ({ ...prev, favoritesOnly: true }));
    } else if (!isFavoritesParam && filters.favoritesOnly && !filters.platforms.length && !filters.priorities.length && !filters.categories.length && !filters.searchQuery) {
      // Keep state in sync
    }
  }, [isFavoritesParam]);

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length >= 4) {
        alert('비교는 최대 4개까지만 선택 가능합니다.');
        return;
      }
      setCompareIds([...compareIds, id]);
    }
  };

  const togglePromptCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (promptCheckIds.includes(id)) {
      setPromptCheckIds(promptCheckIds.filter((item) => item !== id));
    } else {
      setPromptCheckIds([...promptCheckIds, id]);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      platforms: [],
      priorities: [],
      categories: [],
      favoritesOnly: false,
      searchQuery: '',
    });
    setSelectedCategory(null);
    if (isFavoritesParam) {
      router.push('/');
    }
  };

  const isFavoritesActive = filters.favoritesOnly || isFavoritesParam;

  // Filter components logic
  const filteredComponents = COMPONENTS.filter((comp) => {
    if (selectedCategory && comp.category !== selectedCategory) {
      return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(comp.category)) {
      return false;
    }
    if (filters.platforms.length > 0 && !filters.platforms.includes(comp.platform) && comp.platform !== 'Both') {
      return false;
    }
    if (filters.priorities.length > 0 && !filters.priorities.includes(comp.priority)) {
      return false;
    }
    if (isFavoritesActive && !favorites.includes(comp.id)) {
      return false;
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        comp.id.toLowerCase().includes(q) ||
        comp.name.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex bg-slate-50/50 dark:bg-gray-950 pb-20">
      {/* Sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        favoritesCount={favorites.length}
        selectedCategory={selectedCategory}
        isFavoritesFilterActive={isFavoritesActive}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat) {
            setFilters((prev) => ({ ...prev, categories: [], favoritesOnly: false }));
            if (isFavoritesParam) router.push('/');
          }
        }}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenSearch={() => setSearchModalOpen(true)}
          searchQuery={filters.searchQuery}
          promptCount={promptCheckIds.length}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Header Banner */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isFavoritesActive
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                    : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                }`}>
                  {isFavoritesActive ? '⭐ Favorites (즐겨찾기)' : selectedCategory ? selectedCategory : '전체 라이브러리'}
                </span>
                <span className="text-xs font-bold text-gray-400">
                  총 {filteredComponents.length}개 컴포넌트
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {isFavoritesActive
                  ? 'Favorites Component Collection'
                  : selectedCategory
                  ? `${selectedCategory} Patterns`
                  : 'App UI Pattern Gallery'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                컴포넌트 [+Compare] 비교 기능과 프롬프트 생성용 체크박스를 통해 AI 바이브 코딩 개발을 가속화하세요.
              </p>
            </div>

            {promptCheckIds.length > 0 && (
              <Link
                href={`/prompt-builder?ids=${promptCheckIds.join(',')}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 cursor-pointer self-start sm:self-auto"
              >
                <Wand2 className="w-4 h-4" />
                <span>선택 {promptCheckIds.length}개로 프롬프트 생성</span>
              </Link>
            )}
          </div>

          {/* Filter Panel */}
          <FilterPanel
            filters={{ ...filters, favoritesOnly: isFavoritesActive }}
            onFilterChange={(next) => {
              setFilters(next);
              if (!next.favoritesOnly && isFavoritesParam) {
                router.push('/');
              }
            }}
            onReset={handleResetFilters}
          />

          {/* Gallery Grid & Empty States */}
          {filteredComponents.length === 0 ? (
            isFavoritesActive ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-amber-200 dark:border-amber-900/60 p-12 text-center my-8 shadow-xs space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto shadow-xs">
                  <Star className="w-7 h-7 fill-amber-400" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  아직 즐겨찾기한 컴포넌트가 없습니다
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                  컴포넌트 카드의 우측 상단 <Star className="w-3.5 h-3.5 inline fill-amber-400 text-amber-400" /> Star 버튼을 클릭하여 자주 쓰는 패턴을 즐겨찾기에 추가하세요.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    전체 컴포넌트 목록 보기
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center my-8 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto mb-3">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">
                  조건에 일치하는 컴포넌트가 없습니다
                </h3>
                <p className="text-xs text-gray-500 mt-1 mb-4">필터 조건을 변경해 보세요.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs cursor-pointer"
                >
                  필터 초기화
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredComponents.map((comp) => (
                <ComponentCard
                  key={comp.id}
                  component={comp}
                  isFavorite={favorites.includes(comp.id)}
                  onToggleFavorite={toggleFavorite}
                  isComparing={compareIds.includes(comp.id)}
                  onToggleCompare={toggleCompare}
                  isCheckedForPrompt={promptCheckIds.includes(comp.id)}
                  onTogglePromptCheck={togglePromptCheck}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Compare Bar */}
      <CompareBar
        compareIds={compareIds}
        onRemove={(id) => setCompareIds(compareIds.filter((item) => item !== id))}
        onClear={() => setCompareIds([])}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Loading Gallery...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
