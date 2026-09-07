import { ComponentItem, CategoryGroup } from '../types/component';

export const CATEGORIES: { id: CategoryGroup; name: string; icon: string; description: string }[] = [
  { id: 'Actions', name: 'Actions', icon: 'MousePointerClick', description: '버튼, FAB, 그룹 액션 컨트롤' },
  { id: 'Input', name: 'Input', icon: 'TextCursorInput', description: '텍스트, 태그, 자동완성 입력 필드' },
  { id: 'Selection', name: 'Selection', icon: 'CheckSquare', description: '체크박스, 라디오, 스위치, 칩, 슬라이더' },
  { id: 'Date & Time', name: 'Date & Time', icon: 'CalendarDays', description: '캘린더, 날짜/시간 피커, 호리존탈 스크롤러' },
  { id: 'Navigation', name: 'Navigation', icon: 'Navigation', description: '바텀 탭, 사이드바, 헤더, 스텝' },
  { id: 'Overlay', name: 'Overlay', icon: 'Layers', description: '모달, 바텀시트, 팝오버, 툴팁, 팝업' },
  { id: 'Lists & Cards', name: 'Lists & Cards', icon: 'LayoutGrid', description: '카드, 리스트 아이템, 스와이프 리스트, 캐러셀' },
  { id: 'Search & Filter', name: 'Search & Filter', icon: 'Search', description: '검색창, 필터 패널, 액티브 칩' },
  { id: 'Feedback & States', name: 'Feedback & States', icon: 'AlertCircle', description: '토스트, 스피너, 스켈레톤, 에러/빈 화면' },
  { id: 'Gesture', name: 'Gesture', icon: 'Touchpad', description: '롱프레스, 스와이프, 핀치 줌, 풀 투 리프레시' },
  { id: 'Motion', name: 'Motion', icon: 'Sparkles', description: '프레스 스케일, 트랜지션, 카운터 모션' },
  { id: 'Patterns', name: 'Patterns', icon: 'Boxes', description: '온보딩, 로그인, 폼 UX 패턴' },
];

