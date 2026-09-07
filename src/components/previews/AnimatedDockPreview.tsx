'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Bell, Settings, MessageSquare, Compass, Sparkles } from 'lucide-react';

export const AnimatedDockPreview: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const icons = [
    { icon: <Home className="w-5 h-5" />, label: '홈' },
    { icon: <Search className="w-5 h-5" />, label: '검색' },
    { icon: <Compass className="w-5 h-5" />, label: '탐색' },
    { icon: <MessageSquare className="w-5 h-5" />, label: '메시지' },
    { icon: <Bell className="w-5 h-5" />, label: '알림' },
    { icon: <Settings className="w-5 h-5" />, label: '설정' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold mb-1">
          MOTION-11 • Animated macOS Dock Bar
        </span>
        <h3 className="text-white font-bold text-lg">애플 macOS 돋보기 확대 Dock</h3>
        <p className="text-gray-400 text-xs">마우스 위치에 따라 호버 아이콘과 양옆 아이콘이 유기적으로 확대되는 Dock 인터랙션</p>
      </div>

      {/* Dock Bar Container */}
      <div
        onMouseLeave={() => setHoveredIdx(null)}
        className="flex items-end gap-3 px-4 py-3 bg-slate-900/90 border border-gray-700/80 backdrop-blur-xl rounded-3xl shadow-2xl z-20"
      >
        {icons.map((item, idx) => {
          let scale = 1;
          if (hoveredIdx !== null) {
            const distance = Math.abs(hoveredIdx - idx);
            if (distance === 0) scale = 1.45;
            else if (distance === 1) scale = 1.2;
          }

          return (
            <motion.button
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              animate={{ scale }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative p-3 rounded-2xl bg-slate-800 border border-gray-700 text-indigo-300 hover:text-white hover:bg-indigo-600 transition-colors shadow-lg group cursor-pointer"
            >
              {item.icon}
              {/* Tooltip Label */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-0.5 bg-black text-white text-[10px] rounded-md font-bold whitespace-nowrap shadow-md">
                {item.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
