import { INITIAL_GAME_SETTINGS, Theme, RaffleCount } from './settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: INITIAL_GAME_SETTINGS,
  reducers: {
    themeChanged(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    raffleCountChanged(state, action: PayloadAction<RaffleCount>) {
      state.raffleCount = action.payload;
    },
    intervalMinChanged(state, action: PayloadAction<number>) {
      state.interval.min = action.payload;
    },
    intervalMaxChanged(state, action: PayloadAction<number>) {
      state.interval.max = action.payload;
    },
    raffleListLengthChanged(state, action: PayloadAction<number>) {
      state.raffleListLength = action.payload;
    },
    showCountDownChanged(state, action: PayloadAction<boolean>) {
      state.showCountDown = action.payload;
    },
  },
});

export const { reducer: settingsReducer } = settingsSlice;
export const {
  raffleCountChanged,
  intervalMaxChanged,
  intervalMinChanged,
  themeChanged,
  showCountDownChanged,
  raffleListLengthChanged,
} = settingsSlice.actions;
