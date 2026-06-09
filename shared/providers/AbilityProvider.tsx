'use client';

import React, { createContext, useEffect } from 'react';
import { createContextualCan } from '@casl/react';
import { PureAbility, AbilityBuilder, AbilityClass } from '@casl/ability';
import { useCurrentUser } from '@/modules/auth/hooks/useAuth';

// 1. تعريف نوع الـ Ability الخاص بنظام اللوجستيات
export type AppAbility = PureAbility<[string, string]>;
export const AppAbilityClass = PureAbility as AbilityClass<AppAbility>;

// 2. إنشاء نسخة فارغة افتراضياً من الـ Ability
export const ability = new AppAbilityClass();

// 3. إنشاء مكون <Can> المخصص للاستخدام داخل الواجهات
export const Can = createContextualCan(createContext<AppAbility>(ability).Consumer);

interface AbilityProviderProps {
  children: React.ReactNode;
}

export default function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useCurrentUser(); // قراءة بيانات المستخدم وصلاحياته مباشرة من كاش TanStack Query

  useEffect(() => {
    const { can, rules } = new AbilityBuilder<AppAbility>(AppAbilityClass);

    if (user && user.permissions) {
      // بناء الصلاحيات ديناميكياً بناءً على المصفوفة القادمة من /auth/me
      user.permissions.forEach((permission) => {
        // permission.action مثل 'create', permission.subject مثل 'Delivery'
        can(permission.action, permission.subject);
      });
    } else {
      // إذا لم يكن مسجل دخول، نقوم بتصفير الصلاحيات
      rules.length = 0;
    }

    // تحديث كائن Ability العالمي بقواعد المستخدم الجديد
    ability.update(rules);
  }, [user]);

  return (
    <createContext.Provider value={ability}>
      {children}
    </createContext.Provider>
  );
}
