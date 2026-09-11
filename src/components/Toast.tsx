import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isAlert = toast.type === 'alert';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#111318] text-white p-4 rounded-2xl shadow-2xl border border-gray-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200"
    >
      <div className="shrink-0 mt-0.5">
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        {isAlert && <AlertTriangle className="w-5 h-5 text-amber-400" />}
        {!isSuccess && !isAlert && <Info className="w-5 h-5 text-sky-400" />}
      </div>

      <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
        {toast.message}
      </div>

      <button
        type="button"
        onClick={clearToast}
        aria-label="알림 닫기"
        className="shrink-0 text-gray-400 hover:text-white p-1 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
