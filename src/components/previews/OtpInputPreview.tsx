'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export const OtpInputPreview: React.FC = () => {
  const [pinLength, setPinLength] = useState<4 | 6>(6);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleLengthChange = (length: 4 | 6) => {
    setPinLength(length);
    setOtp(Array(length).fill(''));
    setIsSuccess(false);
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < pinLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pasteData)) return;

    const digits = pasteData.slice(0, pinLength).split('');
    const newOtp = [...Array(pinLength)].map((_, i) => digits[i] || '');
    setOtp(newOtp);

    if (digits.length >= pinLength) {
      setIsSuccess(true);
      inputRefs.current[pinLength - 1]?.focus();
    } else {
      inputRefs.current[digits.length]?.focus();
    }
  };

  const handleReset = () => {
    setOtp(Array(pinLength).fill(''));
    setIsSuccess(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-900 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-gray-700">
        <button
          onClick={() => handleLengthChange(4)}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            pinLength === 4 ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          4자리 PIN
        </button>
        <button
          onClick={() => handleLengthChange(6)}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            pinLength === 6 ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          6자리 OTP
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-1">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-white font-bold text-lg">2단계 본인 인증</h3>
        <p className="text-gray-400 text-xs max-w-xs">
          등록된 휴대폰으로 전송된 {pinLength}자리 인증번호를 입력하세요.
        </p>
      </div>

      <div className="flex gap-2 sm:gap-3 my-2" onPaste={handlePaste}>
        {Array.from({ length: pinLength }).map((_, index) => (
          <motion.div
            key={index}
            animate={{ scale: otp[index] ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <input
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-extrabold rounded-xl border outline-none transition-all ${
                isSuccess
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : otp[index]
                  ? 'border-blue-500 bg-blue-950/30 text-white shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                  : 'border-gray-700 bg-gray-800 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-emerald-400 font-semibold text-sm bg-emerald-950/50 px-4 py-2 rounded-xl border border-emerald-800/50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>인증번호 확인 완료!</span>
        </motion.div>
      )}

      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>초기화</span>
      </button>
    </div>
  );
};
