'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COMPONENTS } from '@/data/components';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DeviceFrame } from '@/components/layout/DeviceFrame';
import { ComponentLivePreview } from '@/components/previews/ComponentLivePreview';
import { AiPromptBox } from '@/components/detail/AiPromptBox';
import { CodeViewer } from '@/components/detail/CodeViewer';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Smartphone,
  Monitor,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface ComponentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ComponentDetailPage({ params }: ComponentDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeVariant, setActiveVariant] = useState<string | undefined>(undefined);
  const [activeState, setActiveState] = useState<string>('Default');

  const component = COMPONENTS.find((c) => c.id === id);

  // Load favorites
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vibe_ui_favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const isFavorite = component ? favorites.includes(component.id) : false;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!component) return;
    let next: string[];
    if (favorites.includes(component.id)) {
      next = favorites.filter((f) => f !== component.id);
    } else {
      next = [...favorites, component.id];
    }
    setFavorites(next);
    try {
      localStorage.setItem('vibe_ui_favorites', JSON.stringify(next));
    } catch (e) {}
  };

  if (!component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 p-6">
        <div className="text-center bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl max-w-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">컴포넌트를 찾을 수 없습니다</h2>
          <p className="text-xs text-gray-500 mb-6">요청하신 ID ({id})의 컴포넌트 정보가 존재하지 않습니다.</p>
          <Link
            href="/"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-xs hover:bg-blue-700 transition-colors"
          >
            갤러리로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const variants = component.variants || ['Default', 'Compact', 'Full Width', 'Disabled'];
  const states = component.states || ['Default', 'Hover', 'Pressed', 'Selected', 'Disabled', 'Loading', 'Error'];

  return (
    <div className="min-h-screen flex bg-slate-50/50 dark:bg-gray-950">
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        favoritesCount={favorites.length}
      />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenSearch={() => setSearchModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-8">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>컴포넌트 갤러리로 돌아가기</span>
            </Link>

            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isFavorite ? 'Favorites 저장됨' : 'Favorites 추가'}</span>
            </button>
          </div>

          {/* Component Header Info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 rounded-md border border-blue-200 dark:border-blue-900/60">
                {component.id}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {component.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/60">
                {component.platform}
              </span>
              <span
                className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${
                  component.priority === 'P0'
                    ? 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                }`}
              >
                {component.priority}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {component.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              {component.description}
            </p>
          </div>

          {/* Section 1: Interactive Live Preview with Device Switcher */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Live Interactive Preview</h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">직접 클릭, 터치, 스크롤 가능</span>
            </div>

            <DeviceFrame>
              <ComponentLivePreview component={component} variant={activeVariant} state={activeState} />
            </DeviceFrame>
          </section>

          {/* Section 2: Variants & States Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Variants */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>Variants</span>
              </h3>
              <p className="text-xs text-gray-500 mb-4">제공되는 컴포넌트 변형 버전을 비교 선택하세요.</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVariant(v)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                      activeVariant === v
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </section>

            {/* States */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>States Matrix</span>
              </h3>
              <p className="text-xs text-gray-500 mb-4">컴포넌트 주요 반응형 상태를 테스트하세요.</p>
              <div className="flex flex-wrap gap-2">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveState(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                      activeState === st
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-amber-400'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Section 3: Interactions List */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs">
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-500" />
              <span>주요 Interaction 패턴</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {component.interactions.map((inter, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-gray-200 text-xs font-semibold border border-slate-200 dark:border-gray-700"
                >
                  ⚡ {inter}
                </span>
              ))}
            </div>
          </section>

          {/* Section 4: Usage vs Avoid Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* When to Use */}
            <section className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 p-6 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-extrabold text-base">Usage - 언제 사용하는가</h3>
              </div>
              <ul className="space-y-2 text-xs font-medium text-emerald-900 dark:text-emerald-200">
                {component.usage.map((u, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* When to Avoid */}
            <section className="bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/60 p-6 shadow-xs">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-extrabold text-base">Avoid - 쓰지 말아야 할 때</h3>
              </div>
              <ul className="space-y-2 text-xs font-medium text-red-900 dark:text-red-200">
                {component.avoid.map((a, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Section 5: AI Prompt Generator */}
          <AiPromptBox promptText={component.promptTemplate} />

          {/* Section 6: Code Viewer */}
          <CodeViewer snippets={component.codeSnippets} />
        </main>
      </div>

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
}
