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

// New extended previews - Part 1 (ACT, INPUT, SELECT, NAV, OVER, LIST, FEED, GEST, MOTION)
import {
  ContextToolbarPreview, AddItemButtonPreview,
  CurrencyInputPreview, PhoneInputPreview, PasswordInputPreview, PasswordStrengthPreview,
  FilterChipsPreview, MultiSelectListboxPreview, TreeSelectPreview,
  PaginationPreview, PrevNextNavPreview, ContextualBreadcrumbPreview, NestedMenuPreview,
  TabNavigationPreview, IconTabBarPreview, NotificationTabPreview,
  ContextMenuPreview, ConfirmDialogPreview, LoadingOverlayPreview, ToastNotificationPreview,
  BottomSheetV2Preview, SideDrawerPreview,
  FeedListItemPreview, MasonryGridPreview, MediaCardPreview, SortableTablePreview,
  WarningBannerPreview, InlineNotificationPreview, ReviewCardPreview, SuccessAnimationPreview,
  SwipeGesturePreview, SwipeRevealPreview, SwipeRefreshGesturePreview, LongPressMenuPreview,
  StaggeredListPreview, MicroAnimationPreview, StateTransitionPreview, CountUpPreview, RippleEffectPreview,
  SkeletonToContentPreview, PageTransitionPreview,
} from './ExtendedPreviews1';

// New extended previews - Part 2 (PATTERNS, DATA DISPLAY, LAYOUT, COMM, ECOM, CHART, AUTH, FORMS, A11Y, AI, MEDIA)
import {
  NotificationPrefsPreview, ThemeTogglePreview, UndoSnackbarPreview, PermissionDialogPreview,
  PromoBannerPreview, CookieBannerPreview, ShareSheetPreview, InviteFlowPreview,
  FeatureGatePreview, CommandPalettePreview, AppRatingPreview, SplashHeroPreview,
  FeatureTourPreview, UpdatePromptPreview,
  BadgeChipPreview, AvatarGroupPreview, StatCardPreview, TimelinePreview, SparklinePreview,
  EditableDataPreview, ActivityHeatmapPreview, ComparisonTablePreview, KPICardPreview, CollabIndicatorPreview,
  BentoLayoutPreview, SplitViewPreview, VirtualScrollPreview, KanbanPreview,
  BarChartPreview, LineChartPreview, PieChartPreview, AreaChartPreview,
  BiometricAuthPreview, TwoFactorPreview, PermissionRequestPreview, SocialLoginPreview,
  MultiStepFormPreview, AutoSaveFormPreview, InlineValidationPreview, PINInputPreview,
  FocusTrapPreview, LiveRegionPreview,
  AITypingStreamPreview, ThinkingIndicatorPreview, PromptInputPreview, ConfidenceBadgePreview, CitationPreview,
  VideoPlayerPreview, ImageGalleryPreview, AudioPlayerPreview,
} from './ExtendedPreviews2';

import { ComponentItem } from '@/types/component';
import { Play, Sparkles } from 'lucide-react';

interface ComponentLivePreviewProps {
  component: ComponentItem;
  variant?: string;
  state?: string;
}

