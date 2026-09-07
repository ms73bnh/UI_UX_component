'use client';

import React, { useState } from 'react';
import { RefreshCw, Loader2, Sparkles } from 'lucide-react';

export const SpinnerPreview: React.FC = () => {
  const [variant, setVariant] = useState<'ring' | 'dots' | 'pulse'>('ring');

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold mb-1">
          FEED-01 • Spinner Loader
        </span>
        <h3 className="text-white font-bold text-lg">회전 스피너 로더</h3>
        <p className="text-gray-400 text-xs">비동기 처리 중임을 안내하는 애니메이션 인디케이터</p>
      </div>

      {/* Variant Selector */}
      <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-gray-800">
        <button
          onClick={() => setVariant('ring')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            variant === 'ring' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          Ring Spinner
        </button>
        <button
          onClick={() => setVariant('dots')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            variant === 'dots' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          Bouncing Dots
        </button>
        <button
          onClick={() => setVariant('pulse')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            variant === 'pulse' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          Pulse Glow
        </button>
      </div>

      <div className="w-full max-w-xs h-36 bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex items-center justify-center">
        {variant === 'ring' && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <span className="text-xs text-gray-400 font-mono">데이터 로딩 중...</span>
          </div>
        )}

        {variant === 'dots' && (
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

        {variant === 'pulse' && (
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/30 animate-ping absolute" />
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg relative z-10">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
