'use client';

import React, { useState } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggingIn, loginError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // قراءة إذا كان الـ Middleware قد حول المستخدم بسبب انتهاء الجلسة أو طلب مسار معين
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const isExpired = searchParams.get('expired');

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!email || !password) return;

  login(
    { 
      email, 
      password, 
      orgSlug: 'acme' // التأكد من كتابتها orgSlug بشكل صحيح لتطابق الـ NestJS DTO
    },
    {
      onSuccess: () => {
        router.push(callbackUrl);
        router.refresh();
      },
    }
  );
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            نظام إدارة اللوجستيات (LMS)
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            سجل دخولك لإدارة الشحنات والعمليات
          </p>
        </div>

        {isExpired && (
          <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-700 border border-amber-200">
            انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً.
          </div>
        )}

        {loginError && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            خطأ في البريد الإلكتروني أو كلمة المرور. يرجى المحاولة مرة أخرى.
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
              <input
                type="password"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-400 transition-colors"
            >
              {isLoggingIn ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-slate-600 mt-4">
          ليس لديك حساب؟{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}
