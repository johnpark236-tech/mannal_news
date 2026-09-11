import React from 'react';
import { useApp } from '../context/AppContext';
import { FileQuestion, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <main id="main-content" className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xs space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#D81B60]/10 text-[#D81B60] flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold text-[#D81B60] uppercase tracking-wider">404 ERROR</span>
        <h1 className="font-serif text-2xl font-bold text-[#111318]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-xs text-[#767B85] leading-relaxed">
          요청하신 페이지의 주소가 잘못 입력되었거나, 변경 또는 삭제되어 현재 열람하실 수 없습니다.
        </p>

        <div className="pt-4 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-3 bg-[#111318] hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>만날신문 홈으로 가기</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-[#4B4F58] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>기사 검색창으로 이동</span>
          </button>
        </div>
      </div>
    </main>
  );
};
