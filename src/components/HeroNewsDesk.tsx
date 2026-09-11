import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, ArrowRight, Bookmark, Flame } from 'lucide-react';

export const HeroNewsDesk: React.FC = () => {
  const { articles, navigate, isBookmarked, toggleBookmark } = useApp();

  const top1 = articles.find(a => a.id === 'art-001') || articles[0];
  const top2 = articles.find(a => a.id === 'art-002') || articles[1];
  const top3 = articles.find(a => a.id === 'art-003') || articles[2];

  return (
    <section id="hero-news-desk" className="py-6 sm:py-8 border-b border-[#E5E7EB]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D81B60]" />
            <span className="text-xs font-bold text-[#D81B60] tracking-wider uppercase">
              오늘의 뉴스 데스크
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#111318] tracking-tight">
            편집국 주요 큐레이션
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#767B85] font-medium">
          지금 꼭 알아야 할 변화와 기회를 깊이 있게 전합니다.
        </p>
      </div>

      {/* Editorial Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT (8 cols): TOP 1 Tech/IT */}
        <article
          id="hero-top-1"
          className="lg:col-span-8 group relative bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200"
        >
          {/* Image Container */}
          <div
            className="relative aspect-16/9 overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/article/${top1.id}`)}
          >
            <img
              src={top1.image}
              alt={top1.imageAlt}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-[#111318] text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#D81B60]" />
                TOP 1 · {top1.categoryLabel}
              </span>
              <span className="bg-white/90 backdrop-blur-xs text-[#111318] text-[11px] font-semibold px-2.5 py-1 rounded-md border border-black/10">
                데모 기사
              </span>
            </div>

            {/* Bookmark button on image */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                toggleBookmark(top1.id);
              }}
              aria-label={isBookmarked(top1.id) ? '스크랩 취소' : '기사 스크랩'}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/85 hover:bg-white text-[#111318] hover:text-[#D81B60] transition-colors shadow-sm"
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked(top1.id) ? 'fill-[#D81B60] text-[#D81B60]' : ''}`}
              />
            </button>
          </div>

          {/* Text Content */}
          <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D81B60] tracking-wide mb-1.5">
                {top1.subtitle}
              </p>
              <h3
                onClick={() => navigate(`/article/${top1.id}`)}
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-[#111318] leading-tight cursor-pointer group-hover:text-[#D81B60] group-hover:underline underline-offset-4 transition-colors"
              >
                {top1.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#4B4F58] line-clamp-3 leading-relaxed">
                {top1.summary}
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="pt-5 mt-5 border-t border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={top1.author.avatar}
                  alt={top1.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB]"
                />
                <div>
                  <p className="text-xs font-bold text-[#111318]">{top1.author.name} 기자</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#767B85]">
                    <Clock className="w-3 h-3" />
                    <span>{top1.publishedAt}</span>
                    <span>· {top1.readTimeMinutes}분 읽기</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/article/${top1.id}`)}
                className="inline-flex items-center gap-1.5 bg-[#FAF9F6] hover:bg-[#D81B60] text-[#111318] hover:text-white border border-[#E5E7EB] hover:border-transparent px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <span>기사 읽기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>

        {/* RIGHT (4 cols): TOP 2 & TOP 3 Stack */}
        <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
          {/* TOP 2 - Economy */}
          <article
            id="hero-top-2"
            className="group relative bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col flex-1 hover:shadow-md transition-all duration-200"
          >
            <div
              className="relative aspect-16/9 overflow-hidden bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/article/${top2.id}`)}
            >
              <img
                src={top2.image}
                alt={top2.imageAlt}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-[#111318] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs">
                  TOP 2 · {top2.categoryLabel}
                </span>
                <span className="bg-white/90 backdrop-blur-xs text-[#111318] text-[10px] font-semibold px-2 py-0.5 rounded border border-black/10">
                  데모
                </span>
              </div>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  toggleBookmark(top2.id);
                }}
                aria-label={isBookmarked(top2.id) ? '스크랩 취소' : '기사 스크랩'}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/85 hover:bg-white text-[#111318] hover:text-[#D81B60] transition-colors shadow-xs"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isBookmarked(top2.id) ? 'fill-[#D81B60] text-[#D81B60]' : ''}`}
                />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#065F46] tracking-wide">
                  {top2.categoryLabel}
                </span>
                <h4
                  onClick={() => navigate(`/article/${top2.id}`)}
                  className="font-serif text-lg sm:text-xl font-bold text-[#111318] leading-snug cursor-pointer group-hover:text-[#D81B60] group-hover:underline underline-offset-2 transition-colors mt-1"
                >
                  {top2.title}
                </h4>
                <p className="mt-2 text-xs text-[#4B4F58] line-clamp-2 leading-relaxed">
                  {top2.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#767B85]">
                <span>{top2.author.name} 기자</span>
                <span>{top2.publishedAt.split(' ')[0]}</span>
              </div>
            </div>
          </article>

          {/* TOP 3 - Society */}
          <article
            id="hero-top-3"
            className="group relative bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col flex-1 hover:shadow-md transition-all duration-200"
          >
            <div
              className="relative aspect-16/9 overflow-hidden bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/article/${top3.id}`)}
            >
              <img
                src={top3.image}
                alt={top3.imageAlt}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-[#111318] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs">
                  TOP 3 · {top3.categoryLabel}
                </span>
                <span className="bg-white/90 backdrop-blur-xs text-[#111318] text-[10px] font-semibold px-2 py-0.5 rounded border border-black/10">
                  데모
                </span>
              </div>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  toggleBookmark(top3.id);
                }}
                aria-label={isBookmarked(top3.id) ? '스크랩 취소' : '기사 스크랩'}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/85 hover:bg-white text-[#111318] hover:text-[#D81B60] transition-colors shadow-xs"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isBookmarked(top3.id) ? 'fill-[#D81B60] text-[#D81B60]' : ''}`}
                />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#047857] tracking-wide">
                  {top3.categoryLabel}
                </span>
                <h4
                  onClick={() => navigate(`/article/${top3.id}`)}
                  className="font-serif text-lg sm:text-xl font-bold text-[#111318] leading-snug cursor-pointer group-hover:text-[#D81B60] group-hover:underline underline-offset-2 transition-colors mt-1"
                >
                  {top3.title}
                </h4>
                <p className="mt-2 text-xs text-[#4B4F58] line-clamp-2 leading-relaxed">
                  {top3.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#767B85]">
                <span>{top3.author.name} 기자</span>
                <span>{top3.publishedAt.split(' ')[0]}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
