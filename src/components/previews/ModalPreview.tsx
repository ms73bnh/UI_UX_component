'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, CheckCircle2, Info, ArrowRight } from 'lucide-react';

export const ModalPreview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'confirm' | 'danger'>('confirm');

  const openModal = (type: 'confirm' | 'danger') => {
    setModalType(type);
    setIsOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px] relative">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold mb-1">
          OVER-01 • Modal Dialog
        </span>
        <h3 className="text-white font-bold text-lg">대화상자 모달</h3>
        <p className="text-gray-400 text-xs">Backdrop blur 오버레이와 ESC/외부클릭 닫기를 지원하는 모달</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => openModal('confirm')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg hover:bg-blue-500 transition-all active:scale-95"
        >
          확인 모달 열기
        </button>
        <button
          onClick={() => openModal('danger')}
          className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-lg hover:bg-rose-500 transition-all active:scale-95"
        >
          경고/파괴 모달 열기
        </button>
      </div>

      {/* Modal Portal Component */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative z-10 w-full max-w-md bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    modalType === 'danger'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {modalType === 'danger' ? (
                    <AlertTriangle className="w-7 h-7" />
                  ) : (
                    <CheckCircle2 className="w-7 h-7" />
                  )}
                </div>

                <h4 className="text-white font-extrabold text-xl">
                  {modalType === 'danger' ? '프로젝트를 삭제하시겠습니까?' : '변경 사항을 저장합니다'}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                  {modalType === 'danger'
                    ? '이 작업은 되돌릴 수 없으며 복구할 수 없습니다. 계속 진행하시겠습니까?'
                    : '작성하신 데이터가 서버에 실시간으로 업데이트되며 동기화됩니다.'}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-700 bg-slate-800 text-gray-300 font-bold text-xs hover:bg-slate-700 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs text-white shadow-lg transition-all active:scale-95 ${
                    modalType === 'danger' ? 'bg-rose-600 hover:bg-rose-500' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  {modalType === 'danger' ? '확인 및 삭제' : '확인'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
