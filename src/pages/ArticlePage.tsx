import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';
import {
  ChevronRight,
  Clock,
  Share2,
  Bookmark,
  Printer,
  Minus,
  Plus,
  RotateCcw,
  Check,
  AlertCircle,
  MessageSquare,
  ThumbsUp,
  User,
  ArrowLeft,
  ArrowRight,
  Send,
} from 'lucide-react';

interface ArticlePageProps {
  articleId: string;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ articleId }) => {
  const {
    getArticleById,
    articles,
    navigate,
    isBookmarked,
    toggleBookmark,
    showToast,
    user,
    comments,
    addComment,
  } = useApp();

  const article = getArticleById(articleId) || articles[0];

  // Font size multiplier: 1 = 100%, 1.15 = 115%, 1.3 = 130%
  const [fontScale, setFontScale] = useState<number>(1);
  const [readingProgress, setReadingProgress] = useState(0);
  const [commentInput, setCommentInput] = useState('');

  // Scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (el.scrollTop / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter related articles (same category or general)
  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Prev / Next articles
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // Filter comments for this article
  const articleComments = comments.filter(c => c.articleId === article.id);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url,
        });
        showToast('공유되었습니다.', 'success');
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      showToast('기사 링크가 클립보드에 복사되었습니다.', 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addComment(article.id, commentInput)) {
      setCommentInput('');
    }
  };

  return (
    <>
      {/* Reading Progress Bar at Top */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#D81B60] z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between text-xs text-[#767B85] mb-6">
          <nav aria-label="브레드크럼" className="flex items-center gap-1.5">
            <button type="button" onClick={() => navigate('/')} className="hover:text-[#111318]">
              홈
            </button>
            <ChevronRight className="w-3 h-3" />
            <button
              type="button"
              onClick={() => navigate(`/section/${article.category}`)}
              className="hover:text-[#111318] text-[#D81B60] font-semibold"
            >
              {article.categoryLabel}
            </button>
          </nav>

          {/* Quick Actions (Share, Bookmark, Print, Font zoom) */}
          <div className="flex items-center gap-2">
            {/* Font zoom */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-lg p-1 text-xs">
              <button
                type="button"
                onClick={() => setFontScale(prev => Math.max(0.9, prev - 0.1))}
                title="글자 축소"
                className="p-1 hover:bg-gray-100 rounded text-[#4B4F58]"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setFontScale(1)}
                title="글자 기본 크기"
                className="px-1.5 py-0.5 text-[11px] font-bold text-[#111318]"
              >
                가
              </button>
              <button
                type="button"
                onClick={() => setFontScale(prev => Math.min(1.3, prev + 0.1))}
                title="글자 확대"
                className="p-1 hover:bg-gray-100 rounded text-[#4B4F58]"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              aria-label="기사 인쇄"
              className="p-2 bg-white border border-[#E5E7EB] hover:border-[#111318] rounded-lg text-[#4B4F58] hover:text-[#111318] transition-colors"
              title="인쇄하기"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => toggleBookmark(article.id)}
              aria-label={isBookmarked(article.id) ? '스크랩 취소' : '기사 스크랩'}
              className="p-2 bg-white border border-[#E5E7EB] hover:border-[#111318] rounded-lg text-[#4B4F58] hover:text-[#D81B60] transition-colors"
              title="스크랩 저장"
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked(article.id) ? 'fill-[#D81B60] text-[#D81B60]' : ''}`}
              />
            </button>

            <button
              type="button"
              onClick={handleShare}
              aria-label="기사 공유하기"
              className="flex items-center gap-1 px-3 py-2 bg-white border border-[#E5E7EB] hover:border-[#111318] rounded-lg text-xs font-semibold text-[#111318] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>공유</span>
            </button>
          </div>
        </div>

        {/* Demo Notice Badge */}
        <div className="mb-6 bg-amber-50/80 border border-amber-200/80 rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>본 콘텐츠는 홈페이지 기능 시연을 위한 데모 기사입니다.</span>
        </div>

        {/* Article Headline Header */}
        <header className="border-b border-[#E5E7EB] pb-6 mb-8">
          <span className="inline-block text-xs font-bold text-[#D81B60] mb-2 uppercase tracking-wide">
            {article.categoryLabel} 기획 심층
          </span>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#111318] leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-xl text-[#4B4F58] font-normal leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author & Timestamps */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E7EB] text-xs text-[#767B85]">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]"
              />
              <div>
                <p className="font-bold text-sm text-[#111318]">
                  {article.author.name} 기자 ({article.author.role})
                </p>
                <p className="text-[11px] text-[#767B85]">
                  {article.author.department} · {article.author.email}
                </p>
              </div>
            </div>

            <div className="text-right text-[11px]">
              <p className="flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3" />
                <span>입력 {article.publishedAt}</span>
              </p>
              <p className="mt-0.5 text-[#767B85]">수정 {article.updatedAt}</p>
            </div>
          </div>
        </header>

        {/* Representative Image & Caption */}
        <figure className="mb-8">
          <div className="aspect-16/9 overflow-hidden rounded-2xl bg-gray-100 border border-[#E5E7EB]">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-2.5 text-xs text-[#767B85] px-1 text-center sm:text-left leading-normal">
            ▲ {article.imageCaption}
          </figcaption>
        </figure>

        {/* Article Body Content (Typography Optimized: 720~780px max-w-3xl) */}
        <div
          className="mx-auto max-w-[760px] text-[#111318] space-y-6 leading-[1.85]"
          style={{ fontSize: `${1.05 * fontScale}rem` }}
        >
          {/* Executive Summary Box */}
          <div className="bg-[#FAF9F6] border-l-4 border-[#D81B60] p-5 rounded-r-2xl my-6">
            <h3 className="text-xs font-bold text-[#D81B60] uppercase tracking-wider mb-2">
              만날 3줄 핵심 요약
            </h3>
            <p className="text-sm font-medium text-[#4B4F58] leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Formatted Sections */}
          {article.content.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              {sec.heading && (
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111318] pt-4 tracking-tight">
                  {sec.heading}
                </h2>
              )}

              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-[#111318]">
                  {para}
                </p>
              ))}

              {/* Callout highlight box */}
              {sec.highlightBox && (
                <div className="my-6 p-5 bg-white border border-[#E5E7EB] rounded-2xl shadow-2xs">
                  <h4 className="font-bold text-sm text-[#111318] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D81B60]" />
                    {sec.highlightBox.title}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#4B4F58]">
                    {sec.highlightBox.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2">
                        <span className="text-[#D81B60] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quote */}
              {sec.quote && (
                <blockquote className="my-8 border-y border-[#E5E7EB] py-6 px-4 sm:px-8 text-center sm:text-left bg-[#FAF9F6]/60 rounded-xl">
                  <p className="font-serif text-lg sm:text-xl font-bold italic text-[#111318] leading-snug">
                    “{sec.quote.text}”
                  </p>
                  {sec.quote.speaker && (
                    <cite className="block mt-3 text-xs text-[#767B85] font-normal not-italic">
                      — {sec.quote.speaker}
                    </cite>
                  )}
                </blockquote>
              )}
            </section>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                navigate('/search');
              }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-[#D81B60]/10 hover:text-[#D81B60] text-xs text-[#4B4F58] font-medium rounded-full transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Reporter Bio Card */}
        <div className="mt-8 bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="font-bold text-sm text-[#111318]">
                {article.author.name} 기자 ({article.author.department})
              </h4>
              <a
                href={`mailto:${article.author.email}`}
                className="text-xs text-[#D81B60] hover:underline"
              >
                {article.author.email}
              </a>
            </div>
            <p className="mt-1.5 text-xs text-[#767B85] leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </div>

        {/* Prev / Next Article Navigation */}
        <nav aria-label="이전 및 다음 기사" className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <button
              type="button"
              onClick={() => navigate(`/article/${prevArticle.id}`)}
              className="p-4 bg-white border border-[#E5E7EB] hover:border-[#111318] rounded-xl text-left transition-all group flex items-start gap-3"
            >
              <ArrowLeft className="w-4 h-4 text-[#767B85] group-hover:text-[#D81B60] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#767B85] block">이전 기사</span>
                <p className="text-xs font-bold text-[#111318] group-hover:text-[#D81B60] truncate mt-0.5">
                  {prevArticle.title}
                </p>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              type="button"
              onClick={() => navigate(`/article/${nextArticle.id}`)}
              className="p-4 bg-white border border-[#E5E7EB] hover:border-[#111318] rounded-xl text-right transition-all group flex items-start justify-end gap-3"
            >
              <div className="min-w-0">
                <span className="text-[11px] text-[#767B85] block">다음 기사</span>
                <p className="text-xs font-bold text-[#111318] group-hover:text-[#D81B60] truncate mt-0.5">
                  {nextArticle.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#767B85] group-hover:text-[#D81B60] shrink-0 mt-0.5" />
            </button>
          )}
        </nav>

        {/* Related Articles (3 items) */}
        <section aria-label="관련 기사" className="mt-12 pt-8 border-t border-[#E5E7EB]">
          <h3 className="font-serif text-xl font-bold text-[#111318] mb-4">
            이 기사와 함께 본 주요 뉴스
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map(rel => (
              <ArticleCard key={rel.id} article={rel} layout="vertical" showSummary={false} />
            ))}
          </div>
        </section>

        {/* Demo Comment Section */}
        <section id="comments-section" aria-label="댓글 영역" className="mt-12 pt-8 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D81B60]" />
              <h3 className="font-serif text-xl font-bold text-[#111318]">
                독자 한마디 ({articleComments.length})
              </h3>
            </div>
            <span className="text-xs text-[#767B85]">건전한 토론 문화를 함께 만들어갑니다.</span>
          </div>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111318] mb-1">
                <User className="w-3.5 h-3.5 text-[#D81B60]" />
                <span>{user.name} 님으로 작성 중</span>
              </div>
              <div className="relative">
                <textarea
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder="기사에 대한 건설적인 의견을 남겨주세요."
                  rows={3}
                  className="w-full text-xs sm:text-sm p-3.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-hidden focus:border-[#D81B60] focus:ring-1 focus:ring-[#D81B60]"
                />
                <button
                  type="submit"
                  className="absolute bottom-3 right-3 px-4 py-1.5 bg-[#111318] hover:bg-[#D81B60] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>등록</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl text-center mb-8 space-y-2">
              <p className="text-xs text-[#4B4F58]">
                댓글을 작성하시려면 로그인이 필요합니다.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 bg-[#D81B60] hover:bg-[#AD1457] text-white text-xs font-bold rounded-lg transition-all shadow-xs"
              >
                로그인하고 의견 남기기
              </button>
            </div>
          )}

          {/* Comment List */}
          <div className="space-y-4">
            {articleComments.map(comment => (
              <div
                key={comment.id}
                className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111318]">{comment.userName}</span>
                  <span className="text-[#767B85]">{comment.createdAt}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4B4F58] leading-relaxed">
                  {comment.content}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-[#767B85]">
                  <button
                    type="button"
                    onClick={() => showToast('공감 표시되었습니다.', 'info')}
                    className="flex items-center gap-1 hover:text-[#D81B60] transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>공감 {comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}

            {articleComments.length === 0 && (
              <p className="text-center py-8 text-xs text-[#767B85]">
                첫 번째 독자 의견을 남겨보세요.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
