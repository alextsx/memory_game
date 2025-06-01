import { ChangeEvent, InputHTMLAttributes } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

type SettingsInputType = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const SettingsInput = ({ label, id, ...props }: SettingsInputType) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.value);
  };

  const debouncedHandleInputChange = useDebounceCallback(handleInputChange, 300);

  return (
    <div className="settings-option">
      <label htmlFor={id}>{label}</label>
      <input id={id} onChange={debouncedHandleInputChange} {...props} />
    </div>
  );
};
