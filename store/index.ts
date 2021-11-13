import { configureStore } from '@reduxjs/toolkit';
import { playersReducer } from 'features/players/playersSlice';
import { raffleGameReducer } from 'features/raffle/raffleGameSlice';
import { settingsReducer } from 'features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    raffleGame: raffleGameReducer,
    settings: settingsReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
