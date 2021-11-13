import { RaffleEntry } from './raffle';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameState = 'playing' | 'paused' | 'idle';

interface RaffleGameState {
  playState: GameState;
  entries: RaffleEntry[] | null;
  winnerEntryId: string | null;
}

const INITIAL_RAFFLE_GAME_STATE: RaffleGameState = {
  playState: 'idle',
  entries: null,
  winnerEntryId: null,
};

const raffleGameSlice = createSlice({
  name: 'raffleGame',
  initialState: INITIAL_RAFFLE_GAME_STATE,
  reducers: {
    gameStarted(
      state,
      action: PayloadAction<{ entries: RaffleEntry[]; winnerEntryId: string }>
    ) {
      state.playState = 'playing';
      state.entries = action.payload.entries;
      state.winnerEntryId = action.payload.winnerEntryId;
    },
    gamePaused(state) {
      if (state.playState === 'playing') {
        state.playState = 'paused';
      }
    },
    gameResumed(state) {
      if (state.playState === 'paused') {
        state.playState = 'playing';
      }
    },
    gameEnded(state) {
      if (state.playState === 'playing' || state.playState === 'paused') {
        state.playState = 'idle';
        state.entries = null;
        state.winnerEntryId = null;
      }
    },
  },
});

export const { reducer: raffleGameReducer } = raffleGameSlice;
export const { gameEnded, gamePaused, gameResumed, gameStarted } =
  raffleGameSlice.actions;
