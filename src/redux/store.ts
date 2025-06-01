import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './game.slice';
import { settingsSlice } from './settings.slice';

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    settings: settingsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
