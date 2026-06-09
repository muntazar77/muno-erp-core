import { create } from 'zustand';
import { AuthState, Organization } from '../types/auth-type';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  currentOrg: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user, fallbackOrg) => {
    // 1. محاولة إيجاد المنظمة الافتراضية 'acme' في قائمة منظمات المستخدم
    const acmeOrg = user.organizations?.find(org => org.slug === 'acme');
    
    // 2. إذا لم يكن لديه 'acme'، نأخذ أول منظمة متاح له دخولها، أو الـ fallback الممرر
    const activeOrg = acmeOrg || user.organizations?.[0] || fallbackOrg || null;

    set({ 
      user, 
      currentOrg: activeOrg,
      isAuthenticated: true, 
      isLoading: false 
    });
  },

  setCurrentOrg: (org) => set({ currentOrg: org }),

  clearAuth: () => set({ 
    user: null, 
    currentOrg: null, 
    isAuthenticated: false, 
    isLoading: false 
  }),

  setLoading: (isLoading) => set({ isLoading }),
}));
