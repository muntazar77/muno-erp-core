import { apiClient } from '@/shared/api/apiClient';
import { User } from '../types/auth-type';
import { LoginCredentials } from '../types/auth-type'; // سنفترض وجود هذا الـ Type للمدخلات

export const authService = {
  // 1. طلب تسجيل الدخول
login: async (credentials: LoginCredentials): Promise<void> => {
  // نقوم بإرسال البيانات للباك اند، والـ Cookies سيتم استقبالها تلقائياً
  await apiClient.post('/auth/login', credentials);
},

  // 2. جلب بيانات المستخدم الحالي وصلاحياته
getCurrentUser: async (): Promise<User> => {
  // 1. جلب التوكن مباشرة من الـ localStorage لضمان وجوده وقت الطلب
  const token = typeof window !== 'undefined' ? localStorage.getItem('token_access') : null;

  // 2. إرسال الطلب مع تمرير الـ Header بشكل صريح ومباشر في نفس الطلب لكسر أي قيود CORS
  const response = await apiClient.get<User>('/auth/me', {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  });

  // 3. طباعة البيانات أولاً قبل عمل return للتأكد في الـ Console
  console.log('🚀 [LMS Architect] User data fetched successfully:', response.data);
  
  // 4. إرجاع البيانات في السطر الأخير
  return response.data;
},

  // 3. تسجيل الخروج
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
// admin@acme.test