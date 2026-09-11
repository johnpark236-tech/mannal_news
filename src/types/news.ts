export type CategorySlug = 
  | 'tech' 
  | 'economy' 
  | 'society' 
  | 'politics' 
  | 'world' 
  | 'culture';

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
  badgeColor?: string;
}

export interface Author {
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface ArticleContentSection {
  heading?: string;
  paragraphs: string[];
  quote?: {
    text: string;
    speaker?: string;
  };
  highlightBox?: {
    title: string;
    items: string[];
  };
}

export interface Article {
  id: string;
  slug: string;
  category: CategorySlug;
  categoryLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  content: ArticleContentSection[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  tags: string[];
  views: number;
  isBreaking: boolean;
  isFeatured: boolean;
  isDemo: boolean;
  readTimeMinutes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'subscriber' | 'admin';
  isSubscribed: boolean;
  subscriptionPlan?: string;
  bookmarkedArticleIds: string[];
  interestedCategories: CategorySlug[];
  newsletterSubscribed: boolean;
  joinedDate: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface SubscriptionConfig {
  regularMonthlyPrice: number;
  lifetimeDiscountRate: number;
  lifetimeSpecialPrice: number;
  currency: string;
  eventBannerText: string;
  eventSubText: string;
  conditionsUrl: string;
  features: {
    title: string;
    description: string;
    isPremium: boolean;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface SiteConfig {
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  publisher: string;
  editorInChief: string;
  youthProtectionOfficer: string;
  registrationNumber: string;
  registrationDate: string;
  firstPublishDate: string;
  businessNumber: string;
  address: string;
  phone: string;
  email: string;
  copyright: string;
  disclaimer: string;
  categories: Category[];
}
