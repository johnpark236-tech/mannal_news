import React, { useState, useEffect } from 'react';
import { supabase, DbArticle } from '../lib/supabase';

const CATEGORIES = [
  { value: 'tech', label: '테크/IT' },
  { value: 'economy', label: '경제/투자' },
  { value: 'society', label: '사회/환경' },
  { value: 'politics', label: '정치' },
  { value: 'world', label: '국제' },
  { value: 'culture', label: '문화' },
];

interface Props {
  editId?: string;
  navigate: (path: string) => void;
}

export const AdminWritePage: React.FC<Props> = ({ editId, navigate }) => {
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'tech',
    author: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editId) {
      supabase.from('articles').select('*').eq('id', editId).single().then(({ data }) => {
        if (data) {
          const d = data as DbArticle;
          setForm({
            title: d.title,
            summary: d.summary || '',
            content: d.content,
            category: d.category,
            author: d.author,
            image_url: d.image_url || '',
          });
          setImagePreview(d.image_url || '');
        }
      });
    }
  }, [editId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return form.image_url;
    const ext = imageFile.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('article-images')
      .upload(path, imageFile, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('article-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!form.title.trim()) { setMessage('제목을 입력하세요.'); return; }
    if (!form.content.trim()) { setMessage('본문을 입력하세요.'); return; }
    if (!form.author.trim()) { setMessage('작성자를 입력하세요.'); return; }

    setSaving(true);
    setMessage('');
    try {
      const imageUrl = await uploadImage();
      const payload = {
        ...form,
        image_url: imageUrl,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
      };

      if (editId) {
        await supabase.from('articles').update(payload).eq('id', editId);
      } else {
        await supabase.from('articles').insert(payload);
      }
      setMessage(status === 'published' ? '✅ 발행되었습니다!' : '✅ 임시저장되었습니다.');
      if (!editId) {
        setForm({ title: '', summary: '', content: '', category: 'tech', author: '', image_url: '' });
        setImagePreview('');
        setImageFile(null);
      }
    } catch (err) {
      setMessage('❌ 저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{editId ? '기사 수정' : '새 기사 작성'}</h2>
        <button onClick={() => navigate('/admin/articles')} className="text-sm text-gray-500 hover:text-gray-700">
          ← 목록으로
        </button>
      </div>

      <div className="space-y-4">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B60]"
            placeholder="기사 제목을 입력하세요"
          />
        </div>

        {/* 카테고리 + 작성자 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B60]"
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">작성자 *</label>
            <input
              type="text"
              value={form.author}
              onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B60]"
              placeholder="기자 이름"
            />
          </div>
        </div>

        {/* 요약 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">요약</label>
          <textarea
            value={form.summary}
            onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B60] resize-none"
            placeholder="기사 요약 (선택)"
          />
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">대표 이미지</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {imagePreview && (
            <img src={imagePreview} alt="미리보기" className="mt-2 h-40 object-cover rounded-lg border" />
          )}
        </div>

        {/* 본문 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">본문 *</label>
          <textarea
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            rows={16}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B60] resize-y font-mono"
            placeholder="기사 본문을 입력하세요..."
          />
        </div>

        {/* 메시지 */}
        {message && (
          <p className={`text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {/* 버튼 */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {saving ? '저장 중...' : '임시저장'}
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-5 py-2 bg-[#D81B60] text-white rounded-lg text-sm font-semibold hover:bg-[#AD1457] disabled:opacity-50 transition-colors"
          >
            {saving ? '발행 중...' : '발행하기'}
          </button>
        </div>
      </div>
    </div>
  );
};
