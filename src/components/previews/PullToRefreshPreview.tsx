'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowDown, Loader2, Check, RefreshCw, MessageSquare, Clock } from 'lucide-react';

interface PullToRefreshPreviewProps {
  variant?: string;
  state?: string;
}

interface Item {
  id: number;
  title: string;
  time: string;
  tag: string;
}

const INITIAL_ITEMS: Item[] = [
  { id: 1, title: '새로운 시스템 업데이트 공지사항', time: '방금 전', tag: 'Notice' },
  { id: 2, title: '디자인 시스템 v2.4 릴리즈 완료', time: '5분 전', tag: 'System' },
  { id: 3, title: '새로운 팀 프로젝트 초대 알림', time: '12분 전', tag: 'Invite' },
  { id: 4, title: '피드백 댓글이 도착했습니다', time: '25분 전', tag: 'Comment' },
  { id: 5, title: '주간 UX 리서치 세션 일정 안내', time: '1시간 전', tag: 'Event' },
  { id: 6, title: '보안 정책 업데이트 동의 요청', time: '2시간 전', tag: 'Security' },
  { id: 7, title: 'AI 템플릿 라이브러리 새로추가됨', time: '3시간 전', tag: 'New' },
  { id: 8, title: '월간 사용량 리포트 발송 완료', time: '5시간 전', tag: 'Report' },
];

export const PullToRefreshPreview: React.FC<PullToRefreshPreviewProps> = ({
  variant = 'Default',
  state = 'Default',
}) => {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [refreshing, setRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [pulledPastThreshold, setPulledPastThreshold] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('방금 전 갱신됨');

  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const pullDistance = useMotionValue(0);

  const THRESHOLD = 60;
  const isDisabled = variant === 'Disabled' || state === 'Disabled';
  const isCompact = variant === 'Compact';

  // Y Translation for list container & indicator
  const pullY = useTransform(pullDistance, (val) => Math.min(val * 0.5, 90));

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isDisabled || refreshing) return;
    const container = containerRef.current;
    if (container && container.scrollTop === 0) {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      startY.current = clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isPulling || isDisabled || refreshing) return;
    const container = containerRef.current;
    if (container && container.scrollTop > 0) {
      setIsPulling(false);
      pullDistance.set(0);
      return;
    }

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = clientY - startY.current;

    if (diff > 0) {
      if (e.cancelable && 'preventDefault' in e) {
        // Prevent window overscroll if needed
      }
      pullDistance.set(diff);
      setPulledPastThreshold(diff * 0.5 >= THRESHOLD);
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling || isDisabled) return;
    setIsPulling(false);

    const currentDist = pullDistance.get() * 0.5;

    if (currentDist >= THRESHOLD && !refreshing) {
      // Trigger Refresh
      setRefreshing(true);
      animate(pullDistance, THRESHOLD * 2, { duration: 0.2 });

      setTimeout(() => {
        // Shuffle & Update items
        setItems((prev) =>
          [...prev].map((item) => ({
            ...item,
            time: '방금 갱신됨',
          })).sort(() => Math.random() - 0.5)
        );
        const nowStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastRefreshed(`최근 갱신: ${nowStr}`);
        setRefreshing(false);
        setPulledPastThreshold(false);
        animate(pullDistance, 0, { type: 'spring', stiffness: 300, damping: 30 });
      }, 1500);
    } else {
      // Bounce back
      setPulledPastThreshold(false);
      animate(pullDistance, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-100 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-inner flex flex-col h-[380px] relative select-none">
      {/* Header Info */}
      <div className="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between z-10 shadow-xs">
        <div className="flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 text-blue-600 dark:text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
          <h4 className="font-bold text-xs text-gray-900 dark:text-white">Pull to Refresh Feed</h4>
        </div>
        <span className="text-[10px] text-gray-400 font-mono">{lastRefreshed}</span>
      </div>

      {/* Pull Indicator Area */}
      <motion.div
        style={{ y: pullY }}
        className="absolute top-12 left-0 right-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <div className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
          {refreshing ? (
            <>
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-xs font-bold text-blue-600">새로고침 중...</span>
            </>
          ) : pulledPastThreshold ? (
            <>
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">손을 떼면 새로고침</span>
            </>
          ) : (
            <>
              <ArrowDown className="w-4 h-4 text-gray-500 animate-bounce" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">아래로 당겨서 새로고침</span>
            </>
          )}
        </div>
      </motion.div>

      {/* Scrollable Container with Gesture Listeners */}
      <div
        ref={containerRef}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-none cursor-grab active:cursor-grabbing"
      >
        <motion.div style={{ y: pullY }} className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xs transition-all ${
                isCompact ? 'p-2.5' : 'p-3.5'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                  {item.tag}
                </span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>
              <h5 className={`font-bold text-gray-800 dark:text-gray-200 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                {item.title}
              </h5>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <div className="px-4 py-2 bg-slate-200/50 dark:bg-gray-900/50 text-center border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-500 font-medium">
        {isDisabled ? '🚫 Disabled 상태 (제스처 동작 안 함)' : '💡 리스트 최상단에서 마우스 또는 터치로 아래로 당겨보세요.'}
      </div>
    </div>
  );
};
