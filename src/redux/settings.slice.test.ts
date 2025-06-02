import { configureStore } from '@reduxjs/toolkit';
import {
  isNumericField,
  selectSettings,
  setFieldByKey,
  settingsInitialState,
  settingsSlice
} from './settings.slice';
import { RootState } from './store';

describe('Settings Slice', () => {
  it('should have a valid initial state', () => {
    expect(settingsInitialState).toEqual({
      pairs: 12,
      timeLimit: 60,
      allowedMistakes: 3,
      username: 'Unknown'
    });
  });

  it('should return default settings via selectSettings', () => {
    const store = configureStore({
      reducer: {
        settings: settingsSlice.reducer
      }
    });

    const state = store.getState() as RootState;
    const selectedSettings = selectSettings(state);

    expect(selectedSettings).toEqual(settingsInitialState);
  });

  it('setFieldByKey should update a specific field in settings state', () => {
    // Create a test store
    const store = configureStore({
      reducer: {
        settings: settingsSlice.reducer
      }
    });

    // Dispatch one or more updates
    store.dispatch(setFieldByKey({ key: 'pairs', value: 8 }));
    store.dispatch(setFieldByKey({ key: 'username', value: 'TestUser' }));

    const updatedState = store.getState() as RootState;
    expect(updatedState.settings.pairs).toBe(8);
    expect(updatedState.settings.username).toBe('TestUser');
  });

  it('isNumericField should return true if the field is numeric', () => {
    // pairs is numeric by default
    expect(isNumericField('pairs')).toBe(true);

    // username is not numeric
    expect(isNumericField('username')).toBe(false);
  });
});
