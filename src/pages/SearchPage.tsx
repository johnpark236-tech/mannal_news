import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { ArticleCard } from '../components/ArticleCard';
import { Search, X, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { articles, searchQuery, setSearchQuery, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const popularKeywords = ['AI혁신', '탄소중립', '3040재테크', '스마트시티', '평생구독', '휴머노이드', '반도체'];

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter(art => {
      // Category check
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      // Match in title, summary, author, tags, or content headings
      const inTitle = art.title.toLowerCase().includes(q);
      const inSummary = art.summary.toLowerCase().includes(q);
      const inAuthor = art.author.name.toLowerCase().includes(q);
      const inTags = art.tags.some(t => t.toLowerCase().includes(q));
      const inContent = art.content.some(sec => 
        (sec.heading && sec.heading.toLowerCase().includes(q)) ||
        sec.paragraphs.some(p => p.toLowerCase().includes(q))
      );

      return inTitle || inSummary || inAuthor || inTags || inContent;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="브레드크럼" className="flex items-center gap-1.5 text-xs text-[#767B85] mb-4">
        <button type="button" onClick={() => navigate('/')} className="hover:text-[#111318]">
          홈
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-[#111318]">통합검색</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif text-3xl font-black text-[#111318] tracking-tight">
          만날신문 통합검색
        </h1>
        <p className="text-xs sm:text-sm text-[#767B85] mt-1">
          기사 제목, 본문, 기자명, 태그별로 심층 뉴스를 검색해 보세요.
        </p>
      </div>

      {/* Search Bar Input */}
      <div className="relative mb-6">
        <div className="relative flex items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요 (예: AI, 금리, 스마트시티, 로봇 등)"
            aria-label="통합검색어 입력"
            className="w-full text-base sm:text-lg pl-12 pr-12 py-4 bg-white border-2 border-[#111318] rounded-2xl focus:outline-hidden focus:border-[#D81B60] transition-colors shadow-xs"
          />
          <Search className="w-6 h-6 text-[#111318] absolute left-4 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="검색어 지우기"
              className="absolute right-4 p-1.5 text-[#767B85] hover:text-[#111318] rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Popular Trending Keywords */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-bold text-[#767B85]">
            <TrendingUp className="w-3.5 h-3.5 text-[#D81B60]" />
            추천 검색어:
          </span>
          {popularKeywords.map(kw => (
            <button
              key={kw}
              type="button"
              onClick={() => setSearchQuery(kw)}
              className="px-2.5 py-1 bg-white border border-[#E5E7EB] hover:border-[#D81B60] hover:text-[#D81B60] rounded-full transition-colors"
            >
              #{kw}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#111318] text-white'
              : 'bg-white border border-[#E5E7EB] text-[#4B4F58] hover:border-[#111318]'
          }`}
        >
          전체 보기
        </button>
        {siteConfig.categories.map(cat => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
              selectedCategory === cat.slug
                ? 'bg-[#D81B60] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#4B4F58] hover:border-[#111318]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-[#767B85] mb-4">
        <p>
          {searchQuery ? (
            <span>
              ‘<strong className="text-[#D81B60]">{searchQuery}</strong>’ 검색 결과{' '}
              <strong className="text-[#111318]">{filteredArticles.length}</strong>건
            </span>
          ) : (
            <span>전체 기사 {filteredArticles.length}건</span>
          )}
        </p>
      </div>

      {/* Results List */}
      {filteredArticles.length > 0 ? (
        <div className="divide-y divide-[#E5E7EB] bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-xs">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} layout="horizontal" />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#E5E7EB] rounded-2xl p-6">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#111318]">검색 결과가 없습니다</h3>
          <p className="text-xs text-[#767B85] mt-1 max-w-sm mx-auto">
            단어의 철자가 정확한지 확인하시거나, 보다 일반적인 키워드로 다시 검색해 보세요.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-[#111318] text-white text-xs font-bold rounded-xl"
          >
            전체 기사 보기
          </button>
        </div>
      )}
    </main>
  );
};
