'use client';

import React, { useState } from 'react';
import { CodeSnippets } from '@/types/component';
import { Copy, Check, Code2 } from 'lucide-react';

interface CodeViewerProps {
  snippets: CodeSnippets;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ snippets }) => {
  const [activeTab, setActiveTab] = useState<'react' | 'reactNative' | 'htmlCss'>('react');
  const [copied, setCopied] = useState(false);

  const currentCode =
    activeTab === 'react'
      ? snippets.react
      : activeTab === 'reactNative'
      ? snippets.reactNative || '// React Native code snippet coming soon'
      : snippets.htmlCss || '/* HTML/CSS snippet coming soon */';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 text-gray-100 rounded-2xl border border-gray-800 shadow-xl overflow-hidden my-6">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-800 bg-gray-950/60">
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setActiveTab('react')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'react'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              React
            </button>
            <button
              onClick={() => setActiveTab('reactNative')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'reactNative'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              React Native / Expo
            </button>
            <button
              onClick={() => setActiveTab('htmlCss')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'htmlCss'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              HTML/CSS
            </button>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs transition-all active:scale-95 cursor-pointer border border-gray-700"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-5 font-mono text-xs leading-relaxed text-gray-200 overflow-x-auto scrollbar-none bg-gray-900/90 max-h-96">
        {currentCode}
      </pre>
    </div>
  );
};
