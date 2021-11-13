import { selectRandom } from './random';

export function range(start = 0, end: number, step = 1) {
  return {
    *[Symbol.iterator]() {
      let newStart = start,
        newEnd = end;
      if (end < start) {
        newStart = end;
        newEnd = start;
      }
      for (let i = newStart; i < newEnd; i += step) {
        yield i;
      }
    },
  };
}

export const arrayOfLength = (length: number): number[] => {
  return Array.from(range(0, length, 1));
};

export const createRandomizedListOfLength = <TItem>(
  list: TItem[],
  length: number
): TItem[] => {
  return arrayOfLength(length).map(() => selectRandom(list, 'uniform'));
};
