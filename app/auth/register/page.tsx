'use client';

import React, { useState } from 'react';
import { apiClient } from '@/shared/api/apiClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // إرسال طلب إنشاء الحساب المباشر للـ Backend
      await apiClient.post('/auth/register', { name, email, password });
      // بعد النجاح، يتم توجيهه لصفحة تسجيل الدخول
      router.push('/login');
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب. قد يكون البريد مستخدماً بالفعل.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            انضم لطاقم العمل في نظام اللوجستيات
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="عبد الله محمد"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              disabled={isLoading}
              className="w-full flex justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline disabled:bg-blue-400 transition-colors"
            >
              {isLoading ? 'جاري التسجيل...' : 'تسجيل حساب جديد'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-slate-600 mt-4">
          لديك حساب بالفعل؟{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            سجل دخولك هنا
          </Link>
        </div>
      </div>
    </div>
  );
}
