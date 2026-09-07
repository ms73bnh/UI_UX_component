'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { COMPONENTS } from '@/data/components';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import {
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  Wand2,
  Layers,
  Terminal,
  CheckSquare,
  Square,
  RotateCcw,
  Zap,
  BookmarkPlus,
  LayoutList,
} from 'lucide-react';

interface PresetBundle {
  id: string;
  name: string;
  goal: string;
  componentIds: string[];
}

const PRESET_BUNDLES: PresetBundle[] = [
  {
    id: 'auth',
    name: '온보딩 & 로그인',
    goal: '사용자 회원가입 및 소셜 로그인 온보딩 화면',
    componentIds: ['INPUT-01', 'ACT-01', 'OVER-01', 'SELECT-03'],
  },
  {
    id: 'commerce',
    name: '커머스 & 결제',
    goal: '상품 수량 조절 및 아코디언 옵션 결제 화면',
    componentIds: ['LIST-02', 'SELECT-07', 'ACT-01', 'OVER-03', 'FEED-02'],
  },
  {
    id: 'social',
    name: 'SNS & 피드',
    goal: '스와이프 리스트 및 검색 피드 메인 화면',
    componentIds: ['LIST-01', 'GEST-04', 'SEARCH-01', 'ACT-07', 'LIST-06'],
  },
  {
    id: 'dashboard',
    name: '대시보드 & 관리자',
    goal: '사이드바 내비게이션 및 세그먼트 필터 대시보드',
    componentIds: ['NAV-05', 'SEARCH-04', 'SELECT-04', 'FEED-04', 'NAV-06'],
  },
  {
    id: 'reservation',
    name: '일정 & 예약',
    goal: '날짜 가로 스크롤 및 시간 피커 병원/헤어샵 예약 화면',
    componentIds: ['DATE-04', 'DATE-08', 'ACT-01', 'FEED-02', 'OVER-03'],
  },
];

function PromptBuilderContent() {
  const searchParams = useSearchParams();
  const initialIds = (searchParams.get('ids') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialIds.length > 0 ? initialIds : ['ACT-01', 'DATE-04', 'OVER-03']
  );

  const [screenGoal, setScreenGoal] = useState<string>('일정 예약 및 결제 확인 화면');
  const [techStack, setTechStack] = useState<'react' | 'reactNative'>('react');
  const [copied, setCopied] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const applyPreset = (preset: PresetBundle) => {
    setScreenGoal(preset.goal);
    setSelectedIds(preset.componentIds);
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedComponents = selectedIds
    .map((id) => COMPONENTS.find((c) => c.id === id))
    .filter(Boolean);

  // Generate full master prompt
  const generateFullPrompt = () => {
    const stackText =
      techStack === 'react'
        ? 'Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion'
        : 'React Native, Expo, TypeScript, React Native Reusables / Tailwind (NativeWind)';

    const componentDetails = selectedComponents
      .map(
        (c, idx) =>
          `[${idx + 1}] ${c!.id} - ${c!.name} (${c!.category})\n${c!.promptTemplate}`
      )
      .join('\n\n');

    const allTags = Array.from(
      new Set(
        selectedComponents.flatMap((c) => c!.promptBuilderTags || [c!.id])
      )
    ).join(', ');

    return `### AI Screen Implementation Prompt

목표: ${screenGoal}
기술 스택: ${stackText}
컴포넌트 태그: ${allTags || 'UI Kit Standard Components'}

다음 요구사항에 맞춰 최적화된 웹/모바일 앱 UI 화면을 작성한다.

---

### 포함할 컴포넌트 사양:

${componentDetails}

---

### 디자인 및 UX 가이드라인:
- Mobile First 및 반응형 레이아웃 설계
- Clean & Neutral Design System (과도한 그래디언트/글래스모피즘 금지)
- Touch Target (최소 44px 이상) 및 Accessibility (Focus Ring, ARIA) 지원
- Light / Dark Mode 동시 지원
- 키보드 내비게이션 및 터치 스와이프 제스처 최적화
`;
  };

  const fullPromptText = generateFullPrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <span>갤러리로 돌아가기</span>
            </Link>

            <span className="text-xs font-bold px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-900">
              Prompt Builder
            </span>
          </div>

          {/* Header Banner */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Wand2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  AI App Prompt Builder
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                필요한 컴포넌트들을 선택하여 AI 개발 도구(Antigravity, Cursor 등)에 전달할 통합 프롬프트를 조합하세요.
              </p>
            </div>
          </div>

          {/* Preset App Templates Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <BookmarkPlus className="w-4 h-4 text-indigo-500" />
              <h3 className="font-bold text-xs text-gray-900 dark:text-white">추천 프리셋 앱 템플릿:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_BUNDLES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all border border-indigo-200 dark:border-indigo-900/60 cursor-pointer"
                >
                  ⚡ {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Builder Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Config & Selection */}
            <div className="lg:col-span-5 space-y-6">
              {/* Target Screen Configuration */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs space-y-4">
                <h3 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  <span>화면 목표 및 기술 스택 설정</span>
                </h3>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    개발 목표 화면명 / 기능:
                  </label>
                  <input
                    type="text"
                    value={screenGoal}
                    onChange={(e) => setScreenGoal(e.target.value)}
                    placeholder="예: 일정 예약 및 결제 화면"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    타겟 구현 프레임워크:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTechStack('react')}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        techStack === 'react'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      React / Next.js
                    </button>
                    <button
                      onClick={() => setTechStack('reactNative')}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        techStack === 'reactNative'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      React Native / Expo
                    </button>
                  </div>
                </div>
              </div>

              {/* Component Selector List */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <span>포함할 컴포넌트 선택 ({selectedIds.length})</span>
                  </h3>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>해제</span>
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-1.5 pr-1 scrollbar-none">
                  {COMPONENTS.map((comp) => {
                    const checked = selectedIds.includes(comp.id);
                    return (
                      <div
                        key={comp.id}
                        onClick={() => toggleSelect(comp.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                          checked
                            ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800'
                            : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {checked ? (
                            <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {comp.id}
                          </span>
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                            {comp.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded border">
                          {comp.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Layout Order Outline */}
              {selectedComponents.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                    <LayoutList className="w-4 h-4 text-indigo-500" />
                    <span>화면 수직 구성 순서 (Vertical Layout Flow):</span>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    {selectedComponents.map((c, i) => (
                      <div key={c!.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-xs font-medium border border-gray-200/60 dark:border-gray-700">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">{i + 1}</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{c!.id}</span>
                        <span className="text-gray-800 dark:text-gray-200">{c!.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Generated Master Prompt Output */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-4 relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-bold text-base text-white">Generated Master Prompt</h3>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all active:scale-95 shadow-md shadow-indigo-500/20 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Full Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800 overflow-x-auto max-h-[600px] scrollbar-none">
                  {fullPromptText}
                </pre>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span>
                    복사된 통합 프롬프트를 AI 개발도구(Antigravity, Cursor 등)에 붙여넣어 완벽한 앱 화면을 생성하세요.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
}

export default function PromptBuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Loading Prompt Builder...</div>}>
      <PromptBuilderContent />
    </Suspense>
  );
}
