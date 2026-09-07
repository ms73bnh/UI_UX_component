'use client';

import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';

export const AutocompletePreview: React.FC = () => {
  const [query, setQuery] = useState('React');
  const [isOpen, setIsOpen] = useState(true);

  const recommendations = ['React 19 Hooks', 'React Native Expo', 'React Router v7', 'React Query'];
  const filtered = recommendations.filter((r) => r.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold mb-1">
          INPUT-05 • Autocomplete
        </span>
        <h3 className="text-white font-bold text-lg">자동완성 추천 폼</h3>
        <p className="text-gray-400 text-xs">입력 키워드에 따라 연관 추천어를 드롭다운으로 노출</p>
      </div>

      <div className="w-full max-w-xs relative">
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 border border-gray-700 rounded-2xl">
          <Search className="w-4 h-4 text-blue-400" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="기술 스택 입력..."
            className="w-full bg-transparent text-white text-xs outline-none font-medium"
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-gray-700 rounded-2xl p-1.5 shadow-2xl z-30">
            {filtered.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setQuery(item);
                  setIsOpen(false);
                }}
                className="px-3 py-2 rounded-xl text-xs text-gray-300 hover:bg-blue-600 hover:text-white cursor-pointer font-medium transition-colors flex items-center justify-between"
              >
                <span>{item}</span>
                {query === item && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
