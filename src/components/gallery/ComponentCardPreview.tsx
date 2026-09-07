'use client';

import React from 'react';
import { ComponentItem } from '@/types/component';
import {
  Check, Lock, Bell, Search as SearchIcon, Star, Moon, Command, ArrowRight,
  ShieldCheck, UploadCloud, Smartphone, PhoneCall, Timer, Music, Heart, X, RefreshCw,
  Layers, ChevronRight, HelpCircle, AlertTriangle, Plus, Sliders, Play, Tag, Sparkles
} from 'lucide-react';

interface ComponentCardPreviewProps {
  component: ComponentItem;
}

export const ComponentCardPreview: React.FC<ComponentCardPreviewProps> = ({ component }) => {
  const { id, name, category } = component;

  // ACTIONS (9)
  if (id === 'ACT-01') return <button className="w-full py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-xs">Primary Button</button>;
  if (id === 'ACT-02') return <button className="w-full py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl">Secondary</button>;
  if (id === 'ACT-03') return <button className="px-3 py-1.5 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Ghost Link →</button>;
  if (id === 'ACT-04') return <button className="w-full py-2 bg-red-600 text-white text-xs font-semibold rounded-xl shadow-xs">Destructive Delete</button>;
  if (id === 'ACT-05') return <button className="w-full py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Loading...</button>;
  if (id === 'ACT-06') return <div className="flex gap-2 justify-center"><button className="p-2 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border"><Bell className="w-4 h-4" /></button><button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"><SearchIcon className="w-4 h-4" /></button></div>;
  if (id === 'ACT-07') return <div className="w-full flex justify-end pr-2"><div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">+</div></div>;
  if (id === 'ACT-08') return <div className="inline-flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden text-xs"><button className="px-3 py-1.5 bg-blue-600 text-white font-bold">Grid</button><button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">List</button></div>;
  if (id === 'ACT-09') return <div className="w-full py-2 bg-gray-900 text-gray-300 text-xs font-mono rounded-xl px-3 flex items-center justify-between border border-gray-700"><span>Search command...</span><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">⌘K</kbd></div>;

  // INPUT (9)
  if (id === 'INPUT-01') return <input type="text" readOnly value="sample@vibe.ui" className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />;
  if (id === 'INPUT-02') return <div className="w-full p-2 text-[11px] rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400">여러 줄 본문 입력 필드...</div>;
  if (id === 'INPUT-03') return <div className="w-full relative"><SearchIcon className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" /><input type="text" readOnly placeholder="검색..." className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" /></div>;
  if (id === 'INPUT-04') return <div className="flex items-center gap-2 border rounded-xl p-1 bg-white dark:bg-gray-800 text-xs font-bold"><button className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">-</button><span>2</span><button className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">+</button></div>;
  if (id === 'INPUT-05') return <div className="w-full px-3 py-1.5 border rounded-xl bg-slate-900 text-white text-xs flex justify-between items-center font-mono"><span>React 19 Hooks</span><span className="text-[10px] text-blue-400 font-bold">Auto</span></div>;
  if (id === 'INPUT-06') return <div className="flex gap-1.5 flex-wrap"><span className="px-2 py-0.5 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-[10px] font-bold">#Design</span><span className="px-2 py-0.5 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-[10px] font-bold">#Tailwind</span></div>;
  if (id === 'INPUT-07') return <div className="flex gap-1.5 justify-center">{[9, 0, 7, 2].map((n, i) => <div key={i} className="w-7 h-9 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{n}</div>)}</div>;
  if (id === 'INPUT-08') return <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl py-2 px-3 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1.5"><UploadCloud className="w-4 h-4 text-blue-500" /> 드래그 앤 드롭 파일 업로드</div>;
  if (id === 'INPUT-09') return <div className="w-full h-11 bg-gradient-to-tr from-slate-900 to-blue-900 rounded-xl p-2 text-[10px] text-white font-mono flex items-center justify-between shadow-md"><span>•••• 4532</span><span className="text-amber-400 font-bold">3D Card</span></div>;

  // SELECTION (10)
  if (id === 'SELECT-01') return <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300"><div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]"><Check className="w-3 h-3 stroke-[3]" /></div> 이용약관 동의</div>;
  if (id === 'SELECT-02') return <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300"><div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white" /> 신용카드 결제 선택</div>;
  if (id === 'SELECT-03') return <div className="flex items-center justify-between w-full px-2"><span className="text-xs text-gray-600 dark:text-gray-400 font-medium">알림 수신</span><div className="w-10 h-6 bg-blue-600 rounded-full p-0.5 flex justify-end"><div className="w-5 h-5 bg-white rounded-full shadow-xs" /></div></div>;
  if (id === 'SELECT-04') return <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex gap-1 text-xs w-full justify-center"><div className="px-3 py-1 bg-white dark:bg-gray-900 rounded-lg font-bold shadow-xs text-blue-600 dark:text-blue-400">Day</div><div className="px-3 py-1 text-gray-500">Week</div></div>;
  if (id === 'SELECT-05' || id === 'SELECT-06') return <div className="flex gap-1.5 flex-wrap justify-center"><span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-300 dark:border-blue-800">#Tailwind</span><span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold">#React</span></div>;
  if (id === 'SELECT-07') return <div className="flex items-center gap-2 p-1 bg-slate-900 text-white rounded-xl border border-gray-700 text-xs font-bold"><button className="px-2 py-0.5 bg-slate-800 rounded">-</button><span>2 개</span><button className="px-2 py-0.5 bg-slate-800 rounded">+</button></div>;
  if (id === 'SELECT-08') return <div className="w-full px-3 flex flex-col gap-1"><div className="flex justify-between text-[10px] text-gray-400"><span>Volume</span><span>70%</span></div><div className="w-full bg-slate-800 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full w-2/3" /></div></div>;
  if (id === 'SELECT-09') return <div className="w-full px-3 py-1.5 bg-slate-900 text-white rounded-xl border border-gray-700 text-xs flex justify-between items-center font-bold"><span>대한민국 (KRW)</span><span>▼</span></div>;
  if (id === 'SELECT-10') return <div className="flex gap-1 text-amber-400 text-base">{[1,2,3,4,5].map(n => <span key={n}>★</span>)}</div>;

  // DATE & TIME (6)
  if (id === 'DATE-01') return <div className="p-2 bg-slate-900 border border-gray-700 text-white rounded-xl text-xs font-bold text-center">2026.09.15 (Calendar)</div>;
  if (id === 'DATE-02') return <div className="p-2 bg-slate-900 border border-gray-700 text-emerald-400 rounded-xl text-xs font-bold text-center">09.10 ➔ 09.18 (8박)</div>;
  if (id === 'DATE-04') return <div className="flex gap-1.5 overflow-hidden w-full justify-center"><div className="w-8 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">월5</div><div className="w-8 h-11 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center text-[10px] font-bold shadow-xs">화6</div><div className="w-8 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-[10px] text-gray-500 font-semibold">수7</div></div>;
  if (id === 'DATE-08') return <div className="px-4 py-2 bg-slate-900 text-blue-400 rounded-xl border border-gray-700 text-xs font-mono font-bold">AM 09 : 30</div>;
  if (id === 'DATE-11') return <div className="w-full px-3 py-1 bg-slate-900 border rounded-xl text-[10px] font-mono text-indigo-300 text-center">09:00 ───[ 10:00 ~ 16:00 ]─── 22:00</div>;
  if (id === 'DATE-12') return <div className="w-full py-1.5 px-3 bg-slate-900 border border-gray-700 rounded-xl text-center font-mono font-bold text-xs text-purple-400">AM 08 : 30 (iOS Wheel)</div>;

  // NAVIGATION (6)
  if (id === 'NAV-01') return <div className="w-full py-1.5 bg-slate-950 text-gray-400 rounded-xl border border-gray-800 flex justify-around text-[10px] font-bold"><span>Home</span><span className="text-purple-400">Search</span><span>User</span></div>;
  if (id === 'NAV-02') return <div className="w-full py-1.5 px-3 bg-slate-950 text-white rounded-xl border border-gray-800 flex justify-between text-xs font-bold"><span>Logo</span><span>Navbar Header</span></div>;
  if (id === 'NAV-03') return <div className="flex gap-1 text-[10px] text-gray-400"><span>Home</span>/<span>Products</span>/<span className="text-blue-400 font-bold">UI Kit</span></div>;
  if (id === 'NAV-04') return <div className="flex border-b border-gray-700 text-xs font-bold gap-3"><span className="border-b-2 border-amber-400 text-amber-400 pb-1">Overview</span><span className="text-gray-500">Settings</span></div>;
  if (id === 'NAV-05') return <div className="w-full p-2 bg-slate-900 border text-white rounded-xl text-xs font-bold">Sidebar Drawer Menu</div>;
  if (id === 'NAV-08') return <div className="px-4 py-1.5 bg-black text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-md"><Music className="w-3.5 h-3.5 text-purple-400" /><span>ETA - NewJeans</span></div>;

  // OVERLAY (6)
  if (id === 'OVER-01') return <div className="w-full bg-gray-900 text-white rounded-xl p-2 text-center text-xs font-bold border border-gray-700 shadow-md">Modal Dialog Window</div>;
  if (id === 'OVER-02' || id === 'OVER-04') return <div className="px-3 py-1 bg-gray-800 text-white text-[10px] rounded-lg border border-gray-700">Tooltip 말풍선</div>;
  if (id === 'OVER-03') return <div className="w-full h-11 bg-gray-100 dark:bg-gray-800 rounded-t-xl flex flex-col items-center justify-start pt-1 border-t-2 border-blue-500"><div className="w-6 h-1 bg-gray-400 rounded-full" /></div>;
  if (id === 'OVER-05') return <div className="w-full p-2 bg-slate-900 text-white rounded-t-xl border-t border-rose-500 text-xs font-bold text-center">Action Sheet</div>;
  if (id === 'OVER-06') return <div className="w-full p-1.5 bg-amber-500/20 text-amber-300 rounded-xl text-[10px] font-bold text-center border border-amber-500/30">시스템 점검 공지 알림 바</div>;

  // LISTS & CARDS (6)
  if (id === 'LIST-01') return <div className="p-2 border rounded-xl bg-slate-900 text-white text-xs font-bold w-full">Basic Feed Card</div>;
  if (id === 'LIST-02') return <div className="w-full h-12 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-2 text-white font-bold text-xs flex items-end">Image Product Card</div>;
  if (id === 'LIST-03') return <div className="w-full p-2 bg-slate-900 border text-blue-400 text-xs font-bold rounded-xl text-center">Carousel Banner (1/3)</div>;
  if (id === 'LIST-04') return <div className="w-full p-1 bg-slate-900 text-[10px] text-gray-300 border rounded-xl font-mono text-center">Table Grid Header | Data</div>;
  if (id === 'LIST-06') return <div className="w-full p-2 bg-slate-900 border-l-4 border-l-red-500 text-white text-xs font-bold rounded-xl">Swipe to Delete Item</div>;
  if (id === 'LIST-11') return <div className="w-24 h-12 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl text-white text-[10px] font-bold flex items-center justify-center shadow-md rotate-[-3deg]">Swipe Card Stack</div>;

  // SEARCH & FILTER (4)
  if (id === 'SEARCH-01') return <div className="w-full px-3 py-1.5 bg-slate-900 border border-gray-700 text-white text-xs rounded-xl flex items-center gap-1.5"><SearchIcon className="w-3.5 h-3.5 text-blue-400" /><span>통합 검색 바</span></div>;
  if (id === 'SEARCH-02') return <div className="flex gap-1"><span className="px-2 py-0.5 bg-blue-600/30 text-blue-300 rounded-full text-[10px] font-bold">Category: Actions ✕</span></div>;
  if (id === 'SEARCH-03') return <div className="px-3 py-1.5 bg-slate-900 text-white text-xs rounded-xl border border-gray-700 font-bold">정렬: 최신순 ▼</div>;
  if (id === 'SEARCH-04') return <div className="w-full p-2 bg-slate-900 text-emerald-400 text-xs font-bold border rounded-xl text-center">Filter Options Panel</div>;

  // GESTURE (4)
  if (id === 'GEST-01') return <div className="w-full p-2 bg-purple-950/40 text-purple-300 border border-purple-800/50 rounded-xl text-[10px] font-bold text-center">Long Press 1s Hold</div>;
  if (id === 'GEST-02') return <div className="w-full p-2 bg-blue-950/40 text-blue-300 border border-blue-800/50 rounded-xl text-[10px] font-bold text-center">Pinch Zoom 150%</div>;
  if (id === 'GEST-03') return <div className="w-full p-2 bg-pink-950/40 text-pink-300 border border-pink-800/50 rounded-xl text-[10px] font-bold text-center flex items-center justify-center gap-1">Double Tap ❤️ 128</div>;
  if (id === 'GEST-04') return <div className="w-full p-2 bg-slate-900 border text-blue-400 text-[10px] font-bold rounded-xl text-center">Pull Down Refresh ↓</div>;

  // MOTION & PATTERNS
  if (id === 'MOTION-01') return <div className="w-full py-1.5 px-3 bg-blue-600 text-white rounded-xl text-[10px] font-bold text-center shadow-md">Click Scale 0.92</div>;
  if (id === 'MOTION-02') return <div className="flex gap-2 bg-slate-900 p-1 rounded-xl text-[10px] text-amber-400 font-bold border"><span className="bg-amber-500 text-black px-2 py-0.5 rounded-lg">Tab 1</span><span>Tab 2</span></div>;
  if (id === 'MOTION-08') return <div className="grid grid-cols-3 gap-1 w-full"><div className="col-span-2 p-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold">Bento Core</div><div className="p-2 bg-slate-800 text-gray-300 rounded-lg text-[10px]">Side</div></div>;
  if (id === 'MOTION-09') return <div className="text-xl font-mono font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">$ <span className="text-gray-900 dark:text-white">128,450</span></div>;
  if (id === 'MOTION-10') return <div className="w-full py-1 px-2 bg-pink-950/40 border border-pink-800/50 rounded-xl text-[10px] text-pink-300 font-bold overflow-hidden whitespace-nowrap">Infinite Marquee Scrolling...</div>;
  if (id === 'MOTION-11') return <div className="flex gap-2 p-1.5 bg-black rounded-2xl border text-xs text-indigo-400 justify-center"><span>Home</span><span className="text-white font-bold scale-125">Search</span><span>User</span></div>;
  if (id === 'PATTERNS-01') return <div className="w-full p-2 bg-slate-900 border text-amber-400 text-xs font-bold rounded-xl text-center">Step 1 ➔ Step 2 ➔ Step 3</div>;
  if (id === 'PATTERNS-02') return <div className="w-full p-2 bg-purple-950/40 text-purple-300 border border-purple-800/50 rounded-xl text-[10px] font-bold text-center">Onboarding Guide (1/3)</div>;
  if (id === 'PATTERNS-03') return <div className="w-full p-2 bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 rounded-xl text-[10px] font-bold text-center">Checkout ₩29,000</div>;

  // Fallback styling for any remaining
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-semibold">
      <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
      <span>{component.name}</span>
    </div>
  );
};
