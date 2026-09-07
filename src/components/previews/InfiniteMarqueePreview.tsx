'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Zap, Sparkles, Heart } from 'lucide-react';

export const InfiniteMarqueePreview: React.FC = () => {
  const reviews = [
    { name: '김태희 팀장', company: 'Naver Labs', text: 'Vibe UI Kit 덕분에 개발 속도가 3배 빨라졌습니다!' },
    { name: '박준형 리드', company: 'Toss', text: '프롬프트 생성 기능이 v0와 완벽하게 호환됩니다.' },
    { name: '이소연 수석', company: 'Kakao', text: '인터랙티브 모션 프리뷰가 매우 직관적입니다.' },
    { name: 'Choi Alex', company: 'Line Global', text: 'Next.js App Router 디자인 시스템의 정석!' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px] overflow-hidden">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full text-xs font-bold mb-1">
          MOTION-10 • Infinite Marquee Banner
        </span>
        <h3 className="text-white font-bold text-lg">무한 자동 롤링 마키 배너</h3>
        <p className="text-gray-400 text-xs">Magic UI 스타일 끊김 없는 수평 무한 스크롤 애니메이션</p>
      </div>

      {/* Marquee Row Container */}
      <div className="w-full relative flex overflow-hidden py-2 mask-radial-fade">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 15, repeat: Infinity }}
          className="flex gap-4 whitespace-nowrap flex-nowrap"
        >
          {[...reviews, ...reviews].map((r, idx) => (
            <div
              key={idx}
              className="w-64 p-4 rounded-2xl bg-slate-900 border border-gray-800 shadow-xl flex-shrink-0 flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">
                    {r.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">{r.name}</h5>
                    <p className="text-[10px] text-gray-500">{r.company}</p>
                  </div>
                </div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-gray-300 whitespace-normal line-clamp-2">{r.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
