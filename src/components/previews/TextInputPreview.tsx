'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const TextInputPreview: React.FC<{ variant?: string; state?: string }> = ({
  variant,
  state,
}) => {
  const [val, setVal] = useState('antigravity@vibecoding.dev');
  const [showPassword, setShowPassword] = useState(false);

  const isError = state === 'Error';
  const isDisabled = state === 'Disabled';
  const isLoading = state === 'Loading';
  const isPassword = variant === 'Password';

  return (
    <div className="w-full max-w-sm mx-auto p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
          이메일 주소 <span className="text-red-500">*</span>
        </label>
        <span className="text-[10px] font-mono text-gray-400">INPUT-01</span>
      </div>

      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          disabled={isDisabled}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="example@domain.com"
          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium transition-all outline-none ${
            isError
              ? 'border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500/20'
              : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
        />

        {val && !isDisabled && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setVal('')}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {isError ? (
        <div className="flex items-center gap-1 text-[11px] font-semibold text-red-500">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>올바른 이메일 형식이 아닙니다.</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>사용 가능한 이메일입니다.</span>
        </div>
      )}
    </div>
  );
};
