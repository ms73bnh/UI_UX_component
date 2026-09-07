'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Command, ArrowRight, Settings, FileText, Users, Home,
  BarChart2, Bell, CreditCard, LogOut, Zap, X
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  shortcut?: string;
}

const ALL_COMMANDS: CommandItem[] = [
  { id: '1', label: '홈으로 이동', category: '페이지', icon: <Home className="w-4 h-4" />, shortcut: 'G H' },
  { id: '2', label: '대시보드', category: '페이지', icon: <BarChart2 className="w-4 h-4" />, shortcut: 'G D' },
  { id: '3', label: '사용자 관리', category: '페이지', icon: <Users className="w-4 h-4" /> },
  { id: '4', label: '결제 내역', category: '페이지', icon: <CreditCard className="w-4 h-4" /> },
  { id: '5', label: '알림 설정', category: '설정', icon: <Bell className="w-4 h-4" /> },
  { id: '6', label: '계정 설정', category: '설정', icon: <Settings className="w-4 h-4" />, shortcut: '⌘,' },
  { id: '7', label: '보고서 생성', category: '액션', icon: <FileText className="w-4 h-4" /> },
  { id: '8', label: '빠른 액션', category: '액션', icon: <Zap className="w-4 h-4" /> },
  { id: '9', label: '로그아웃', category: '계정', icon: <LogOut className="w-4 h-4" /> },
];

export const CommandMenuPreview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = ALL_COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? close() : open();
      }
      if (!isOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, open, close]);

  // Scroll selected item into view
  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  // Group filtered by category
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  let flatIndex = 0;

  return (
    <div className="w-full flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-[420px] rounded-2xl relative">
      {/* Trigger Button */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <p className="text-xs text-gray-500 tracking-wider uppercase">Command Palette</p>
        <button
          onClick={open}
          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white transition-all shadow-lg group"
        >
          <Search className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
          <span className="text-sm">빠른 검색...</span>
          <div className="flex items-center gap-1 ml-4">
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-700 text-gray-400 text-xs border border-gray-600">
              <Command className="w-3 h-3" />K
            </kbd>
          </div>
        </button>
        <p className="text-xs text-gray-600">Ctrl+K / ⌘K to open</p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={close}
            />

            {/* Command Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
                <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  placeholder="명령어, 페이지를 검색하세요..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                />
                <button onClick={close} className="text-gray-600 hover:text-gray-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {Object.entries(grouped).length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-600">
                    &ldquo;{query}&rdquo; 에 대한 결과가 없습니다
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-4 py-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {category}
                      </div>
                      {items.map((cmd) => {
                        const currentIndex = flatIndex++;
                        const isSelected = currentIndex === selectedIndex;
                        return (
                          <div
                            key={cmd.id}
                            ref={(el) => { itemRefs.current[currentIndex] = el; }}
                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                            onClick={close}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-800'
                            }`}
                          >
                            <span className={isSelected ? 'text-white' : 'text-gray-500'}>
                              {cmd.icon}
                            </span>
                            <span className="flex-1 text-sm">{cmd.label}</span>
                            {cmd.shortcut && (
                              <kbd className={`text-xs px-1.5 py-0.5 rounded border ${
                                isSelected
                                  ? 'border-blue-400 text-blue-200 bg-blue-700'
                                  : 'border-gray-700 text-gray-600 bg-gray-800'
                              }`}>
                                {cmd.shortcut}
                              </kbd>
                            )}
                            <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-blue-200' : 'text-gray-700'}`} />
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-t border-gray-800">
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-500">↑↓</kbd> 이동
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-500">Enter</kbd> 실행
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-500">Esc</kbd> 닫기
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
