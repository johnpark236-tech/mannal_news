import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export const PromoBar: React.FC = () => {
  const { isPromoBarClosed, closePromoBar, navigate } = useApp();

  if (isPromoBarClosed) return null;

  return (
    <aside
      id="promo-bar"
      aria-label="창간 특별 혜택 안내"
      className="relative z-40 bg-[#D81B60] text-white px-4 py-2.5 text-xs sm:text-sm font-medium transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Message */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" aria-hidden="true" />
            창간 특별
          </span>
          <p className="truncate font-semibold">
            <span className="font-bold underline decoration-yellow-300 decoration-2 underline-offset-2">
              평생 구독 80% 할인
            </span>
            <span className="hidden md:inline text-white/90 ml-2 font-normal">
              · 깊이 있는 뉴스와 미래 통찰을 오래도록 만나보세요.
            </span>
          </p>
        </div>

        {/* Right: CTA & Close */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            id="promo-cta-btn"
            type="button"
            onClick={() => navigate('/subscribe')}
            className="inline-flex items-center gap-1 bg-white text-[#AD1457] hover:bg-white/95 px-3 py-1 rounded-full text-xs font-bold transition-all hover:shadow-sm"
          >
            <span>혜택 확인하기</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </button>

          <button
            id="promo-close-btn"
            type="button"
            onClick={closePromoBar}
            aria-label="안내 배너 닫기"
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
