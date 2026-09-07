'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, PhoneCall, Timer, Music, Mic, Check, Volume2 } from 'lucide-react';

type Mode = 'idle' | 'music' | 'call' | 'timer';

export const DynamicIslandPreview: React.FC = () => {
  const [mode, setMode] = useState<Mode>('music');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerCount, setTimerCount] = useState(45);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === 'timer') {
      interval = setInterval(() => {
        setTimerCount((t) => (t > 0 ? t - 1 : 60));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="w-full flex flex-col items-center justify-between p-8 bg-slate-950 rounded-2xl border border-gray-800 min-h-[380px] relative overflow-hidden">
      {/* Top mode control buttons */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-gray-800 z-10">
        <button
          onClick={() => { setMode('music'); setIsExpanded(false); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            mode === 'music' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-3.5 h-3.5" /> 음악 재생
        </button>
        <button
          onClick={() => { setMode('call'); setIsExpanded(false); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            mode === 'call' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" /> 통화 연결
        </button>
        <button
          onClick={() => { setMode('timer'); setIsExpanded(false); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            mode === 'timer' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Timer className="w-3.5 h-3.5" /> 타이머
        </button>
      </div>

      {/* Dynamic Island Container simulated screen */}
      <div className="w-full max-w-sm h-64 bg-slate-900 rounded-3xl border border-gray-800 p-4 flex flex-col items-center relative shadow-2xl">
        {/* Dynamic Island Pill */}
        <motion.div
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`bg-black border border-gray-800 text-white cursor-pointer shadow-2xl overflow-hidden flex items-center ${
            isExpanded
              ? 'w-full h-36 rounded-[28px] p-4 flex-col justify-between'
              : mode === 'music'
              ? 'w-[200px] h-[38px] rounded-full px-3 justify-between'
              : mode === 'call'
              ? 'w-[210px] h-[38px] rounded-full px-3 justify-between'
              : 'w-[180px] h-[38px] rounded-full px-3 justify-between'
          }`}
        >
          {/* Collapsed view */}
          {!isExpanded && (
            <>
              {mode === 'music' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                      <Music className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-bold truncate max-w-[90px]">New Jeans - ETA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-1 h-4 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </>
              )}

              {mode === 'call' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <PhoneCall className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-bold text-emerald-400">02:45</span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">김개발 팀장</span>
                </>
              )}

              {mode === 'timer' && (
                <>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-amber-400 animate-spin [animation-duration:4s]" />
                    <span className="text-xs font-mono font-bold text-amber-400">00:{timerCount.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </>
              )}
            </>
          )}

          {/* Expanded view */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full h-full flex flex-col justify-between"
            >
              {mode === 'music' && (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">ETA</h4>
                        <p className="text-xs text-gray-400">NewJeans - Get Up</p>
                      </div>
                    </div>
                    <Volume2 className="w-5 h-5 text-gray-400" />
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden my-1">
                    <div className="bg-purple-500 h-full w-2/3 rounded-full" />
                  </div>
                  {/* Controls */}
                  <div className="flex items-center justify-center gap-6 w-full">
                    <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} className="p-2 rounded-full bg-white text-black hover:scale-105 transition-transform">
                      {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black" />}
                    </button>
                  </div>
                </>
              )}

              {mode === 'call' && (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                        <PhoneCall className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">김개발 팀장</h4>
                        <p className="text-xs text-emerald-400">통화 중 • 02:45</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 w-full">
                    <button className="p-2.5 rounded-full bg-red-600 text-white font-semibold text-xs px-4">
                      통화 종료
                    </button>
                  </div>
                </>
              )}

              {mode === 'timer' && (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Timer className="w-8 h-8 text-amber-400" />
                      <div>
                        <h4 className="text-xs text-gray-400">타이머</h4>
                        <p className="text-xl font-mono font-extrabold text-amber-400">00:{timerCount.toString().padStart(2, '0')}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold">
                      일시정지
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>

        <p className="text-[11px] text-gray-500 mt-auto">
          알약을 클릭하면 상세 펼치기 모드로 전환됩니다.
        </p>
      </div>
    </div>
  );
};
