import { RefObject, useEffect, useMemo, useCallback } from 'react';

export const useIntersectionObserver = <TargetElement extends Element>(
  ref: RefObject<TargetElement>,
  callback: (entry: IntersectionObserverEntry) => void
) => {
  const observerInit: IntersectionObserverInit = useMemo(() => ({}), []);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => callback(entry));
    },
    []
  );

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(observerCallback, observerInit);
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    return;
  }, [ref.current]);
};
