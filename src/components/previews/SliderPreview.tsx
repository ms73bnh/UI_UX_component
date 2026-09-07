'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Sliders } from 'lucide-react';

export const SliderPreview: React.FC = () => {
  const [volume, setVolume] = useState(70);
  const [priceRange, setPriceRange] = useState(150000);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-08 • Slider Range
        </span>
        <h3 className="text-white font-bold text-lg">연속 슬라이더 컨트롤</h3>
        <p className="text-gray-400 text-xs">드래그 트랙을 통해 가격, 음량, 밝기 등 수치를 조절하는 슬라이더</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-5">
        {/* Slider Item 1: Volume Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-semibold flex items-center gap-1.5">
              {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              시스템 볼륨 조절
            </span>
            <span className="text-white font-mono font-bold">{volume}%</span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        <div className="h-px bg-gray-800" />

        {/* Slider Item 2: Price Filter Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-semibold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-400" />
              최대 가격 범위 지정
            </span>
            <span className="text-emerald-400 font-mono font-bold">₩{priceRange.toLocaleString()}</span>
          </div>

          <input
            type="range"
            min={10000}
            max={500000}
            step={10000}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
