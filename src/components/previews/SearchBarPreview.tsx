'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, Sparkles, ArrowUpRight } from 'lucide-react';

const SUGGESTIONS = [
  { id: '1', query: 'Next.js App Router UI 패턴', category: '개발 컴포넌트' },
  { id: '2', query: 'Framer Motion 인터랙티브 드래그', category: '애니메이션' },
  { id: '3', query: 'Tailwind CSS 반응형 대시보드', category: '스타일' },
  { id: '4', query: 'OTP PIN 번호 인증 UI', category: '폼 콤포넌트' },
  { id: '5', query: 'Bento Grid 커서 호버 효과', category: '인터랙션' },
];

export const SearchBarPreview: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState(['React 19 Hooks', 'Lucide Icon Library']);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = SUGGESTIONS.filter((s) =>
    s.query.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (itemQuery: string) => {
    setQuery(itemQuery);
    if (!history.includes(itemQuery)) {
      setHistory([itemQuery, ...history.slice(0, 2)]);
    }
    setIsFocused(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-bold mb-1">
          SEARCH-01 • Live Search Bar
        </span>
        <h3 className="text-white font-bold text-lg">통합 검색 바</h3>
        <p className="text-gray-400 text-xs">실시간 자동완성 추천 및 최근 검색어 히스토리 드롭다운</p>
      </div>

      <div ref={containerRef} className="w-full max-w-md relative">
        {/* Search Input Field */}
        <div
          className={`flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-2xl border transition-all ${
            isFocused
              ? 'border-sky-500 ring-4 ring-sky-500/15 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
              : 'border-gray-800 hover:border-gray-700'
          }`}
        >
          <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-sky-400' : 'text-gray-500'}`} />
          <input
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="컴포넌트, 태그, 키워드를 검색하세요..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-gray-500 hover:text-white rounded-lg">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Results / History */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 z-30 bg-slate-900 border border-gray-800 rounded-2xl p-3 shadow-2xl overflow-hidden"
            >
              {!query ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-2 text-xs text-gray-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" /> 최근 검색어
                    </span>
                    <button onClick={() => setHistory([])} className="hover:text-gray-300">지우기</button>
                  </div>
                  <div className="flex gap-2 flex-wrap px-2">
                    {history.map((h) => (
                      <button
                        key={h}
                        onClick={() => handleSelect(h)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 border border-gray-700 text-xs text-gray-300 hover:text-white hover:border-sky-500 transition-all flex items-center gap-1"
                      >
                        {h}
                      </button>
                    ))}
                  </div>

                  <div className="px-2 pt-2 border-t border-gray-800 text-xs text-gray-500 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-sky-400" /> 추천 키워드
                  </div>
                  {SUGGESTIONS.slice(0, 3).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => handleSelect(s.query)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 cursor-pointer text-xs transition-colors"
                    >
                      <span className="text-gray-300">{s.query}</span>
                      <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                        {s.category}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="px-2 py-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    검색 결과 ({filtered.length})
                  </div>
                  {filtered.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-500">
                      &ldquo;{query}&rdquo; 에 관한 컴포넌트가 없습니다
                    </div>
                  ) : (
                    filtered.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect(s.query)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-600 hover:text-white group cursor-pointer transition-colors"
                      >
                        <span className="text-xs font-medium text-gray-200 group-hover:text-white">{s.query}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white" />
                      </div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
