import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, CategorySlug, User, Comment } from '../types/news';
import { sampleArticles } from '../data/articles';

interface AppContextType {
  // Navigation & Routing
  currentPath: string;
  navigate: (path: string) => void;
  
  // Articles
  articles: Article[];
  getArticleById: (idOrSlug: string) => Article | undefined;
  getArticlesByCategory: (category: CategorySlug) => Article[];
  
  // User & Auth
  user: User | null;
  loginDemoUser: (asSubscriber?: boolean) => void;
  logout: () => void;
  updateUserInterests: (categories: CategorySlug[]) => void;
  
  // Bookmarks
  bookmarkedIds: string[];
  isBookmarked: (articleId: string) => boolean;
  toggleBookmark: (articleId: string) => void;
  
  // Promo Bar
  isPromoBarClosed: boolean;
  closePromoBar: () => void;
  
  // Newsletter
  isNewsletterSubscribed: boolean;
  subscribeNewsletter: (email: string) => { success: boolean; message: string };
  
  // Subscription Modal & State
  isSubscriptionModalOpen: boolean;
  openSubscriptionModal: () => void;
  closeSubscriptionModal: () => void;
  completeSubscriptionDemo: () => void;
  
  // Comments
  comments: Comment[];
  addComment: (articleId: string, content: string) => boolean;
  
