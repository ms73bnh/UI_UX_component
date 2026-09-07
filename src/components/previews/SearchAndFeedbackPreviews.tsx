'use client';

import React, { useState } from 'react';
import { X, Sliders, ChevronDown, Check, AlertCircle } from 'lucide-react';

// SEARCH-02 Active Filter Chips
export const ActiveFilterChipsPreview: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState(['카테고리: Actions', '플랫폼: Mobile', '우선순위: P0']);

  const removeFilter = (f: string) => {
    setActiveFilters(activeFilters.filter((item) => item !== f));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">
        SEARCH-02 • Active Filter Chips
      </span>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400 font-medium">적용된 조건 ({activeFilters.length})</span>
          <button onClick={() => setActiveFilters([])} className="text-blue-400 font-bold hover:underline">전체 해제</button>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeFilters.map((f) => (
            <span key={f} className="px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-bold flex items-center gap-1.5">
              {f}
              <button onClick={() => removeFilter(f)} className="hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          {activeFilters.length === 0 && <span className="text-xs text-gray-500">적용된 필터가 없습니다.</span>}
        </div>
      </div>
    </div>
  );
};

// SEARCH-04 Filter Panel
export const FilterPanelPreview: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('Both');
  const [selectedPriority, setSelectedPriority] = useState('P0');

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
        SEARCH-04 • Filter Panel
      </span>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-gray-800 pb-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>통합 필터 옵션 패널</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-400">플랫폼 필터</span>
          <div className="flex gap-2">
            {['Both', 'Web', 'Mobile'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedPlatform === p ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 border-gray-700 text-gray-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-400">우선순위 필터</span>
          <div className="flex gap-2">
            {['P0', 'P1', 'P2'].map((pr) => (
              <button
                key={pr}
                onClick={() => setSelectedPriority(pr)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedPriority === pr ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 border-gray-700 text-gray-400'
                }`}
              >
                {pr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// FEED-05 Empty State
export const EmptyStatePreview: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold">
        FEED-05 • Empty State View
      </span>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-white text-base">검색 결과가 없습니다</h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          입력하신 키워드와 일치하는 UI 컴포넌트를 찾을 수 없습니다. 다른 검색어를 입력해 보세요.
        </p>
        <button className="px-4 py-2 bg-slate-800 border border-gray-700 text-xs font-bold text-white rounded-xl mt-1 hover:bg-slate-700">
          필터 초기화
        </button>
      </div>
    </div>
  );
};
