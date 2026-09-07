'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, RefreshCw, DollarSign, ArrowUpRight } from 'lucide-react';

export const NumberTickerPreview: React.FC = () => {
  const [value, setValue] = useState(128450);

  const randomize = () => {
    const delta = Math.floor(Math.random() * 5000) + 1200;
    setValue((v) => v + delta);
  };

  const formattedDigits = value.toLocaleString('en-US').split('');

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>실시간 매출 카운터</span>
        </div>
        <h3 className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Total Revenue (USD)</h3>
      </div>

      {/* Number Ticker Display */}
      <div className="flex items-center gap-1 bg-slate-900 px-8 py-6 rounded-3xl border border-gray-800 shadow-2xl">
        <span className="text-4xl font-extrabold text-blue-400 font-mono mr-1">$</span>
        <div className="flex items-center overflow-hidden h-14">
          {formattedDigits.map((char, idx) => {
            if (char === ',') {
              return (
                <span key={`comma-${idx}`} className="text-4xl font-extrabold text-gray-500 font-mono">
                  ,
                </span>
              );
            }
            return (
              <div key={`digit-col-${idx}`} className="relative w-7 h-14 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={char}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-black text-white font-mono"
                  >
                    {char}
                  </motion.span>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={randomize}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg hover:bg-blue-500 active:scale-95 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          수치 갱신하기 (+$$$)
        </button>
      </div>

      <p className="text-[11px] text-gray-500">
        숫자가 변경되면 각 자릿수별로 독립적인 스프링 롤링 애니메이션이 발동합니다.
      </p>
    </div>
  );
};
