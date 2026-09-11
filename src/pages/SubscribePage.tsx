import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { subscriptionConfig } from '../config/siteConfig';
import {
  Sparkles,
  Check,
  ChevronDown,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileText,
  ArrowRight,
} from 'lucide-react';

export const SubscribePage: React.FC = () => {
  const { openSubscriptionModal, user, navigate } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Hero Section with 80% Visual */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 bg-[#D81B60]/10 border border-[#D81B60]/20 text-[#D81B60] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>창간 특별 기념 프로모션</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#111318] leading-tight tracking-tight">
          깊이 있는 저널리즘,<br />
          <span className="text-[#D81B60] underline decoration-4 underline-offset-8">
            평생 구독 80% 특별 혜택
          </span>
          으로 시작하세요
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#4B4F58] leading-relaxed">
          표면적인 속보를 넘어 복잡한 경제와 기술 변화의 본질을 짚는 만날신문의 전용 콘텐츠를
          정기 결제 부담 없는 단 한 번의 신청으로 평생 소장하실 수 있습니다.
        </p>
      </div>

      {/* Pricing Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16 max-w-4xl mx-auto">
        {/* Card 1: Standard Monthly */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-xs font-bold text-[#767B85] uppercase tracking-wider">
              일반 디지털 구독
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111318] mt-1">
              월 정기 결제
            </h3>
            <div className="mt-4 mb-6">
              <span className="text-3xl sm:text-4xl font-black text-[#111318]">4,900</span>
              <span className="text-sm font-bold text-[#767B85] ml-1">원 / 월</span>
              <p className="text-[11px] text-[#767B85] mt-1">매월 자동 결제되는 일반 플랜</p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#4B4F58]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-400" />
                <span>모든 최신 기사 무제한 열람</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-400" />
                <span>기사 스크랩 및 마이페이지</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-400" />
                <span>매일 아침 모닝 브리핑 뉴스레터</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={openSubscriptionModal}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#111318] font-bold text-xs rounded-xl transition-colors"
            >
              월간 구독 선택
            </button>
          </div>
        </div>

        {/* Card 2: Special Lifetime 80% (Highlighted) */}
        <div className="relative bg-gradient-to-b from-white to-[#FAF9F6] border-2 border-[#D81B60] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
          {/* Top Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D81B60] text-white text-xs font-black px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>창간 한정 · 80% 특별 할인</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D81B60] uppercase tracking-wider">
                LIFETIME PASS
              </span>
              <span className="bg-[#D81B60]/10 text-[#AD1457] text-[11px] font-black px-2 py-0.5 rounded-full">
                1회 결제로 평생 소장
              </span>
            </div>

            <h3 className="font-serif text-2xl font-black text-[#111318] mt-1">
              창간 평생 구독권
            </h3>

            <div className="mt-4 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-[#767B85] line-through">147,000원</span>
                <span className="text-xs font-black text-[#D81B60] bg-[#D81B60]/10 px-2 py-0.5 rounded">
                  80% OFF
                </span>
              </div>
              <div className="flex items-baseline mt-1">
                <span className="text-4xl sm:text-5xl font-black text-[#111318]">
                  {subscriptionConfig.lifetimeSpecialPrice.toLocaleString()}
                </span>
                <span className="text-base font-bold text-[#111318] ml-1">원</span>
                <span className="text-xs text-[#767B85] ml-2">(추가 월 결제 없음)</span>
              </div>
              <p className="text-[11px] text-[#D81B60] font-semibold mt-1">
                ※ 창간 기념 한정 수량 제공 프로모션
              </p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#111318]">
              {subscriptionConfig.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D81B60] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-bold">{feat.title}</span>
                    <p className="text-xs text-[#767B85]">{feat.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-[#D81B60]/20">
            <button
              type="button"
              onClick={openSubscriptionModal}
              className="w-full py-4 bg-[#D81B60] hover:bg-[#AD1457] text-white font-black text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>평생 구독 80% 할인 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-[#767B85]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>안전한 7일 전액 환불 보장 정책</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => navigate('/policy/terms#subscription')}
                className="underline hover:text-[#111318]"
              >
                이벤트 조건 확인
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillars */}
      <section className="my-16 bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs">
        <h2 className="font-serif text-2xl font-bold text-center text-[#111318] mb-8">
          만날신문 독자만이 누리는 4가지 가치
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="p-4 rounded-2xl bg-[#FAF9F6]">
            <div className="w-10 h-10 rounded-xl bg-[#D81B60]/10 flex items-center justify-center text-[#D81B60] font-bold mb-3 mx-auto sm:mx-0">
              01
            </div>
            <h4 className="font-bold text-sm text-[#111318]">독점 심층 기획</h4>
            <p className="text-xs text-[#767B85] mt-1.5 leading-relaxed">
              사건의 단순 전달이 아닌 산업 구조와 제도적 배경까지 추적한 해설서를 제공합니다.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6]">
            <div className="w-10 h-10 rounded-xl bg-[#D81B60]/10 flex items-center justify-center text-[#D81B60] font-bold mb-3 mx-auto sm:mx-0">
              02
            </div>
            <h4 className="font-bold text-sm text-[#111318]">광고 최소화 독서</h4>
            <p className="text-xs text-[#767B85] mt-1.5 leading-relaxed">
              시선을 어지럽히는 과도한 배너를 없애 오직 텍스트와 데이터에 온전히 몰입할 수 있습니다.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6]">
            <div className="w-10 h-10 rounded-xl bg-[#D81B60]/10 flex items-center justify-center text-[#D81B60] font-bold mb-3 mx-auto sm:mx-0">
              03
            </div>
            <h4 className="font-bold text-sm text-[#111318]">모닝 브리핑 특송</h4>
            <p className="text-xs text-[#767B85] mt-1.5 leading-relaxed">
              출근길 3분 동안 그날의 글로벌 경제와 기술 이슈를 파악할 수 있도록 핵심만 브리핑합니다.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6]">
            <div className="w-10 h-10 rounded-xl bg-[#D81B60]/10 flex items-center justify-center text-[#D81B60] font-bold mb-3 mx-auto sm:mx-0">
              04
            </div>
            <h4 className="font-bold text-sm text-[#111318]">관심 분야 아카이빙</h4>
            <p className="text-xs text-[#767B85] mt-1.5 leading-relaxed">
              개인 스크랩북 기능으로 필요할 때 언제든 다시 찾아보고 지식 자산으로 축적할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion (5+ Items) */}
      <section aria-label="자주 묻는 질문" className="max-w-3xl mx-auto my-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#D81B60] uppercase mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111318]">
            자주 묻는 질문
          </h2>
          <p className="text-xs text-[#767B85] mt-1">
            평생 구독 서비스에 대해 궁금하신 점을 확인해 보세요.
          </p>
        </div>

        <div className="space-y-3">
          {subscriptionConfig.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#111318] hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#D81B60] font-black">Q.</span>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#767B85] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#D81B60]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#4B4F58] leading-relaxed border-t border-[#E5E7EB]/50 bg-[#FAF9F6]/40">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Legal & Policy Disclaimer */}
      <div className="p-6 bg-gray-50 border border-[#E5E7EB] rounded-2xl text-[11px] text-[#767B85] space-y-1.5 leading-relaxed max-w-3xl mx-auto">
        <div className="flex items-center gap-1.5 font-bold text-[#111318] text-xs mb-1">
          <FileText className="w-3.5 h-3.5" />
          <span>평생 구독 프로모션 유의사항 안내</span>
        </div>
        <p>
          · 본 상품의 정상가 기준은 월 정기 구독료(4,900원)의 12개월분 대비 80% 할인율이 적용된 이벤트 가격입니다.
        </p>
        <p>
          · 디지털 콘텐츠 특성상 결제 후 7일 이내에 유료 독점 기사를 3건 이하 열람하신 경우에 한하여 전액 환불이 가능합니다.
        </p>
        <p>
          · 본 사이트는 현재 기능 시연용 프로토타입으로 운영되고 있으며, 실제 과금 없이 [구독 신청 완료]를 누르면 즉시 평생 구독자 권한이 적용됩니다.
        </p>
      </div>
    </main>
  );
};
