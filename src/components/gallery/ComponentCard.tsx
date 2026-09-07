'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Smartphone, Monitor, Layers, Plus, Check, Columns3 } from 'lucide-react';
import { ComponentItem } from '@/types/component';

interface ComponentCardProps {
  component: ComponentItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  isComparing?: boolean;
  onToggleCompare?: (id: string, e: React.MouseEvent) => void;
  isCheckedForPrompt?: boolean;
  onTogglePromptCheck?: (id: string, e: React.MouseEvent) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isFavorite,
  onToggleFavorite,
  isComparing = false,
  onToggleCompare,
  isCheckedForPrompt = false,
  onTogglePromptCheck,
}) => {
  return (
    <div className={`group relative bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
      isComparing
        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
        : isCheckedForPrompt
        ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
        : 'border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50'
    }`}>
      <Link href={`/component/${component.id}`} className="p-5 flex-1 block">
        {/* Top Bar: ID + Checkbox & Favorite */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {onTogglePromptCheck && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onTogglePromptCheck(component.id, e);
                }}
                title="Prompt Builder에 추가"
                aria-label="Select for prompt builder"
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                  isCheckedForPrompt
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-indigo-400'
                }`}
              >
                {isCheckedForPrompt && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            )}

            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 rounded-md border border-blue-200 dark:border-blue-900/60">
              {component.id}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(component.id, e);
            }}
            aria-label="Favorite toggle"
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Star
              className={`w-4 h-4 transition-colors ${
                isFavorite
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              }`}
            />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {component.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
          {component.description}
        </p>

        {/* Mini Preview Box */}
        <div className="my-4 py-3 px-3 bg-slate-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center min-h-[72px]">
          {component.id === 'DATE-04' ? (
            <div className="flex gap-1.5 overflow-hidden w-full justify-center">
              <div className="w-8 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">월5</div>
              <div className="w-8 h-12 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center text-[10px] font-bold shadow-xs">화6</div>
              <div className="w-8 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">수7</div>
              <div className="w-8 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">목8</div>
            </div>
          ) : component.id === 'ACT-01' ? (
            <div className="w-full py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg text-center shadow-xs">
              Primary Button
            </div>
          ) : component.id === 'OVER-03' ? (
            <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-t-xl flex flex-col items-center justify-start pt-1 border-t-2 border-blue-500">
              <div className="w-6 h-1 bg-gray-400 rounded-full" />
              <span className="text-[10px] text-gray-500 mt-1 font-semibold">Bottom Sheet</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Interactive Preview</span>
            </div>
          )}
        </div>
      </Link>

      {/* Footer Badges & Compare Button */}
      <div className="px-5 pb-4 pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
            {component.platform === 'Mobile' ? (
              <Smartphone className="w-3 h-3 text-purple-500" />
            ) : component.platform === 'Web' ? (
              <Monitor className="w-3 h-3 text-emerald-500" />
            ) : (
              <Layers className="w-3 h-3 text-blue-500" />
            )}
            {component.platform}
          </span>
          <span
            className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
              component.priority === 'P0'
                ? 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
            }`}
          >
            {component.priority}
          </span>
        </div>

        {onToggleCompare && (
          <button
            onClick={(e) => onToggleCompare(component.id, e)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isComparing
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600'
            }`}
          >
            <Columns3 className="w-3 h-3" />
            <span>{isComparing ? 'Comparing' : '+ Compare'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
