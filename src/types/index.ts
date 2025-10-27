// Avatar and Profile Types
export interface Avatar {
  avatarUrl: string;
  frameUrl: string;
  backgroundUrl: string;
  objectUrl1: string;
  objectUrl2: string;
  appBg: string;
}

export interface StudentProfile {
  name: string;
  greeting?: string;
  date: string;
  overallProgress: number;
  lessonsCompleted: number;
  achievementsEarned: number;
  coins: number;
  gamePoints: number;
  startDate: string;
  avatar: Avatar;
  learningCategories: LearningCategory[];
}

// Learning Categories Types
export interface LearningLink {
  id: number;
  name: string;
  icon: string;
  color: string;
  progress: number;
  lessons: number;
  completed: number;
  description: string;
  topics: string[],
  href: string;
}

export interface LearningCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgcolor: string;
  description: string;
  mainHref: string;
  links: LearningLink[];
}

export interface LearningCategoriesProps {
  learningCategories: LearningCategory[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  searchQuery?: string;
}

// Component Props Types
export interface ScrollHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export interface BackgroundImageProps {
  children: React.ReactNode;
  bgIndex?: number;
  autoRotate?: boolean;
}

export interface BackgroundControlsProps {
  onBackgroundChange: (index: number) => void;
  currentIndex: number;
  totalBackgrounds: number;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// Practice Problems Types
export type Problem = {
  id: string;
  title: string;
  question: string;
  visual: string;
  correct: number | string;
  explanation: string;
  type?: 'input';
  options?: (number | string)[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
};

// Auth Types
export interface AuthContextType {
  user: unknown;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Activity and Progress Types
export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'lesson' | 'quiz' | 'achievement' | 'assignment';
  subject: string;
  progress?: number;
}

export interface ProgressStat {
  label: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

// Search Types
export interface SearchHeaderProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

// User type for mathematics app
export interface User {
  name: string;
  coins: number;
  gamePoints: number;
  startDate: string;
  avatar: Avatar;
  sheetOptions: Array<{
    sheets: Array<{
      type: string;
      level: string;
    }>;
  }>;
} 