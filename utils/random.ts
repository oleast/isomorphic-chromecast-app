import { v4 as uuid4 } from 'uuid';

export const selectRandom = <TValue>(iterable: Iterable<TValue>): TValue => {
  const array: TValue[] = Array.from(iterable);
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const generateUniqueId = (): string => {
  return uuid4();
};
