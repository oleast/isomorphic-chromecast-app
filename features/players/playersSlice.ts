import { Player, PlayerColor, PlayerStatus } from './player';
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const playersAdapter = createEntityAdapter<Player>({
  selectId: (player) => player.id,
  sortComparer: (playerA, playerB) =>
    playerA.createdAt.localeCompare(playerB.createdAt),
});

const playersSlice = createSlice({
  name: 'players',
  initialState: playersAdapter.getInitialState(),
  reducers: {
    playerAdded: playersAdapter.addOne,
    playerDeleted: playersAdapter.removeOne,
    playerNameUpdated(
      state,
      action: PayloadAction<{ playerId: string; name: string }>
    ) {
      const { playerId, name } = action.payload;
      playersAdapter.updateOne(state, {
        id: playerId,
        changes: { name },
      });
    },
    playerColorUpdated(
      state,
      action: PayloadAction<{ playerId: string; color: PlayerColor }>
    ) {
      const { playerId, color } = action.payload;
      playersAdapter.updateOne(state, {
        id: playerId,
        changes: { color },
      });
    },
    playerStatusUpdated(
      state,
      action: PayloadAction<{ playerId: string; status: PlayerStatus }>
    ) {
      const { playerId, status } = action.payload;
      playersAdapter.updateOne(state, {
        id: playerId,
        changes: { status },
      });
    },
    playerFrequencyUpdated(
      state,
      action: PayloadAction<{ playerId: string; frequency: number }>
    ) {
      const { playerId, frequency } = action.payload;
      playersAdapter.updateOne(state, {
        id: playerId,
        changes: { frequency },
      });
    },
  },
});

export const { reducer: playersReducer } = playersSlice;
export const {
  playerDeleted,
  playerStatusUpdated,
  playerColorUpdated,
  playerFrequencyUpdated,
  playerAdded,
  playerNameUpdated,
} = playersSlice.actions;

export const playersSelectors = playersAdapter.getSelectors();