export const ComponentLivePreview: React.FC<ComponentLivePreviewProps> = ({ component, variant, state }) => {
  switch (component.id) {
    // ===== ORIGINAL COMPONENTS =====
    case 'DATE-04': return <DateScrollerPreview daysCount={variant === 'Compact (7 Days)' ? 7 : 14} />;
    case 'ACT-01': return <PrimaryButtonPreview />;
    case 'OVER-03': return <BottomSheetPreview />;
    case 'GEST-04': return <PullToRefreshPreview variant={variant} state={state} />;
    case 'INPUT-01': return <TextInputPreview variant={variant} state={state} />;
    case 'SELECT-04': return <SegmentedControlPreview variant={variant} state={state} />;
    case 'FEED-02': return <ToastPreview />;
    case 'LIST-06': return <SwipeListPreview />;
    case 'ACT-09': return <CommandMenuPreview />;
    case 'INPUT-07': return <OtpInputPreview />;
    case 'INPUT-08': return <FileDropzonePreview />;
    case 'NAV-08': return <DynamicIslandPreview />;
    case 'MOTION-08': return <BentoGridPreview />;
    case 'LIST-11': return <SwipeCardsPreview />;
    case 'MOTION-09': return <NumberTickerPreview />;
    case 'SELECT-01': return <CheckboxPreview />;
    case 'SELECT-02': return <RadioPreview />;
    case 'SELECT-03': return <SwitchPreview />;
    case 'SELECT-05': case 'SELECT-06': return <ChipPreview />;
    case 'SELECT-07': return <StepperPreview />;
    case 'SELECT-08': return <SliderPreview />;
    case 'SELECT-09': return <DropdownSelectPreview />;
    case 'SELECT-10': return <RatingPreview />;
    case 'OVER-01': return <ModalPreview />;
    case 'OVER-02': case 'OVER-04': return <TooltipPopoverPreview />;
    case 'DATE-01': return <DatePickerPreview />;
    case 'SEARCH-01': return <SearchBarPreview />;
    case 'PATTERNS-01': return <FormWizardPreview />;
    case 'FEED-04': return <SkeletonPreview />;
    case 'DATE-08': return <TimePickerPreview />;
    case 'DATE-11': return <TimeRangeSliderPreview />;
    case 'DATE-02': return <DateRangePickerPreview />;
    case 'FEED-01': return <SpinnerPreview />;
    case 'FEED-03': return <ProgressBarPreview />;
    case 'DATE-12': return <WheelTimePickerPreview />;
    case 'INPUT-09': return <CreditCardInputPreview />;
    case 'MOTION-10': return <InfiniteMarqueePreview />;
    case 'MOTION-11': return <AnimatedDockPreview />;
    case 'INPUT-05': return <AutocompletePreview />;
    case 'INPUT-06': return <TagInputPreview />;
    case 'NAV-01': return <BottomNavPreview />;
    case 'NAV-02': return <TopHeaderPreview />;
    case 'NAV-03': return <BreadcrumbsPreview />;
    case 'NAV-04': return <TabBarPreview />;
    case 'OVER-05': return <ActionSheetPreview />;
    case 'OVER-06': return <AlertBannerPreview />;
    case 'LIST-03': return <CarouselPreview />;
    case 'SEARCH-02': return <ActiveFilterChipsPreview />;
    case 'SEARCH-04': return <FilterPanelPreview />;
    case 'FEED-05': return <EmptyStatePreview />;
    case 'GEST-01': return <LongPressPreview />;
    case 'GEST-02': return <PinchZoomPreview />;
    case 'GEST-03': return <DoubleTapHeartPreview />;
    case 'MOTION-01': return <PressScalePreview />;
    case 'MOTION-02': return <SpringTabPreview />;
    case 'PATTERNS-02': return <OnboardingPreview />;
    case 'PATTERNS-03': return <PaymentFlowPreview />;

    // ===== NEW: ACTIONS =====
    case 'ACT-10': return <ContextToolbarPreview />;
    case 'ACT-11': return <AddItemButtonPreview />;

    // ===== NEW: INPUT =====
    case 'INPUT-10': return <CurrencyInputPreview />;
    case 'INPUT-11': return <PhoneInputPreview />;
    case 'INPUT-12': return <PasswordInputPreview />;
    case 'INPUT-13': return <PasswordStrengthPreview />;

    // ===== NEW: SELECTION =====
    case 'SELECT-11': return <FilterChipsPreview />;
    case 'SELECT-12': return <MultiSelectListboxPreview />;
    case 'SELECT-13': return <TreeSelectPreview />;

    // ===== NEW: NAVIGATION =====
    case 'NAV-06': return <PaginationPreview />;
    case 'NAV-07': return <PrevNextNavPreview />;
    case 'NAV-09': return <ContextualBreadcrumbPreview />;
    case 'NAV-10': return <NestedMenuPreview />;
    case 'NAV-11': return <TabNavigationPreview />;
    case 'NAV-12': return <IconTabBarPreview />;
    case 'NAV-13': return <NotificationTabPreview />;

    // ===== NEW: OVERLAY =====
    case 'OVER-07': return <ContextMenuPreview />;
    case 'OVER-08': return <ConfirmDialogPreview />;
    case 'OVER-09': return <LoadingOverlayPreview />;
    case 'OVER-10': return <ToastNotificationPreview />;
    case 'OVERLAY-11': return <BottomSheetV2Preview />;
    case 'OVERLAY-12': return <SideDrawerPreview />;

    // ===== NEW: LISTS & CARDS =====
    case 'LIST-05': return <FeedListItemPreview />;
    case 'LIST-07': return <MasonryGridPreview />;
    case 'LIST-08': return <MediaCardPreview />;
    case 'LISTS-11': return <SortableTablePreview />;

    // ===== NEW: FEEDBACK =====
    case 'FEED-06': case 'FEED-07': return <WarningBannerPreview />;
    case 'FEED-08': case 'FEED-09': return <InlineNotificationPreview />;
    case 'FEED-10': return <ReviewCardPreview />;
    case 'FEED-11': return <ProgressBarPreview />;
    case 'FEED-12': return <SuccessAnimationPreview />;
    case 'FEED-13': return <EmptyStatePreview />;

    // ===== NEW: GESTURE =====
    case 'GEST-05': return <SwipeGesturePreview />;
    case 'GEST-06': return <SwipeRevealPreview />;
    case 'GEST-07': return <SwipeRefreshGesturePreview />;
    case 'GEST-08': return <LongPressMenuPreview />;

    // ===== NEW: MOTION =====
    case 'MOTION-03': case 'MOTION-06': case 'MOTION-13': return <StaggeredListPreview />;
    case 'MOTION-04': return <MicroAnimationPreview />;
    case 'MOTION-05': return <StateTransitionPreview />;
    case 'MOTION-07': return <RippleEffectPreview />;
    case 'MOTION-12': return <SkeletonToContentPreview />;
    case 'MOTION-14': return <PageTransitionPreview />;

    // ===== NEW: PATTERNS =====
    case 'PATTERNS-04': return <NotificationPrefsPreview />;
    case 'PATTERNS-05': return <ThemeTogglePreview />;
    case 'PATTERNS-06': return <UndoSnackbarPreview />;
    case 'PATTERNS-07': return <PermissionDialogPreview />;
    case 'PATTERNS-08': return <PromoBannerPreview />;
    case 'PATTERNS-09': return <CookieBannerPreview />;
    case 'PATTERNS-10': return <ShareSheetPreview />;
    case 'PATTERNS-11': return <InviteFlowPreview />;
    case 'PATTERNS-12': return <FeatureGatePreview />;
    case 'PATTERNS-13': return <CommandPalettePreview />;
    case 'PATTERNS-14': return <AppRatingPreview />;
    case 'PATTERNS-15': return <SplashHeroPreview />;
    case 'PATTERNS-16': return <FeatureTourPreview />;
    case 'PATTERNS-17': return <UpdatePromptPreview />;

    // ===== NEW: DATA DISPLAY =====
    case 'DISPLAY-01': case 'DISPLAY-10': return <BadgeChipPreview />;
    case 'DISPLAY-02': case 'DISPLAY-09': return <AvatarGroupPreview />;
    case 'DISPLAY-03': case 'DISPLAY-04': return <StatCardPreview />;
    case 'DISPLAY-05': case 'DISPLAY-07': return <SparklinePreview />;
    case 'DISPLAY-06': return <TimelinePreview />;
    case 'DISPLAY-08': return <EditableDataPreview />;
    case 'DISPLAY-11': return <ActivityHeatmapPreview />;
    case 'DISPLAY-12': return <ComparisonTablePreview />;
    case 'DISPLAY-13': return <KPICardPreview />;
    case 'DISPLAY-14': return <CollabIndicatorPreview />;

    // ===== NEW: LAYOUT =====
    case 'LAYOUT-01': case 'LAYOUT-04': case 'LAYOUT-05': return <BentoLayoutPreview />;
    case 'LAYOUT-02': case 'LAYOUT-06': return <SplitViewPreview />;
    case 'LAYOUT-03': return <VirtualScrollPreview />;
    case 'LAYOUT-07': return <KanbanPreview />;

    // ===== NEW: COMMUNICATION =====
    case 'COMM-01': case 'COMM-03': case 'COMM-04': return <ThinkingIndicatorPreview />;
    case 'COMM-02': return <LiveRegionPreview />;
    case 'COMM-05': return <AppRatingPreview />;
    case 'COMM-06': return <CollabIndicatorPreview />;
    case 'COMM-07': return <InviteFlowPreview />;
    case 'COMM-08': return <AudioPlayerPreview />;
    case 'COMM-09': return <TimelinePreview />;
    case 'COMM-10': return <NotificationPrefsPreview />;

    // ===== NEW: COMMERCE =====
    case 'ECOM-01': return <StatCardPreview />;
    case 'ECOM-02': return <SortableTablePreview />;
    case 'ECOM-03': case 'ECOM-07': return <AppRatingPreview />;
    case 'ECOM-04': return <BadgeChipPreview />;
    case 'ECOM-05': return <InviteFlowPreview />;
    case 'ECOM-06': case 'ECOM-09': return <ComparisonTablePreview />;
    case 'ECOM-08': case 'ECOM-14': return <TimelinePreview />;
    case 'ECOM-10': return <CountUpPreview />;
    case 'ECOM-11': return <FilterChipsPreview />;
    case 'ECOM-12': return <ImageGalleryPreview />;
    case 'ECOM-13': return <FeatureGatePreview />;
    case 'ECOM-15': return <KPICardPreview />;

    // ===== NEW: CHARTS =====
    case 'CHART-01': return <BarChartPreview />;
    case 'CHART-02': return <LineChartPreview />;
    case 'CHART-03': return <PieChartPreview />;
    case 'CHART-04': return <AreaChartPreview />;

    // ===== NEW: AUTH & SECURITY =====
    case 'AUTH-01': return <BiometricAuthPreview />;
    case 'AUTH-02': return <TwoFactorPreview />;
    case 'AUTH-03': return <PermissionRequestPreview />;
    case 'AUTH-04': return <SocialLoginPreview />;

    // ===== NEW: FORMS =====
    case 'FORMS-01': return <MultiStepFormPreview />;
    case 'FORMS-02': return <AutoSaveFormPreview />;
    case 'FORMS-03': return <InlineValidationPreview />;
    case 'FORMS-04': return <PINInputPreview />;

    // ===== NEW: ACCESSIBILITY =====
    case 'A11Y-01': return <FocusTrapPreview />;
    case 'A11Y-02': return <LiveRegionPreview />;

    // ===== NEW: AI/ML UX =====
    case 'AI-01': return <AITypingStreamPreview />;
    case 'AI-02': return <ThinkingIndicatorPreview />;
    case 'AI-03': return <PromptInputPreview />;
    case 'AI-04': return <ConfidenceBadgePreview />;
    case 'AI-05': return <CitationPreview />;

    // ===== NEW: MEDIA =====
    case 'MEDIA-01': return <VideoPlayerPreview />;
    case 'MEDIA-02': return <ImageGalleryPreview />;
    case 'MEDIA-03': return <AudioPlayerPreview />;

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
