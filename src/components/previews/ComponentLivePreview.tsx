'use client';

import React from 'react';
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
import { SkeletonPreview } from './SkeletonPreview';
import { TimePickerPreview } from './TimePickerPreview';
import { TimeRangeSliderPreview } from './TimeRangeSliderPreview';
import { DateRangePickerPreview } from './DateRangePickerPreview';
import { SpinnerPreview } from './SpinnerPreview';
import { ProgressBarPreview } from './ProgressBarPreview';
import { CheckboxPreview } from './CheckboxPreview';
import { RadioPreview } from './RadioPreview';
import { ChipPreview } from './ChipPreview';
import { StepperPreview } from './StepperPreview';
import { SliderPreview } from './SliderPreview';
import { DropdownSelectPreview } from './DropdownSelectPreview';
import { RatingPreview } from './RatingPreview';
import { TooltipPopoverPreview } from './TooltipPopoverPreview';
import { WheelTimePickerPreview } from './WheelTimePickerPreview';
import { CreditCardInputPreview } from './CreditCardInputPreview';
import { InfiniteMarqueePreview } from './InfiniteMarqueePreview';
import { AnimatedDockPreview } from './AnimatedDockPreview';

import { AutocompletePreview } from './AutocompletePreview';
import { TagInputPreview } from './TagInputPreview';
import { BottomNavPreview, TopHeaderPreview, BreadcrumbsPreview, TabBarPreview } from './NavigationPreviews';
import { ActionSheetPreview, AlertBannerPreview, CarouselPreview } from './OverlayAndListPreviews';
import { ActiveFilterChipsPreview, FilterPanelPreview, EmptyStatePreview } from './SearchAndFeedbackPreviews';
import { LongPressPreview, PinchZoomPreview, DoubleTapHeartPreview } from './GesturePreviews';
import { PressScalePreview, SpringTabPreview, OnboardingPreview, PaymentFlowPreview } from './MotionAndPatternPreviews';

import { ComponentItem } from '@/types/component';
import { Play, Sparkles } from 'lucide-react';

interface ComponentLivePreviewProps {
  component: ComponentItem;
  variant?: string;
  state?: string;
}

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
    case 'SELECT-01':
      return <CheckboxPreview />;
    case 'SELECT-02':
      return <RadioPreview />;
    case 'SELECT-03':
      return <SwitchPreview />;
    case 'SELECT-05':
    case 'SELECT-06':
      return <ChipPreview />;
    case 'SELECT-07':
      return <StepperPreview />;
    case 'SELECT-08':
      return <SliderPreview />;
    case 'SELECT-09':
      return <DropdownSelectPreview />;
    case 'SELECT-10':
      return <RatingPreview />;
    case 'OVER-01':
      return <ModalPreview />;
    case 'OVER-02':
    case 'OVER-04':
      return <TooltipPopoverPreview />;
    case 'DATE-01':
      return <DatePickerPreview />;
    case 'SEARCH-01':
      return <SearchBarPreview />;
    case 'PATTERNS-01':
      return <FormWizardPreview />;
    case 'FEED-04':
      return <SkeletonPreview />;
    case 'DATE-08':
      return <TimePickerPreview />;
    case 'DATE-11':
      return <TimeRangeSliderPreview />;
    case 'DATE-02':
      return <DateRangePickerPreview />;
    case 'FEED-01':
      return <SpinnerPreview />;
    case 'FEED-03':
      return <ProgressBarPreview />;
    case 'DATE-12':
      return <WheelTimePickerPreview />;
    case 'INPUT-09':
      return <CreditCardInputPreview />;
    case 'MOTION-10':
      return <InfiniteMarqueePreview />;
    case 'MOTION-11':
      return <AnimatedDockPreview />;
    case 'INPUT-05':
      return <AutocompletePreview />;
    case 'INPUT-06':
      return <TagInputPreview />;
    case 'NAV-01':
      return <BottomNavPreview />;
    case 'NAV-02':
      return <TopHeaderPreview />;
    case 'NAV-03':
      return <BreadcrumbsPreview />;
    case 'NAV-04':
      return <TabBarPreview />;
    case 'OVER-05':
      return <ActionSheetPreview />;
    case 'OVER-06':
      return <AlertBannerPreview />;
    case 'LIST-03':
      return <CarouselPreview />;
    case 'SEARCH-02':
      return <ActiveFilterChipsPreview />;
    case 'SEARCH-04':
      return <FilterPanelPreview />;
    case 'FEED-05':
      return <EmptyStatePreview />;
    case 'GEST-01':
      return <LongPressPreview />;
    case 'GEST-02':
      return <PinchZoomPreview />;
    case 'GEST-03':
      return <DoubleTapHeartPreview />;
    case 'MOTION-01':
      return <PressScalePreview />;
    case 'MOTION-02':
      return <SpringTabPreview />;
    case 'PATTERNS-02':
      return <OnboardingPreview />;
    case 'PATTERNS-03':
      return <PaymentFlowPreview />;
    default:
      return (
        <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-gray-800 text-center gap-3 min-h-[380px]">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shadow-xs">
            <Sparkles className="w-6 h-6 animate-pulse text-blue-400" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-lg">{component.name}</h4>
            <p className="text-sm text-gray-400 max-w-sm mt-1">{component.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-gray-800 text-xs font-semibold text-gray-300">
            <Play className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            <span>Interactive Live React Render Component</span>
          </div>
        </div>
      );
  }
};
