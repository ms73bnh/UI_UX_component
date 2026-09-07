'use client';

import React, { useState } from 'react';
import { DateScrollerPreview } from './DateScrollerPreview';
import { PrimaryButtonPreview } from './PrimaryButtonPreview';
import { BottomSheetPreview } from './BottomSheetPreview';
import { PullToRefreshPreview } from './PullToRefreshPreview';
import { TextInputPreview } from './TextInputPreview';
import { SegmentedControlPreview } from './SegmentedControlPreview';
import { ToastPreview } from './ToastPreview';
import { SwipeListPreview } from './SwipeListPreview';
import { CommandMenuPreview } from './CommandMenuPreview';
import { OtpInputPreview } from './OtpInputPreview';
import { FileDropzonePreview } from './FileDropzonePreview';
import { DynamicIslandPreview } from './DynamicIslandPreview';
import { BentoGridPreview } from './BentoGridPreview';
import { SwipeCardsPreview } from './SwipeCardsPreview';
import { NumberTickerPreview } from './NumberTickerPreview';
import { SwitchPreview } from './SwitchPreview';
import { ModalPreview } from './ModalPreview';
import { DatePickerPreview } from './DatePickerPreview';
import { SearchBarPreview } from './SearchBarPreview';
import { FormWizardPreview } from './FormWizardPreview';

import { ComponentItem } from '@/types/component';
import { Play, Sparkles, Check, RefreshCw, Layers, MousePointerClick, Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComponentLivePreviewProps {
  component: ComponentItem;
  variant?: string;
  state?: string;
}

// Universal Sandbox Preview for all generic components without custom preview files
const UniversalSandboxPreview: React.FC<{ component: ComponentItem; variant?: string; state?: string }> = ({
  component,
  variant,
  state,
}) => {
  const [activeState, setActiveState] = useState<string>(state || component.states?.[0] || 'Default');
  const [activeVariant, setActiveVariant] = useState<string>(variant || component.variants?.[0] || 'Default');
  const [interactiveCount, setInteractiveCount] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 text-center gap-6 min-h-[380px] relative overflow-hidden">
      {/* Platform & Category Badge */}
      <div className="flex items-center gap-2 z-10">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold flex items-center gap-1.5">
          {component.platform === 'Mobile' ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
          {component.category}
        </span>
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">
          {component.id}
        </span>
      </div>

      {/* Main Interactive Sandbox Canvas */}
      <div className="w-full max-w-md bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4 z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg mb-1">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        <div>
          <h4 className="font-extrabold text-white text-lg">{component.name}</h4>
          <p className="text-xs text-gray-400 max-w-xs mt-1 leading-relaxed">{component.description}</p>
        </div>

        {/* Dynamic State Preview Box */}
        <motion.div
          animate={{ scale: isToggled ? 1.02 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => {
            setInteractiveCount((c) => c + 1);
            setIsToggled(!isToggled);
          }}
          className={`w-full p-4 rounded-2xl border cursor-pointer select-none transition-all flex flex-col items-center gap-2 ${
            isToggled
              ? 'bg-blue-950/40 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] text-blue-300'
              : 'bg-slate-800/80 border-gray-700 hover:border-gray-600 text-gray-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold">
            <MousePointerClick className="w-4 h-4 text-blue-400" />
            <span>상태 테스트 (클릭하여 인터랙션 실행)</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-400 font-mono">Variant: <strong className="text-white">{activeVariant}</strong></span>
            <span className="text-xs text-gray-400 font-mono">State: <strong className="text-blue-400">{activeState}</strong></span>
          </div>

          <div className="mt-2 px-3 py-1 bg-slate-900 rounded-xl border border-gray-700 text-[11px] font-semibold text-gray-300">
            클릭 횟수: <span className="text-blue-400 font-mono font-bold">{interactiveCount}회</span> (클릭 시 토글 미세 모션)
          </div>
        </motion.div>

        {/* Supported Interactions Pills */}
        {component.interactions && component.interactions.length > 0 && (
          <div className="w-full text-left mt-1">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-2">
              지원되는 UX 인터랙션
            </span>
            <div className="flex flex-wrap gap-1.5">
              {component.interactions.map((interaction) => (
                <span
                  key={interaction}
                  className="px-2.5 py-1 bg-slate-800 text-gray-300 border border-gray-700/80 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  {interaction}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Selector Panel if variants/states exist */}
      {(component.variants || component.states) && (
        <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-900/80 p-2 rounded-2xl border border-gray-800 text-xs">
          {component.variants && component.variants.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-semibold">Variant:</span>
              <div className="flex gap-1">
                {component.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVariant(v)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      activeVariant === v ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {component.states && component.states.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-semibold">State:</span>
              <div className="flex gap-1">
                {component.states.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveState(s)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      activeState === s ? 'bg-purple-600 text-white shadow-xs' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ComponentLivePreview: React.FC<ComponentLivePreviewProps> = ({
  component,
  variant,
  state,
}) => {
  switch (component.id) {
    case 'DATE-04':
      return <DateScrollerPreview daysCount={variant === 'Compact (7 Days)' ? 7 : 14} />;
    case 'ACT-01':
      return <PrimaryButtonPreview />;
    case 'OVER-03':
      return <BottomSheetPreview />;
    case 'GEST-04':
      return <PullToRefreshPreview variant={variant} state={state} />;
    case 'INPUT-01':
      return <TextInputPreview variant={variant} state={state} />;
    case 'SELECT-04':
      return <SegmentedControlPreview variant={variant} state={state} />;
    case 'FEED-02':
      return <ToastPreview />;
    case 'LIST-06':
      return <SwipeListPreview />;
    case 'ACT-09':
      return <CommandMenuPreview />;
    case 'INPUT-07':
      return <OtpInputPreview />;
    case 'INPUT-08':
      return <FileDropzonePreview />;
    case 'NAV-08':
      return <DynamicIslandPreview />;
    case 'MOTION-08':
      return <BentoGridPreview />;
    case 'LIST-11':
      return <SwipeCardsPreview />;
    case 'MOTION-09':
      return <NumberTickerPreview />;
    case 'SELECT-03':
      return <SwitchPreview />;
    case 'OVER-01':
      return <ModalPreview />;
    case 'DATE-01':
      return <DatePickerPreview />;
    case 'SEARCH-01':
      return <SearchBarPreview />;
    case 'PATTERNS-01':
      return <FormWizardPreview />;
    default:
      return <UniversalSandboxPreview component={component} variant={variant} state={state} />;
  }
};
