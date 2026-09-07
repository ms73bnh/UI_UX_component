'use client';

import React, { useState } from 'react';
import { Clock, Sliders } from 'lucide-react';

export const TimeRangeSliderPreview: React.FC = () => {
  const [startHour, setStartHour] = useState(10);
  const [endHour, setEndHour] = useState(16);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold mb-1">
          DATE-11 • Time Range Slider
        </span>
        <h3 className="text-white font-bold text-lg">시간 범위 슬라이더</h3>
        <p className="text-gray-400 text-xs">시작 시각과 종료 시각 타임 슬롯 스팬 조절 피커</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-5">
        {/* Timeline Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>선택된 타임슬롯</span>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20">
            {startHour.toString().padStart(2, '0')}:00 ~ {endHour.toString().padStart(2, '0')}:00 ({endHour - startHour}시간)
          </span>
        </div>

        {/* Start Hour Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-medium">시작 시각:</span>
            <span className="text-white font-mono font-bold">{startHour}:00 AM</span>
          </div>
          <input
            type="range"
            min={6}
            max={endHour - 1}
            value={startHour}
            onChange={(e) => setStartHour(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        {/* End Hour Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-medium">종료 시각:</span>
            <span className="text-white font-mono font-bold">{endHour}:00 PM</span>
          </div>
          <input
            type="range"
            min={startHour + 1}
            max={22}
            value={endHour}
            onChange={(e) => setEndHour(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Timeline Graphic View */}
        <div className="mt-2 pt-4 border-t border-gray-800">
          <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>22:00</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full relative overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              style={{
                left: `${((startHour - 6) / 16) * 100}%`,
                width: `${((endHour - startHour) / 16) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
