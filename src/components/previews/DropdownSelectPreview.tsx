'use client';

import React, { useState } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DropdownSelectPreview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('대한민국 (KRW ₩)');

  const countries = [
    '대한민국 (KRW ₩)',
    '미국 (USD $)',
    '일본 (JPY ¥)',
    '유럽 연합 (EUR €)',
    '영국 (GBP £)',
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-09 • Dropdown Select
        </span>
        <h3 className="text-white font-bold text-lg">드롭다운 셀렉트 메뉴</h3>
        <p className="text-gray-400 text-xs">옵션 선택 리스트가 아래로 열리는 표준 드롭다운 메뉴</p>
      </div>

      <div className="w-full max-w-xs relative">
        {/* Trigger Select Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-3.5 bg-slate-900 border border-gray-700 hover:border-gray-500 rounded-2xl cursor-pointer select-none shadow-xl transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>{selectedCountry}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Options Box */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 z-30 bg-slate-900 border border-gray-700 rounded-2xl p-2 shadow-2xl overflow-hidden mt-1"
            >
              {countries.map((c) => {
                const isSelected = c === selectedCountry;
                return (
                  <div
                    key={c}
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-gray-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{c}</span>
                    {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
