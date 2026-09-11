import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { Search, Menu, Sparkles, Bookmark, User } from 'lucide-react';
import { UtilityBar } from './UtilityBar';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const { currentPath, navigate, user, openSubscriptionModal, setSearchQuery } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 110);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      navigate('/search');
      setIsSearchInputOpen(false);
    }
  };

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#111318] focus:text-white focus:rounded focus:shadow-lg focus:outline-hidden"
      >
        본문 바로가기
      </a>

      {/* Utility Bar (Desktop only) */}
      <UtilityBar onSearchOpen={() => setIsSearchInputOpen(true)} />

      {/* Main Branding Masthead (Desktop) */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
          {/* Mobile Left: Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="전체 메뉴 열기"
              className="p-2 text-[#111318] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/search');
              }}
              aria-label="검색 페이지 열기"
              className="p-2 text-[#4B4F58] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Center / Left Logo */}
          <div className="text-center md:text-left flex-1 md:flex-initial cursor-pointer" onClick={() => navigate('/')}>
            <div className="inline-block group">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111318] transition-colors group-hover:text-[#D81B60]">
                만날신문
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-0.5">
                <span className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#767B85] uppercase">
                  MANNAL DAILY
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#D81B60]" />
                <span className="hidden sm:inline-block text-[11px] text-[#4B4F58] font-medium">
                  {siteConfig.tagline}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Right: Subscribe Promo Badge & Quick Account */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={openSubscriptionModal}
              className="group flex items-center gap-3 bg-[#FAF9F6] border border-[#E5E7EB] hover:border-[#D81B60] p-2.5 rounded-xl transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[#D81B60] text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#AD1457] transition-colors">
                80%
              </div>
              <div>
                <p className="text-xs font-bold text-[#111318] flex items-center gap-1">
                  <span>창간 특별 평생 구독</span>
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                </p>
                <p className="text-[11px] text-[#767B85]">월 4,900원 상당 디지털 혜택</p>
              </div>
            </button>

            {user && (
              <button
                type="button"
                onClick={() => navigate('/mypage')}
                className="p-2.5 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-[#4B4F58] hover:text-[#111318] transition-colors"
                title="마이페이지"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile Right: Subscribe Pill */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={openSubscriptionModal}
              className="bg-[#D81B60] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs"
            >
              구독 80%
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Primary Navigation Bar */}
      <nav
        id="primary-nav"
        aria-label="주요 섹션 메뉴"
        className={`bg-white border-b border-[#E5E7EB] transition-all z-30 ${
          isScrolled ? 'sticky top-0 shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Section Menus */}
          <div className="flex items-center overflow-x-auto no-scrollbar py-0">
            <button
              type="button"
              onClick={() => navigate('/')}
              aria-current={currentPath === '/' ? 'page' : undefined}
              className={`relative py-3.5 px-3 sm:px-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors ${
                currentPath === '/' ? 'text-[#D81B60]' : 'text-[#111318] hover:text-[#D81B60]'
              }`}
            >
              <span>홈</span>
              {currentPath === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D81B60]" />
              )}
            </button>

            {siteConfig.categories.map(cat => {
              const isActive = currentPath === `/section/${cat.slug}`;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => navigate(`/section/${cat.slug}`)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-3.5 px-3 sm:px-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#D81B60]' : 'text-[#111318] hover:text-[#D81B60]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D81B60]" />
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => navigate('/subscribe')}
              aria-current={currentPath === '/subscribe' ? 'page' : undefined}
              className={`relative py-3.5 px-3 sm:px-4 text-sm sm:text-base font-bold whitespace-nowrap text-[#D81B60] hover:text-[#AD1457] transition-colors flex items-center gap-1`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              <span>평생구독</span>
              {currentPath === '/subscribe' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D81B60]" />
              )}
            </button>
          </div>

          {/* Quick Search on Nav (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 py-2">
            {isSearchInputOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="search"
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  placeholder="기사 제목, 핵심 키워드 검색..."
                  autoFocus
                  className="w-56 text-xs px-3 py-1.5 pr-8 border border-[#D81B60] rounded-full focus:outline-hidden focus:ring-1 focus:ring-[#D81B60] bg-[#FAF9F6]"
                />
                <button
                  type="submit"
                  aria-label="검색 실행"
                  className="absolute right-2 text-[#D81B60] hover:text-[#AD1457]"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchInputOpen(true)}
                className="flex items-center gap-1.5 text-xs text-[#767B85] hover:text-[#111318] px-2.5 py-1.5 rounded-full border border-transparent hover:border-[#E5E7EB] transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                <span>기사 검색</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
