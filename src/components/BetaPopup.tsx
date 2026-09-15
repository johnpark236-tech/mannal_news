import React, { useState, useEffect } from 'react';

const POPUP_KEY = 'mannal_beta_popup_v1';

export const BetaPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const val = localStorage.getItem(POPUP_KEY);
      if (!val) {
        // 300ms 딜레이 후 등장
        const t = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(t);
      }
      if (val !== 'hide_forever') {
        // 하루 체크
        const stored = parseInt(val, 10);
        if (Date.now() - stored > 86_400_000) {
          localStorage.removeItem(POPUP_KEY);
          const t = setTimeout(() => setVisible(true), 300);
          return () => clearTimeout(t);
        }
      }
    } catch {
      const t = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const close = () => setVisible(false);

  const closeToday = () => {
    try { localStorage.setItem(POPUP_KEY, Date.now().toString()); } catch {}
    setVisible(false);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={close}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #0f0c29, #302b63, #24243e)',
          animation: 'popupIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        <style>{`
          @keyframes popupIn {
            from { opacity: 0; transform: scale(0.85) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(216,27,96,0.4); }
            50%       { box-shadow: 0 0 40px rgba(216,27,96,0.8), 0 0 60px rgba(124,58,237,0.3); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-6px); }
          }
        `}</style>

        {/* 배경 글로우 */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #D81B60, transparent)' }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
        />

        <div className="relative p-7 text-center">
          {/* 아이콘 */}
          <div
            className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: 'linear-gradient(135deg, #D81B60, #7C3AED)',
              animation: 'float 3s ease-in-out infinite, pulse-glow 3s ease-in-out infinite',
            }}
          >
            🚀
          </div>

          {/* 배지 */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-pulse" />
            <span className="text-xs text-white/80 font-medium tracking-widest uppercase">Beta</span>
          </div>

          {/* 타이틀 */}
          <h2 className="text-2xl font-black text-white leading-tight mb-2">
            만날신문이<br />
            <span
              style={{
                background: 'linear-gradient(90deg, #D81B60, #F59E0B, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              새로운 여정을 시작합니다
            </span>
          </h2>

          {/* 본문 */}
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            현재 <strong className="text-white/90">베타 서비스</strong> 운영 중입니다.<br />
            이용 중 불편하신 점은 언제든 알려주세요.
            <br />
            <span className="text-[#D81B60] font-semibold">여러분의 피드백이 우리를 만듭니다.</span>
          </p>

          {/* 피드백 링크 */}
          <a
            href="mailto:feedback@mannaldaily.kr"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-white mb-3 transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(90deg, #D81B60, #7C3AED)' }}
          >
            ✉️ 피드백 보내기
          </a>

          {/* 버튼 그룹 */}
          <div className="flex gap-2">
            <button
              onClick={closeToday}
              className="flex-1 py-2.5 rounded-2xl text-xs font-medium text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all"
            >
              오늘 하루 보지 않기
            </button>
            <button
              onClick={close}
              className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all"
            >
              닫기
            </button>
          </div>
        </div>

        {/* 닫기 X */}
        <button
          onClick={close}
          aria-label="팝업 닫기"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
};
