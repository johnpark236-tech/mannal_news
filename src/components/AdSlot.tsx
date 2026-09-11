import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, Info } from 'lucide-react';

export const AdSlot: React.FC = () => {
  const { showToast } = useApp();

  const handleAdClick = () => {
    showToast('만날신문 광고 및 브랜드 협찬 문의: ad@mannaldaily.kr / 02-1588-0000', 'info');
  };

  return (
    <aside
      id="advertisement-slot"
      aria-label="공식 광고 및 스폰서십 영역"
      className="my-10 pt-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Ad Label Header */}
        <div className="flex items-center justify-between text-[11px] text-[#767B85] px-1 mb-1.5 font-medium tracking-wide">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            ADVERTISEMENT · 광고 협찬
          </span>
          <button
            type="button"
            onClick={handleAdClick}
            className="hover:text-[#111318] flex items-center gap-1 underline underline-offset-2"
          >
            <Info className="w-3 h-3" />
            <span>광고 안내 및 게재 문의</span>
          </button>
        </div>

        {/* Responsive Placeholder Container (970x250 desktop / 320x100 mobile ratio feel) */}
        <div
          onClick={handleAdClick}
          className="group relative cursor-pointer border border-dashed border-[#E5E7EB] hover:border-[#D81B60]/50 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 hover:shadow-xs min-h-[110px] sm:min-h-[160px]"
        >
          {/* Ad Creative Graphic & Text */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-tr from-[#111318] to-gray-700 flex items-center justify-center text-white font-serif font-black text-xl shrink-0 shadow-xs">
              M
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  공식 스폰서십
                </span>
                <span className="text-xs text-[#767B85]">2026 미래 산업 글로벌 서밋</span>
              </div>
              <h4 className="font-serif text-base sm:text-xl font-bold text-[#111318] group-hover:text-[#D81B60] transition-colors mt-1">
                AI와 청정에너지가 여는 내일: 조기 등록 40% 특별 할인
              </h4>
              <p className="text-xs text-[#4B4F58] hidden sm:block mt-1">
                대한민국 대표 테크 리더 50인이 제시하는 다음 10년의 비즈니스 로드맵 컨퍼런스
              </p>
            </div>
          </div>

          {/* Right Action */}
          <div className="shrink-0 flex items-center gap-2 bg-white border border-[#E5E7EB] group-hover:border-[#D81B60] group-hover:text-[#D81B60] text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-2xs">
            <span>자세히 보기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </aside>
  );
};
