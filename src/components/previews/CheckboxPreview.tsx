'use client';

import React, { useState } from 'react';
import { Check, Square, Minus } from 'lucide-react';

export const CheckboxPreview: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    terms: true,
    privacy: true,
    marketing: false,
  });

  const allChecked = Object.values(checkedItems).every(Boolean);
  const isIndeterminate = Object.values(checkedItems).some(Boolean) && !allChecked;

  const toggleAll = () => {
    const nextState = !allChecked;
    setCheckedItems({
      terms: nextState,
      privacy: nextState,
      marketing: nextState,
    });
  };

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-01 • Checkbox
        </span>
        <h3 className="text-white font-bold text-lg">체크박스 컨트롤</h3>
        <p className="text-gray-400 text-xs">전체 선택/해제, 개별 선택 및 Indeterminate(일부 선택) 상태</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-3">
        {/* Toggle All Master Checkbox */}
        <div
          onClick={toggleAll}
          className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-gray-700 cursor-pointer select-none hover:border-gray-600 transition-colors"
        >
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
              allChecked
                ? 'bg-blue-600 border border-blue-600 text-white'
                : isIndeterminate
                ? 'bg-blue-600/40 border border-blue-500 text-blue-300'
                : 'border border-gray-600 bg-slate-900'
            }`}
          >
            {allChecked ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : isIndeterminate ? (
              <Minus className="w-3.5 h-3.5 stroke-[3]" />
            ) : null}
          </div>
          <span className="text-sm font-bold text-white">전체 약관 동의하기</span>
        </div>

        <div className="h-px bg-gray-800 my-1" />

        {/* Individual Items */}
        <div className="flex flex-col gap-2">
          <div
            onClick={() => toggleItem('terms')}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/50 cursor-pointer select-none transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                  checkedItems.terms
                    ? 'bg-blue-600 border border-blue-600 text-white'
                    : 'border border-gray-600 bg-slate-900'
                }`}
              >
                {checkedItems.terms && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-gray-300 font-medium">[필수] 서비스 이용약관 동의</span>
            </div>
            <span className="text-[10px] text-blue-400 font-bold">보기</span>
          </div>

          <div
            onClick={() => toggleItem('privacy')}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/50 cursor-pointer select-none transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                  checkedItems.privacy
                    ? 'bg-blue-600 border border-blue-600 text-white'
                    : 'border border-gray-600 bg-slate-900'
                }`}
              >
                {checkedItems.privacy && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-gray-300 font-medium">[필수] 개인정보 수집 및 이용</span>
            </div>
            <span className="text-[10px] text-blue-400 font-bold">보기</span>
          </div>

          <div
            onClick={() => toggleItem('marketing')}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/50 cursor-pointer select-none transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                  checkedItems.marketing
                    ? 'bg-blue-600 border border-blue-600 text-white'
                    : 'border border-gray-600 bg-slate-900'
                }`}
              >
                {checkedItems.marketing && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-gray-300 font-medium">[선택] 마케팅 정보 수신 동의</span>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">선택</span>
          </div>
        </div>
      </div>
    </div>
  );
};
