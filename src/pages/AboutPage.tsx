import React from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { Shield, BookOpen, Users, Compass, Award, Mail, Phone, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-[#D81B60] tracking-widest uppercase">
          ABOUT MANNAL DAILY
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#111318] tracking-tight mt-2">
          만날신문을 소개합니다
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#4B4F58] leading-relaxed max-w-2xl mx-auto">
          ‘매일 새롭게 만나는 깊이 있는 진실, 독자와 함께 내일의 변화를 읽는 종합일간지’
        </p>
      </div>

      {/* Mission & Values */}
      <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs mb-10 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#111318] border-b border-[#E5E7EB] pb-4">
          창간 정신과 핵심 가치
        </h2>
        <p className="text-sm sm:text-base text-[#4B4F58] leading-relaxed">
          만날신문은 2026년 급변하는 인공지능 기술, 글로벌 경제 대전환, 그리고 지속 가능한 기후 환경 이슈 속에서 독자들에게 가장 신뢰할 수 있는 이정표를 제시하고자 창간된 온라인 종합일간지입니다.
        </p>
        <p className="text-sm sm:text-base text-[#4B4F58] leading-relaxed">
          단순한 클릭을 유도하는 자극적 속보 경쟁을 지양하고, 하나의 뉴스가 시민의 삶과 미래 산업에 미칠 파급효과를 다각도로 분석하여 알기 쉽게 해설하는 고품격 저널리즘을 추구합니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-5 bg-[#FAF9F6] rounded-2xl">
            <Shield className="w-6 h-6 text-[#D81B60] mb-2" />
            <h3 className="font-bold text-sm text-[#111318]">철저한 사실 확인</h3>
            <p className="text-xs text-[#767B85] mt-1 leading-relaxed">
              정확성과 다원적 균형을 원칙으로 하며, 추측 보도를 엄격히 배제합니다.
            </p>
          </div>

          <div className="p-5 bg-[#FAF9F6] rounded-2xl">
            <Compass className="w-6 h-6 text-[#D81B60] mb-2" />
            <h3 className="font-bold text-sm text-[#111318]">미래 통찰 저널리즘</h3>
            <p className="text-xs text-[#767B85] mt-1 leading-relaxed">
              테크, 경제, 기후의 융합 지점을 조망하여 독자의 현명한 의사결정을 돕습니다.
            </p>
          </div>

          <div className="p-5 bg-[#FAF9F6] rounded-2xl">
            <Users className="w-6 h-6 text-[#D81B60] mb-2" />
            <h3 className="font-bold text-sm text-[#111318]">독자 중심 공론장</h3>
            <p className="text-xs text-[#767B85] mt-1 leading-relaxed">
              독자와 상호작용하며 지역사회와 미래 세대의 목소리를 균형 있게 대변합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Code of Ethics */}
      <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs mb-10 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#111318] border-b border-[#E5E7EB] pb-4">
          만날신문 편집윤리강령
        </h2>
        <ol className="space-y-3 text-xs sm:text-sm text-[#4B4F58] leading-relaxed list-decimal list-inside">
          <li><strong>언론의 자유와 독립:</strong> 권력과 자본의 간섭으로부터 취재 및 편집의 자율성을 철저히 수호합니다.</li>
          <li><strong>광고와 기사의 엄격한 분리:</strong> 협찬 및 광고성 콘텐츠는 독자가 오인하지 않도록 반드시 명확한 라벨을 부착합니다.</li>
          <li><strong>신속하고 투명한 오보 정정:</strong> 보도 내용 중 오류가 발견될 경우 지체 없이 명문화하여 공개 정정합니다.</li>
          <li><strong>디지털 초상권 및 사생활 보호:</strong> 취재 과정에서 개인의 인격권과 사생활의 비밀을 침해하지 않습니다.</li>
          <li><strong>AI 활용 윤리 준수:</strong> 생성형 AI를 취재 보조 도구로 활용할 때에는 팩트체크 검증을 거친 후 투명하게 공개합니다.</li>
        </ol>
      </section>

      {/* Organization Directory */}
      <section className="bg-[#FAF9F6] border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs text-xs sm:text-sm">
        <h2 className="font-serif text-xl font-bold text-[#111318] mb-4">
          회사 정보 및 독자 연락처
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#4B4F58]">
          <p><strong>발행·편집인:</strong> {siteConfig.publisher} / {siteConfig.editorInChief}</p>
          <p><strong>등록번호:</strong> {siteConfig.registrationNumber}</p>
          <p><strong>사업자번호:</strong> {siteConfig.businessNumber}</p>
          <p><strong>대표전화:</strong> {siteConfig.phone}</p>
          <p><strong>이메일 문의:</strong> {siteConfig.email}</p>
          <p><strong>주소:</strong> {siteConfig.address}</p>
        </div>
      </section>
    </main>
  );
};
