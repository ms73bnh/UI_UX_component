'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface DateScrollerPreviewProps {
  daysCount?: number;
  showMonthHeader?: boolean;
}

export const DateScrollerPreview: React.FC<DateScrollerPreviewProps> = ({
  daysCount = 14,
  showMonthHeader = true,
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

  const days = Array.from({ length: daysCount }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i - 3);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return {
      fullDate: d,
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      month: d.getMonth() + 1,
      isToday: i === 3,
    };
  });

  const currentMonthName = new Date().toLocaleDateString('ko-KR', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full bg-slate-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-inner">
      {showMonthHeader && (
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-gray-900 dark:text-white text-base">{currentMonthName}</h4>
          </div>
          <div className="flex gap-1 text-xs font-semibold text-gray-500 bg-white dark:bg-gray-900 border px-2.5 py-1 rounded-full shadow-xs">
            선택된 날짜: <span className="text-blue-600 dark:text-blue-400">{selectedDate}일</span>
          </div>
        </div>
      )}

      <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory px-1">
        {days.map((item, idx) => {
          const isSelected = selectedDate === item.dayNum;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(item.dayNum)}
              className={`flex-shrink-0 w-16 h-22 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 snap-center border cursor-pointer select-none ${
                isSelected
                  ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-blue-400/50'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-gray-850'
              }`}
            >
              <span className={`text-xs font-semibold ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {item.dayName}
              </span>
              <span className="text-2xl font-bold mt-1 tracking-tight">{item.dayNum}</span>
              <div className="h-2 flex items-center justify-center mt-1">
                {item.isToday ? (
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${isSelected ? 'bg-white text-blue-700' : 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400'}`}>
                    오늘
                  </span>
                ) : isSelected ? (
                  <Check className="w-3 h-3 text-white" />
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
