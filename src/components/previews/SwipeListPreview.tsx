'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Trash2, Bookmark, Archive, RefreshCcw } from 'lucide-react';

interface SwipeItem {
  id: number;
  title: string;
  sender: string;
}

const INITIAL_ITEMS: SwipeItem[] = [
  { id: 1, title: '디자인 시스템 리팩토링 검토', sender: '김팀장' },
  { id: 2, title: '주간 스프린트 미팅 일정 조정', sender: '박디자이너' },
  { id: 3, title: 'Next.js App Router 빌드 보고서', sender: '이엔지니어' },
];

export const SwipeListPreview: React.FC = () => {
  const [items, setItems] = useState<SwipeItem[]>(INITIAL_ITEMS);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-gray-900 dark:text-white">Swipe Action List</h4>
        {items.length < INITIAL_ITEMS.length && (
          <button
            onClick={() => setItems(INITIAL_ITEMS)}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>초기화</span>
          </button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <SwipeableRow key={item.id} item={item} onDelete={() => removeItem(item.id)} />
        ))}
      </div>

      <span className="text-[10px] text-gray-400 block text-center">
        리스트 항목을 좌측으로 스와이프하여 삭제 버튼을 확인하세요
      </span>
    </div>
  );
};

const SwipeableRow: React.FC<{ item: SwipeItem; onDelete: () => void }> = ({ item, onDelete }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, -50, 0], [1, 0.8, 1]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-red-600 flex items-center justify-end">
      {/* Background Delete Action */}
      <button
        onClick={onDelete}
        className="w-20 h-full flex flex-col items-center justify-center text-white text-xs font-bold gap-1 cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
        <span>삭제</span>
      </button>

      {/* Foreground Swipeable Content */}
      <motion.div
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: -80, right: 0 }}
        dragElastic={0.1}
        className="absolute inset-0 bg-gray-50 dark:bg-gray-800 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-grab active:cursor-grabbing"
      >
        <div>
          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">{item.sender}</span>
          <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">{item.title}</h5>
        </div>
        <span className="text-[10px] text-gray-400">Swipe ➔</span>
      </motion.div>
    </div>
  );
};
