'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Touchpad, ZoomIn, ZoomOut, Check, ArrowRight, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

// GEST-01 Long Press
export const LongPressPreview: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startPress = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsMenuOpen(true);
        setProgress(0);
      }
    }, 100);
    setTimerId(interval);
  };

  const endPress = () => {
    if (timerId) clearInterval(timerId);
    setProgress(0);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px] relative">
      <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">
        GEST-01 • Long Press Context Action
      </span>

      <div className="w-full max-w-xs flex flex-col items-center gap-4 relative">
        <button
          onMouseDown={startPress}
          onMouseUp={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          className="w-full p-6 bg-slate-900 border border-gray-700 hover:border-purple-500 rounded-3xl text-center select-none cursor-pointer transition-all shadow-2xl relative overflow-hidden active:scale-95"
        >
          <div className="relative z-10">
            <h4 className="text-white font-bold text-sm">항목을 1초 이상 꾹 누르세요</h4>
            <p className="text-xs text-gray-400 mt-1">Long Press 퀵 메뉴 팝업 발동</p>
          </div>

          {progress > 0 && (
            <motion.div
              className="absolute inset-0 bg-purple-600/30 z-0"
              style={{ width: `${progress}%` }}
            />
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full bg-slate-900 border border-purple-500/50 rounded-2xl p-3 shadow-2xl flex flex-col gap-1 text-xs text-gray-300"
            >
              <div className="flex justify-between items-center px-2 py-1 font-bold text-white border-b border-gray-800">
                <span>컨텍스트 퀵 액션</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-white">✕</button>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl text-left font-medium">📌 상단 고정</button>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl text-left font-medium text-rose-400">🗑️ 삭제하기</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// GEST-02 Pinch to Zoom
export const PinchZoomPreview: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">
        GEST-02 • Pinch to Zoom Image View
      </span>

      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="w-full h-44 bg-slate-900 border border-gray-800 rounded-3xl overflow-hidden relative flex items-center justify-center">
          <motion.div
            animate={{ scale: zoom }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl"
          >
            <Sparkles className="w-8 h-8 animate-pulse" />
            <span className="text-xs font-bold mt-1">Pinch Image</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-2xl border border-gray-800">
          <button onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))} className="p-1 text-gray-400 hover:text-white">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-white w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(z + 0.25, 2))} className="p-1 text-gray-400 hover:text-white">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// GEST-03 Double Tap Heart
export const DoubleTapHeartPreview: React.FC = () => {
  const [likes, setLikes] = useState(128);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleTap = () => {
    setShowHeart(true);
    setLikes((l) => l + 1);
    setTimeout(() => setShowHeart(false), 800);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full text-xs font-bold">
        GEST-03 • Double Tap Heart Like
      </span>

      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div
          onDoubleClick={handleDoubleTap}
          className="w-full h-48 bg-gradient-to-tr from-slate-900 via-pink-950/40 to-slate-900 border border-gray-800 rounded-3xl relative flex items-center justify-center cursor-pointer select-none overflow-hidden shadow-2xl"
        >
          <span className="text-xs text-gray-400 font-medium">이미지를 빠르게 두 번 더블 탭하세요!</span>

          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]"
              >
                <Heart className="w-16 h-16 fill-pink-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-pink-400 bg-pink-500/10 px-4 py-2 rounded-xl border border-pink-500/20">
          <Heart className="w-4 h-4 fill-pink-400" />
          <span>좋아요 {likes.toLocaleString()}개</span>
        </div>
      </div>
    </div>
  );
};
