import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Send, UserCheck, LogOut, Bookmark } from 'lucide-react';

export const UtilityBar: React.FC<{ onSearchOpen: () => void }> = ({ onSearchOpen }) => {
  const { user, logout, navigate, openSubscriptionModal, showToast } = useApp();

  const formattedDate = useMemo(() => {
    const today = new Date();
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const dayName = days[today.getDay()];
    return `${year}년 ${month}월 ${date}일 ${dayName}`;
  }, []);

  const handleTipOff = () => {
    showToast('기사 제보 창구: tip@mannaldaily.kr 또는 02-1588-0000 으로 연락주세요.', 'info');
  };

  return (
    <div
      id="utility-bar"
      className="hidden md:block border-b border-[#E5E7EB] bg-[#FAF9F6] text-[#4B4F58] text-xs py-1.5 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Date & Media Edition */}
        <div className="flex items-center gap-3">
          <time dateTime={new Date().toISOString()} className="font-medium text-[#111318]">
            {formattedDate}
          </time>
          <span className="text-[#E5E7EB]">|</span>
          <span className="text-[#767B85]">디지털 종합일간지 제 248호</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            id="nav-tipoff-btn"
            type="button"
            onClick={handleTipOff}
            className="flex items-center gap-1 hover:text-[#111318] transition-colors py-0.5 px-1.5 rounded"
          >
            <Send className="w-3 h-3 text-[#D81B60]" aria-hidden="true" />
            <span>기사제보</span>
          </button>

          <button
            id="nav-quick-search-btn"
            type="button"
            onClick={onSearchOpen}
            className="flex items-center gap-1 hover:text-[#111318] transition-colors py-0.5 px-1.5 rounded"
          >
            <Search className="w-3 h-3 text-[#767B85]" aria-hidden="true" />
            <span>통합검색</span>
          </button>

          <span className="text-[#E5E7EB]">|</span>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/mypage')}
                className="flex items-center gap-1.5 font-medium text-[#111318] hover:text-[#D81B60] transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#D81B60]" aria-hidden="true" />
                <span>{user.name} 님</span>
                {user.isSubscribed && (
                  <span className="bg-[#D81B60]/10 text-[#AD1457] text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-[#D81B60]/20">
                    평생구독
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/mypage')}
                className="hover:text-[#111318] transition-colors p-1"
                title="스크랩 기사 보기"
              >
                <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                id="user-logout-btn"
                type="button"
                onClick={logout}
                className="flex items-center gap-0.5 text-[#767B85] hover:text-[#111318] transition-colors ml-1"
              >
                <LogOut className="w-3 h-3" aria-hidden="true" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="util-login-btn"
                type="button"
                onClick={() => navigate('/login')}
                className="border border-[#D81B60] text-[#D81B60] hover:bg-[#D81B60] hover:text-white px-2.5 py-0.5 rounded font-semibold transition-all"
              >
                로그인
              </button>
              <button
                id="util-signup-btn"
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#4B4F58] hover:text-[#111318] px-1.5 py-0.5 font-medium transition-colors"
              >
                회원가입
              </button>
              <button
                id="util-subscribe-btn"
                type="button"
                onClick={openSubscriptionModal}
                className="bg-[#D81B60] hover:bg-[#AD1457] text-white px-2.5 py-0.5 rounded font-bold shadow-xs transition-all"
              >
                구독신청
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
