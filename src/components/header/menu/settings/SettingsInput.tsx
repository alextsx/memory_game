'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { SettingsStateType } from '@/redux/settings.types';

type SettingsInputType = {
  label: string;
  id: keyof SettingsStateType;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const SettingsInput = ({ label, id, error, ...props }: SettingsInputType) => {
  return (
    <div className={cn('settings-option', !!error && 'error')}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {!!error && <span className="error-label">{error}</span>}
    </div>
  );
};
