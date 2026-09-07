'use client';

import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';

export const StepperPreview: React.FC = () => {
  const [quantity, setQuantity] = useState(2);
  const unitPrice = 28000;

  const increment = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-07 • Stepper Counter
        </span>
        <h3 className="text-white font-bold text-lg">수량 조절 스티퍼</h3>
        <p className="text-gray-400 text-xs">증가/감소 버튼 기반 정확한 아이템 수량 변경 컨트롤</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-semibold">상품 주문 수량</span>
          <span className="text-xs text-amber-400 font-bold">단가 ₩{unitPrice.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-800/80 rounded-2xl border border-gray-700/60">
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              disabled={quantity <= 1}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                quantity <= 1
                  ? 'border-gray-800 bg-slate-900 text-gray-600 cursor-not-allowed'
                  : 'border-gray-700 bg-slate-800 text-white hover:bg-slate-700 active:scale-95'
              }`}
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-12 text-center text-xl font-mono font-extrabold text-white">
              {quantity}
            </span>

            <button
              onClick={increment}
              className="w-9 h-9 rounded-xl border border-gray-700 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-500 block uppercase">총 금액</span>
            <span className="text-base font-mono font-extrabold text-amber-400">
              ₩{(quantity * unitPrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
