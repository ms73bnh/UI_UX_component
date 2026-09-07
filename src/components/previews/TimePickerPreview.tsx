'use client';

import React, { useState } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

export const TimePickerPreview: React.FC = () => {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(30);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');

  const incrementHour = () => setHour((h) => (h === 12 ? 1 : h + 1));
  const decrementHour = () => setHour((h) => (h === 1 ? 12 : h - 1));

  const incrementMinute = () => setMinute((m) => (m >= 55 ? 0 : m + 5));
  const decrementMinute = () => setMinute((m) => (m <= 0 ? 55 : m - 5));

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold mb-1">
          DATE-08 • Time Picker
        </span>
        <h3 className="text-white font-bold text-lg">시:분 시간 선택기</h3>
        <p className="text-gray-400 text-xs">시간, 분, 오리엔테이션 AM/PM 설정 피커</p>
      </div>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-5">
        {/* Time Selector Controls */}
        <div className="flex items-center gap-4">
          {/* Hour Column */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={incrementHour}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <span className="text-3xl font-black font-mono text-white w-12 text-center my-1">
              {hour.toString().padStart(2, '0')}
            </span>
            <button
              onClick={decrementHour}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <span className="text-2xl font-black text-blue-500 font-mono">:</span>

          {/* Minute Column */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={incrementMinute}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <span className="text-3xl font-black font-mono text-white w-12 text-center my-1">
              {minute.toString().padStart(2, '0')}
            </span>
            <button
              onClick={decrementMinute}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* AM / PM Toggle Column */}
          <div className="flex flex-col gap-1.5 ml-2">
            <button
              onClick={() => setAmpm('AM')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                ampm === 'AM'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              AM
            </button>
            <button
              onClick={() => setAmpm('PM')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                ampm === 'PM'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Selected Result Box */}
        <div className="w-full py-2.5 px-4 bg-slate-800/80 rounded-2xl border border-gray-700/60 flex items-center justify-between text-xs">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" /> 지정 시간:
          </span>
          <span className="font-mono font-bold text-white bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 text-sm">
            {ampm} {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};
