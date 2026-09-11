import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
  const { subscribeNewsletter, isNewsletterSubscribed, openSubscriptionModal, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgreed) {
      setStatusMessage({ text: '개인정보 수집 및 뉴스레터 발송에 동의해 주세요.', isError: true });
      return;
    }
    const result = subscribeNewsletter(email);
    if (result.success) {
      setStatusMessage({ text: '구독 신청이 완료되었습니다! 매일 아침 7시에 찾아뵙겠습니다.', isError: false });
      setEmail('');
    } else {
      setStatusMessage({ text: result.message, isError: true });
    }
  };

  return (
    <section
      id="newsletter-cta-block"
      aria-label="뉴스레터 신청 및 평생 구독 안내"
      className="my-10 bg-gradient-to-br from-white to-[#FAF9F6] border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xs overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left (7 cols): Free Morning Newsletter */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-1.5 bg-[#D81B60]/10 text-[#AD1457] px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>만날 모닝 브리핑</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#111318] tracking-tight leading-tight">
            매일 아침, 꼭 필요한 뉴스만 만나보세요.
          </h3>
          <p className="mt-2 text-sm text-[#4B4F58] leading-relaxed">
            복잡한 이슈의 맥락과 미래를 읽는 3분 인사이트를 매일 오전 7시 이메일함으로 직접 전달해 드립니다.
          </p>

          {/* Form */}
          {isNewsletterSubscribed ? (
            <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">뉴스레터 구독 중입니다.</p>
                <p className="text-xs text-emerald-700">언제든 마이페이지에서 수신 설정을 변경할 수 있습니다.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (statusMessage) setStatusMessage(null);
                  }}
                  placeholder="이메일 주소를 입력하세요 (예: user@example.com)"
                  aria-label="뉴스레터 신청 이메일"
                  required
                  className="flex-1 px-4 py-3 text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-hidden focus:border-[#D81B60] focus:ring-1 focus:ring-[#D81B60]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#111318] hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>무료 뉴스레터 신청</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <p
                  className={`text-xs ${
                    statusMessage.isError ? 'text-red-600 font-semibold' : 'text-emerald-600 font-semibold'
                  }`}
                >
                  {statusMessage.text}
                </p>
              )}

              {/* Privacy agreement */}
              <div className="flex items-center gap-2 pt-1 text-xs text-[#767B85]">
                <input
                  type="checkbox"
                  id="privacy-agreement-checkbox"
                  checked={privacyAgreed}
                  onChange={e => setPrivacyAgreed(e.target.checked)}
                  className="rounded border-gray-300 text-[#D81B60] focus:ring-[#D81B60]"
                />
                <label htmlFor="privacy-agreement-checkbox" className="cursor-pointer">
                  뉴스레터 발송을 위한 이메일 수집 및{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/policy/privacy')}
                    className="underline text-[#4B4F58] hover:text-[#111318]"
                  >
                    개인정보처리방침
                  </button>
                  에 동의합니다.
                </label>
              </div>
            </form>
          )}
        </div>

        {/* Right (5 cols): Lifetime Subscription Promo Card */}
        <div className="lg:col-span-5 bg-white border border-[#D81B60]/30 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#D81B60]/5 rounded-full pointer-events-none" />

          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="bg-[#D81B60] text-white text-xs font-black px-2.5 py-0.5 rounded-full">
              창간 기념 특별 혜택
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#AD1457]">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              <span>평생 구독 80% 할인</span>
            </div>
          </div>

          <h4 className="font-serif text-lg font-black text-[#111318]">
            만날신문 디지털 정기 구독권
          </h4>
          <p className="text-xs text-[#767B85] mt-1">
            정상가 월 4,900원 상당의 프리미엄 혜택을 단 한 번의 신청으로 평생 소장하세요.
          </p>

          <ul className="mt-4 space-y-2 text-xs text-[#4B4F58]">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D81B60] shrink-0" />
              <span>독점 심층 기획 리포트 무제한 열람</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D81B60] shrink-0" />
              <span>배너 및 전면 광고 최소화 쾌적 독서 모드</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D81B60] shrink-0" />
              <span>관심 산업 및 기자 맞춤 알림 아카이빙</span>
            </li>
          </ul>

          <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#767B85] line-through">정기 월 4,900원</span>
              <p className="text-sm font-black text-[#D81B60]">창간 특가 80% 적용</p>
            </div>
            <button
              type="button"
              onClick={openSubscriptionModal}
              className="px-4 py-2 bg-[#D81B60] hover:bg-[#AD1457] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              평생 혜택 신청하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
