import React, { useState, useEffect } from 'react';

const BANNER_KEY = 'mannal_beta_banner_dismissed';

export const BetaBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(BANNER_KEY) !== 'true') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try { sessionStorage.setItem(BANNER_KEY, 'true'); } catch {}
    setVisible(false);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #7C3AED 0%, #D81B60 50%, #F59E0B 100%)',
        backgroundSize: '200% 100%',
        animation: 'bannerShift 6s ease infinite',
      }}
      className="relative z-50 w-full text-white text-center text-sm font-semibold py-2.5 px-4 flex items-center justify-center gap-3"
    >
      <style>{`
        @keyframes bannerShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <span className="text-base">⚡</span>
      <span>
        <strong className="tracking-wide">BETA</strong>
        <span className="mx-2 opacity-60">|</span>
        현재 <strong>시범 서비스</strong> 운영 중입니다 · 정식 오픈을 향해 달리고 있어요
        <span className="ml-2 opacity-80 text-xs font-normal">오류 발견 시 자유롭게 피드백 주세요 🙌</span>
      </span>

      <button
        onClick={dismiss}
        aria-label="닫기"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
};
