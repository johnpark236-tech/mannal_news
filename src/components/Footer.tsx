import React from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Mail, Phone, MapPin, Send, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimpleLink = (label: string) => {
    showToast(`${label} 관련 안내 창구로 연결됩니다. (문의: 02-1588-0000)`, 'info');
  };

  return (
    <footer id="global-footer" className="bg-white border-t border-[#E5E7EB] pt-12 pb-16 text-xs text-[#4B4F58]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top: Brand & Fast Nav */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#E5E7EB] gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-black text-[#111318] tracking-tight">
                {siteConfig.name}
              </span>
              <span className="text-[11px] font-bold text-[#767B85] tracking-widest uppercase">
                {siteConfig.nameEn}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-[#767B85] font-medium">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Category Jump */}
          <div className="flex flex-wrap gap-2 text-xs">
            {siteConfig.categories.map(cat => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => navigate(`/section/${cat.slug}`)}
                className="px-2.5 py-1 bg-[#FAF9F6] border border-[#E5E7EB] rounded-lg hover:border-[#111318] hover:text-[#111318] transition-colors"
              >
                {cat.label}
              </button>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              className="px-2.5 py-1 bg-[#111318] text-white rounded-lg hover:bg-[#D81B60] transition-colors flex items-center gap-1 font-semibold"
            >
              <span>맨 위로</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Middle: Editorial Policy & Legal Links */}
        <div className="py-6 border-b border-[#E5E7EB] flex flex-wrap gap-x-6 gap-y-2 font-medium text-xs">
          <button
            type="button"
            onClick={() => navigate('/about')}
            className="hover:text-[#111318] text-[#111318] font-bold"
          >
            회사소개
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => handleSimpleLink('광고 안내')}
            className="hover:text-[#111318]"
          >
            광고안내
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => handleSimpleLink('제휴 문의')}
            className="hover:text-[#111318]"
          >
            제휴문의
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => handleSimpleLink('기사 제보')}
            className="hover:text-[#111318] text-[#D81B60] font-semibold flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span>기사제보</span>
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => handleSimpleLink('채용 안내')}
            className="hover:text-[#111318]"
          >
            인재채용
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => navigate('/policy/terms')}
            className="hover:text-[#111318]"
          >
            이용약관
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => navigate('/policy/privacy')}
            className="hover:text-[#111318] text-[#111318] font-bold underline underline-offset-2"
          >
            개인정보처리방침
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => navigate('/policy/terms#youth')}
            className="hover:text-[#111318]"
          >
            청소년보호정책
          </button>
        </div>

        {/* Detailed Newspaper Mandatory Legal Metadata */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 leading-relaxed text-[#767B85] text-[11px] sm:text-xs">
          <div>
            <p className="font-bold text-[#111318] mb-1">신문 등록 및 발행 정보</p>
            <p>등록번호: <span className="font-mono text-[#4B4F58]">{siteConfig.registrationNumber}</span></p>
            <p>등록일자: {siteConfig.registrationDate} | 최초발행: {siteConfig.firstPublishDate}</p>
            <p>사업자등록번호: <span className="font-mono text-[#4B4F58]">{siteConfig.businessNumber}</span></p>
          </div>

          <div>
            <p className="font-bold text-[#111318] mb-1">편집국 및 임원진</p>
            <p>발행인: {siteConfig.publisher}</p>
            <p>편집인: {siteConfig.editorInChief}</p>
            <p>청소년보호책임자: {siteConfig.youthProtectionOfficer}</p>
          </div>

          <div>
            <p className="font-bold text-[#111318] mb-1">고객센터 및 소재지</p>
            <p className="flex items-start gap-1">
              <MapPin className="w-3 h-3 text-[#D81B60] shrink-0 mt-0.5" />
              <span>{siteConfig.address}</span>
            </p>
            <p className="flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-[#D81B60] shrink-0" />
              <span>대표전화: {siteConfig.phone}</span>
            </p>
            <p className="flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3 text-[#D81B60] shrink-0" />
              <span>이메일: {siteConfig.email}</span>
            </p>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#767B85]">
          <p>{siteConfig.copyright}</p>
          <div className="flex items-center gap-2 text-center sm:text-right">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <p>{siteConfig.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
