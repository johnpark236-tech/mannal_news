import React, { useState, useEffect, useCallback } from 'react';
import { supabase, DbArticle } from '../lib/supabase';

const CATEGORY_LABELS: Record<string, string> = {
  tech: '테크/IT', economy: '경제/투자', society: '사회/환경',
  politics: '정치', world: '국제', culture: '문화',
};

interface Props {
  navigate: (path: string) => void;
}

export const AdminArticlesPage: React.FC<Props> = ({ navigate }) => {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setArticles((data as DbArticle[]) || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  const handleDelete = async (id: string) => {
    if (!confirm('이 기사를 삭제하시겠습니까?')) return;
    setDeleting(id);
    await supabase.from('articles').delete().eq('id', id);
    await fetchArticles();
    setDeleting(null);
  };

  const handleToggleStatus = async (article: DbArticle) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    await supabase.from('articles').update({
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : null,
    }).eq('id', article.id);
    await fetchArticles();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">기사 목록</h2>
        <button
          onClick={() => navigate('/admin/write')}
          className="px-4 py-2 bg-[#D81B60] text-white rounded-lg text-sm font-semibold hover:bg-[#AD1457] transition-colors"
        >
          + 새 기사 작성
        </button>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 mb-4">
        {(['all', 'published', 'draft'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-[#111318] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f === 'all' ? '전체' : f === 'published' ? '발행됨' : '임시저장'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">로딩 중...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">기사가 없습니다.</div>
      ) : (
        <div className="space-y-2">
          {articles.map(article => (
            <div key={article.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4">
              {article.image_url && (
                <img src={article.image_url} alt="" className="w-20 h-14 object-cover rounded-lg shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-[#D81B60]">
                    {CATEGORY_LABELS[article.category] || article.category}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    article.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.status === 'published' ? '발행됨' : '임시저장'}
                  </span>
                </div>
                <p className="font-semibold text-sm text-gray-900 truncate">{article.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {article.author} · {new Date(article.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleToggleStatus(article)}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  {article.status === 'published' ? '비공개' : '발행'}
                </button>
                <button
                  onClick={() => navigate(`/admin/write?id=${article.id}`)}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  disabled={deleting === article.id}
                  className="px-3 py-1.5 text-xs border border-red-200 rounded-lg hover:bg-red-50 text-red-500 disabled:opacity-50 transition-colors"
                >
                  {deleting === article.id ? '...' : '삭제'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
