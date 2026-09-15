import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { SectionPage } from './pages/SectionPage';
import { ArticlePage } from './pages/ArticlePage';
import { SearchPage } from './pages/SearchPage';
import { SubscribePage } from './pages/SubscribePage';
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';
import { AboutPage } from './pages/AboutPage';
import { PolicyPage } from './pages/PolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CategorySlug } from './types/news';

// Beta
import { BetaBanner } from './components/BetaBanner';
import { BetaPopup } from './components/BetaPopup';

// Admin
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminWritePage } from './pages/AdminWritePage';
import { AdminArticlesPage } from './pages/AdminArticlesPage';
import { AdminLayout } from './components/AdminLayout';
import { isAdminLoggedIn } from './lib/adminAuth';

const AdminApp: React.FC = () => {
  const { currentPath, navigate } = useApp();
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());

  if (!loggedIn) {
    return <AdminLoginPage onSuccess={() => setLoggedIn(true)} />;
  }

  const editId = currentPath.includes('?id=')
    ? currentPath.split('?id=')[1]
    : undefined;

  return (
    <AdminLayout currentPath={currentPath} navigate={navigate}>
      {currentPath.startsWith('/admin/write')
        ? <AdminWritePage editId={editId} navigate={navigate} />
        : <AdminArticlesPage navigate={navigate} />
      }
    </AdminLayout>
  );
};

const AppContent: React.FC = () => {
  const { currentPath } = useApp();

  // Admin 라우트 처리
  if (currentPath.startsWith('/admin')) {
    return <AdminApp />;
  }

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  // Routing resolver
  const renderRoute = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    // 2. Section route: /section/:slug
    if (currentPath.startsWith('/section/')) {
      const slug = currentPath.replace('/section/', '').split('?')[0].split('#')[0] as CategorySlug;
      return <SectionPage slug={slug} />;
    }

    // 3. Article route: /article/:id
    if (currentPath.startsWith('/article/')) {
      const articleId = currentPath.replace('/article/', '').split('?')[0].split('#')[0];
      return <ArticlePage articleId={articleId} />;
    }

    // 4. Search
    if (currentPath.startsWith('/search')) {
      return <SearchPage />;
    }

    // 5. Subscribe
    if (currentPath.startsWith('/subscribe')) {
      return <SubscribePage />;
    }

    // 6. Login
    if (currentPath.startsWith('/login')) {
      return <LoginPage />;
    }

    // 7. MyPage
    if (currentPath.startsWith('/mypage')) {
      return <MyPage />;
    }

    // 8. About
    if (currentPath.startsWith('/about')) {
      return <AboutPage />;
    }

    // 9. Policy routes
    if (currentPath.startsWith('/policy/terms')) {
      return <PolicyPage type="terms" />;
    }
    if (currentPath.startsWith('/policy/privacy')) {
      return <PolicyPage type="privacy" />;
    }

    // 10. Fallback 404
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111318] antialiased selection:bg-[#D81B60]/20 selection:text-[#AD1457]">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-[#111318] text-white px-4 py-2 text-xs font-bold rounded-lg shadow-lg border border-white"
      >
        본문 바로가기 (Skip to content)
      </a>

      {/* Beta notice */}
      <BetaBanner />
      <BetaPopup />

      {/* Global Newspaper Header */}
      <Header />

      {/* Active Page View */}
      <div className="flex-1">
        {renderRoute()}
      </div>

      {/* Global Newspaper Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <SubscriptionModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
