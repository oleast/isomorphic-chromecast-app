import { createRandomizedListOfLength } from 'utils/list';
import { generateUniqueId } from 'utils/random';

export interface RaffleEntry {
  id: string;
  contestantId: string;
}

export const createRaffleEntry = (contestantId: string) => ({
  id: generateUniqueId(),
  contestantId,
});

export const createNewRaffleGame = (
  playerIds: string[],
  entryCount: number
): [RaffleEntry[], string] => {
  const MINIMUM_ENTRY_COUNT = 10;
  const WINNER_OFFSET_FROM_END = 4;
  const _entryCount = Math.max(MINIMUM_ENTRY_COUNT, entryCount);
  const rafflePlayers = createRandomizedListOfLength(playerIds, _entryCount);
  const raffleEntries = rafflePlayers.map((playerId) =>
    createRaffleEntry(playerId)
  );
  const winnerIndex = raffleEntries.length - WINNER_OFFSET_FROM_END - 1;
  const raffleWinnerId = raffleEntries[winnerIndex].id;
  return [raffleEntries, raffleWinnerId];
};
