import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CategorySlug } from '../types/news';
import { siteConfig } from '../config/siteConfig';
import { ArticleCard } from '../components/ArticleCard';
import { MostViewed } from '../components/MostViewed';
import { ChevronRight, Filter, Clock, Eye, Sparkles } from 'lucide-react';

interface SectionPageProps {
  slug: CategorySlug;
}

export const SectionPage: React.FC<SectionPageProps> = ({ slug }) => {
  const { articles, navigate, openSubscriptionModal } = useApp();
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const category = siteConfig.categories.find(c => c.slug === slug) || {
    slug: 'tech' as CategorySlug,
    label: '테크/IT',
    description: '최신 산업과 기술 트렌드',
  };

  const categoryArticles = useMemo(() => {
    const list = articles.filter(a => a.category === slug);
    if (sortBy === 'popular') {
      return [...list].sort((a, b) => b.views - a.views);
    }
    return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [articles, slug, sortBy]);

  const featured = categoryArticles[0];
  const restArticles = categoryArticles.slice(1);

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav aria-label="브레드크럼" className="flex items-center gap-1.5 text-xs text-[#767B85] mb-4">
        <button type="button" onClick={() => navigate('/')} className="hover:text-[#111318]">
          홈
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-[#111318]">{category.label}</span>
      </nav>

      {/* Category Masthead */}
      <div className="border-b-2 border-[#111318] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#D81B60] tracking-wider uppercase">
            SECTION DIRECTORY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#111318] tracking-tight mt-1">
            {category.label}
          </h1>
          <p className="mt-2 text-sm text-[#4B4F58]">
            {category.description}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 text-xs bg-white border border-[#E5E7EB] p-1 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setSortBy('latest')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
              sortBy === 'latest'
                ? 'bg-[#111318] text-white shadow-xs'
                : 'text-[#767B85] hover:text-[#111318]'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>최신순</span>
          </button>
          <button
            type="button"
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
              sortBy === 'popular'
                ? 'bg-[#111318] text-white shadow-xs'
                : 'text-[#767B85] hover:text-[#111318]'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>인기순</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (8 cols): Articles */}
        <div className="lg:col-span-8 space-y-8">
          {/* Featured Article in Section (if available) */}
          {featured && (
            <article
              className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate(`/article/${featured.id}`)}
            >
              <div className="aspect-16/9 overflow-hidden bg-gray-100">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#D81B60] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    섹션 대표 기사
                  </span>
                  <span className="text-xs text-[#767B85]">{featured.author.name} 기자</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111318] group-hover:text-[#D81B60] transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm text-[#4B4F58] leading-relaxed">
                  {featured.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#767B85]">
                  <span>{featured.publishedAt}</span>
                  <span>{featured.readTimeMinutes}분 소요</span>
                </div>
              </div>
            </article>
          )}

          {/* Sub Grid / List of rest articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {restArticles.map(article => (
              <ArticleCard key={article.id} article={article} layout="vertical" />
            ))}
          </div>

          {categoryArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E7EB]">
              <p className="text-sm text-[#767B85]">해당 카테고리에 등록된 기사가 없습니다.</p>
            </div>
          )}

          {/* Section Subscription Banner */}
          <div className="bg-[#FAF9F6] border border-[#D81B60]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#D81B60] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {category.label} 전문 심층 리포트
              </span>
              <h4 className="font-serif text-lg font-bold text-[#111318] mt-1">
                만날신문 평생 구독으로 제한 없이 읽기
              </h4>
              <p className="text-xs text-[#767B85] mt-0.5">
                정상가 월 4,900원 상당의 모든 유료 분석을 80% 창간 특가로 소장하세요.
              </p>
            </div>
            <button
              type="button"
              onClick={openSubscriptionModal}
              className="px-5 py-2.5 bg-[#D81B60] hover:bg-[#AD1457] text-white text-xs font-bold rounded-xl shrink-0 shadow-xs transition-all"
            >
              평생 80% 혜택 신청
            </button>
          </div>
        </div>

        {/* Right (4 cols): Most Viewed & Recommendations */}
        <div className="lg:col-span-4 space-y-6">
          <MostViewed />
        </div>
      </div>
    </main>
  );
};
