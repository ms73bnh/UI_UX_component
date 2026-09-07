'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export const TagInputPreview: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['DesignSystem', 'TailwindCSS', 'FramerMotion']);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold mb-1">
          INPUT-06 • Tag Input
        </span>
        <h3 className="text-white font-bold text-lg">태그 생성 입력 폼</h3>
        <p className="text-gray-400 text-xs">엔터 키 입력 시 텍스트를 칩 형태로 등록 및 개별 삭제</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 p-3 bg-slate-950 border border-gray-700/80 rounded-2xl min-h-[90px] items-start">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              #{tag}
              <button onClick={() => removeTag(tag)} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="태그 입력 후 Enter..."
            className="flex-1 bg-transparent text-white text-xs outline-none min-w-[120px] py-1 placeholder-gray-500 font-medium"
          />
        </div>

        <p className="text-[11px] text-gray-500 text-center">
          태그명을 입력하고 <kbd className="px-1.5 py-0.5 bg-slate-800 text-gray-300 rounded border border-gray-700">Enter</kbd> 키를 누르세요.
        </p>
      </div>
    </div>
  );
};
