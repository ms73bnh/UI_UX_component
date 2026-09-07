'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, RotateCcw } from 'lucide-react';

export const ProgressBarPreview: React.FC = () => {
  const [progress, setProgress] = useState(65);

  const simulateProgress = () => {
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 20) + 10;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setProgress(p);
    }, 300);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold mb-1">
          FEED-03 • Progress Bar
        </span>
        <h3 className="text-white font-bold text-lg">진행률 바 인디케이터</h3>
        <p className="text-gray-400 text-xs">수치(0~100%) 진행 채움 애니메이션</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 font-medium flex items-center gap-1.5">
            {progress === 100 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> 완료됨</span>
            ) : (
              '업로드 진행 중...'
            )}
          </span>
          <span className="font-mono font-extrabold text-white text-sm">{progress}%</span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-gray-700/60">
          <motion.div
            className={`h-full rounded-full ${
              progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-indigo-500'
            }`}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>

        {/* Manual Slider & Test Button */}
        <div className="flex items-center justify-between gap-4 mt-2 pt-3 border-t border-gray-800">
          <button
            onClick={simulateProgress}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> 시뮬레이션
          </button>

          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-32 accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
