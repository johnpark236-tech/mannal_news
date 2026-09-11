import React from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface PolicyPageProps {
  type: 'terms' | 'privacy';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  const { navigate } = useApp();
  const isPrivacy = type === 'privacy';

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Breadcrumb */}
      <nav aria-label="브레드크럼" className="flex items-center gap-1.5 text-xs text-[#767B85] mb-4">
        <button type="button" onClick={() => navigate('/')} className="hover:text-[#111318]">
          홈
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-[#111318]">
          {isPrivacy ? '개인정보처리방침' : '서비스 이용약관'}
        </span>
      </nav>

      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          {isPrivacy ? (
            <ShieldCheck className="w-5 h-5 text-[#D81B60]" />
          ) : (
            <FileText className="w-5 h-5 text-[#D81B60]" />
          )}
          <span className="text-xs font-bold text-[#D81B60] tracking-wider uppercase">
            LEGAL POLICIES
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#111318] mb-2">
          {isPrivacy ? '만날신문 개인정보처리방침' : '만날신문 서비스 이용약관'}
        </h1>
        <p className="text-xs text-[#767B85] mb-8 pb-4 border-b border-[#E5E7EB]">
          시행일자: 2026년 01월 01일 (최종 개정: 2026년 09월 01일)
        </p>

        {isPrivacy ? (
          <div className="space-y-6 text-xs sm:text-sm text-[#4B4F58] leading-relaxed">
            <section>
              <h2 className="font-bold text-base text-[#111318] mb-2">제1조 (개인정보 수집 항목 및 목적)</h2>
              <p>
                만날신문은 서비스 제공 및 뉴스레터 발송, 디지털 구독 멤버십 관리를 위해 최소한의 개인정보만을 수집합니다.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                <li>필수 항목: 이메일 주소, 접속 로그, 쿠키</li>
                <li>구독 신청 시: 이메일, 구독 플랜 식별자</li>
                <li>수집 목적: 맞춤 기사 제공, 모닝 브리핑 뉴스레터 전송, 구독자 권한 검증</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-base text-[#111318] mb-2">제2조 (개인정보의 보유 및 파기 기간)</h2>
              <p>
                이용자의 회원 탈퇴 또는 뉴스레터 수신 거부 요청 시 지체 없이 수집된 개인정보를 영구 파기합니다.
                관계 법령에 따라 보존 의무가 있는 결제 및 이용 기록은 관련 법률이 정한 기간 동안 안전하게 분리 보관됩니다.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-base text-[#111318] mb-2">제3조 (개인정보보호책임자)</h2>
              <p>
                만날신문은 개인정보 보호에 관한 민원 처리를 위하여 다음과 같이 책임자를 지정하고 있습니다.
              </p>
              <p className="mt-1">
                · 책임자: {siteConfig.youthProtectionOfficer} | 문의: {siteConfig.email} | 대표전화: {siteConfig.phone}
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6 text-xs sm:text-sm text-[#4B4F58] leading-relaxed">
            <section>
              <h2 className="font-bold text-base text-[#111318] mb-2">제1조 (목적 및 적용)</h2>
              <p>
                본 약관은 만날신문(이하 ‘회사’)이 제공하는 디지털 뉴스 콘텐츠 및 구독 서비스의 이용 조건과 절차를 규정함을 목적으로 합니다.
              </p>
            </section>

            <section id="subscription" className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#D81B60]/20">
              <h2 className="font-bold text-base text-[#D81B60] mb-2">
                제2조 (창간 특별 평생 구독권 및 환불 규정)
              </h2>
              <p>
                1. ‘평생 구독권’은 1회 결제로 만날신문의 유료 심층 기획 리포트 및 무광고 혜택을 영구적으로 이용할 수 있는 창간 프로모션 상품입니다.
              </p>
              <p className="mt-1">
                2. 결제 후 7일 이내에 유료 전용 기사를 3건 이하 열람하신 경우 고객센터를 통해 100% 전액 환불을 요청하실 수 있습니다.
              </p>
              <p className="mt-1">
                3. 결제 후 7일이 경과하거나 3건을 초과하여 열람한 경우에는 전자상거래 소비자보호법에 의거하여 위약금 및 일할 사용료를 차감한 잔액이 환불됩니다.
              </p>
            </section>

            <section id="youth">
              <h2 className="font-bold text-base text-[#111318] mb-2">제3조 (청소년보호정책)</h2>
              <p>
                만날신문은 청소년이 유해 매체물에 노출되지 않도록 청소년 유해 정보 차단 및 필터링 제도를 엄격히 운영하고 있습니다.
                청소년보호책임자: {siteConfig.youthProtectionOfficer} ({siteConfig.email})
              </p>
            </section>

            <section>
              <h2 className="font-bold text-base text-[#111318] mb-2">제4조 (저작권의 귀속 및 이용제한)</h2>
              <p>
                만날신문이 작성한 모든 보도 기사, 사진, 영상, 인포그래픽에 대한 저작권은 회사에 귀속되며, 사전 서면 동의 없는 무단 전재, 복제, 크롤링, 상업적 재배포를 금지합니다.
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};
