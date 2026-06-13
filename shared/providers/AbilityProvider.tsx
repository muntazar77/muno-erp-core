'use client';

import React, { createContext, useEffect } from 'react';
import { useContext, createContext as reactCreateContext } from 'react';
import { Ability, AbilityBuilder } from '@casl/ability'; // تم تغيير الاستيراد هنا إلى Ability
import { useCurrentUser } from '@/modules/auth/hooks/useAuth';

// 1. تعريف نوع الـ Ability الخاص بنظام اللوجستيات (v6 standard)
export type AppAbility = Ability<[string, string]>;

// 2. إنشاء نسخة فارغة افتراضياً من الـ Ability
export const ability = new Ability<[string, string]>();

// 3. إنشاء مكون <Can> المخصص للاستخدام داخل الواجهات
// Create a React context for the ability and a simple <Can> component
export const AbilityContext = reactCreateContext<AppAbility>(ability);

interface CanProps {
  I: string; // action
  a: string; // subject
  children?: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({ I, a, children }) => {
  const ability = useContext(AbilityContext);
  return ability.can(I, a) ? <>{children}</> : null;
} 

interface AbilityProviderProps {
  children: React.ReactNode;
}

export default function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useCurrentUser(); // قراءة كاش المستخدم من TanStack Query

  useEffect(() => {
    // بناء الصلاحيات باستخدام كلاس Ability المحدث
    const { can, rules } = new AbilityBuilder<AppAbility>(Ability as any);

    if (user && user.permissions) {
      user.permissions.forEach((permission) => {
        // permission.action مثل 'create' | permission.subject مثل 'Delivery'
        can(permission.action, permission.subject);
      });
    } else {
      rules.length = 0;
    }

    // تحديث القواعد ديناميكياً
    ability.update(rules);
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
