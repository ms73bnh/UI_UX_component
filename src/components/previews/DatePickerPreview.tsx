'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export const DatePickerPreview: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [currentMonth, setCurrentMonth] = useState<'9월' | '10월'>('9월');

  const daysInSeptember = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold mb-1">
          DATE-01 • Date Picker
        </span>
        <h3 className="text-white font-bold text-lg">날짜 선택기</h3>
        <p className="text-gray-400 text-xs">달력 피커 대화상자 및 일단위 선택 컨트롤</p>
      </div>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-extrabold text-sm">2026년 {currentMonth}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentMonth('9월')}
              className={`p-1.5 rounded-lg border transition-colors ${
                currentMonth === '9월' ? 'border-gray-700 text-gray-400' : 'border-gray-700 text-white hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentMonth('10월')}
              className={`p-1.5 rounded-lg border transition-colors ${
                currentMonth === '10월' ? 'border-gray-700 text-gray-400' : 'border-gray-700 text-white hover:bg-slate-800'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
            <span key={day} className={`text-xs font-bold ${idx === 0 ? 'text-rose-400' : 'text-gray-500'}`}>
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Offset for 1st day of month (Tuesday = 2 offset) */}
          <div className="h-9" />
          <div className="h-9" />

          {daysInSeptember.map((day) => {
            const isSelected = day === selectedDay;
            const isToday = day === 7;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105'
                    : isToday
                    ? 'border border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Selected Display */}
        <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
          <span className="text-gray-400">선택된 날짜:</span>
          <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            2026. 09. {selectedDay.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};
