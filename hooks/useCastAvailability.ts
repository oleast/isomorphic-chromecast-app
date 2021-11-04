import { useState, useCallback, useEffect } from 'react';

import { castAvailability } from 'utils/castAvailable';

export const useCastAvailability = (): boolean => {
  const [isCastAvailable, setIsCastAvailable] = useState<boolean>(() =>
    castAvailability.get()
  );

  const handleCastAvailable = useCallback(
    (isAvailable: boolean) => {
      setIsCastAvailable(isAvailable);
    },
    [setIsCastAvailable]
  );

  /**
   * Subscribe to events where cast availability might change in the future.
   */
  useEffect(() => {
    castAvailability.subscribe(handleCastAvailable);
    return () => castAvailability.unSubscribe(handleCastAvailable);
  }, [handleCastAvailable]);

  /**
   * Get the initial state again after first render since the availability might
   * have changed between when "setState" is called and when the subscription above is run.
   */
  useEffect(() => {
    setIsCastAvailable(castAvailability.get());
  }, []);

  return isCastAvailable;
};
