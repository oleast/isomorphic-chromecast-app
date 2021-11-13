import { v4 as uuid4 } from 'uuid';

export const randomInInterval = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const getRandomIndex = (max: number) => {
  return Math.floor(randomInInterval(0, max));
};

let prevValue: unknown | null = null;

function tryAgainIfEqual<TReturnValue>(
  callback: () => TReturnValue
): TReturnValue {
  const returnValue = callback();
  if (returnValue === prevValue) {
    return tryAgainIfEqual(callback);
  } else {
    prevValue = returnValue;
    return returnValue;
  }
}

type RandomMode = 'random' | 'uniform';

export const selectRandom = <TValue>(
  iterable: Iterable<TValue>,
  mode: RandomMode = 'random'
): TValue => {
  const array: TValue[] = Array.from(iterable);
  if (mode === 'random') {
    const randomIndex = getRandomIndex(array.length);
    return array[randomIndex];
  } else {
    const randomIndex = tryAgainIfEqual(() => getRandomIndex(array.length));
    return array[randomIndex];
  }
};

export const generateUniqueId = (): string => {
  return uuid4();
};
