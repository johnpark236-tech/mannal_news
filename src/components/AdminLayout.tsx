import React from 'react';
import { adminLogout } from '../lib/adminAuth';

interface Props {
  children: React.ReactNode;
  currentPath: string;
  navigate: (path: string) => void;
}

export const AdminLayout: React.FC<Props> = ({ children, currentPath, navigate }) => {
  const handleLogout = () => {
    adminLogout();
    navigate('/admin');
    window.location.reload();
  };

  const navItems = [
    { path: '/admin/write', label: '기사 작성' },
    { path: '/admin/articles', label: '기사 목록' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 사이드바 */}
      <aside className="w-52 bg-[#111318] text-white flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-xs text-gray-400">만날신문</p>
          <p className="font-bold text-sm mt-0.5">CMS 관리자</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                currentPath === item.path
                  ? 'bg-[#D81B60] text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate('/')}
            className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← 사이트로 돌아가기
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
