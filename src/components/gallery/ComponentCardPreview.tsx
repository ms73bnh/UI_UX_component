'use client';

import React from 'react';
import { ComponentItem } from '@/types/component';
import {
  MousePointerClick, CheckSquare, TextCursorInput, CalendarDays, Navigation,
  Layers, LayoutGrid, Search, AlertCircle, Touchpad, Sparkles, Boxes,
  Check, Lock, Bell, Search as SearchIcon, Star, Moon, Command, ArrowRight,
  ShieldCheck, UploadCloud, Smartphone, PhoneCall, Timer, Music, Heart, X, RefreshCw
} from 'lucide-react';

interface ComponentCardPreviewProps {
  component: ComponentItem;
}

export const ComponentCardPreview: React.FC<ComponentCardPreviewProps> = ({ component }) => {
  const { id, category } = component;

  // Actions
  if (id === 'ACT-01') {
    return <button className="w-full py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-xs active:scale-95 transition-transform">Primary Button</button>;
  }
  if (id === 'ACT-02') {
    return <button className="w-full py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl">Secondary</button>;
  }
  if (id === 'ACT-03') {
    return <button className="px-3 py-1.5 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Ghost Link →</button>;
  }
  if (id === 'ACT-04') {
    return <button className="w-full py-2 bg-red-600 text-white text-xs font-semibold rounded-xl shadow-xs">Destructive Delete</button>;
  }
  if (id === 'ACT-05') {
    return <button className="w-full py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Loading...</button>;
  }
  if (id === 'ACT-06') {
    return <div className="flex gap-2 justify-center"><button className="p-2 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border"><Bell className="w-4 h-4" /></button><button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"><SearchIcon className="w-4 h-4" /></button></div>;
  }
  if (id === 'ACT-07') {
    return <div className="w-full flex justify-end pr-2"><div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">+</div></div>;
  }
  if (id === 'ACT-08') {
    return <div className="inline-flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden text-xs"><button className="px-3 py-1.5 bg-blue-600 text-white font-bold">Grid</button><button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">List</button></div>;
  }
  if (id === 'ACT-09') {
    return <div className="w-full py-2 bg-gray-900 text-gray-300 text-xs font-mono rounded-xl px-3 flex items-center justify-between border border-gray-700"><span>Search command...</span><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">⌘K</kbd></div>;
  }

  // Input
  if (id === 'INPUT-01') {
    return <input type="text" readOnly value="sample@vibe.ui" className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />;
  }
  if (id === 'INPUT-02') {
    return <div className="w-full p-2 text-[11px] rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400">여러 줄 본문 입력 필드...</div>;
  }
  if (id === 'INPUT-03') {
    return <div className="w-full relative"><SearchIcon className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" /><input type="text" readOnly placeholder="검색..." className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" /></div>;
  }
  if (id === 'INPUT-04') {
    return <div className="flex items-center gap-2 border rounded-xl p-1 bg-white dark:bg-gray-800 text-xs font-bold"><button className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">-</button><span>2</span><button className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">+</button></div>;
  }
  if (id === 'INPUT-07') {
    return <div className="flex gap-1.5 justify-center">{[9, 0, 7, 2].map((n, i) => <div key={i} className="w-7 h-9 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{n}</div>)}</div>;
  }
  if (id === 'INPUT-08') {
    return <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl py-2 px-3 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1.5"><UploadCloud className="w-4 h-4 text-blue-500" /> 드래그 앤 드롭 파일 업로드</div>;
  }

  // Selection
  if (id === 'SELECT-01') {
    return <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300"><div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]"><Check className="w-3 h-3 stroke-[3]" /></div> 이용약관 수락 동의</div>;
  }
  if (id === 'SELECT-02') {
    return <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300"><div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white" /> 신용카드 결제 선택</div>;
  }
  if (id === 'SELECT-03') {
    return <div className="flex items-center justify-between w-full px-2"><span className="text-xs text-gray-600 dark:text-gray-400 font-medium">알림 수신</span><div className="w-10 h-6 bg-blue-600 rounded-full p-0.5 flex justify-end"><div className="w-5 h-5 bg-white rounded-full shadow-xs" /></div></div>;
  }
  if (id === 'SELECT-04') {
    return <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex gap-1 text-xs w-full justify-center"><div className="px-3 py-1 bg-white dark:bg-gray-900 rounded-lg font-bold shadow-xs text-blue-600 dark:text-blue-400">Day</div><div className="px-3 py-1 text-gray-500">Week</div><div className="px-3 py-1 text-gray-500">Month</div></div>;
  }
  if (id === 'SELECT-05' || id === 'SELECT-06') {
    return <div className="flex gap-1.5 flex-wrap justify-center"><span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-300 dark:border-blue-800">#Tailwind</span><span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold">#React</span></div>;
  }
  if (id === 'SELECT-10') {
    return <div className="flex gap-1 text-amber-400 text-base">{[1,2,3,4,5].map(n => <span key={n}>★</span>)}</div>;
  }

  // Date & Time
  if (id === 'DATE-04') {
    return (
      <div className="flex gap-1.5 overflow-hidden w-full justify-center">
        <div className="w-8 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">월5</div>
        <div className="w-8 h-11 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center text-[10px] font-bold shadow-xs">화6</div>
        <div className="w-8 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">수7</div>
        <div className="w-8 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">목8</div>
      </div>
    );
  }

  // Navigation
  if (id === 'NAV-08') {
    return <div className="px-4 py-1.5 bg-black text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-md"><Music className="w-3.5 h-3.5 text-purple-400 animate-pulse" /><span>ETA - NewJeans</span></div>;
  }

  // Overlay
  if (id === 'OVER-01') {
    return <div className="w-full bg-gray-900 text-white rounded-xl p-2.5 text-center text-xs font-bold border border-gray-700 shadow-md">Modal Dialog Window</div>;
  }
  if (id === 'OVER-03') {
    return (
      <div className="w-full h-11 bg-gray-100 dark:bg-gray-800 rounded-t-xl flex flex-col items-center justify-start pt-1 border-t-2 border-blue-500">
        <div className="w-6 h-1 bg-gray-400 rounded-full" />
        <span className="text-[10px] text-gray-500 mt-1 font-semibold">Bottom Sheet</span>
      </div>
    );
  }

  // Lists & Motion & Gesture & Patterns
  if (id === 'MOTION-08') {
    return <div className="grid grid-cols-3 gap-1 w-full"><div className="col-span-2 p-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold">Bento Core</div><div className="p-2 bg-slate-800 text-gray-300 rounded-lg text-[10px]">Side</div></div>;
  }
  if (id === 'MOTION-09') {
    return <div className="text-xl font-mono font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">$ <span className="text-gray-900 dark:text-white">128,450</span></div>;
  }
  if (id === 'LIST-11') {
    return <div className="w-24 h-14 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl text-white text-[10px] font-bold flex items-center justify-center shadow-md rotate-[-3deg]">Swipe Card Stack</div>;
  }

  // Category fallback styling
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-semibold">
      <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
      <span>{component.name}</span>
    </div>
  );
};
