'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  // إنشاء الـ QueryClient داخل useState لضمان عدم مشاركة الكاش بين المستخدمين على السيرفر
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // الكاش يعتبر البيانات "طازجة" لمدة 5 دقائق
            refetchOnWindowFocus: false, // عدم إعادة الطلب تلقائياً عند التنقل بين النوافذ
            retry: false, // لا تقم بإعادة المحاولة تلقائياً عند الفشل لضمان تجربة مستخدم سريعة
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
