'use client';

import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, RotateCcw } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const [mode, setMode] = useState<DeviceMode>('mobile');

  return (
    <div className="flex flex-col items-center w-full">
      {/* Device Switcher Bar */}
      <div className="flex items-center justify-between w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 rounded-2xl mb-4 shadow-xs">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 pl-3">Device Viewport:</span>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'mobile'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (375px)</span>
          </button>

          <button
            onClick={() => setMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'tablet'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>

          <button
            onClick={() => setMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'desktop'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (100%)</span>
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="w-full flex justify-center transition-all duration-300">
        <div
          className={`transition-all duration-300 relative ${
            mode === 'mobile'
              ? 'w-[375px] max-w-full rounded-[40px] border-[10px] border-gray-900 dark:border-gray-800 shadow-2xl p-4 bg-white dark:bg-gray-900 my-2'
              : mode === 'tablet'
              ? 'w-[768px] max-w-full rounded-[32px] border-[8px] border-gray-800 dark:border-gray-700 shadow-xl p-6 bg-white dark:bg-gray-900 my-2'
              : 'w-full rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900 shadow-md'
          }`}
        >
          {/* Mobile Speaker Bar */}
          {mode === 'mobile' && (
            <div className="w-24 h-4 bg-gray-900 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-1 bg-gray-700 dark:bg-gray-600 rounded-full" />
            </div>
          )}

          {children}

          {/* Mobile Home Bar */}
          {mode === 'mobile' && (
            <div className="w-32 h-1 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto mt-4" />
          )}
        </div>
      </div>
    </div>
  );
};
