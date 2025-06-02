import { createSlice } from '@reduxjs/toolkit';
import { SettingsStateType } from './settings.types';
import { RootState } from './store';

export const settingsInitialState: SettingsStateType = {
  pairs: 12,
  timeLimit: 60,
  allowedMistakes: 3,
  username: 'Unknown'
};

const numericFields = Object.keys(settingsInitialState).filter((key) => {
  const value = settingsInitialState[key as keyof SettingsStateType];
  return typeof value === 'number';
});

export const isNumericField = (key: keyof SettingsStateType): boolean => {
  return numericFields.includes(key);
};

//selectors
export const selectSettings = (state: RootState): SettingsStateType => state.settings;

//will need to use useDebounced for the inputs so we dont perma rerender
const reducers = {
  setFieldByKey<K extends keyof SettingsStateType>(
    state: SettingsStateType,
    action: { payload: { key: K; value: SettingsStateType[K] } }
  ) {
    state[action.payload.key] = action.payload.value;
  }
};
export const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsInitialState,
  reducers
});

//actions
export const { setFieldByKey } = settingsSlice.actions;
