'use client';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { selectSettings, setFieldByKey } from '@/redux/settings.slice';
import { settingsSchema } from '@/schemas/settings.schema';
import { SettingsInput } from './SettingsInput';

type SettingsFormType = z.infer<typeof settingsSchema>;

export const SettingsModalBody = ({ onSave }: { onSave: () => void }) => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SettingsFormType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings
  });

  const onSubmit = (data: SettingsFormType) => {
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry as [
        keyof SettingsFormType,
        SettingsFormType[keyof SettingsFormType]
      ];
      dispatch(setFieldByKey({ key, value }));
    });
    onSave();
  };

  return (
    <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
      <SettingsInput
        label="Number of pair of cards"
        id="pairs"
        type="number"
        error={errors.pairs?.message}
        {...register('pairs', { valueAsNumber: true })}
      />
      <SettingsInput
        label="Countdown time (sec.)"
        id="timeLimit"
        type="number"
        error={errors.timeLimit?.message}
        {...register('timeLimit', { valueAsNumber: true })}
      />
      <SettingsInput
        label="Allowed mistakes"
        id="allowedMistakes"
        type="number"
        error={errors.allowedMistakes?.message}
        {...register('allowedMistakes', { valueAsNumber: true })}
      />

      <SettingsInput
        label="Username"
        id="username"
        type="text"
        error={errors.username?.message}
        {...register('username')}
      />
      <button className="save-button" type="submit" disabled={Object.keys(errors).length > 0}>
        Save Settings
      </button>
    </form>
  );
};
