'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Star, ArrowRight, Layers } from 'lucide-react';
import { COMPONENTS } from '@/data/components';
import { ComponentItem } from '@/types/component';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally if listener attached, or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = COMPONENTS.filter((comp) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      comp.id.toLowerCase().includes(q) ||
      comp.name.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q) ||
      comp.interactions.some((i) => i.toLowerCase().includes(q)) ||
      comp.usage.some((u) => u.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="컴포넌트 이름, ID (ACT-01), 키워드(calendar, swipe) 검색..."
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-base font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-none">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              검색 결과가 없습니다: "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.id}
                href={`/component/${item.id}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors group cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-900"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2 py-0.5 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-900">
                    {item.id}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
