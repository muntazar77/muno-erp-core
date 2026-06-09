export interface Permission {
  action: string;  // مثل: 'create', 'read', 'update', 'delete', 'manage'
  subject: string; // مثل: 'Delivery', 'User', 'Route', 'all'
}
export interface Organization {
  id: string;
  slug: string; // مثل: 'acme', 'branch-1'
  name: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: Permission[];
  organizations: Organization[]; // قائمة المنظمات التي يمتلك المستخدم صلاحية دخولها
}
export interface AuthState {
  user: User | null;
  currentOrg: Organization | null; // المنظمة النشطة حالياً
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, fallbackOrg?: Organization) => void;
  setCurrentOrg: (org: Organization) => void; // دالة للتبديل بين الفروع/المنظمات
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
}


export interface LoginCredentials {
  email: string;
  password: string;
  orgSlug?: string; // اختياري لتحديد الفرع/المنظمة عند تسجيل الدخول
}