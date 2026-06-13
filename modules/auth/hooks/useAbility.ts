'use client';

import { useClassRules } from '@casl/react';
import { ability } from '@/shared/providers/AbilityProvider';

export const useAppAbility = () => {
  // يتيح لك فحص الصلاحيات برمجياً مثل: const { can } = useAppAbility(); if(can('delete', 'User')) { ... }
  return ability;
};
