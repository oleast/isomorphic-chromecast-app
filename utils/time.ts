type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days';

const UNIT_CONVERTIONS: Record<TimeUnit, number> = {
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
};

export const timeToMilliseconds = (amount: number, unit: TimeUnit) => {
  return amount * UNIT_CONVERTIONS[unit];
};
