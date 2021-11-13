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
  const rafflePlayers = createRandomizedListOfLength(playerIds, entryCount);
  const raffleEntries = rafflePlayers.map((playerId) =>
    createRaffleEntry(playerId)
  );
  const raffleWinnerId = raffleEntries[raffleEntries.length - 5].id;
  return [raffleEntries, raffleWinnerId];
};
