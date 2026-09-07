'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, User, Mail, CreditCard, Sparkles } from 'lucide-react';

export const FormWizardPreview: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ name: '홍길동', email: 'vibe@example.com', plan: 'Pro Plan ($29/mo)' });

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[420px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold mb-1">
          PATTERNS-01 • Form Wizard
        </span>
        <h3 className="text-white font-bold text-lg">단계별 폼 위저드 UX</h3>
        <p className="text-gray-400 text-xs">단계별 진행률과 폼 슬라이딩 트랜지션 흐름</p>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between relative mb-6">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2 -z-0" />
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-amber-500 -translate-y-1/2 z-0"
            animate={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          {[1, 2, 3].map((step) => {
            const isDone = currentStep > step;
            const isCurrent = currentStep === step;
            return (
              <div
                key={step}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isDone
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : isCurrent
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 font-black shadow-lg scale-110'
                    : 'bg-slate-800 text-gray-400 border border-gray-700'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : step}
              </div>
            );
          })}
        </div>

        {/* Form Step Content */}
        <div className="min-h-[160px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-3"
              >
                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" /> 1단계: 기본 인적사항
                </h4>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-gray-400 font-medium">이름</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-gray-700 rounded-xl text-white text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-3"
              >
                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" /> 2단계: 계정 정보
                </h4>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-gray-400 font-medium">이메일 주소</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-gray-700 rounded-xl text-white text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-3"
              >
                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" /> 3단계: 요금제 선택 & 완료
                </h4>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs flex flex-col gap-1">
                  <span className="text-amber-400 font-bold">입력 정보 확인</span>
                  <span className="text-gray-300">이름: {formData.name}</span>
                  <span className="text-gray-300">이메일: {formData.email}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step Action Buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs border transition-all ${
              currentStep === 1
                ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                : 'border-gray-700 text-gray-300 hover:bg-slate-800'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> 이전
          </button>

          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-amber-400 transition-all active:scale-95"
            >
              다음 단계 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => alert('폼 제출 완료!')}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-emerald-400 transition-all active:scale-95"
            >
              제출 및 완료 <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
