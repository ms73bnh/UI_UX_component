'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Image as ImageIcon, Sparkles } from 'lucide-react';

export const SkeletonPreview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex items-center justify-between w-full max-w-sm">
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">
          FEED-04 • Skeleton Placeholder
        </span>
        <button
          onClick={() => setIsLoading(!isLoading)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-gray-700 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? '로딩 상태' : '로딩 완료'}</span>
        </button>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        {isLoading ? (
          // Skeleton Pulse Shimmer State
          <div className="flex flex-col gap-3 animate-pulse">
            {/* Banner Skeleton */}
            <div className="w-full h-36 bg-slate-800 rounded-2xl flex items-center justify-center text-gray-700">
              <ImageIcon className="w-8 h-8 opacity-40" />
            </div>

            {/* Avatar & Title Skeleton */}
            <div className="flex items-center gap-3 mt-1">
              <div className="w-11 h-11 bg-slate-800 rounded-full flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-3/4 h-4 bg-slate-800 rounded-md" />
                <div className="w-1/2 h-3 bg-slate-800/60 rounded-md" />
              </div>
            </div>

            {/* Body Text Lines Skeleton */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="w-full h-3 bg-slate-800/80 rounded-md" />
              <div className="w-5/6 h-3 bg-slate-800/80 rounded-md" />
              <div className="w-2/3 h-3 bg-slate-800/60 rounded-md" />
            </div>
          </div>
        ) : (
          // Loaded Real Content State
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="w-full h-36 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <div className="flex items-center gap-3 mt-1">
              <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                UI
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">스켈레톤 UI 로딩 컴포넌트</h4>
                <p className="text-xs text-gray-400">실제 데이터 렌더링이 완료되었습니다.</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mt-1">
              네트워크 비동기 요청 중 사용자가 빈 화면을 보며 이탈하지 않도록 UI 레이아웃의 윤곽을 미세 펄스 애니메이션으로 미리 노출합니다.
            </p>
          </motion.div>
        )}
      </div>

      <p className="text-[11px] text-gray-500">
        상단 [로딩 상태] 버튼을 눌러 스켈레톤과 실제 데이터 간의 전환을 테스트하세요.
      </p>
    </div>
  );
};