export const COMPONENTS: ComponentItem[] = [
  // --- ACTIONS ---
  {
    id: 'ACT-01',
    name: 'Primary Button',
    category: 'Actions',
    description: '화면 내 가장 주요한 단일 목표 동작을 유도하는 최고 강조 버튼',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['button', 'cta', 'form-submit', 'primary-action'],
    interactions: ['Tap', 'Press State', 'Active Scale', 'Loading State', 'Focus Ring'],
    usage: ['폼 제출 (저장, 제출, 결제 등)', '다음 단계 이동 및 주요 CTA', '단 1개의 핵심 액션'],
    avoid: ['한 화면에 Primary Button 여러 개 배치', '파괴적 삭제 액션에 사용'],
    promptTemplate: `ACT-01 Primary Button을 구현한다.\n- Press animation (active scale 0.96)\n- Loading 상태 Spinner 및 disable\n- Focus ring accessibility 지원\n- Light/Dark mode 지원`,
    codeSnippets: { react: `export const PrimaryButton = ({ children }) => <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md active:scale-95 transition-all">{children}</button>;` },
    variants: ['Default', 'With Icon', 'Full Width', 'Compact', 'Disabled'],
    states: ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled', 'Loading']
  },
  {
    id: 'ACT-02',
    name: 'Secondary Button',
    category: 'Actions',
    description: 'Primary 액션을 보조하는 2순위 동작 버튼',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['button', 'secondary', 'cancel', 'subdued'],
    interactions: ['Tap', 'Hover Fill'],
    usage: ['취소, 돌아가기, 임시 저장'],
    avoid: ['주요 CTA로 사용하는 경우'],
    promptTemplate: `ACT-02 Secondary Button 구현`,
    codeSnippets: { react: `export const SecondaryButton = ({ children }) => <button className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">{children}</button>;` }
  },
  {
    id: 'ACT-03',
    name: 'Ghost Button',
    category: 'Actions',
    description: '배경 없이 텍스트와 아이콘으로만 이루어진 3순위 버튼',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['button', 'ghost', 'text-button', 'link'],
    interactions: ['Hover Background', 'Tap'],
    usage: ['자세히 보기, 더보기, 보조 링크'],
    avoid: ['독립적인 주요 동작 버튼'],
    promptTemplate: `ACT-03 Ghost Button 구현`,
    codeSnippets: { react: `export const GhostButton = ({ children }) => <button className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">{children}</button>;` }
  },
  {
    id: 'ACT-04',
    name: 'Destructive Button',
    category: 'Actions',
    description: '삭제, 탈퇴 등 비가역적 파괴 동작 버튼',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['button', 'danger', 'delete', 'destructive'],
    interactions: ['Tap', 'Confirm Modal'],
    usage: ['아이템 삭제, 계정 삭제'],
    avoid: ['일반적인 취소 버튼'],
    promptTemplate: `ACT-04 Destructive Button 구현`,
    codeSnippets: { react: `export const DestructiveButton = ({ children }) => <button className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold">{children}</button>;` }
  },
  {
    id: 'ACT-05',
    name: 'Loading Button',
    category: 'Actions',
    description: '비동기 처리 동안 내부에 Spinner가 표시되는 버튼',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['button', 'async', 'loading-state'],
    interactions: ['Click to Load', 'Spinner Spin'],
    usage: ['서버 전송, 결제 승인, 로그인'],
    avoid: ['동기식 즉시 액션'],
    promptTemplate: `ACT-05 Loading Button 구현`,
    codeSnippets: { react: `export const LoadingButton = ({ isLoading }) => <button disabled={isLoading} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white">Loading...</button>;` }
  },
  {
    id: 'ACT-06',
    name: 'Icon Button',
    category: 'Actions',
    description: '아이콘만으로 구성된 공간 효율적인 버튼',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['button', 'icon-only', 'toolbar', 'compact'],
    interactions: ['Hover Fill', 'Tooltip'],
    usage: ['알림, 닫기(X), 툴바 아이콘'],
    avoid: ['의미가 모호한 복잡한 기능'],
    promptTemplate: `ACT-06 Icon Button 구현`,
    codeSnippets: { react: `export const IconButton = () => <button className="p-2.5 rounded-full hover:bg-gray-100 font-semibold">🔔</button>;` }
  },
  {
    id: 'ACT-07',
    name: 'Floating Action Button (FAB)',
    category: 'Actions',
    description: '화면 우하단 고정 생성을 안내하는 플로팅 버튼',
    platform: 'Mobile',
    priority: 'P0',
    promptBuilderTags: ['button', 'fab', 'floating', 'create'],
    interactions: ['Fixed Overlay', 'Scroll Hide'],
    usage: ['새 글 작성, 일정 추가'],
    avoid: ['데스크톱 폼 내부'],
    promptTemplate: `ACT-07 FAB 구현`,
    codeSnippets: { react: `export const FAB = () => <button className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-xl">+</button>;` }
  },
  {
    id: 'ACT-08',
    name: 'Button Group',
    category: 'Actions',
    description: '연관된 여러 버튼을 가로로 결합한 그룹 컨트롤',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['button-group', 'view-switcher', 'toolbar'],
    interactions: ['Segment Select'],
    usage: ['뷰 방식 전환 (Grid/List)'],
    avoid: ['독립적인 불연관 액션'],
    promptTemplate: `ACT-08 Button Group 구현`,
    codeSnippets: { react: `export const ButtonGroup = () => <div className="inline-flex rounded-xl border"><button className="px-4 py-2 bg-gray-100">Day</button><button className="px-4 py-2">Week</button></div>;` }
  },

  // --- INPUT ---
  {
    id: 'INPUT-01',
    name: 'Text Input',
    category: 'Input',
    description: '단일 행의 텍스트 입력을 받는 표준 필드',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['input', 'text-field', 'form-control'],
    interactions: ['Focus Ring', 'Clear Button', 'Validation Error'],
    usage: ['이름, 이메일, 제목 입력'],
    avoid: ['여러 줄 텍스트 (Textarea)'],
    promptTemplate: `INPUT-01 Text Input 구현`,
    codeSnippets: { react: `export const TextInput = () => <input type="text" className="w-full px-4 py-2.5 rounded-xl border" placeholder="입력하세요..." />;` }
  },
  {
    id: 'INPUT-02',
    name: 'Textarea',
    category: 'Input',
    description: '여러 줄의 장문 텍스트 입력을 받는 필드',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['input', 'textarea', 'long-text', 'comment'],
    interactions: ['Auto Resize', 'Character Counter'],
    usage: ['본문 작성, 리뷰 입력, 문의 사항'],
    avoid: ['단일 행 검색어 또는 이름 입력'],
    promptTemplate: `INPUT-02 Textarea 구현`,
    codeSnippets: { react: `export const Textarea = () => <textarea className="w-full p-4 rounded-xl border" rows={4} placeholder="내용을 입력하세요..." />;` }
  },
  {
    id: 'INPUT-03',
    name: 'Search Input',
    category: 'Input',
    description: '돋보기 아이콘과 지우기 버튼이 통합된 검색 필드',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['input', 'search', 'query', 'filter'],
    interactions: ['Instant Filter', 'Clear Query'],
    usage: ['목록 검색, 글로벌 검색'],
    avoid: ['일반 폼 제출'],
    promptTemplate: `INPUT-03 Search Input 구현`,
    codeSnippets: { react: `export const SearchInput = () => <div className="relative"><input type="search" className="w-full pl-10 pr-4 py-2.5 rounded-xl border" placeholder="검색..." /></div>;` }
  },
  {
    id: 'INPUT-04',
    name: 'Number Input',
    category: 'Input',
    description: '수량 조절용 스티퍼버튼 결합 숫자 입력 필드',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['input', 'number', 'stepper', 'quantity'],
    interactions: ['Increment/Decrement', 'Min/Max Constraint'],
    usage: ['상품 수량, 수량 조절'],
    avoid: ['전화번호, 신용카드 번호'],
    promptTemplate: `INPUT-04 Number Input 구현`,
    codeSnippets: { react: `export const NumberInput = () => <input type="number" className="w-24 px-3 py-2 rounded-xl border" />;` }
  },
  {
    id: 'INPUT-05',
    name: 'Autocomplete',
    category: 'Input',
    description: '입력 텍스트에 맞춰 관련 추천 키워드를 드롭다운으로 보여주는 자동완성',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['input', 'autocomplete', 'typeahead', 'search-recommendation'],
    interactions: ['Keyboard Arrow Navigation', 'Dropdown Highlight'],
    usage: ['주소 검색, 태그 추천, 사용자 검색'],
    avoid: ['선택지가 3개 이하로 매우 적은 경우'],
    promptTemplate: `INPUT-05 Autocomplete 구현`,
    codeSnippets: { react: `export const Autocomplete = () => <input type="text" placeholder="자동완성 검색..." className="w-full border px-4 py-2.5 rounded-xl" />;` }
  },
  {
    id: 'INPUT-06',
    name: 'Tag Input',
    category: 'Input',
    description: '엔터 또는 컴마 입력 시 텍스트를 칩 형태로 변환하여 다중 등록하는 입력',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['input', 'tag-input', 'chip-input', 'multi-value'],
    interactions: ['Enter Tag Create', 'Backspace Remove'],
    usage: ['게시글 태그, 키워드 등록'],
    avoid: ['단일 값 선택'],
    promptTemplate: `INPUT-06 Tag Input 구현`,
    codeSnippets: { react: `export const TagInput = () => <div className="flex flex-wrap gap-2 p-2 border rounded-xl"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs">#Tag1</span></div>;` }
  },

  // --- SELECTION ---
  {
    id: 'SELECT-01',
    name: 'Checkbox',
    category: 'Selection',
    description: '다중 선택을 위한 상자형 체크 박스',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['selection', 'checkbox', 'multi-select'],
    interactions: ['Check Toggle'],
    usage: ['약관 동의, 다중 옵션 필터'],
    avoid: ['단일 선택 그룹'],
    promptTemplate: `SELECT-01 Checkbox 구현`,
    codeSnippets: { react: `export const Checkbox = () => <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600" />;` }
  },
  {
    id: 'SELECT-02',
    name: 'Radio',
    category: 'Selection',
    description: '그룹 내 단 하나의 옵션만 선택 가능한 라디오',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['selection', 'radio', 'single-select'],
    interactions: ['Radio Select'],
    usage: ['결제 수단 선택, 배송 옵션'],
    avoid: ['다중 선택'],
    promptTemplate: `SELECT-02 Radio 구현`,
    codeSnippets: { react: `export const Radio = () => <input type="radio" className="w-5 h-5 text-blue-600" />;` }
  },
  {
    id: 'SELECT-03',
    name: 'Switch',
    category: 'Selection',
    description: '즉각적인 On/Off 상태 변경 토글 스위치',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['selection', 'switch', 'toggle', 'settings'],
    interactions: ['Toggle Slide'],
    usage: ['설정 항목 활성화 (알림, 다크모드)'],
    avoid: ['폼 제출이 필요한 체크박스 대체'],
    promptTemplate: `SELECT-03 Switch 구현`,
    codeSnippets: { react: `export const Switch = ({ checked }) => <button className={\`w-12 h-7 rounded-full p-1 transition-colors \${checked ? 'bg-blue-600' : 'bg-gray-300'}\`}><div className="w-5 h-5 bg-white rounded-full shadow-md" /></button>;` }
  },
  {
    id: 'SELECT-04',
    name: 'Segmented Control',
    category: 'Selection',
    description: '2~5개 단일 옵션을 슬라이딩 탭으로 보여주는 세그먼트',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['selection', 'segmented-control', 'tab-switch', 'filter-switch'],
    interactions: ['Sliding Indicator'],
    usage: ['뷰 전환 (Day/Week/Month)'],
    avoid: ['6개 이상의 옵션'],
    promptTemplate: `SELECT-04 Segmented Control 구현`,
    codeSnippets: { react: `export const SegmentedControl = () => <div className="p-1 bg-gray-100 rounded-xl flex gap-1"><button className="px-4 py-1.5 bg-white rounded-lg font-bold shadow-xs">Day</button><button className="px-4 py-1.5 text-gray-500">Week</button></div>;` }
  },
  {
    id: 'SELECT-05',
    name: 'Chip',
    category: 'Selection',
    description: '정보 표기 또는 간이 액션용 소형 캡슐 칩',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['selection', 'chip', 'tag', 'badge'],
    interactions: ['Click Action', 'Remove X'],
    usage: ['카테고리 표시, 선택 항목 표시'],
    avoid: ['주요 CTA 버튼'],
    promptTemplate: `SELECT-05 Chip 구현`,
    codeSnippets: { react: `export const Chip = ({ label }) => <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold">{label}</span>;` }
  },
  {
    id: 'SELECT-06',
    name: 'Choice Chip (Filter Chip)',
    category: 'Selection',
    description: '필터링을 위해 토글 형태로 켜고 끄는 선택 칩',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['selection', 'choice-chip', 'filter-chip', 'toggle-badge'],
    interactions: ['Active Toggle State'],
    usage: ['상품 필터 (무료배송, 할인상품)'],
    avoid: ['단순 정보 텍스트'],
    promptTemplate: `SELECT-06 Choice Chip 구현`,
    codeSnippets: { react: `export const ChoiceChip = ({ active, label }) => <button className={\`px-3 py-1.5 rounded-full text-xs font-bold border \${active ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200'}\`}>{label}</button>;` }
  },
  {
    id: 'SELECT-07',
    name: 'Stepper',
    category: 'Selection',
    description: '플러스/마이너스 버튼으로 수량을 조절하는 컨트롤러',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['selection', 'stepper', 'counter', 'quantity'],
    interactions: ['Plus/Minus Click'],
    usage: ['장바구니 수량 조절, 인원수 선택'],
    avoid: ['큰 숫자의 입력'],
    promptTemplate: `SELECT-07 Stepper 구현`,
    codeSnippets: { react: `export const Stepper = () => <div className="flex items-center gap-3 border rounded-xl p-1"><button className="w-8 h-8 bg-gray-100 rounded-lg">-</button><span>1</span><button className="w-8 h-8 bg-gray-100 rounded-lg">+</button></div>;` }
  },
  {
    id: 'SELECT-08',
    name: 'Slider',
    category: 'Selection',
    description: '연속적인 수치(음량, 가격 등)를 드래그하여 조절하는 슬라이더',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['selection', 'slider', 'range-input', 'continuous'],
    interactions: ['Drag Thumb', 'Track Fill'],
    usage: ['가격 범위 조절, 음량/밝기'],
    avoid: ['정확한 불연속 단어 입력'],
    promptTemplate: `SELECT-08 Slider 구현`,
    codeSnippets: { react: `export const Slider = () => <input type="range" className="w-full accent-blue-600" />;` }
  },

  // --- DATE & TIME ---
  {
    id: 'DATE-01',
    name: 'Calendar',
    category: 'Date & Time',
    description: '월간 그리드 기반의 전통적인 달력 뷰',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['date-time', 'calendar', 'month-view', 'schedule'],
    interactions: ['Month Change', 'Date Grid Select'],
    usage: ['전체 일정 탐색, 월간 예약'],
    avoid: ['좁은 모바일 수직 바텀시트'],
    promptTemplate: `DATE-01 Calendar 구현`,
    codeSnippets: { react: `export const Calendar = () => <div className="p-4 border rounded-2xl">Calendar Month View</div>;` }
  },
  {
    id: 'DATE-02',
    name: 'Single Date Picker',
    category: 'Date & Time',
    description: '단일 날짜 선택 팝오버/모달 피커',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['date-time', 'date-picker', 'single-date'],
    interactions: ['Date Select', 'Apply Button'],
    usage: ['생년월일 입력, 출발일 지정'],
    avoid: ['시작-종료 범위 선택'],
    promptTemplate: `DATE-02 Single Date Picker 구현`,
    codeSnippets: { react: `export const SingleDatePicker = () => <input type="date" className="p-2.5 border rounded-xl" />;` }
  },
  {
    id: 'DATE-03',
    name: 'Date Range Picker',
    category: 'Date & Time',
    description: '시작일과 종료일을 한 번에 지정하는 기간 피커',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['date-time', 'date-range', 'period-picker', 'reservation'],
    interactions: ['Range Drag/Click', 'Highlight Span'],
    usage: ['숙박 예약, 여행 기간 선택'],
    avoid: ['단일 일자 선택'],
    promptTemplate: `DATE-03 Date Range Picker 구현`,
    codeSnippets: { react: `export const DateRangePicker = () => <div className="p-4 border rounded-xl">Range: 2026.09.01 ~ 2026.09.07</div>;` }
  },
  {
    id: 'DATE-04',
    name: 'Horizontal Date Scroller',
    category: 'Date & Time',
    description: '날짜를 가로 스크롤로 연속 탐색하고 빠르게 선택하는 날짜 스크롤러',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['date-time', 'horizontal-scroll', 'day-scroller', 'timeline-picker'],
    interactions: ['Horizontal Touch Swipe', 'Scroll Snap', 'Auto Focus Today', 'Selected Date Highlight'],
    usage: ['일정 예약 시스템', '운동/식단 기록 앱', '가계부 타임라인 탐색'],
    avoid: ['수개월 단위의 긴 탐색', '날짜 범위 선택'],
    promptTemplate: `DATE-04 Horizontal Date Scroller를 구현한다.\n- Horizontal scroll snap\n- Today 자동 포커스\n- 선택 날짜 강조\n- Mobile touch swipe`,
    codeSnippets: { react: `export const HorizontalDateScroller = () => <div className="flex gap-2 overflow-x-auto p-2"><div className="w-14 h-20 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center font-bold">화 6</div></div>;` },
    variants: ['Default (14 Days)', 'Compact (7 Days)', 'With Month Header', 'Disabled Past Dates'],
    states: ['Default', 'Today Highlight', 'Selected', 'Hover/Pressed', 'Disabled']
  },
  {
    id: 'DATE-05',
    name: 'Weekly Date Strip',
    category: 'Date & Time',
    description: '월~일 7일간의 주간 단위 날짜 고정 스트립',
    platform: 'Mobile',
    priority: 'P1',
    promptBuilderTags: ['date-time', 'weekly-strip', 'schedule-bar'],
    interactions: ['Week Change Swipe'],
    usage: ['주간 일정 대시보드, 시간표'],
    avoid: ['연간 데이터 탐색'],
    promptTemplate: `DATE-05 Weekly Date Strip 구현`,
    codeSnippets: { react: `export const WeeklyDateStrip = () => <div className="grid grid-cols-7 gap-1 p-2 border rounded-xl">Weekly Strip</div>;` }
  },
  {
    id: 'DATE-06',
    name: 'Month Selector',
    category: 'Date & Time',
    description: '1월~12월 중 특정 월을 빠르게 선택하는 휠/그리드 피커',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['date-time', 'month-picker', 'yearly-overview'],
    interactions: ['Month Grid Click'],
    usage: ['월별 통계, 가계부 결산'],
    avoid: ['일 단위 정밀 예약'],
    promptTemplate: `DATE-06 Month Selector 구현`,
    codeSnippets: { react: `export const MonthSelector = () => <div className="grid grid-cols-4 gap-2 p-4 border rounded-xl">1월 2월 3월 4월...</div>;` }
  },
  {
    id: 'DATE-07',
    name: 'Wheel Picker',
    category: 'Date & Time',
    description: 'iOS 스타일의 수직 회전 휠 날짜/시간 피커',
    platform: 'Mobile',
    priority: 'P0',
    promptBuilderTags: ['date-time', 'wheel-picker', 'ios-picker', 'scroll-wheel'],
    interactions: ['Vertical Drag Scroll', 'Haptic Snap'],
    usage: ['알람 시간 설정, 생년월일 슬라이드'],
    avoid: ['데스크톱 대시보드'],
    promptTemplate: `DATE-07 Wheel Picker 구현`,
    codeSnippets: { react: `export const WheelPicker = () => <div className="h-40 overflow-hidden border rounded-xl flex items-center justify-center font-bold text-lg">Wheel Scroll</div>;` }
  },
  {
    id: 'DATE-08',
    name: 'Time Picker',
    category: 'Date & Time',
    description: '시:분 선택 전용 피커',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['date-time', 'time-picker', 'hour-minute'],
    interactions: ['Hour/Minute Select'],
    usage: ['미팅 시간 예약, 알림 설정'],
    avoid: ['날짜 포함 피커가 필요할 때'],
    promptTemplate: `DATE-08 Time Picker 구현`,
    codeSnippets: { react: `export const TimePicker = () => <input type="time" className="p-2.5 border rounded-xl" />;` }
  },
  {
    id: 'DATE-09',
    name: 'Date Time Picker',
    category: 'Date & Time',
    description: '날짜와 시간을 통합 선택하는 피커',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['date-time', 'datetime-picker', 'combined-schedule'],
    interactions: ['Calendar + Time Combine'],
    usage: ['이벤트 일시 등록, 항공권 예약'],
    avoid: ['단순 날짜만 필요할 때'],
    promptTemplate: `DATE-09 Date Time Picker 구현`,
    codeSnippets: { react: `export const DateTimePicker = () => <input type="datetime-local" className="p-2.5 border rounded-xl" />;` }
  },
  {
    id: 'DATE-10',
    name: 'Quick Date Selector',
    category: 'Date & Time',
    description: '오늘, 내일, 이번주, 다음주 등 퀵 선택 칩 버튼',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['date-time', 'quick-date', 'presets'],
    interactions: ['Quick Preset Click'],
    usage: ['할 일(Todo) 기한 빠르게 설정'],
    avoid: ['정확한 과거 일자 조회'],
    promptTemplate: `DATE-10 Quick Date Selector 구현`,
    codeSnippets: { react: `export const QuickDateSelector = () => <div className="flex gap-2"><button className="px-3 py-1 bg-gray-100 rounded-lg text-xs">오늘</button><button className="px-3 py-1 bg-gray-100 rounded-lg text-xs">내일</button></div>;` }
  },

  // --- NAVIGATION ---
  {
    id: 'NAV-01',
    name: 'Bottom Navigation',
    category: 'Navigation',
    description: '모바일 앱 최상위 탭 이동을 지원하는 바텀 바',
    platform: 'Mobile',
    priority: 'P0',
    promptBuilderTags: ['navigation', 'bottom-bar', 'tab-bar', 'mobile-nav'],
    interactions: ['Tab Change', 'Icon Active State'],
    usage: ['모바일 메인 앱 탭 이동'],
    avoid: ['데스크톱 전용 웹사이트'],
    promptTemplate: `NAV-01 Bottom Navigation 구현`,
    codeSnippets: { react: `export const BottomNav = () => <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center">Home | Search | Profile</div>;` }
  },
  {
    id: 'NAV-02',
    name: 'Top Tabs',
    category: 'Navigation',
    description: '화면 상단 서브 카테고리 이동용 탭 바',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['navigation', 'top-tabs', 'sub-navigation'],
    interactions: ['Active Line Indicator'],
    usage: ['피드 카테고리 (추천/팔로잉)'],
    avoid: ['글로벌 앱 구조 변경'],
    promptTemplate: `NAV-02 Top Tabs 구현`,
    codeSnippets: { react: `export const TopTabs = () => <div className="flex border-b"><button className="px-4 py-2 border-b-2 border-blue-600 font-bold">추천</button><button className="px-4 py-2 text-gray-500">팔로잉</button></div>;` }
  },
  {
    id: 'NAV-03',
    name: 'Scrollable Tabs',
    category: 'Navigation',
    description: '카테고리 개수가 많을 때 가로 스크롤을 지원하는 탭',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['navigation', 'scrollable-tabs', 'category-bar'],
    interactions: ['Horizontal Scroll', 'Active Chip'],
    usage: ['쇼핑몰 다수 카테고리 목록'],
    avoid: ['옵션이 3개 이하인 경우'],
    promptTemplate: `NAV-03 Scrollable Tabs 구현`,
    codeSnippets: { react: `export const ScrollableTabs = () => <div className="flex gap-2 overflow-x-auto p-2"><span>의류</span><span>잡화</span><span>뷰티</span><span>디지털</span></div>;` }
  },
  {
    id: 'NAV-04',
    name: 'Header / Back Header',
    category: 'Navigation',
    description: '뒤로가기 버튼과 타이틀, 우측 액션이 결합된 앱 상단 헤더',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['navigation', 'header', 'app-bar', 'back-button'],
    interactions: ['Back Arrow Tap', 'Title Truncate'],
    usage: ['상세 페이지 상단 헤더'],
    avoid: ['랜딩페이지 메인 비주얼 구역'],
    promptTemplate: `NAV-04 Header 구현`,
    codeSnippets: { react: `export const BackHeader = ({ title }) => <div className="h-14 border-b flex items-center justify-between px-4"><button>←</button><h2 className="font-bold">{title}</h2><button>⋮</button></div>;` }
  },
  {
    id: 'NAV-05',
    name: 'Sidebar Drawer',
    category: 'Navigation',
    description: '좌측 슬라이드로 오픈되는 메뉴 사이드바',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['navigation', 'sidebar', 'drawer-menu', 'hamburger-menu'],
    interactions: ['Slide Open', 'Backdrop Dismiss'],
    usage: ['대시보드 관리자 메뉴, 모바일 햄버거 메뉴'],
    avoid: ['3단계 이상 깊은 중첩 구조'],
    promptTemplate: `NAV-05 Sidebar Drawer 구현`,
    codeSnippets: { react: `export const SidebarDrawer = () => <aside className="w-64 h-screen bg-gray-900 text-white p-4">Navigation Menu</aside>;` }
  },
  {
    id: 'NAV-06',
    name: 'Pagination',
    category: 'Navigation',
    description: '페이지 번호 버튼을 통해 다량의 데이터를 나누어 탐색하는 바',
    platform: 'Web',
    priority: 'P0',
    promptBuilderTags: ['navigation', 'pagination', 'page-numbers'],
    interactions: ['Page Click', 'Prev/Next Arrow'],
    usage: ['게시판 리스트, 상품 목록 대시보드'],
    avoid: ['모바일 피드 (무한 스크롤 추천)'],
    promptTemplate: `NAV-06 Pagination 구현`,
    codeSnippets: { react: `export const Pagination = () => <div className="flex gap-1 justify-center"><button className="px-3 py-1 border rounded">&lt;</button><button className="px-3 py-1 bg-blue-600 text-white rounded">1</button><button className="px-3 py-1 border rounded">2</button><button className="px-3 py-1 border rounded">&gt;</button></div>;` }
  },
  {
    id: 'NAV-07',
    name: 'Step Navigation',
    category: 'Navigation',
    description: '다단계 폼 진행 현황을 단계별 번호로 시각화하는 위저드 바',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['navigation', 'stepper-nav', 'wizard', 'multi-step-form'],
    interactions: ['Step Active Indicator'],
    usage: ['회원가입 절차, 주문/결제 단계'],
    avoid: ['단일 페이지 폼'],
    promptTemplate: `NAV-07 Step Navigation 구현`,
    codeSnippets: { react: `export const StepNavigation = () => <div className="flex items-center justify-between"><div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div><div className="flex-1 h-1 bg-gray-200" /><div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div></div>;` }
  },

  // --- OVERLAY ---
  {
    id: 'OVER-01',
    name: 'Modal',
    category: 'Overlay',
    description: '화면 중앙에 떠서 사용자의 주의를 집중시키는 대화상자',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['overlay', 'modal', 'dialog', 'popup'],
    interactions: ['Backdrop Blur', 'ESC Key Close'],
    usage: ['중요 알림, 폼 작성 모달'],
    avoid: ['단순 1줄 짧은 알림 (Toast 사용)'],
    promptTemplate: `OVER-01 Modal 구현`,
    codeSnippets: { react: `export const Modal = ({ isOpen, title, children }) => isOpen ? <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"><div className="bg-white p-6 rounded-2xl max-w-md w-full"><h3 className="font-bold text-lg">{title}</h3>{children}</div></div> : null;` }
  },
  {
    id: 'OVER-02',
    name: 'Confirm Dialog',
    category: 'Overlay',
    description: '확인/취소 선택을 요구하는 파괴적/중요 작업 확인창',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['overlay', 'confirm-dialog', 'alert-modal', 'confirmation'],
    interactions: ['Action Confirm/Cancel'],
    usage: ['삭제 확인, 저장하지 않고 나가기 경고'],
    avoid: ['정보 전달 전용 알림'],
    promptTemplate: `OVER-02 Confirm Dialog 구현`,
    codeSnippets: { react: `export const ConfirmDialog = () => <div className="p-6 bg-white rounded-2xl border"><h4 className="font-bold">정말 삭제하시겠습니까?</h4><div className="flex justify-end gap-2 mt-4"><button className="px-4 py-2 border rounded-xl">취소</button><button className="px-4 py-2 bg-red-600 text-white rounded-xl">삭제</button></div></div>;` }
  },
  {
    id: 'OVER-03',
    name: 'Bottom Sheet',
    category: 'Overlay',
    description: '모바일 하단에서 올라오는 선택 레이어 시트',
    platform: 'Mobile',
    priority: 'P0',
    promptBuilderTags: ['overlay', 'bottom-sheet', 'slide-up-modal', 'mobile-sheet'],
    interactions: ['Drag Dismiss', 'Backdrop Fade'],
    usage: ['모바일 필터, 공유하기, 빠른 옵션'],
    avoid: ['데스크톱 전용 모니터 대시보드'],
    promptTemplate: `OVER-03 Bottom Sheet 구현`,
    codeSnippets: { react: `export const BottomSheet = () => <div className="fixed bottom-0 inset-x-0 bg-white rounded-t-3xl p-6 shadow-2xl"><div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />BottomSheet Content</div>;` }
  },
  {
    id: 'OVER-04',
    name: 'Action Sheet',
    category: 'Overlay',
    description: 'iOS 스타일의 여러 선택 가능한 동작을 나열하는 하단 시트',
    platform: 'Mobile',
    priority: 'P1',
    promptBuilderTags: ['overlay', 'action-sheet', 'ios-menu'],
    interactions: ['Option Tap', 'Cancel Button'],
    usage: ['프로필 사진 변경 (촬영/앨범/삭제)'],
    avoid: ['긴 장문 텍스트 설명'],
    promptTemplate: `OVER-04 Action Sheet 구현`,
    codeSnippets: { react: `export const ActionSheet = () => <div className="space-y-2"><button className="w-full py-3 bg-gray-100 rounded-xl font-semibold">사진 촬영</button><button className="w-full py-3 bg-gray-100 rounded-xl font-semibold">앨범에서 선택</button></div>;` }
  },
  {
    id: 'OVER-05',
    name: 'Popover',
    category: 'Overlay',
    description: '특정 요소 근처에 뜨는 카운터/보조 컨텍스트 레이어',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['overlay', 'popover', 'anchored-card', 'dropdown-card'],
    interactions: ['Click Anchor Reveal', 'Click Outside Close'],
    usage: ['프로필 미니 팝업, 알림 리스트 드롭다운'],
    avoid: ['모바일 전체 화면 덮기'],
    promptTemplate: `OVER-05 Popover 구현`,
    codeSnippets: { react: `export const Popover = () => <div className="absolute top-full mt-2 p-4 bg-white rounded-xl shadow-xl border">Popover Content</div>;` }
  },
  {
    id: 'OVER-06',
    name: 'Tooltip',
    category: 'Overlay',
    description: '마우스 호버 시 추가 보조 설명을 제공하는 툴팁',
    platform: 'Web',
    priority: 'P1',
    promptBuilderTags: ['overlay', 'tooltip', 'hover-hint', 'info-bubble'],
    interactions: ['Hover Delay Reveal'],
    usage: ['아이콘 기능 설명, 용어 추가 설명'],
    avoid: ['터치 전용 모바일 화면 (터치는 Popover 사용)'],
    promptTemplate: `OVER-06 Tooltip 구현`,
    codeSnippets: { react: `export const Tooltip = ({ text }) => <div className="px-2.5 py-1 bg-gray-900 text-white text-xs rounded-md shadow-md">{text}</div>;` }
  },
  {
    id: 'OVER-07',
    name: 'Context Menu',
    category: 'Overlay',
    description: '우클릭 또는 롱프레스 시 나타나는 작업 메뉴',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['overlay', 'context-menu', 'right-click-menu'],
    interactions: ['Right Click Reveal', 'Long Press'],
    usage: ['파일 관리 우클릭 (복사/이동/삭제)'],
    avoid: ['기본 접근성을 방해하는 전체 페이지 클릭 가로채기'],
    promptTemplate: `OVER-07 Context Menu 구현`,
    codeSnippets: { react: `export const ContextMenu = () => <div className="w-48 bg-white border rounded-xl shadow-xl py-1"><button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">복사하기</button></div>;` }
  },
  {
    id: 'OVER-08',
    name: 'Full Screen Modal',
    category: 'Overlay',
    description: '화면 전체를 덮어 복잡한 작업에 집중시키는 풀스크린 모달',
    platform: 'Mobile',
    priority: 'P0',
    promptBuilderTags: ['overlay', 'full-screen-modal', 'mobile-overlay'],
    interactions: ['Full Screen Slide', 'Top Close X'],
    usage: ['모바일 글쓰기 작성창, 결제 진행'],
    avoid: ['간단한 확인 대화상자'],
    promptTemplate: `OVER-08 Full Screen Modal 구현`,
    codeSnippets: { react: `export const FullScreenModal = () => <div className="fixed inset-0 bg-white z-50 p-4">Full Screen View</div>;` }
  },
  {
    id: 'OVER-09',
    name: 'Lightbox',
    category: 'Overlay',
    description: '이미지나 미디어를 확대하여 보여주는 갤러리 오버레이',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['overlay', 'lightbox', 'image-viewer', 'gallery-modal'],
    interactions: ['Pinch Zoom', 'Swipe Image'],
    usage: ['상품 상세 이미지 확대보기'],
    avoid: ['일반 텍스트 문서 전용'],
    promptTemplate: `OVER-09 Lightbox 구현`,
    codeSnippets: { react: `export const Lightbox = () => <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"><img src="/demo.jpg" className="max-h-full rounded-xl" /></div>;` }
  },

  // --- LISTS & CARDS ---
  {
    id: 'LIST-01',
    name: 'Basic Card',
    category: 'Lists & Cards',
    description: '연관된 정보(제목, 텍스트, 액션)를 묶어 제공하는 표준 카드',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['card', 'basic-card', 'info-box'],
    interactions: ['Card Hover Shadow', 'Click Target'],
    usage: ['블로그 글 요약, 피드 카드'],
    avoid: ['너무 많은 비정형 데이터의 혼합'],
    promptTemplate: `LIST-01 Basic Card 구현`,
    codeSnippets: { react: `export const BasicCard = () => <div className="p-5 border rounded-2xl bg-white shadow-xs"><h3 className="font-bold">Card Title</h3><p className="text-xs text-gray-500 mt-1">Card Content</p></div>;` }
  },
  {
    id: 'LIST-02',
    name: 'Image Card',
    category: 'Lists & Cards',
    description: '상단 썸네일 이미지 중심의 시각적 피드 카드',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['card', 'image-card', 'thumbnail-card', 'product-card'],
    interactions: ['Image Zoom Hover'],
    usage: ['상품 카드, 여행지 카드, 포트폴리오'],
    avoid: ['이미지 없이 텍스트만 존재할 때'],
    promptTemplate: `LIST-02 Image Card 구현`,
    codeSnippets: { react: `export const ImageCard = () => <div className="border rounded-2xl overflow-hidden"><div className="h-36 bg-gray-200" /><div className="p-4"><h4 className="font-bold">Image Title</h4></div></div>;` }
  },
  {
    id: 'LIST-03',
    name: 'Horizontal Card',
    category: 'Lists & Cards',
    description: '좌측 이미지와 우측 텍스트 정보로 구성된 가로형 리스트 카드',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['card', 'horizontal-card', 'row-card'],
    interactions: ['Row Click'],
    usage: ['검색 결과 리스트, 장바구니 상품'],
    avoid: ['그리드 뷰 배치'],
    promptTemplate: `LIST-03 Horizontal Card 구현`,
    codeSnippets: { react: `export const HorizontalCard = () => <div className="flex gap-4 p-3 border rounded-2xl"><div className="w-20 h-20 bg-gray-200 rounded-xl" /><div><h4 className="font-bold">Title</h4></div></div>;` }
  },
  {
    id: 'LIST-04',
    name: 'List Item',
    category: 'Lists & Cards',
    description: '좌측 아이콘, 중앙 텍스트, 우측 화살표로 이뤄진 설정 리스트 행',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['list', 'list-item', 'settings-row', 'table-row'],
    interactions: ['Row Press Feedback', 'Arrow Right'],
    usage: ['마이페이지 메뉴, 설정 목록'],
    avoid: ['카드 형태 그리드'],
    promptTemplate: `LIST-04 List Item 구현`,
    codeSnippets: { react: `export const ListItem = ({ title }) => <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50"><span>{title}</span><span>&gt;</span></div>;` }
  },
  {
    id: 'LIST-05',
    name: 'Expandable List',
    category: 'Lists & Cards',
    description: '클릭 시 하단으로 숨겨진 세부 내용이 펼쳐지는 아코디언 목록',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['list', 'accordion', 'expandable-list', 'faq-item'],
    interactions: ['Expand/Collapse Animation', 'Chevron Rotate'],
    usage: ['FAQ 자주 묻는 질문, 상세 규정'],
    avoid: ['주요 탐색 메뉴 하이재킹'],
    promptTemplate: `LIST-05 Expandable List 구현`,
    codeSnippets: { react: `export const ExpandableList = ({ question, answer }) => <div className="border-b p-4"><h4 className="font-bold">{question}</h4><p className="text-xs text-gray-500 mt-2">{answer}</p></div>;` }
  },
  {
    id: 'LIST-06',
    name: 'Swipe Action List',
    category: 'Lists & Cards',
    description: '좌/우 스와이프 시 삭제, 편집 버튼이 노출되는 모바일 목록',
    platform: 'Mobile',
    priority: 'P0',
    promptBuilderTags: ['list', 'swipe-list', 'swipe-to-delete', 'mobile-row'],
    interactions: ['Swipe Left/Right', 'Action Reveal'],
    usage: ['이메일/메시지 삭제 스와이프'],
    avoid: ['데스크톱 마우스 전용'],
    promptTemplate: `LIST-06 Swipe Action List 구현`,
    codeSnippets: { react: `export const SwipeListItem = () => <div className="p-4 bg-white border rounded-xl shadow-xs">Swipeable Item Row</div>;` }
  },
  {
    id: 'LIST-07',
    name: 'Reorderable List',
    category: 'Lists & Cards',
    description: '드래그 앤 드롭으로 순서를 변경할 수 있는 목록',
    platform: 'Both',
    priority: 'P1',
    promptBuilderTags: ['list', 'drag-and-drop', 'reorderable', 'sortable-list'],
    interactions: ['Drag Handle', 'Reorder Motion'],
    usage: ['투두리스트 순서 변경, 재생목록'],
    avoid: ['정렬 불가능한 정적 데이터'],
    promptTemplate: `LIST-07 Reorderable List 구현`,
    codeSnippets: { react: `export const ReorderableList = () => <div className="p-3 border rounded-xl flex items-center justify-between"><span>≡ Drag Item</span></div>;` }
  },
  {
    id: 'LIST-08',
    name: 'Grid',
    category: 'Lists & Cards',
    description: '2열~4열 반응형 격자 배치 리스트',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['layout', 'grid-layout', 'responsive-grid', 'card-grid'],
    interactions: ['Responsive Columns'],
    usage: ['상품 포토 갤러리, 카테고리 아이콘 그리드'],
    avoid: ['순차적 읽기가 중요한 뉴스 텍스트'],
    promptTemplate: `LIST-08 Grid 구현`,
    codeSnippets: { react: `export const Grid = () => <div className="grid grid-cols-2 md:grid-cols-4 gap-4"><div>Item 1</div><div>Item 2</div></div>;` }
  },
  {
    id: 'LIST-09',
    name: 'Carousel',
    category: 'Lists & Cards',
    description: '가로 슬라이드로 여러 카드/배너를 넘겨보는 스와이프 캐러셀',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['carousel', 'slider-banner', 'swipe-cards', 'hero-carousel'],
    interactions: ['Touch Drag Swipe', 'Dot Indicators', 'Auto Play'],
    usage: ['메인 상단 이벤트 배너, 추천 상품 세트'],
    avoid: ['필수 확인 공지사항'],
    promptTemplate: `LIST-09 Carousel 구현`,
    codeSnippets: { react: `export const Carousel = () => <div className="flex gap-4 overflow-x-auto p-4 snap-x"><div className="w-64 h-32 bg-blue-500 text-white rounded-2xl flex-shrink-0 snap-center p-4 font-bold">Banner 1</div></div>;` }
  },

  // --- SEARCH & FILTER ---
  {
    id: 'SEARCH-01',
    name: 'Search Bar',
    category: 'Search & Filter',
    description: '검색 기능 전용 상단 검색 바',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['search', 'search-bar', 'top-search'],
    interactions: ['Instant Query'],
    usage: ['글로벌 통합 검색'],
    avoid: ['일반 입력 필드'],
    promptTemplate: `SEARCH-01 Search Bar 구현`,
    codeSnippets: { react: `export const SearchBar = () => <input type="search" placeholder="Search..." className="w-full px-4 py-2.5 rounded-xl border" />;` }
  },
  {
    id: 'SEARCH-04',
    name: 'Filter Panel',
    category: 'Search & Filter',
    description: '여러 조건의 필터를 통합 제공하는 패널',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['filter', 'filter-panel', 'faceted-search'],
    interactions: ['Multi Select', 'Clear All'],
    usage: ['쇼핑몰 다중 조건 검색, 컴포넌트 라이브러리 필터'],
    avoid: ['단 1개의 단순 조건'],
    promptTemplate: `SEARCH-04 Filter Panel 구현`,
    codeSnippets: { react: `export const FilterPanel = () => <div className="p-4 border rounded-2xl">Filter Panel Options</div>;` }
  },
  {
    id: 'SEARCH-07',
    name: 'Active Filter Chips',
    category: 'Search & Filter',
    description: '현재 적용된 필터 목록을 칩으로 보여주고 해제 가능한 바',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['filter', 'active-chips', 'filter-summary'],
    interactions: ['Chip Dismiss X'],
    usage: ['선택 필터 요약 표시'],
    avoid: ['필터 미선택 상태'],
    promptTemplate: `SEARCH-07 Active Filter Chips 구현`,
    codeSnippets: { react: `export const ActiveFilterChips = () => <div className="flex gap-2"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Price &lt; 50$ ✕</span></div>;` }
  },

  // --- FEEDBACK & STATES ---
  {
    id: 'FEED-01',
    name: 'Spinner',
    category: 'Feedback & States',
    description: '로딩 중을 나타내는 원형 회전 애니메이션',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['feedback', 'spinner', 'loading-indicator'],
    interactions: ['Spin Animation'],
    usage: ['버튼 로딩, 부분 컨테이너 로딩'],
    avoid: ['전체 화면 로딩 스켈레톤 대체'],
    promptTemplate: `FEED-01 Spinner 구현`,
    codeSnippets: { react: `export const Spinner = () => <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;` }
  },
  {
    id: 'FEED-02',
    name: 'Toast',
    category: 'Feedback & States',
    description: '수 초 후 자동으로 사라지는 스낵바 알림',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['feedback', 'toast', 'notification-popup'],
    interactions: ['Auto Dismiss', 'Slide Up'],
    usage: ['저장 완료, 복사 완료 알림'],
    avoid: ['사용자 승인이 필요한 필수 경고'],
    promptTemplate: `FEED-02 Toast 구현`,
    codeSnippets: { react: `export const Toast = ({ message }) => <div className="fixed bottom-6 right-6 p-4 bg-gray-900 text-white rounded-2xl shadow-xl">{message}</div>;` }
  },
  {
    id: 'FEED-04',
    name: 'Skeleton',
    category: 'Feedback & States',
    description: '데이터 로딩 동안 콘텐츠 레이아웃 윤곽을 보여주는 플레이스홀더',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['feedback', 'skeleton', 'shimmer-placeholder'],
    interactions: ['Shimmer Motion'],
    usage: ['초기 데이터 로딩'],
    avoid: ['너무 빠른 (0.1초) 로딩'],
    promptTemplate: `FEED-04 Skeleton 구현`,
    codeSnippets: { react: `export const Skeleton = () => <div className="w-full h-20 bg-gray-200 animate-pulse rounded-xl" />;` }
  },

  // --- GESTURE ---
  {
    id: 'GEST-04',
    name: 'Pull to Refresh',
    category: 'Gesture',
    description: '목록을 아래로 당겨 당겨서 새로고침하는 모바일 제스처 컴포넌트',
    platform: 'Mobile',
    priority: 'P0',
    promptBuilderTags: ['gesture', 'pull-to-refresh', 'swipe-refresh', 'touch-drag'],
    interactions: ['Pull Down Drag', 'Threshold Reveal', 'Spin Refresh', 'Spring Bounce Back'],
    usage: ['모바일 뉴스/SNS 피드 새로고침', '목록 데이터 최신화'],
    avoid: ['데스크톱 모니터 전용 정적 테이블', '리스트가 최상단이 아닐 때'],
    promptTemplate: `GEST-04 Pull to Refresh를 구현한다.
- 스크롤 컨테이너 최상단에서 아래로 당기면 새로고침 발동
- 당기는 거리에 비례하여 인디케이터(스피너/화살표) 노출
- 60px 이상 당기면 로딩 상태 진입
- 1.5초 로딩 후 데이터 갱신 및 원위치
- Framer Motion으로 부드러운 드래그 애니메이션
- 마우스 드래그 및 터치 이벤트 모두 지원
- 리스트 최상단에서만 발동 (스크롤 중 오발동 방지)
- Disabled 상태에서는 제스처 무시`,
    codeSnippets: {
      react: `import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowDown, Loader2, Check } from 'lucide-react';

export const PullToRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const pullDistance = useMotionValue(0);
  const pullY = useTransform(pullDistance, (v) => Math.min(v * 0.5, 90));

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (refreshing || containerRef.current?.scrollTop !== 0) return;
    startY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (refreshing || containerRef.current?.scrollTop !== 0) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = clientY - startY.current;
    if (diff > 0) {
      pullDistance.set(diff);
      setPastThreshold(diff * 0.5 >= 60);
    }
  };

  const handleEnd = () => {
    if (refreshing) return;
    if (pullDistance.get() * 0.5 >= 60) {
      setRefreshing(true);
      animate(pullDistance, 120, { duration: 0.2 });
      setTimeout(() => {
        setRefreshing(false);
        setPastThreshold(false);
        animate(pullDistance, 0, { type: 'spring' });
      }, 1500);
    } else {
      setPastThreshold(false);
      animate(pullDistance, 0, { type: 'spring' });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      className="relative overflow-y-auto h-80 border rounded-2xl bg-white p-4"
    >
      <motion.div style={{ y: pullY }} className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
        {refreshing ? <Loader2 className="animate-spin text-blue-600" /> : <ArrowDown />}
      </motion.div>
      <motion.div style={{ y: pullY }} className="space-y-2">
        <div className="p-3 border rounded-xl">Feed Item 1</div>
        <div className="p-3 border rounded-xl">Feed Item 2</div>
      </motion.div>
    </div>
  );
};`
    }
  },

  // --- MOTION ---
  {
    id: 'MOTION-01',
    name: 'Press Scale Animation',
    category: 'Motion',
    description: '터치/클릭 시 살짝 축소되는 피드백 모션',
    platform: 'Both',
    priority: 'P0',
    promptBuilderTags: ['motion', 'press-scale', 'touch-feedback'],
    interactions: ['Active Scale 0.96'],
    usage: ['버튼, 카드 터치 반응'],
    avoid: ['본문 텍스트'],
    promptTemplate: `MOTION-01 Press Scale Animation 구현`,
    codeSnippets: { react: `export const PressScale = ({ children }) => <div className="active:scale-95 transition-transform">{children}</div>;` }
  }
];
