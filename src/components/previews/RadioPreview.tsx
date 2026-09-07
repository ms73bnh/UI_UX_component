'use client';

import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, CheckCircle2 } from 'lucide-react';

export const RadioPreview: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'pay' | 'bank'>('card');

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-02 • Radio Button
        </span>
        <h3 className="text-white font-bold text-lg">라디오 단일 선택 버튼</h3>
        <p className="text-gray-400 text-xs">그룹 내 단 하나의 옵션만 동시 선택 가능한 컨트롤</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          결제 수단 선택
        </span>

        {/* Option 1: Card */}
        <div
          onClick={() => setSelectedMethod('card')}
          className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
            selectedMethod === 'card'
              ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
              : 'bg-slate-800/60 border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === 'card' ? 'border-purple-400 bg-purple-500' : 'border-gray-500 bg-transparent'
            }`}>
              {selectedMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white">신용 / 체크카드</span>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 bg-slate-800 px-2 py-0.5 rounded-md">일시불/할부</span>
        </div>

        {/* Option 2: Pay */}
        <div
          onClick={() => setSelectedMethod('pay')}
          className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
            selectedMethod === 'pay'
              ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
              : 'bg-slate-800/60 border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === 'pay' ? 'border-purple-400 bg-purple-500' : 'border-gray-500 bg-transparent'
            }`}>
              {selectedMethod === 'pay' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">간편결제 (카카오/네이버페이)</span>
            </div>
          </div>
          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md font-bold">1초 결제</span>
        </div>

        {/* Option 3: Bank */}
        <div
          onClick={() => setSelectedMethod('bank')}
          className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
            selectedMethod === 'bank'
              ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
              : 'bg-slate-800/60 border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === 'bank' ? 'border-purple-400 bg-purple-500' : 'border-gray-500 bg-transparent'
            }`}>
              {selectedMethod === 'bank' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">실시간 계좌이체</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
