'use client';

import React from 'react';
import { DateScrollerPreview } from './DateScrollerPreview';
import { PrimaryButtonPreview } from './PrimaryButtonPreview';
import { BottomSheetPreview } from './BottomSheetPreview';
import { PullToRefreshPreview } from './PullToRefreshPreview';
import { ComponentItem } from '@/types/component';
import { Play, Sparkles } from 'lucide-react';

interface ComponentLivePreviewProps {
  component: ComponentItem;
  variant?: string;
  state?: string;
}

export const ComponentLivePreview: React.FC<ComponentLivePreviewProps> = ({
  component,
  variant,
  state,
}) => {
  switch (component.id) {
    case 'DATE-04':
      return <DateScrollerPreview daysCount={variant === 'Compact (7 Days)' ? 7 : 14} />;
    case 'ACT-01':
      return <PrimaryButtonPreview />;
    case 'OVER-03':
      return <BottomSheetPreview />;
    case 'GEST-04':
      return <PullToRefreshPreview variant={variant} state={state} />;
    default:
      return (
        <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{component.name}</h4>
            <p className="text-sm text-gray-500 max-w-sm mt-1">{component.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-900 border text-xs font-semibold text-gray-600 dark:text-gray-400">
            <Play className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            <span>Interactive Live React Render</span>
          </div>
        </div>
      );
  }
};
