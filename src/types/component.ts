export type PlatformType = 'Web' | 'Mobile' | 'Both';
export type PriorityType = 'P0' | 'P1' | 'P2';

export type CategoryGroup =
  | 'Actions'
  | 'Input'
  | 'Selection'
  | 'Date & Time'
  | 'Navigation'
  | 'Overlay'
  | 'Lists & Cards'
  | 'Search & Filter'
  | 'Feedback & States'
  | 'Gesture'
  | 'Motion'
  | 'Patterns'
  | 'Data Display'
  | 'Layout'
  | 'Communication'
  | 'Commerce'
  | 'Charts'
  | 'Auth & Security'
  | 'Forms'
  | 'Accessibility'
  | 'AI/ML UX'
  | 'Media';

export interface CodeSnippets {
  react: string;
  reactNative?: string;
  htmlCss?: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: CategoryGroup;
  description: string;
  platform: PlatformType;
  priority: PriorityType;
  interactions: string[];
  usage: string[];
  avoid: string[];
  promptTemplate: string;
  codeSnippets: CodeSnippets;
  variants?: string[];
  states?: string[];
  tags?: string[];
  promptBuilderTags?: string[];
}

export interface CategoryInfo {
  id: CategoryGroup;
  name: string;
  iconName: string;
  count?: number;
}
