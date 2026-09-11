import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { X, Sparkles, User, Bookmark, LogIn, LogOut, ChevronRight, FileText } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { currentPath, navigate, user, logout, openSubscriptionModal } = useApp();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management & ESC key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="모바일 전체 메뉴">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250"
      >
        {/* Header inside Drawer */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAF9F6]">
          <div>
            <span className="font-serif text-xl font-black tracking-tight text-[#111318]">
              만날신문
            </span>
            <span className="block text-[10px] text-[#767B85] font-semibold tracking-widest">
              MANNAL DAILY
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="p-2 rounded-lg text-[#4B4F58] hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* User Status / Login Banner */}
        <div className="p-4 bg-gray-50 border-b border-[#E5E7EB]">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#D81B60]/10 flex items-center justify-center text-[#D81B60] font-bold text-sm">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111318]">{user.name}</p>
                    <p className="text-xs text-[#767B85]">
                      {user.isSubscribed ? '창간 특별 평생 구독자' : '일반 회원'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="text-xs text-[#767B85] hover:text-[#111318] flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>로그아웃</span>
                </button>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/mypage');
                    onClose();
                  }}
                  className="flex-1 text-xs py-1.5 px-2 bg-white border border-[#E5E7EB] rounded font-medium text-[#4B4F58] text-center flex items-center justify-center gap-1 hover:border-[#111318]"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#D81B60]" />
                  <span>스크랩 기사</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/mypage');
                    onClose();
                  }}
                  className="flex-1 text-xs py-1.5 px-2 bg-white border border-[#E5E7EB] rounded font-medium text-[#4B4F58] text-center flex items-center justify-center gap-1 hover:border-[#111318]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>마이페이지</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-[#4B4F58]">
                로그인하고 나만의 맞춤 기사와 스크랩 기능을 이용하세요.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/login');
                    onClose();
                  }}
                  className="flex-1 text-xs font-semibold py-2 bg-white border border-[#D81B60] text-[#D81B60] rounded text-center flex items-center justify-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>로그인</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openSubscriptionModal();
                    onClose();
                  }}
                  className="flex-1 text-xs font-semibold py-2 bg-[#D81B60] text-white rounded text-center shadow-xs"
                >
                  평생 구독 80%
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Categories Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="text-[11px] font-bold text-[#767B85] px-3 py-1 uppercase tracking-wider">
            섹션 둘러보기
          </p>
          <button
            type="button"
            onClick={() => {
              navigate('/');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              currentPath === '/' ? 'bg-[#D81B60]/10 text-[#D81B60]' : 'text-[#111318] hover:bg-gray-100'
            }`}
          >
            <span>홈 (뉴스 데스크)</span>
            <ChevronRight className="w-4 h-4 text-[#767B85]" />
          </button>

          {siteConfig.categories.map(cat => {
            const isActive = currentPath === `/section/${cat.slug}`;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  navigate(`/section/${cat.slug}`);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'bg-[#D81B60]/10 text-[#D81B60]' : 'text-[#111318] hover:bg-gray-100'
                }`}
              >
                <span>{cat.label}</span>
                <ChevronRight className="w-4 h-4 text-[#767B85]" />
              </button>
            );
          })}

          <div className="pt-4 border-t border-[#E5E7EB] mt-4 space-y-1">
            <p className="text-[11px] font-bold text-[#767B85] px-3 py-1 uppercase tracking-wider">
              미디어 서비스
            </p>
            <button
              type="button"
              onClick={() => {
                navigate('/subscribe');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#D81B60] hover:bg-[#D81B60]/5"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>창간 80% 평생 구독</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D81B60]" />
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/about');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#4B4F58] hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#767B85]" />
                <span>회사소개 및 편집강령</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-[#E5E7EB] text-center text-xs text-[#767B85] bg-[#FAF9F6]">
          <p className="font-medium text-[#111318]">독자 제보 & 문의: 02-1588-0000</p>
          <p className="text-[11px] mt-0.5">© 2026 만날신문사</p>
        </div>
      </div>
    </div>
  );
};
