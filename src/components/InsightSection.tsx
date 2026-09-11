import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ArrowRight, Bookmark } from 'lucide-react';

export const InsightSection: React.FC = () => {
  const { articles, navigate, isBookmarked, toggleBookmark } = useApp();

  // Select 3 featured articles with deep insights (e.g. art-001, art-013, art-016)
  const insightArticles = [
    articles.find(a => a.id === 'art-001') || articles[0],
    articles.find(a => a.id === 'art-013') || articles[1],
    articles.find(a => a.id === 'art-016') || articles[2],
  ];

  return (
    <section
      id="mannal-insight"
      aria-label="만날 인사이트 기획/심층"
      className="bg-[#111318] text-white py-10 sm:py-14 my-10 rounded-2xl sm:rounded-3xl overflow-hidden px-4 sm:px-8 shadow-xl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-[#D81B60]" />
              <span className="text-xs font-bold text-[#D81B60] tracking-widest uppercase">
                SPECIAL IN-DEPTH REPORT
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black tracking-tight text-white">
              만날 인사이트
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400 font-light">
              표면의 사건을 넘어, 변화의 원인과 다음 장면을 읽습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/section/tech')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-700 px-4 py-2.5 rounded-full transition-all w-fit"
          >
            <span>기획기사 전체보기</span>
            <ArrowRight className="w-4 h-4 text-[#D81B60]" />
          </button>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insightArticles.map((article, idx) => (
            <article
              key={article.id}
              className="group bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gray-600 transition-all duration-200"
            >
              <div
                className="relative aspect-16/10 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/article/${article.id}`)}
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 bg-[#D81B60] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  심층 {idx + 1}편 · {article.categoryLabel}
                </span>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    toggleBookmark(article.id);
                  }}
                  aria-label={isBookmarked(article.id) ? '스크랩 취소' : '기사 스크랩'}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isBookmarked(article.id) ? 'fill-[#D81B60] text-[#D81B60]' : ''}`}
                  />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => navigate(`/article/${article.id}`)}
                    className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#D81B60] group-hover:underline underline-offset-2 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span>{article.author.name} 기자</span>
                  <span className="text-gray-500">{article.readTimeMinutes}분 리포트</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
