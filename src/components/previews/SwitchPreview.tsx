'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, BellOff, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

export const SwitchPreview: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [security, setSecurity] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[360px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-03 • Switch Toggle
        </span>
        <h3 className="text-white font-bold text-lg">스위치 토글 컴포넌트</h3>
        <p className="text-gray-400 text-xs">Framer Motion spring physics로 작동하는 부드러운 상태 토글</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3 bg-slate-900 p-5 rounded-2xl border border-gray-800 shadow-xl">
        {/* Toggle Item 1 */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${darkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">다크 테마 모드</p>
              <p className="text-xs text-gray-400">{darkMode ? '어두운 테마 적용 중' : '밝은 테마 적용 중'}</p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center cursor-pointer ${
              darkMode ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-slate-900"
            >
              {darkMode ? <Moon className="w-3.5 h-3.5 text-blue-600" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            </motion.div>
          </button>
        </div>

        {/* Toggle Item 2 */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${notifications ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
              {notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">푸시 알림 수신</p>
              <p className="text-xs text-gray-400">{notifications ? '알림 켜짐' : '알림 꺼짐'}</p>
            </div>
          </div>

          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center cursor-pointer ${
              notifications ? 'bg-emerald-600' : 'bg-gray-700'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full bg-white shadow-md"
            />
          </button>
        </div>

        {/* Toggle Item 3 */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${security ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-700 text-gray-400'}`}>
              {security ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">2단계 보안 인증</p>
              <p className="text-xs text-gray-400">{security ? '2FA 보호 적용' : '비활성화 상태'}</p>
            </div>
          </div>

          <button
            onClick={() => setSecurity(!security)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center cursor-pointer ${
              security ? 'bg-purple-600' : 'bg-gray-700'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full bg-white shadow-md"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
