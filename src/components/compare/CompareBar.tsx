'use client';

import React from 'react';
import Link from 'next/link';
import { Columns3, X, Trash2, ArrowRight } from 'lucide-react';
import { COMPONENTS } from '@/data/components';

interface CompareBarProps {
  compareIds: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({
  compareIds,
  onRemove,
  onClear,
}) => {
  if (compareIds.length === 0) return null;

  const compareItems = compareIds
    .map((id) => COMPONENTS.find((c) => c.id === id))
    .filter(Boolean);

  const isReady = compareIds.length >= 2;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
      {/* Left: Selected Items List */}
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mr-1 flex-shrink-0">
          <Columns3 className="w-4 h-4 text-blue-400" />
          <span>Compare ({compareIds.length}/4):</span>
        </div>

        <div className="flex items-center gap-1.5 flex-nowrap">
          {compareItems.map((comp) => (
            <span
              key={comp!.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-800 text-xs font-semibold text-blue-300 border border-gray-700 flex-shrink-0"
            >
              <span className="font-mono font-bold text-white">{comp!.id}</span>
              <span className="truncate max-w-[90px]">{comp!.name}</span>
              <button
                onClick={() => onRemove(comp!.id)}
                className="p-0.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
        <button
          onClick={onClear}
          className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>

        {isReady ? (
          <Link
            href={`/compare?ids=${compareIds.join(',')}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
          >
            <span>비교 보기 ({compareIds.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="text-[11px] text-gray-400 font-medium px-3 py-1.5 rounded-xl bg-gray-800 border border-gray-700">
            2개 이상 선택하세요
          </span>
        )}
      </div>
    </div>
  );
};
