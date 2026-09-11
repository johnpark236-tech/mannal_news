import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Eye } from 'lucide-react';

export const MostViewed: React.FC = () => {
  const { articles, navigate } = useApp();

  // Sort by views descending
  const mostViewedArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <aside
      id="most-viewed-widget"
      aria-label="많이 본 뉴스 순위"
      className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sticky top-20 shadow-xs"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D81B60]" />
          <h3 className="font-serif text-lg font-black text-[#111318]">많이 본 뉴스</h3>
        </div>
        <span className="text-[11px] text-[#767B85] font-medium">실시간 집계</span>
      </div>

      <ol className="space-y-4">
        {mostViewedArticles.map((article, index) => {
          const rank = index + 1;
          const isTop3 = rank <= 3;

          return (
            <li
              key={article.id}
              onClick={() => navigate(`/article/${article.id}`)}
              className="group flex items-start gap-3.5 cursor-pointer pb-3 border-b border-[#E5E7EB]/60 last:border-b-0 last:pb-0"
            >
              {/* Rank Number */}
              <span
                className={`font-serif text-2xl font-black w-6 text-center shrink-0 leading-none ${
                  isTop3 ? 'text-[#D81B60]' : 'text-[#767B85]'
                }`}
              >
                {rank}
              </span>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold text-[#767B85] block mb-0.5">
                  {article.categoryLabel}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-[#111318] group-hover:text-[#D81B60] group-hover:underline underline-offset-2 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#767B85]">
                  <span>{article.author.name} 기자</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" />
                    {article.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Footer Banner Inside Widget */}
      <div className="mt-5 pt-4 border-t border-[#E5E7EB] bg-[#FAF9F6] -mx-5 -mb-5 p-4 rounded-b-2xl flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#111318]">광고 없는 뉴스 읽기</p>
          <p className="text-[10px] text-[#767B85]">평생 구독 80% 창간 특가</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/subscribe')}
          className="text-xs font-bold text-[#D81B60] hover:text-[#AD1457] hover:underline"
        >
          알아보기 →
        </button>
      </div>
    </aside>
  );
};
