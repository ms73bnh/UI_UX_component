'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, X, RotateCcw, Sparkles } from 'lucide-react';

interface CardData {
  id: number;
  name: string;
  role: string;
  image: string;
  tags: string[];
}

const INITIAL_CARDS: CardData[] = [
  { id: 1, name: 'UI/UX Design System', role: '컴포넌트 라이브러리', image: '🎨', tags: ['Figma', 'Tailwind', 'React'] },
  { id: 2, name: 'AI Prompt Builder', role: '자동 프롬프트 생성기', image: '🤖', tags: ['GPT-4o', 'Claude', 'Next.js'] },
  { id: 3, name: 'Mobile App Pattern', role: '제스처 모바일 UI', image: '📱', tags: ['React Native', 'Expo'] },
  { id: 4, name: 'Motion Design Engine', role: '인터랙티브 모션', image: '✨', tags: ['Framer Motion'] },
];

export const SwipeCardsPreview: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const opacityLike = useTransform(x, [20, 100], [0, 1]);
  const opacityPass = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped Right (Like)
      swipe('right');
    } else if (info.offset.x < -100) {
      // Swiped Left (Pass)
      swipe('left');
    }
  };

  const swipe = (dir: 'left' | 'right') => {
    setLastAction(dir === 'right' ? 'Liked ❤️' : 'Passed ❌');
    setCards((prev) => prev.slice(1));
  };

  const reset = () => {
    setCards(INITIAL_CARDS);
    setLastAction(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between p-8 bg-slate-950 rounded-2xl border border-gray-800 min-h-[420px]">
      <div className="flex items-center justify-between w-full max-w-xs">
        <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-500" />
          Swipe Cards Stack
        </h4>
        <button onClick={reset} className="p-1.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Stack */}
      <div className="relative w-full max-w-xs h-72 flex items-center justify-center my-4">
        {cards.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-3">
            <p className="text-gray-400 text-sm font-medium">모든 카드를 확인했습니다!</p>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg hover:bg-blue-500 transition-colors"
            >
              다시 시작하기
            </button>
          </div>
        ) : (
          cards.map((card, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={card.id}
                style={{
                  x: isTop ? x : 0,
                  rotate: isTop ? rotate : 0,
                  zIndex: cards.length - index,
                  scale: 1 - index * 0.05,
                  y: index * 12,
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                className="absolute inset-0 bg-slate-900 rounded-3xl border border-gray-800 p-6 flex flex-col justify-between shadow-2xl cursor-grab active:cursor-grabbing select-none"
              >
                {/* Badges for top card */}
                {isTop && (
                  <>
                    <motion.div
                      style={{ opacity: opacityLike }}
                      className="absolute top-6 left-6 px-4 py-1.5 border-4 border-emerald-500 text-emerald-400 rounded-2xl font-black text-xl rotate-[-15deg] shadow-lg pointer-events-none"
                    >
                      LIKE
                    </motion.div>
                    <motion.div
                      style={{ opacity: opacityPass }}
                      className="absolute top-6 right-6 px-4 py-1.5 border-4 border-rose-500 text-rose-400 rounded-2xl font-black text-xl rotate-[15deg] shadow-lg pointer-events-none"
                    >
                      PASS
                    </motion.div>
                  </>
                )}

                <div className="text-6xl flex justify-center py-4 bg-slate-800/40 rounded-2xl border border-gray-800">
                  {card.image}
                </div>

                <div>
                  <h3 className="text-white font-extrabold text-lg">{card.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{card.role}</p>
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {card.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Control buttons */}
      {cards.length > 0 && (
        <div className="flex items-center gap-6">
          <button
            onClick={() => swipe('left')}
            className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-lg active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={() => swipe('right')}
            className="w-14 h-14 rounded-full bg-emerald-500 border border-emerald-400 text-white flex items-center justify-center hover:bg-emerald-400 transition-all shadow-xl active:scale-95"
          >
            <Heart className="w-7 h-7 fill-white" />
          </button>
        </div>
      )}
    </div>
  );
};
