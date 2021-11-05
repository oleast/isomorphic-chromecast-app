import { timeToMilliseconds } from 'utils/time';

export type Theme = 'bekk';
export type RaffleCount = 1 | 2 | 3;

export interface Interval {
  min: number;
  max: number;
}

export interface GameSettings {
  theme: Theme;
  interval: Interval;
  raffleCount: RaffleCount;
  showCountDown: boolean;
}

export const INITIAL_GAME_SETTINGS: GameSettings = {
  theme: 'bekk',
  interval: {
    min: timeToMilliseconds(3, 'minutes'),
    max: timeToMilliseconds(6, 'minutes'),
  },
  raffleCount: 1,
  showCountDown: false,
};
