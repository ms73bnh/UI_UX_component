'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, X, CheckCircle, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export const FileDropzonePreview: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: '1', name: 'design-spec-v2.pdf', size: '2.4 MB', type: 'pdf', progress: 100, status: 'completed' },
    { id: '2', name: 'dashboard-hero-mockup.png', size: '1.8 MB', type: 'image', progress: 65, status: 'uploading' },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const simulateUpload = (newFiles: FileList | File[]) => {
    Array.from(newFiles).forEach((file) => {
      const fileId = Math.random().toString(36).substring(7);
      const isPdf = file.name.endsWith('.pdf');
      const isImg = file.type.startsWith('image/');
      
      const newFileItem: UploadedFile = {
        id: fileId,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: isPdf ? 'pdf' : isImg ? 'image' : 'file',
        progress: 0,
        status: 'uploading',
      };

      setFiles((prev) => [newFileItem, ...prev]);

      // Progress animation simulation
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 25) + 15;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) => (f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f))
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === fileId ? { ...f, progress: currentProgress } : f))
          );
        }
      }, 300);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUpload(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-4 p-6 bg-slate-900 rounded-2xl border border-gray-800">
      {/* Dropzone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
          isDragOver
            ? 'border-blue-500 bg-blue-950/30 scale-[1.01] shadow-[0_0_20px_rgba(59,130,246,0.15)]'
            : 'border-gray-700 bg-slate-800/50 hover:border-gray-500 hover:bg-slate-800'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        
        <motion.div
          animate={{ y: isDragOver ? -4 : 0 }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
            isDragOver ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700'
          }`}
        >
          <UploadCloud className="w-7 h-7" />
        </motion.div>

        <h4 className="text-white font-bold text-base mb-1">
          {isDragOver ? '여기에 놓으세요!' : '파일을 드래그하거나 클릭하여 업로드'}
        </h4>
        <p className="text-gray-400 text-xs mb-3 text-center">
          PNG, JPG, PDF, SVG (최대 10MB)
        </p>

        <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700 font-medium">
          파일 탐색기 열기
        </span>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            업로드된 파일 ({files.length})
          </span>

          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-gray-700/60"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-700/60 flex items-center justify-center text-blue-400 flex-shrink-0">
                  {file.type === 'pdf' ? (
                    <FileText className="w-5 h-5 text-red-400" />
                  ) : file.type === 'image' ? (
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                  ) : (
                    <File className="w-5 h-5 text-blue-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{file.size}</span>
                  </div>

                  {/* Progress bar */}
                  {file.status === 'uploading' ? (
                    <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="bg-blue-500 h-full rounded-full"
                        animate={{ width: `${file.progress}%` }}
                        transition={{ ease: 'easeOut' }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>업로드 완료</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="p-1 text-gray-500 hover:text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
