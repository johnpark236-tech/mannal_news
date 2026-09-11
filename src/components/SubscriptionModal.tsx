import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { subscriptionConfig } from '../config/siteConfig';
import { X, Sparkles, Check, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export const SubscriptionModal: React.FC = () => {
  const { isSubscriptionModalOpen, closeSubscriptionModal, completeSubscriptionDemo, navigate } = useApp();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSubscriptionModalOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeSubscriptionModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isSubscriptionModalOpen, closeSubscriptionModal]);

  if (!isSubscriptionModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscription-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeSubscriptionModal}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] border border-[#E5E7EB] animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Magenta Accent */}
        <div className="bg-gradient-to-r from-[#111318] to-gray-900 text-white p-6 relative">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeSubscriptionModal}
            aria-label="닫기"
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-[#D81B60] text-white text-xs font-black px-3 py-1 rounded-full mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>창간 기념 특가 · 평생 구독 80% 할인</span>
          </div>

          <h3 id="subscription-modal-title" className="font-serif text-2xl font-black text-white">
            만날신문 평생 구독 신청
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            정상가 월 4,900원 상당의 프리미엄 저널리즘을 단 한 번의 신청으로 평생 소장하세요.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Price Calculation Box */}
          <div className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-2xl p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs text-[#767B85]">표준 정기 구독 기준 (1년 환산)</span>
              <span className="text-xs text-[#767B85] line-through">58,800원</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#E5E7EB]">
              <div>
                <span className="text-xs font-bold text-[#D81B60]">창간 80% 특별 할인가</span>
                <p className="text-[11px] text-[#767B85]">추가 월 결제 없는 평생 단일 요금</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#111318]">
                  {subscriptionConfig.lifetimeSpecialPrice.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-[#111318]">원</span>
              </div>
            </div>
          </div>

          {/* Core Benefits */}
          <div>
            <h4 className="text-xs font-bold text-[#111318] uppercase tracking-wider mb-2">
              평생 구독자 전용 혜택
            </h4>
            <ul className="space-y-2 text-xs text-[#4B4F58]">
              {subscriptionConfig.features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#D81B60]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#D81B60]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#111318]">{f.title}</span> - {f.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Prototype Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">데모 시연 안내</p>
              <p className="mt-0.5 text-amber-800">
                본 웹사이트는 시연용 프로토타입으로 실제 결제가 발생하지 않습니다.
                아래 버튼 클릭 시 평생 구독자 등급이 즉시 적용되어 모든 프리미엄 기능을 체험하실 수 있습니다.
              </p>
            </div>
          </div>

          {/* Terms link */}
          <p className="text-[11px] text-[#767B85] text-center">
            신청 시 만날신문{' '}
            <button
              type="button"
              onClick={() => {
                closeSubscriptionModal();
                navigate('/policy/terms#subscription');
              }}
              className="text-[#D81B60] underline font-semibold"
            >
              이벤트 조건 및 디지털 콘텐츠 이용약관
            </button>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-gray-50 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeSubscriptionModal}
            className="px-4 py-2.5 text-xs font-semibold text-[#4B4F58] hover:bg-gray-200 rounded-xl transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={completeSubscriptionDemo}
            className="px-5 py-2.5 text-xs font-bold bg-[#D81B60] hover:bg-[#AD1457] text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>평생 구독 신청 완료 (체험)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
