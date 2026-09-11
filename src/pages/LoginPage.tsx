import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Eye, EyeOff, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginDemoUser, user, navigate, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // If already logged in, show summary
  if (user) {
    return (
      <main id="main-content" className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#111318]">
            {user.name} 님으로 로그인되어 있습니다.
          </h1>
          <p className="text-xs text-[#767B85] mt-2">{user.email}</p>
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={() => navigate('/mypage')}
              className="w-full py-3 bg-[#111318] hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              마이페이지로 이동
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-[#4B4F58] text-xs font-semibold rounded-xl transition-colors"
            >
              홈(뉴스 데스크)으로 가기
            </button>
          </div>
        </div>
      </main>
    );
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = '이메일을 입력해 주세요.';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = '올바른 이메일 형식을 입력해 주세요.';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 6자리 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      loginDemoUser(false);
      navigate('/mypage');
    }
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`${provider} 간편 로그인은 현재 연동 준비 중입니다. 아래의 [데모 계정으로 1초 체험]을 이용해 주세요.`, 'info');
  };

  return (
    <main id="main-content" className="max-w-lg mx-auto px-4 py-10 sm:py-16">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="font-serif text-2xl sm:text-3xl font-black text-[#111318]">
            만날신문
          </span>
          <p className="text-[11px] font-bold text-[#767B85] tracking-widest uppercase mt-0.5">
            MANNAL DAILY ACCOUNT
          </p>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#111318] mt-3">
            로그인
          </h1>
          <p className="text-xs text-[#767B85] mt-1">
            깊이 있는 저널리즘과 맞춤 스크랩 서비스를 시작하세요.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="mb-6 p-4 bg-gradient-to-br from-[#FAF9F6] to-pink-50/40 border border-[#D81B60]/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-[#D81B60]" />
            <span className="text-xs font-bold text-[#111318]">체험용 데모 간편 로그인</span>
          </div>
          <p className="text-xs text-[#4B4F58] leading-relaxed mb-3">
            회원가입 절차 없이 원클릭으로 독자 또는 평생 구독자 환경을 즉시 테스트하실 수 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginDemoUser(false);
                navigate('/mypage');
              }}
              className="py-2 px-3 bg-white hover:bg-gray-50 border border-[#E5E7EB] text-xs font-bold text-[#111318] rounded-xl transition-colors shadow-2xs text-center"
            >
              독자 회원 체험
            </button>
            <button
              type="button"
              onClick={() => {
                loginDemoUser(true);
                navigate('/mypage');
              }}
              className="py-2 px-3 bg-[#D81B60] hover:bg-[#AD1457] text-white text-xs font-bold rounded-xl transition-colors shadow-xs text-center flex items-center justify-center gap-1"
            >
              <span>평생구독 체험</span>
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </button>
          </div>
        </div>

        {/* Standard Email Login Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-bold text-[#111318] mb-1.5">
              이메일 주소
            </label>
            <div className="relative">
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="example@mannaldaily.kr"
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-3 pl-10 text-xs sm:text-sm bg-[#FAF9F6] border rounded-xl focus:outline-hidden focus:ring-1 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#E5E7EB] focus:border-[#D81B60] focus:ring-[#D81B60]'
                }`}
              />
              <Mail className="w-4 h-4 text-[#767B85] absolute left-3.5 top-3.5" />
            </div>
            {errors.email && (
              <p id="email-error" className="text-xs text-red-600 mt-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-bold text-[#111318] mb-1.5">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                placeholder="6자리 이상 입력"
                aria-describedby={errors.password ? 'password-error' : undefined}
                className={`w-full px-4 py-3 pl-10 pr-10 text-xs sm:text-sm bg-[#FAF9F6] border rounded-xl focus:outline-hidden focus:ring-1 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#E5E7EB] focus:border-[#D81B60] focus:ring-[#D81B60]'
                }`}
              />
              <Lock className="w-4 h-4 text-[#767B85] absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? '비밀번호 숨김' : '비밀번호 표시'}
                className="absolute right-3.5 top-3.5 text-[#767B85] hover:text-[#111318]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs text-red-600 mt-1 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs text-[#767B85] pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-[#D81B60] focus:ring-[#D81B60]"
              />
              <span>로그인 상태 유지</span>
            </label>

            <button
              type="button"
              onClick={() => showToast('비밀번호 재설정 링크가 이메일로 전송되었습니다 (데모 안내)', 'info')}
              className="hover:underline text-[#4B4F58]"
            >
              비밀번호 찾기
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#111318] hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>로그인</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]" />
          </div>
          <span className="relative bg-white px-3 text-xs text-[#767B85]">
            또는 소셜 계정으로 계속하기
          </span>
        </div>

        {/* Social Logins */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleSocialLogin('카카오')}
            className="w-full py-2.5 px-4 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <span>카카오로 계속하기</span>
            <span className="text-[10px] text-gray-600 bg-black/5 px-1.5 py-0.5 rounded font-normal">
              연동 준비 중
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('네이버')}
            className="w-full py-2.5 px-4 bg-[#03C75A] hover:bg-[#02b350] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <span>네이버로 계속하기</span>
            <span className="text-[10px] text-white/90 bg-black/15 px-1.5 py-0.5 rounded font-normal">
              연동 준비 중
            </span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] text-center text-xs text-[#767B85]">
          <p>아직 만날신문 회원이 아니신가요?</p>
          <button
            type="button"
            onClick={() => {
              loginDemoUser(false);
              navigate('/mypage');
            }}
            className="mt-1 font-bold text-[#D81B60] hover:underline"
          >
            무료 회원가입 (데모 바로 시작) →
          </button>
        </div>
      </div>
    </main>
  );
};
