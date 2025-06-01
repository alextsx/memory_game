import { createSlice } from '@reduxjs/toolkit';
import { SettingsStateType } from './settings.types';
import { RootState } from './store';

const initialState: SettingsStateType = {
  pairs: 12,
  timeLimit: 60
};

//selectors
export const selectSettings = (state: RootState) => state.settings;

const reducers = {};

export const gameSlice = createSlice({
  name: 'settings',
  initialState,
  reducers
});

//actions
export const {} = gameSlice.actions;
