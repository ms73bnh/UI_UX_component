'use client';

import React, { useState } from 'react';
import { HelpCircle, User, Info, Bell, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TooltipPopoverPreview: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold mb-1">
          OVER-02/04 • Tooltip & Popover
        </span>
        <h3 className="text-white font-bold text-lg">툴팁 & 팝오버 레이어</h3>
        <p className="text-gray-400 text-xs">호버 시 노출되는 말풍선(Tooltip) 및 클릭 시 노출되는 메인 팝오버(Popover)</p>
      </div>

      <div className="flex items-center gap-8 relative z-20">
        {/* Tooltip Demo */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-gray-700 text-xs font-bold text-gray-300 hover:text-white hover:border-gray-500 transition-all">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>툴팁 호버 테스트</span>
          </button>
          {/* Tooltip Bubble */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
            <div className="bg-gray-800 text-white text-[11px] px-3 py-1.5 rounded-xl border border-gray-700 shadow-xl whitespace-nowrap font-medium">
              마우스 호버 시 노출되는 툴팁 말풍선입니다.
            </div>
            <div className="w-2 h-2 bg-gray-800 rotate-45 -mt-1 border-r border-b border-gray-700" />
          </div>
        </div>

        {/* Popover Demo */}
        <div className="relative">
          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg transition-all active:scale-95"
          >
            <User className="w-4 h-4" />
            <span>프로필 팝오버 열기</span>
          </button>

          <AnimatePresence>
            {isPopoverOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-slate-900 border border-gray-700 rounded-2xl p-4 shadow-2xl z-40 text-left"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs">
                    홍
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">홍길동 개발자</h5>
                    <p className="text-[10px] text-gray-400">vibe@example.com</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-2 text-xs text-gray-300">
                  <button className="p-1.5 rounded-lg hover:bg-slate-800 text-left font-medium">계정 설정</button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-800 text-left font-medium text-rose-400">로그아웃</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
