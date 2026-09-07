'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, CreditCard, ChevronRight, Check, Sparkles } from 'lucide-react';

// MOTION-01 Press Scale
export const PressScalePreview: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">
        MOTION-01 • Press Scale Animation
      </span>

      <div className="w-full max-w-xs flex flex-col items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer select-none"
        >
          <MousePointerClick className="w-4 h-4" />
          <span>클릭하여 축소 모션 테스트 (Scale 0.92)</span>
        </motion.button>
        <p className="text-xs text-gray-500 text-center">버튼이나 카드를 클릭할 때 터치 피드백을 주는 미세 모션</p>
      </div>
    </div>
  );
};

// MOTION-02 Spring Layout Tab
export const SpringTabPreview: React.FC = () => {
  const [active, setActive] = useState('Design');
  const tabs = ['Design', 'Development', 'Marketing'];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold">
        MOTION-02 • Spring Layout Shift Tab
      </span>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-4 shadow-2xl flex flex-col gap-4">
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-gray-800 relative">
          {tabs.map((tab) => {
            const isSelected = active === tab;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`flex-1 py-2 text-xs font-bold relative z-10 transition-colors ${
                  isSelected ? 'text-white font-black' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
                {isSelected && (
                  <motion.div
                    layoutId="springTabHighlight"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-amber-500 rounded-xl -z-10 shadow-md"
                  />
                )}
              </button>
            );
          })}
        </div>
        <div className="p-4 bg-slate-800/60 rounded-2xl border border-gray-700 text-xs text-gray-300 text-center font-medium">
          {active} 파션 콘텐츠 뷰어
        </div>
      </div>
    </div>
  );
};

// PATTERNS-02 Onboarding Slide
export const OnboardingPreview: React.FC = () => {
  const [step, setStep] = useState(0);
  const slides = [
    { title: 'AI 바이브 코딩 파트너', desc: '컴포넌트 탐색 및 실시간 인터랙션 테스트' },
    { title: '1-Click 프롬프트 생성', desc: '선택한 컴포넌트의 맞춤 AI 프롬프트 자동 복사' },
    { title: '재사용 디자인 시스템', desc: 'Next.js, React Native 프로젝트에 즉시 탑재' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">
        PATTERNS-02 • Onboarding Slide Guide
      </span>

      <div className="w-full max-w-xs h-64 bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
            STEP {step + 1} / 3
          </span>
          <button onClick={() => setStep(2)} className="text-[10px] text-gray-500 hover:text-white">건너뛰기</button>
        </div>

        <div className="flex flex-col gap-2 z-10 my-auto">
          <h4 className="text-white font-extrabold text-lg leading-tight">{slides[step].title}</h4>
          <p className="text-xs text-gray-400 leading-relaxed">{slides[step].desc}</p>
        </div>

        <div className="flex justify-between items-center z-10">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-purple-500 w-5' : 'bg-gray-700'} transition-all`} />
            ))}
          </div>
          <button
            onClick={() => setStep((s) => (s < 2 ? s + 1 : 0))}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1"
          >
            {step === 2 ? '시작하기' : '다음'} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// PATTERNS-03 Checkout Payment Flow
export const PaymentFlowPreview: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
        PATTERNS-03 • Checkout & Payment Step Flow
      </span>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-emerald-400" /> 주문 결제 승인
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">₩29,000</span>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>상품명</span>
            <span className="text-white font-medium">Vibe UI Kit Pro Plan</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>결제 수단</span>
            <span className="text-white font-medium">신용카드 (•••• 4532)</span>
          </div>
        </div>

        <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5">
          <Check className="w-4 h-4 stroke-[3]" /> ₩29,000 결제하기
        </button>
      </div>
    </div>
  );
};
