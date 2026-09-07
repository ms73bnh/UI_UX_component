'use client';

import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';

export const ChipPreview: React.FC = () => {
  const [selectedChips, setSelectedChips] = useState<string[]>(['무료배송', '할인쿠폰']);
  const [tags, setTags] = useState<string[]>(['React 19', 'Next.js App Router', 'Tailwind CSS', 'TypeScript']);

  const toggleFilterChip = (name: string) => {
    setSelectedChips((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-05/06 • Choice Chip & Tag Chip
        </span>
        <h3 className="text-white font-bold text-lg">선택 & 태그 칩 (Chip)</h3>
        <p className="text-gray-400 text-xs">필터링을 위한 Choice Chip 및 삭제 가능한 Tag Chip</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Choice Chips Section */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Choice Filter Chips (토글형 선택)
          </span>
          <div className="flex flex-wrap gap-2">
            {['무료배송', '할인쿠폰', '당일발송', '리뷰많은순'].map((chipName) => {
              const isSelected = selectedChips.includes(chipName);
              return (
                <button
                  key={chipName}
                  onClick={() => toggleFilterChip(chipName)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md font-black'
                      : 'bg-slate-800 border-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  {chipName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-gray-800" />

        {/* Removable Tag Chips Section */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Removable Tag Chips (삭제 가능)
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-slate-800/80 border border-gray-700 text-gray-200 text-xs font-medium rounded-full flex items-center gap-1.5 group"
              >
                <span>#{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="p-0.5 rounded-full hover:bg-slate-700 text-gray-400 hover:text-rose-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
