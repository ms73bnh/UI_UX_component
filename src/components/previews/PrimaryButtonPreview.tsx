'use client';

import React, { useState } from 'react';
import { Loader2, ArrowRight, Check } from 'lucide-react';

export const PrimaryButtonPreview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setIsSuccess(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4 bg-slate-50 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full max-w-xs py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-80 cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>처리 중...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>완료되었습니다</span>
          </>
        ) : (
          <>
            <span>지금 시작하기</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
      <span className="text-xs text-gray-500">버튼을 클릭하여 Loading 및 Active 모션을 테스트하세요</span>
    </div>
  );
};
