import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BreakingTicker } from '../components/BreakingTicker';
import { HeroNewsDesk } from '../components/HeroNewsDesk';
import { ArticleCard } from '../components/ArticleCard';
import { MostViewed } from '../components/MostViewed';
import { InsightSection } from '../components/InsightSection';
import { NewsletterCTA } from '../components/NewsletterCTA';
import { AdSlot } from '../components/AdSlot';
import { Newspaper, ChevronDown } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { articles } = useApp();
  const [visibleCount, setVisibleCount] = useState(8);

  // Latest news excluding the top featured ones for variety, or all sorted by published date
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const displayedArticles = latestArticles.slice(0, visibleCount);
  const hasMore = visibleCount < latestArticles.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. Breaking News Ticker */}
      <BreakingTicker />

      {/* 2. Hero News Desk (TOP 1, 2, 3 Asymmetric Grid) */}
      <HeroNewsDesk />

      {/* 3. Latest News & Most Viewed Section */}
      <section id="latest-news-section" className="py-8 sm:py-10 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#111318]">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-[#D81B60]" />
            <h2 className="font-serif text-2xl font-black text-[#111318] tracking-tight">
              실시간 최신 뉴스
            </h2>
          </div>
          <span className="text-xs text-[#767B85]">
            전체 {latestArticles.length}건 기사
          </span>
        </div>

        {/* 2-Column Layout: Left 8 Latest Articles + Right Most Viewed Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Latest Articles List */}
          <div className="lg:col-span-8 space-y-1">
            <div className="divide-y divide-[#E5E7EB]">
              {displayedArticles.map(article => (
                <ArticleCard key={article.id} article={article} layout="horizontal" />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-1.5 px-6 py-3 bg-white hover:bg-gray-50 border border-[#E5E7EB] hover:border-[#111318] rounded-full text-xs font-bold text-[#111318] transition-all shadow-2xs"
                >
                  <span>최신 기사 더 보기 (+4)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#767B85]" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Most Viewed 1~5 */}
          <div className="lg:col-span-4">
            <MostViewed />
          </div>
        </div>
      </section>

      {/* 4. In-depth Feature Section ("만날 인사이트") */}
      <InsightSection />

      {/* 5. Newsletter CTA & Lifetime Subscription Block */}
      <NewsletterCTA />

      {/* 6. Clearly Demarcated Advertisement Slot */}
      <AdSlot />
    </main>
  );
};
