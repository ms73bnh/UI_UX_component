'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';

export const DateRangePickerPreview: React.FC = () => {
  const [startDate, setStartDate] = useState<number>(10);
  const [endDate, setEndDate] = useState<number>(18);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleDayClick = (day: number) => {
    if (day < startDate || (startDate !== endDate && day > startDate && day > endDate)) {
      setStartDate(day);
      setEndDate(day);
    } else if (day >= startDate) {
      setEndDate(day);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold mb-1">
          DATE-02 • Date Range Picker
        </span>
        <h3 className="text-white font-bold text-lg">날짜 범위 선택기</h3>
        <p className="text-gray-400 text-xs">시작일과 체크아웃/종료일 범위 캘린더 선택기</p>
      </div>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Selected Range Display Header */}
        <div className="flex items-center justify-between p-3 bg-slate-800/80 rounded-2xl border border-gray-700/60 text-xs">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>09.{startDate.toString().padStart(2, '0')}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
          <div className="flex items-center gap-1.5 text-white font-bold">
            <span>09.{endDate.toString().padStart(2, '0')}</span>
          </div>
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-extrabold rounded-md text-[10px]">
            {endDate - startDate + 1}박
          </span>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-500">
          {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          <div className="h-8" />
          <div className="h-8" />
          {days.map((day) => {
            const isStart = day === startDate;
            const isEnd = day === endDate;
            const inRange = day >= startDate && day <= endDate;

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`h-8 text-xs font-bold rounded-lg transition-all ${
                  isStart || isEnd
                    ? 'bg-emerald-500 text-slate-950 font-black scale-105 shadow-md z-10'
                    : inRange
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-gray-400 hover:bg-slate-800'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
