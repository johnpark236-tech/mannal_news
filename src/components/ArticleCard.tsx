import React from 'react';
import { Article } from '../types/news';
import { useApp } from '../context/AppContext';
import { Clock, Eye, Bookmark } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  layout?: 'horizontal' | 'vertical' | 'compact';
  showSummary?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  layout = 'horizontal',
  showSummary = true,
}) => {
  const { navigate, isBookmarked, toggleBookmark } = useApp();

  if (layout === 'compact') {
    return (
      <article
        className="group py-3 border-b border-[#E5E7EB] last:border-b-0 flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => navigate(`/article/${article.id}`)}
      >
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-semibold text-[#D81B60]">
            {article.categoryLabel}
          </span>
          <h4 className="text-sm font-bold text-[#111318] group-hover:text-[#D81B60] transition-colors line-clamp-2 mt-0.5">
            {article.title}
          </h4>
          <span className="text-[11px] text-[#767B85] mt-1 inline-block">
            {article.publishedAt.split(' ')[0]}
          </span>
        </div>
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          className="w-16 h-16 object-cover rounded-lg shrink-0 border border-[#E5E7EB]"
        />
      </article>
    );
  }

  if (layout === 'vertical') {
    return (
      <article className="group bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
        <div
          className="relative aspect-16/10 overflow-hidden bg-gray-100 cursor-pointer"
          onClick={() => navigate(`/article/${article.id}`)}
        >
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute top-2.5 left-2.5 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {article.categoryLabel}
          </span>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              toggleBookmark(article.id);
            }}
            aria-label={isBookmarked(article.id) ? '스크랩 취소' : '기사 스크랩'}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#111318] hover:text-[#D81B60] transition-colors shadow-xs"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isBookmarked(article.id) ? 'fill-[#D81B60] text-[#D81B60]' : ''}`}
            />
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4
              onClick={() => navigate(`/article/${article.id}`)}
              className="font-serif text-base sm:text-lg font-bold text-[#111318] group-hover:text-[#D81B60] group-hover:underline underline-offset-2 transition-colors cursor-pointer line-clamp-2 leading-snug"
            >
              {article.title}
            </h4>
            {showSummary && (
              <p className="mt-2 text-xs text-[#4B4F58] line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#767B85]">
            <span>{article.author.name} 기자</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.publishedAt.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default: Horizontal row card for Latest News list
  return (
    <article
      className="group py-4 sm:py-5 border-b border-[#E5E7EB] last:border-b-0 flex flex-col sm:flex-row items-start gap-4 hover:bg-white/60 p-2 sm:p-3 rounded-xl transition-all"
    >
      {/* Thumbnail */}
      <div
        className="relative w-full sm:w-48 aspect-16/10 sm:aspect-16/11 overflow-hidden rounded-xl bg-gray-100 shrink-0 cursor-pointer"
        onClick={() => navigate(`/article/${article.id}`)}
      >
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="sm:hidden absolute top-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          {article.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        <div>
          <div className="hidden sm:flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#D81B60]">
              {article.categoryLabel}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-[11px] text-[#767B85]">
              {article.author.department}
            </span>
          </div>

          <h3
            onClick={() => navigate(`/article/${article.id}`)}
            className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#111318] group-hover:text-[#D81B60] group-hover:underline underline-offset-2 transition-colors cursor-pointer leading-snug"
          >
            {article.title}
          </h3>

          {showSummary && (
            <p className="mt-1.5 text-xs sm:text-sm text-[#4B4F58] line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
          )}
        </div>

        {/* Footer Meta */}
        <div className="pt-2.5 mt-2 flex items-center justify-between text-xs text-[#767B85]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#111318]">{article.author.name} 기자</span>
            <span>·</span>
            <time dateTime={article.publishedAt} className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.publishedAt}
            </time>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3.5 h-3.5" />
              {article.views.toLocaleString()}
            </span>

            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                toggleBookmark(article.id);
              }}
              aria-label={isBookmarked(article.id) ? '스크랩 취소' : '기사 스크랩'}
              className="p-1 rounded hover:bg-gray-100 text-[#767B85] hover:text-[#D81B60] transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked(article.id) ? 'fill-[#D81B60] text-[#D81B60]' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
