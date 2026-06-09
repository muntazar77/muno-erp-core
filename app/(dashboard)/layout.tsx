'use client';

import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import React, { useEffect } from 'react';
import { useCurrentUser } from '@/modules/auth/hooks/useAuth';
import { useAuthStore } from '@/modules/auth/store/authStore';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const { data: userData, isLoading, isError } = useCurrentUser();
    const { setAuth, clearAuth } = useAuthStore();
    
    // 1. جلب بيانات المستخدم من السيرفر
    const { data: userData, isLoading, isError } = useCurrentUser();
// console.log('Current User Data sdfdf:', userData.employee);
    // 2. تحديث متجر Zustand فور وصول البيانات
    useEffect(() => {
      if (userData) {
        setAuth(userData);
      }
    }, [userData, setAuth]);

    // 3. مسح المتجر إذا حدث خطأ غير مصرح به (401)
    useEffect(() => {
      if (isError) {
        clearAuth();
      }
    }, [isError, clearAuth]);

    // 4. شاشة تحميل أثناء جلب البيانات لأول مرة لمنع وميض الواجهات
    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-sm text-slate-600 font-medium">جاري تهيئة النظام والتحقق من الصلاحيات...</p>
          </div>
        </div>
      );
    }

    return (
      <SidebarProvider>
        {/* الـ Sidebar سيتلقى البيانات الآن تلقائياً من الـ Store */}
        <AppSidebar  user={userData}/>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      لوحة التحكم
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>الرئيسية</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {children}
        </SidebarInset>
      </SidebarProvider>
    )
}
