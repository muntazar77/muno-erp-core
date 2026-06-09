'use client';

import { useAuth, useCurrentUser } from '@/modules/auth/hooks/useAuth';
import { useAuthStore } from '@/modules/auth/store/authStore';

export default function DashboardPage() {
  const { logout, isLoggingOut } = useAuth();
    const { data: user } = useCurrentUser(); 
  // const { data: user } = useCurrentUser(); // قراءة البيانات فوراً من الكاش دون طلب جديد للـ API

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم الرئيسية (Dashboard)</h1>
            <p className="text-sm text-slate-500 mt-1">مرحباً بك مجدداً في نظام إدارة اللوجستيات</p>
          </div>
          <button
            onClick={() => logout()}
            disabled={isLoggingOut}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-red-400 transition-colors"
          >
            {isLoggingOut ? 'جاري الخروج...' : 'تسجيل الخروج'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">بيانات المستخدم الحالية (Zustand State):</h3>
            {user ? (
              <pre className="text-xs font-mono text-slate-700 bg-slate-900 text-emerald-400 p-4 rounded overflow-auto dir-ltr text-left">
                {JSON.stringify(user, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-slate-500 italic">جاري تحميل بيانات المستخدم من /auth/me...</p>
            )}
          </div>

          <div className="p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 text-sm">
            💡 <strong>كيف تختبر الـ Middleware الآن؟</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>اضغط على زر "تسجيل الخروج"، سيقوم المتصفح بمسح الـ Cookies وسيتم تحويلك لـ <code className="bg-blue-100 px-1 rounded">/login</code>.</li>
              <li>بعد خروجك، حاول كتابة الرابط <code className="bg-blue-100 px-1 rounded">http://localhost:3000/dashboard</code> يدوياً في المتصفح، ستلاحظ أن الـ Middleware سيمنعك فوراً ويعيدك لصفحة الـ Login.</li>
            </ul>
          </div>
        </div>
      </div>
         <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">لوحة التحكم الرئيسية</h1>
      <p className="text-sm text-slate-500 mb-6">مرحباً بك مجدداً في النظام</p>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">بيانات المستخدم الحالية (Query Cache):</h3>
        {user ? (
          <pre className="text-xs font-mono text-emerald-400 bg-slate-900 p-4 rounded overflow-auto text-left" dir="ltr">
            {JSON.stringify(user, null, 2)}
          </pre>
        ) : (
          <p className="text-sm text-slate-500 italic">لم يتم العثور على بيانات المستخدم.</p>
        )}
      </div>
    </div>
    </div>
  );
}
