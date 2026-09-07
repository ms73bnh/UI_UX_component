'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, Check, Share2, Bookmark, Heart } from 'lucide-react';

export const BottomSheetPreview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4 bg-slate-50 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold flex items-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>바텀 시트 열기</span>
      </button>

      {selectedOption && (
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
          최근 선택된 옵션: {selectedOption}
        </span>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 z-40 rounded-2xl backdrop-blur-xs"
            />

            {/* Sheet Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl p-5 z-50 shadow-2xl border-t border-gray-200 dark:border-gray-800"
            >
              {/* Drag Handle */}
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">빠른 작업 선택</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                {[
                  { id: 'share', label: '친구에게 공유하기', icon: Share2 },
                  { id: 'save', label: '북마크에 저장', icon: Bookmark },
                  { id: 'like', label: '좋아요 목록에 추가', icon: Heart },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedOption(item.label);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-500" />
                        <span>{item.label}</span>
                      </div>
                      {selectedOption === item.label && <Check className="w-5 h-5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
