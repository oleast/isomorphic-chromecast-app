import { generateUniqueId } from './../../utils/random';
import { selectRandom } from 'utils/random';

export type PlayerColor =
  | 'sol'
  | 'soloppgang'
  | 'solnedgang'
  | 'kveld'
  | 'hav'
  | 'skyfritt';

const PLAYER_COLORS: Set<PlayerColor> = new Set<PlayerColor>([
  'sol',
  'soloppgang',
  'solnedgang',
  'kveld',
  'hav',
  'skyfritt',
]);

export type PlayerStatus = 'active' | 'paused';

export interface Player {
  id: string;
  createdAt: string;
  name: string;
  color: PlayerColor;
  frequency: number;
  status: PlayerStatus;
}

export const createPlayer = (name: string): Player => ({
  name,
  id: generateUniqueId(),
  createdAt: new Date().toISOString(),
  color: selectRandom(PLAYER_COLORS, 'uniform'),
  frequency: 1,
  status: 'active',
});
