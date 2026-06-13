'use client';

import { useAuth, useCurrentUser } from '@/modules/auth/hooks/useAuth';
import { useAuthStore } from '@/modules/auth/store/authStore';

import { Can } from '@/shared/providers/AbilityProvider';
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
              <pre className="text-xs font-mono  bg-slate-900 text-green-400 p-4 rounded overflow-auto dir-ltr text-left">
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
        <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">إدارة عمليات اللوجستيات</h1>

      <div className="space-x-2 space-x-reverse">
        {/* زر يظهر للجميع */}
        <button className="bg-slate-200 px-4 py-2 rounded">عرض الشحنات</button>

        {/* 🌟 زر مخصص يظهر فقط إذا كان المستخدم يملك صلاحية إنشاء (create) على موديول الشحنات (Delivery) */}
        <Can I="create" a="Delivery">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">➕ إضافة شحنة جديدة</button>
        </Can>

        {/* 🌟 زر خطير يظهر فقط لمن يملك صلاحية حذف (delete) على موديول المستخدمين (User) */}
        <Can I="delete" a="User">
          <button className="bg-red-600 text-white px-4 py-2 rounded">❌ حذف مستخدم</button>
        </Can>
      </div>
    </div>
    </div>
  );
}
