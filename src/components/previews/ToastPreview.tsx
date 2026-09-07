'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X, Bell } from 'lucide-react';

export const ToastPreview: React.FC = () => {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'warning' | 'info' }[]>([]);

  const addToast = (type: 'success' | 'warning' | 'info') => {
    const id = Date.now();
    const msg =
      type === 'success'
        ? '변경사항이 성공적으로 저장되었습니다!'
        : type === 'warning'
        ? '네트워크 연결 상태를 확인해주세요.'
        : '새로운 메시지 알림이 도착했습니다.';
    setToasts((prev) => [...prev, { id, message: msg, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center gap-4 relative min-h-[220px]">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => addToast('success')}
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
        >
          + Success Toast
        </button>
        <button
          onClick={() => addToast('warning')}
          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
        >
          + Warning Toast
        </button>
      </div>

      {/* Toast Render Box */}
      <div className="w-full flex-1 flex flex-col justify-end space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl border border-gray-800 dark:border-gray-200 text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
                ) : toast.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 dark:text-amber-600 flex-shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-blue-400 dark:text-blue-600 flex-shrink-0" />
                )}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="p-0.5 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {toasts.length === 0 && (
          <span className="text-center text-xs text-gray-400 py-6">위 버튼을 클릭하여 토스트 모션을 테스트하세요</span>
        )}
      </div>
    </div>
  );
};
