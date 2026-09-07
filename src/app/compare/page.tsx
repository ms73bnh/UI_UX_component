'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { COMPONENTS } from '@/data/components';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ComponentLivePreview } from '@/components/previews/ComponentLivePreview';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import {
  ArrowLeft,
  Columns3,
  CheckCircle2,
  AlertTriangle,
  Zap,
  X,
  Sparkles,
} from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idsParam = searchParams.get('ids') || '';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const selectedIds = idsParam
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const selectedComponents = selectedIds
    .map((id) => COMPONENTS.find((c) => c.id === id))
    .filter(Boolean);

  const handleRemove = (idToRemove: string) => {
    const nextIds = selectedIds.filter((id) => id !== idToRemove);
    if (nextIds.length > 0) {
      router.push(`/compare?ids=${nextIds.join(',')}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50/50 dark:bg-gray-950">
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenSearch={() => setSearchModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Top Nav */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>컴포넌트 갤러리로 돌아가기</span>
            </Link>

            <span className="text-xs font-bold px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-900">
              Compare Mode ({selectedComponents.length} Selected)
            </span>
          </div>

          {/* Header */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Columns3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Component Comparison Matrix
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                선택된 컴포넌트의 Live Preview, Usage 지침, Avoid 주의사항을 나란히 비교합니다.
              </p>
            </div>

            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs transition-all shadow-md shadow-blue-500/20 text-center"
            >
              + 더 많은 컴포넌트 추가
            </Link>
          </div>

          {/* Empty State */}
          {selectedComponents.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center my-8">
              <Columns3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-bold text-base text-gray-900 dark:text-white">비교할 컴포넌트가 선택되지 않았습니다</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">갤러리 카드에서 [+ Compare] 버튼을 2개 이상 선택하세요.</p>
              <Link href="/" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-xs">
                갤러리로 이동
              </Link>
            </div>
          ) : (
            /* Comparison Grid */
            <div className={`grid gap-6 ${
              selectedComponents.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : selectedComponents.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {selectedComponents.map((comp) => (
                <div
                  key={comp!.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs flex flex-col justify-between space-y-6 relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(comp!.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header Meta */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-900">
                        {comp!.id}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {comp!.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{comp!.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{comp!.description}</p>
                  </div>

                  {/* Live Preview Section */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      Live Preview
                    </span>
                    <div className="bg-slate-50 dark:bg-gray-950 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                      <ComponentLivePreview component={comp!} />
                    </div>
                  </div>

                  {/* Interactions */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Interactions
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {comp!.interactions.map((inter, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                          {inter}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Usage */}
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 space-y-2 flex-1">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Usage - 언제 사용하는가
                    </span>
                    <ul className="space-y-1 text-[11px] text-emerald-900 dark:text-emerald-200 font-medium">
                      {comp!.usage.map((u, i) => (
                        <li key={i}>• {u}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Avoid */}
                  <div className="bg-red-50/50 dark:bg-red-950/20 p-3.5 rounded-xl border border-red-200 dark:border-red-900/60 space-y-2 flex-1">
                    <span className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Avoid - 쓰지 말아야 할 때
                    </span>
                    <ul className="space-y-1 text-[11px] text-red-900 dark:text-red-200 font-medium">
                      {comp!.avoid.map((a, i) => (
                        <li key={i}>• {a}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Link */}
                  <Link
                    href={`/component/${comp!.id}`}
                    className="w-full text-center py-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    상세보기 페이지로 이동
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Loading Compare...</div>}>
      <CompareContent />
    </Suspense>
  );
}
