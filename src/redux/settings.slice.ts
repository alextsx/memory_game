import { createSlice } from '@reduxjs/toolkit';
import { SettingsStateType } from './settings.types';
import { RootState } from './store';

export const settingsInitialState: SettingsStateType = {
  pairs: 12,
  timeLimit: 60,
  allowedMistakes: 3,
  username: 'Unknown'
};

//selectors
export const selectSettings = (state: RootState): SettingsStateType => state.settings;

//will need to use useDebounced for the inputs so we dont perma rerender
const reducers = {
  setPairs(state: SettingsStateType, action: { payload: number }) {
    state.pairs = action.payload;
  },

  setTimeLimit(state: SettingsStateType, action: { payload: number }) {
    state.timeLimit = action.payload;
  },

  setAllowedMistakes(state: SettingsStateType, action: { payload: number }) {
    state.allowedMistakes = action.payload;
  },

  setUsername(state: SettingsStateType, action: { payload: string }) {
    state.username = action.payload;
  }
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsInitialState,
  reducers
});

//actions
export const {} = settingsSlice.actions;
