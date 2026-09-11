import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { CategorySlug } from '../types/news';
import { ArticleCard } from '../components/ArticleCard';
import {
  UserCheck,
  Bookmark,
  Sparkles,
  Mail,
  Sliders,
  CheckCircle2,
  Trash2,
  ExternalLink,
  LogIn,
  AlertCircle,
} from 'lucide-react';

export const MyPage: React.FC = () => {
  const {
    user,
    articles,
    bookmarkedIds,
    toggleBookmark,
    navigate,
    openSubscriptionModal,
    isNewsletterSubscribed,
    subscribeNewsletter,
    updateUserInterests,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'interests' | 'subscription'>('bookmarks');

  // Bookmarked articles list
  const bookmarkedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  // If not logged in, prompt login
  if (!user) {
    return (
      <main id="main-content" className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-[#767B85]">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#111318]">
            로그인이 필요한 서비스입니다
          </h1>
          <p className="text-xs sm:text-sm text-[#767B85]">
            로그인하시면 기사 스크랩, 맞춤 관심 분야 설정, 평생 구독 혜택을 마이페이지에서 관리하실 수 있습니다.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-[#111318] hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              로그인 또는 데모 체험 시작
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-[#4B4F58] text-xs font-semibold rounded-xl transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </main>
    );
  }

  const handleInterestToggle = (slug: CategorySlug) => {
    const current = user.interestedCategories || [];
    let updated: CategorySlug[];
    if (current.includes(slug)) {
      updated = current.filter(s => s !== slug);
    } else {
      updated = [...current, slug];
    }
    updateUserInterests(updated);
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Profile Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#D81B60]/10 border-2 border-[#D81B60]/30 text-[#D81B60] flex items-center justify-center font-serif text-2xl font-black shrink-0">
              {user.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#111318]">{user.name}</h1>
                {user.isSubscribed ? (
                  <span className="inline-flex items-center gap-1 bg-[#D81B60] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    창간 평생구독 회원
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    일반 독자 회원
                  </span>
                )}
              </div>
              <p className="text-xs text-[#767B85] mt-0.5">{user.email} · 가입일: {user.joinedDate}</p>
            </div>
          </div>

          {!user.isSubscribed ? (
            <button
              type="button"
              onClick={openSubscriptionModal}
              className="px-4 py-2.5 bg-[#D81B60] hover:bg-[#AD1457] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>평생 구독 80% 할인 신청</span>
            </button>
          ) : (
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-4 h-4" />
                광고 최소화 및 전용 리포트 활성화
              </span>
              <p className="text-[11px] text-[#767B85] mt-0.5">영구 유효 기간 보유</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-[#E5E7EB] text-center">
          <div className="p-3 bg-[#FAF9F6] rounded-xl">
            <span className="text-[11px] text-[#767B85] block">스크랩한 기사</span>
            <span className="font-serif text-xl font-bold text-[#111318]">
              {bookmarkedIds.length}건
            </span>
          </div>
          <div className="p-3 bg-[#FAF9F6] rounded-xl">
            <span className="text-[11px] text-[#767B85] block">관심 카테고리</span>
            <span className="font-serif text-xl font-bold text-[#111318]">
              {user.interestedCategories?.length || 0}개
            </span>
          </div>
          <div className="p-3 bg-[#FAF9F6] rounded-xl">
            <span className="text-[11px] text-[#767B85] block">뉴스레터 수신</span>
            <span className="font-serif text-xl font-bold text-[#D81B60]">
              {isNewsletterSubscribed ? '수신 중' : '미수신'}
            </span>
          </div>
          <div className="p-3 bg-[#FAF9F6] rounded-xl">
            <span className="text-[11px] text-[#767B85] block">구독 상태</span>
            <span className="font-serif text-xl font-bold text-[#111318]">
              {user.isSubscribed ? '평생회원' : '일반'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('bookmarks')}
          className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'border-[#D81B60] text-[#D81B60]'
              : 'border-transparent text-[#767B85] hover:text-[#111318]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>보관함 (스크랩 기사 {bookmarkedArticles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('interests')}
          className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'interests'
              ? 'border-[#D81B60] text-[#D81B60]'
              : 'border-transparent text-[#767B85] hover:text-[#111318]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>관심 분야 설정</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('subscription')}
          className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'subscription'
              ? 'border-[#D81B60] text-[#D81B60]'
              : 'border-transparent text-[#767B85] hover:text-[#111318]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>구독 & 뉴스레터 관리</span>
        </button>
      </div>

      {/* Tab 1: Bookmarked Articles */}
      {activeTab === 'bookmarks' && (
        <section aria-label="스크랩 기사 목록">
          {bookmarkedArticles.length > 0 ? (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 divide-y divide-[#E5E7EB] shadow-xs">
              {bookmarkedArticles.map(article => (
                <div key={article.id} className="relative group">
                  <ArticleCard article={article} layout="horizontal" />
                  <button
                    type="button"
                    onClick={() => toggleBookmark(article.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
                    title="스크랩 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center">
              <Bookmark className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#111318]">
                아직 저장된 기사가 없습니다
              </h3>
              <p className="text-xs text-[#767B85] mt-1 max-w-sm mx-auto">
                기사 본문이나 카드 상단의 북마크 아이콘을 클릭하여 관심 있는 심층 리포트를 보관해 보세요.
              </p>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="mt-4 px-5 py-2.5 bg-[#111318] text-white text-xs font-bold rounded-xl hover:bg-[#D81B60] transition-colors"
              >
                최신 기사 둘러보기
              </button>
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Interests Management */}
      {activeTab === 'interests' && (
        <section aria-label="관심 분야 설정" className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl">
            <h3 className="font-serif text-xl font-bold text-[#111318]">
              독자님의 주요 관심 분야를 선택해 주세요
            </h3>
            <p className="text-xs text-[#767B85] mt-1 mb-6 leading-relaxed">
              선택하신 카테고리를 바탕으로 첫 화면 추천 기사와 맞춤 뉴스레터 내용이 최적화됩니다. (다중 선택 가능)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.categories.map(cat => {
                const isSelected = user.interestedCategories?.includes(cat.slug);
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleInterestToggle(cat.slug)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#D81B60] bg-[#D81B60]/5 text-[#111318]'
                        : 'border-[#E5E7EB] hover:border-gray-400 bg-white text-[#4B4F58]'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block">{cat.label}</span>
                      <span className="text-xs text-[#767B85] mt-0.5 line-clamp-1">
                        {cat.description}
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#D81B60] text-white' : 'border border-gray-300'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tab 3: Subscription & Newsletter */}
      {activeTab === 'subscription' && (
        <section aria-label="구독 및 뉴스레터 관리" className="space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#111318] mb-4">
              디지털 구독 멤버십 상세
            </h3>
            {user.isSubscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>창간 특별 평생 구독권 활성 상태</span>
                </div>
                <p className="text-xs text-emerald-700">
                  {user.subscriptionPlan || '평생 소장 80% 할인 플랜'} 이용 중입니다. 추가 정기 결제 없이 모든 독점 리포트를 무제한 이용하실 수 있습니다.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-[#FAF9F6] border border-[#E5E7EB] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#111318]">현재 일반 무료 회원입니다</h4>
                  <p className="text-xs text-[#767B85] mt-0.5">
                    창간 특별 80% 할인 프로모션으로 평생 구독권을 확보하세요.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openSubscriptionModal}
                  className="px-4 py-2 bg-[#D81B60] text-white text-xs font-bold rounded-xl hover:bg-[#AD1457] transition-all shrink-0"
                >
                  평생 80% 업그레이드
                </button>
              </div>
            )}
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#D81B60]" />
                <div>
                  <h3 className="font-bold text-sm text-[#111318]">
                    만날 모닝 브리핑 뉴스레터
                  </h3>
                  <p className="text-xs text-[#767B85]">
                    매일 오전 7시 등록된 이메일({user.email})로 발송됩니다.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isNewsletterSubscribed) {
                    showToast('뉴스레터 수신이 해제되었습니다.', 'info');
                    localStorage.setItem('mannal_newsletter', 'false');
                    window.location.reload();
                  } else {
                    subscribeNewsletter(user.email);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isNewsletterSubscribed
                    ? 'bg-gray-100 hover:bg-gray-200 text-[#4B4F58]'
                    : 'bg-[#111318] hover:bg-black text-white'
                }`}
              >
                {isNewsletterSubscribed ? '수신 거부' : '뉴스레터 수신 신청'}
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
