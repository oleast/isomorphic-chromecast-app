import { configureStore } from '@reduxjs/toolkit';
import { playersReducer } from 'features/players/playersSlice';
import { settingsReducer } from 'features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    settings: settingsReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
