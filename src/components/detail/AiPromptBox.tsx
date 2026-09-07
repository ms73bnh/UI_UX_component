'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Terminal } from 'lucide-react';

interface AiPromptBoxProps {
  promptText: string;
}

export const AiPromptBox: React.FC<AiPromptBoxProps> = ({ promptText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden my-6">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-white">AI Implementation Prompt</h4>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
            Vibe Coding Ready
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all active:scale-95 shadow-md shadow-blue-500/20 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>복사되었습니다!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Prompt Body */}
      <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 overflow-x-auto">
        {promptText}
      </pre>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
        <Terminal className="w-3.5 h-3.5 text-slate-500" />
        <span>이 프롬프트를 복사하여 AI 개발 도구(Antigravity, Cursor, Bolt 등)에 전달하세요.</span>
      </div>
    </div>
  );
};