  // Toast Notification
  toast: { message: string; type?: 'info' | 'success' | 'alert' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'alert') => void;
  clearToast: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'art-001',
    userId: 'u-101',
    userName: '김영호 독자',
    content: '현장 제조업 종사자로서 크게 공감합니다. 단순한 툴 도입보다 현장 숙련공들의 직무 전환 교육이 정말 시급합니다.',
    createdAt: '2026-09-10 10:14',
    likes: 12,
  },
  {
    id: 'c-2',
    articleId: 'art-001',
    userId: 'u-102',
    userName: '박지민 님',
    content: '데이터 주권과 온디바이스 AI 특화 전략 분석이 매우 명쾌하네요. 만날신문의 깊이 있는 기획을 항상 응원합니다.',
    createdAt: '2026-09-10 11:30',
    likes: 8,
  },
  {
    id: 'c-3',
    articleId: 'art-002',
    userId: 'u-103',
    userName: '정현우 님',
    content: '3040 세대의 현실적인 연금 자산배분 필요성을 짚어줘서 유익했습니다. TDF 비중을 다시 살펴봐야겠네요.',
    createdAt: '2026-09-10 09:40',
    likes: 15,
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Routing via Hash / Path sync
  const getInitialPath = (): string => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('/')) {
        return hash;
      }
      if (window.location.pathname && window.location.pathname !== '/') {
        return window.location.pathname;
      }
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [articles] = useState<Article[]>(sampleArticles);

  // Read / write hash on route change
  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('/')) {
        setCurrentPath(hash);
      } else {
        setCurrentPath('/');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Promo bar persistence
  const [isPromoBarClosed, setIsPromoBarClosed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mannal_promo_closed') === 'true';
    }
    return false;
  });

  const closePromoBar = () => {
    setIsPromoBarClosed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mannal_promo_closed', 'true');
    }
  };

  // Toast
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'alert' } | null>(null);

  const showToast = (message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const clearToast = () => setToast(null);

  // User state
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mannal_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted local state
        }
      }
    }
    return null;
  });

  const loginDemoUser = (asSubscriber: boolean = false) => {
    const demoUser: User = {
      id: 'usr-demo-01',
      name: asSubscriber ? '이만날 (평생구독)' : '홍길동 독자',
      email: 'reader@mannaldaily.kr',
      role: asSubscriber ? 'subscriber' : 'member',
      isSubscribed: asSubscriber,
      subscriptionPlan: asSubscriber ? '창간 특별 평생 구독권 (80% 특별할인)' : undefined,
      bookmarkedArticleIds: ['art-001', 'art-003'],
      interestedCategories: ['tech', 'economy', 'society'],
      newsletterSubscribed: true,
      joinedDate: '2026.09.01',
    };
    setUser(demoUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mannal_user', JSON.stringify(demoUser));
    }
    showToast(`${demoUser.name}님으로 로그인되었습니다.`, 'success');
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mannal_user');
    }
    showToast('로그아웃되었습니다.', 'info');
  };

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mannal_bookmarks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return ['art-001', 'art-002'];
  });

  const isBookmarked = (articleId: string) => bookmarkedIds.includes(articleId);

  const toggleBookmark = (articleId: string) => {
    let updated: string[];
    const willBookmark = !bookmarkedIds.includes(articleId);
    if (willBookmark) {
      updated = [...bookmarkedIds, articleId];
      showToast('기사가 스크랩에 보관되었습니다. 마이페이지에서 확인하세요.', 'success');
    } else {
      updated = bookmarkedIds.filter(id => id !== articleId);
      showToast('기사 스크랩이 해제되었습니다.', 'info');
    }
    setBookmarkedIds(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mannal_bookmarks', JSON.stringify(updated));
    }
  };

  const updateUserInterests = (categories: CategorySlug[]) => {
    if (user) {
      const updatedUser = { ...user, interestedCategories: categories };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mannal_user', JSON.stringify(updatedUser));
      }
      showToast('관심 분야 설정이 저장되었습니다.', 'success');
    }
  };

  // Newsletter
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mannal_newsletter') === 'true';
    }
    return false;
  });

  const subscribeNewsletter = (email: string) => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('올바른 이메일 주소를 입력해주세요.', 'alert');
      return { success: false, message: '올바른 이메일 형식이 아닙니다.' };
    }
    setIsNewsletterSubscribed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mannal_newsletter', 'true');
    }
    showToast('만날신문 모닝 브리핑 뉴스레터 구독이 완료되었습니다!', 'success');
    return { success: true, message: '성공적으로 신청되었습니다.' };
  };

  // Subscription modal
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const openSubscriptionModal = () => setIsSubscriptionModalOpen(true);
  const closeSubscriptionModal = () => setIsSubscriptionModalOpen(false);

  const completeSubscriptionDemo = () => {
    setIsSubscriptionModalOpen(false);
    if (user) {
      const updated = {
        ...user,
        role: 'subscriber' as const,
        isSubscribed: true,
        subscriptionPlan: '창간 특별 평생 구독권 (80% 특별할인)',
      };
      setUser(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mannal_user', JSON.stringify(updated));
      }
    } else {
      loginDemoUser(true);
    }
    showToast('평생 구독 신청 데모가 성공적으로 완료되었습니다! 환영합니다.', 'success');
  };

  // Comments
  const [comments, setComments] = useState<Comment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mannal_comments');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return DEMO_COMMENTS;
  });

  const addComment = (articleId: string, content: string): boolean => {
    if (!user) {
      showToast('댓글 작성은 로그인 후 이용하실 수 있습니다.', 'alert');
      navigate('/login');
      return false;
    }
    if (!content.trim()) {
      showToast('댓글 내용을 입력해주세요.', 'alert');
      return false;
    }

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      articleId,
      userId: user.id,
      userName: user.name,
      content: content.trim(),
      createdAt: '방금 전',
      likes: 0,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mannal_comments', JSON.stringify(updated));
    }
    showToast('댓글이 등록되었습니다.', 'success');
    return true;
  };

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Helpers
  const getArticleById = (idOrSlug: string): Article | undefined => {
    return articles.find(a => a.id === idOrSlug || a.slug === idOrSlug);
  };

  const getArticlesByCategory = (category: CategorySlug): Article[] => {
    return articles.filter(a => a.category === category);
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        articles,
        getArticleById,
        getArticlesByCategory,
        user,
        loginDemoUser,
        logout,
        updateUserInterests,
        bookmarkedIds,
        isBookmarked,
        toggleBookmark,
        isPromoBarClosed,
        closePromoBar,
        isNewsletterSubscribed,
        subscribeNewsletter,
        isSubscriptionModalOpen,
        openSubscriptionModal,
        closeSubscriptionModal,
        completeSubscriptionDemo,
        comments,
        addComment,
        toast,
        showToast,
        clearToast,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
