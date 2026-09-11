import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Radio, Play, Pause, ChevronRight } from 'lucide-react';

export const BreakingTicker: React.FC = () => {
  const { articles, navigate } = useApp();
  const breakingArticles = articles.filter(a => a.isBreaking);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (isPlaying && breakingArticles.length > 1) {
      timerRef.current = window.setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % breakingArticles.length);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, breakingArticles.length]);

  if (breakingArticles.length === 0) return null;

  const currentArticle = breakingArticles[currentIndex] || breakingArticles[0];

  return (
    <section
      id="breaking-ticker"
      aria-label="실시간 주요 속보"
      className="bg-[#111318] text-white border-b border-gray-800 text-xs sm:text-sm py-2 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Live Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 bg-[#C62828] text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            속보
          </span>
          <span className="hidden md:inline text-gray-400 text-xs">LIVE</span>
        </div>

        {/* Center: Rotating Headline */}
        <div className="flex-1 min-w-0 flex items-center overflow-hidden">
          <button
            type="button"
            onClick={() => navigate(`/article/${currentArticle.id}`)}
            className="text-left truncate font-medium text-gray-200 hover:text-white hover:underline transition-colors flex items-center gap-2 group w-full"
          >
            <span className="text-[11px] text-gray-400 shrink-0 font-normal">
              [{currentArticle.categoryLabel}]
            </span>
            <span className="truncate group-hover:text-yellow-300 transition-colors">
              {currentArticle.title}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white shrink-0" />
          </button>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 shrink-0 text-gray-400">
          <span className="text-[11px] hidden sm:inline text-gray-400">
            {currentIndex + 1} / {breakingArticles.length}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? '속보 회전 일시정지' : '속보 회전 재생'}
            className="p-1 hover:text-white rounded hover:bg-gray-800 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
