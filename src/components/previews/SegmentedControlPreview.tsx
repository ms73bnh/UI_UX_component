'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const SegmentedControlPreview: React.FC<{ variant?: string; state?: string }> = ({
  variant,
}) => {
  const options = variant === 'Compact' ? ['일간', '주간', '월간'] : ['전체보기', '진행중', '결제완료', '취소/환불'];
  const [active, setActive] = useState(options[0]);

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center gap-3">
      <div className="w-full inline-flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        {options.map((opt) => {
          const isActive = active === opt;
          return (
            <button
              key={opt}
              onClick={() => setActive(opt)}
              className="flex-1 relative py-2 text-xs font-bold transition-colors z-10 text-center cursor-pointer select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="segmented-bg-active"
                  className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className={isActive ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-gray-600 dark:text-gray-400'}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-[11px] font-semibold text-gray-500">
        현재 선택된 필터: <strong className="text-blue-600 dark:text-blue-400">{active}</strong>
      </span>
    </div>
  );
};
