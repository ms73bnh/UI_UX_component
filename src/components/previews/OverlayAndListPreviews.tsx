'use client';

import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Trash2, X, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// OVER-05 Action Sheet
export const ActionSheetPreview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px] relative overflow-hidden">
      <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-bold">
        OVER-05 • Action Sheet
      </span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-xl bg-slate-900 border border-gray-700 text-xs font-bold text-gray-300 hover:text-white"
      >
        액션시트 {isOpen ? '닫기' : '열기'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="absolute bottom-0 left-4 right-4 bg-slate-900 border border-gray-800 rounded-t-3xl p-4 shadow-2xl flex flex-col gap-2 z-30"
          >
            <div className="w-8 h-1 bg-gray-700 rounded-full mx-auto mb-1" />
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" /> 카메라로 촬영하기
            </button>
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" /> 앨범에서 선택하기
            </button>
            <button onClick={() => setIsOpen(false)} className="w-full py-3 bg-rose-600/20 text-rose-400 font-bold text-xs rounded-xl border border-rose-500/30">
              취소
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// OVER-06 Alert Banner
export const AlertBannerPreview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold">
        OVER-06 • Alert Banner Notification
      </span>

      {isVisible ? (
        <div className="w-full max-w-sm p-3.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 rounded-2xl flex items-center justify-between text-xs shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold">오늘 자정 시스템 정기 점검 안내</span>
          </div>
          <button onClick={() => setIsVisible(false)} className="p-1 hover:bg-amber-500/20 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button onClick={() => setIsVisible(true)} className="px-3 py-1.5 bg-slate-900 border border-gray-700 text-xs text-gray-300 rounded-xl">
          공지 배너 다시 열기
        </button>
      )}
    </div>
  );
};

// LIST-03 Carousel
export const CarouselPreview: React.FC = () => {
  const [index, setIndex] = useState(0);
  const items = ['✨ 혜택 1: 신규 가입 10,000p', '🚀 혜택 2: AI 자동 코드 생성', '🔥 혜택 3: 무제한 UI 템플릿'];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">
        LIST-03 • Carousel / Slider Card
      </span>

      <div className="w-full max-w-xs h-36 bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
            PROMO BANNER
          </span>
          <span className="text-[10px] font-mono text-gray-500">{index + 1} / {items.length}</span>
        </div>

        <p className="text-sm font-extrabold text-white z-10">{items[index]}</p>

        <div className="flex justify-between items-center z-10">
          <div className="flex gap-1">
            {items.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-500 w-4' : 'bg-gray-700'} transition-all`} />
            ))}
          </div>
          <div className="flex gap-1">
            <button onClick={() => setIndex((i) => (i === 0 ? items.length - 1 : i - 1))} className="p-1 bg-slate-800 rounded-lg text-gray-300">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setIndex((i) => (i === items.length - 1 ? 0 : i + 1))} className="p-1 bg-slate-800 rounded-lg text-gray-300">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
