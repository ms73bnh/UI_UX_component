'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Check } from 'lucide-react';

export const CreditCardInputPreview: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890');
  const [cardHolder, setCardHolder] = useState('HONG GILDONG');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('789');
  const [isFlipped, setIsFlipped] = useState(false);

  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    return parts ? parts.join(' ') : raw;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[420px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold mb-1">
          INPUT-09 • Credit Card 3D Flip Form
        </span>
        <h3 className="text-white font-bold text-lg">신용카드 3D 회전 포맷터</h3>
        <p className="text-gray-400 text-xs">카드 번호 자동 하이픈 및 CVC 입력 시 3D 회전 카드 인터랙션</p>
      </div>

      {/* 3D Card Display */}
      <div className="w-full max-w-xs h-44 relative perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="w-full h-full relative preserve-3d shadow-2xl rounded-2xl"
        >
          {/* Card Front */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-900 border border-gray-700/80 rounded-2xl p-5 text-white flex flex-col justify-between backface-hidden shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold tracking-widest text-blue-300 uppercase">VIBE CARD</span>
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>

            <div className="font-mono text-lg tracking-widest font-bold my-2 text-white">
              {cardNumber || '•••• •••• •••• ••••'}
            </div>

            <div className="flex justify-between items-end text-xs">
              <div>
                <span className="text-[9px] text-gray-400 block uppercase">Card Holder</span>
                <span className="font-bold tracking-wide">{cardHolder || 'NAME SURNAME'}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 block uppercase">Expires</span>
                <span className="font-mono font-bold">{expiry || 'MM/YY'}</span>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div className="absolute inset-0 bg-slate-900 border border-gray-700 rounded-2xl p-4 text-white flex flex-col justify-between rotate-y-180 backface-hidden shadow-2xl">
            <div className="w-full h-8 bg-black -mx-4 mt-2" />
            <div className="bg-slate-800 p-2 rounded-lg flex justify-end items-center my-2">
              <span className="font-mono text-sm font-bold text-amber-400 bg-slate-950 px-3 py-1 rounded border border-gray-700">
                {cvc || '•••'}
              </span>
            </div>
            <p className="text-[9px] text-gray-500 text-center">CVC 3자리 보안 코드는 카드 뒷면에 기재되어 있습니다.</p>
          </div>
        </motion.div>
      </div>

      {/* Form Inputs */}
      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
        <input
          type="text"
          value={cardNumber}
          onFocus={() => setIsFlipped(false)}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="카드 번호 (16자리)"
          className="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-xs font-mono text-white outline-none focus:border-blue-500"
        />

        <div className="flex gap-2">
          <input
            type="text"
            value={expiry}
            onFocus={() => setIsFlipped(false)}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="w-1/2 px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-xs font-mono text-white outline-none focus:border-blue-500"
          />
          <input
            type="text"
            maxLength={3}
            value={cvc}
            onFocus={() => setIsFlipped(true)}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="CVC"
            className="w-1/2 px-3 py-2 bg-slate-800 border border-gray-700 rounded-xl text-xs font-mono text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
