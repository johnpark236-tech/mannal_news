import React, { useState } from 'react';
import { adminLogin } from '../lib/adminAuth';

interface Props {
  onSuccess: () => void;
}

export const AdminLoginPage: React.FC<Props> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      onSuccess();
    } else {
      setError('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#111318] mb-1">만날신문</h1>
        <p className="text-sm text-gray-500 mb-6">관리자 로그인</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81B60]"
              placeholder="관리자 비밀번호 입력"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#D81B60] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#AD1457] transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};
