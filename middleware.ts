import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/config/routes';

// 1. تحديد المسارات المحمية التي تحتاج لتسجيل دخول
const protectedRoutes = ['/dashboard', '/users', '/deliveries', '/reports', '/routes', '/vehicles'];

// 2. تحديد مسارات المصادقة (التي لا يجب دخولها إذا كان مسجلاً بالفعل)
const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // جلب الـ Cookie الخاصة بالـ Access Token
  // ملاحظة: غير اسم 'access_token' للاسم الفعلي الذي يستخدمه الباك اند لديك
  const token = request.cookies.get('access_token')?.value;

  // الحالة الأولى: المستخدم يحاول دخول صفحة محمية وهو غير مسجل دخول
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtected && !token) {
    // نقوم بتحويله لصفحة تسجيل الدخول، ونمرر المسار الأصلي في الـ URL ليعود إليه بعد الـ Login
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // الحالة الثانية: المستخدم مسجل دخول بالفعل ويحاول فتح صفحة الـ Login أو Register
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && token) {
    // نقوم بتوجيهه تلقائياً لصفحة الـ Dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // إذا كانت الأمور سليمة، يتم تمرير الطلب بشكل طبيعي
  return NextResponse.next();
}

// تخصيص الـ Matcher لجعل الـ Middleware يعمل فقط على الصفحات المعنية وتجنب ملفات الـ Assets والصور
export const config = {
  matcher: [
    /*
     * مطابقة جميع مسارات الطلبات باستثناء المحمية بـ:
     * - api (Next.js API routes)
     * - _next/static (ملفات الاستاتيك)
     * - _next/image (تحسين الصور في Next.js)
     * - favicon.ico (أيقونة الموقع)
     * - ملفات السيرفر العامة مثل الصور (png, jpg, svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg).*)',
  ],
};
