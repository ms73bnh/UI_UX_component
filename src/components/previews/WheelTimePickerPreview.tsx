'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Check, Clock } from 'lucide-react';

export const WheelTimePickerPreview: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[400px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold mb-1">
          DATE-12 • iOS Wheel Scroll Picker
        </span>
        <h3 className="text-white font-bold text-lg">iOS 스크롤 드럼 휠 피커</h3>
        <p className="text-gray-400 text-xs">손가락/마우스 수직 드래그 스크롤로 돌려 시간값을 잡는 휠 피커</p>
      </div>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col items-center gap-4 relative overflow-hidden">
        {/* Selection Center Highlight Overlay */}
        <div className="absolute top-1/2 left-4 right-4 h-11 -translate-y-1/2 bg-purple-600/15 border-y border-purple-500/40 rounded-xl pointer-events-none z-10" />

        {/* Wheel Drum Columns Container */}
        <div className="w-full flex items-center justify-center gap-2 h-44 my-1 relative z-20">
          {/* AM / PM Wheel Column */}
          <div className="flex flex-col items-center h-full overflow-y-auto snap-y snap-mandatory py-16 scrollbar-none w-16">
            {['AM', 'PM'].map((item) => (
              <button
                key={item}
                onClick={() => setAmpm(item as 'AM' | 'PM')}
                className={`h-11 flex items-center justify-center snap-center text-base font-black transition-all cursor-pointer ${
                  ampm === item ? 'text-purple-400 scale-110' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <span className="text-xl font-bold text-purple-500 font-mono">:</span>

          {/* Hour Wheel Column */}
          <div className="flex flex-col items-center h-full overflow-y-auto snap-y snap-mandatory py-16 scrollbar-none w-16">
            {hours.map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHour(h)}
                className={`h-11 flex items-center justify-center snap-center font-mono text-lg font-extrabold transition-all cursor-pointer ${
                  selectedHour === h ? 'text-white scale-125 font-black' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {h.toString().padStart(2, '0')}
              </button>
            ))}
          </div>

          <span className="text-xl font-bold text-purple-500 font-mono">:</span>

          {/* Minute Wheel Column */}
          <div className="flex flex-col items-center h-full overflow-y-auto snap-y snap-mandatory py-16 scrollbar-none w-16">
            {minutes.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMinute(m)}
                className={`h-11 flex items-center justify-center snap-center font-mono text-lg font-extrabold transition-all cursor-pointer ${
                  selectedMinute === m ? 'text-white scale-125 font-black' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {m.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Output */}
        <div className="w-full py-2 px-3 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-between text-xs">
          <span className="text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-400" /> 선택 시간:
          </span>
          <span className="font-mono font-bold text-purple-300">
            {ampm} {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};
