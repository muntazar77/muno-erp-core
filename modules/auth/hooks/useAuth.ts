'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials } from '../types/auth-type';
import { apiClient } from '@/shared/api/apiClient';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setAuth, clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // نطلب الدخول ونستقبل التوكن مباشرة
      const response = await apiClient.post<{ accessToken: string }>('/auth/login', credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      try {
        // 1. حفظ في الـ LocalStorage للـ API Requests
        localStorage.setItem('token_access', data.accessToken);
        
        // 2. حفظ في الكوكي لكي يقرأها الـ Middleware الخاص بك بنجاح
        document.cookie = `access_token=${data.accessToken}; max-age=${60 * 60 * 24}; path=/; sameSite=lax`;

        // تحديث كاش البيانات فوراً
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        const userData = await authService.getCurrentUser();
        setAuth(userData);
      } catch (error) {
        clearAuth();
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      localStorage.removeItem('token_access');
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      queryClient.clear();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
