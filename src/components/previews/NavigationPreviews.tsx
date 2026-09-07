'use client';

import React, { useState } from 'react';
import { Home, Search, User, Bell, Menu, ChevronRight, Layers, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// NAV-01 Bottom Navigation
export const BottomNavPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">
        NAV-01 • Bottom Navigation Bar
      </span>

      <div className="w-full max-w-xs h-60 bg-slate-900 border border-gray-800 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="text-center pt-8">
          <h4 className="text-white font-bold text-base capitalize">{activeTab} Page</h4>
          <p className="text-xs text-gray-500 mt-1">모바일 바텀 네비게이션 탭 전환</p>
        </div>

        {/* Bottom Bar */}
        <div className="w-full bg-slate-950 border border-gray-800 rounded-2xl py-2 px-4 flex justify-around items-center">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'home' ? 'text-purple-400 scale-110 font-bold' : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">홈</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'search' ? 'text-purple-400 scale-110 font-bold' : 'text-gray-500'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px]">검색</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'profile' ? 'text-purple-400 scale-110 font-bold' : 'text-gray-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">프로필</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// NAV-02 Top Header
export const TopHeaderPreview: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
        NAV-02 • Top Header Bar
      </span>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <header className="w-full h-14 bg-slate-950 border-b border-gray-800 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-black">V</div>
            <span>Vibe UI</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-lg bg-slate-900 text-gray-400 hover:text-white border border-gray-800">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
              U
            </div>
          </div>
        </header>
        <div className="p-6 text-center text-xs text-gray-500">메인 콘텐츠 헤더 구역</div>
      </div>
    </div>
  );
};

// NAV-03 Breadcrumbs
export const BreadcrumbsPreview: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">
        NAV-03 • Breadcrumbs
      </span>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-2 text-xs shadow-2xl">
        <span className="text-gray-400 hover:text-white cursor-pointer font-medium">Home</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-gray-400 hover:text-white cursor-pointer font-medium">Products</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-blue-400 font-bold">UI Kit</span>
      </div>
    </div>
  );
};

// NAV-04 Tab Bar
export const TabBarPreview: React.FC = () => {
  const [active, setActive] = useState('Overview');

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold">
        NAV-04 • Tab Bar
      </span>

      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-3xl p-5 shadow-2xl">
        <div className="flex border-b border-gray-800 gap-4 text-xs">
          {['Overview', 'Analytics', 'Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`pb-2 font-bold relative transition-colors ${
                active === tab ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {active === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
        <div className="pt-4 text-xs text-gray-400 text-center">{active} 탭 패널 내용입니다.</div>
      </div>
    </div>
  );
};
