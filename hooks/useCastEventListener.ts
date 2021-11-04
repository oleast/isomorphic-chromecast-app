/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCastContext } from './useCastContext';
import { useEffect } from 'react';

type CastContextEventTypeMap = {
  [cast.framework.CastContextEventType
    .CAST_STATE_CHANGED]: cast.framework.CastStateEventData;
  [cast.framework.CastContextEventType
    .SESSION_STATE_CHANGED]: cast.framework.SessionStateEventData;
};

export const useCastEventListener = <
  TEventType extends cast.framework.CastContextEventType
>(
  eventType: TEventType,
  callback: (event: CastContextEventTypeMap[TEventType]) => void
) => {
  const context = useCastContext();

  useEffect(() => {
    // @ts-ignore TODO: this works for hook usage but typescript is not happy
    context.addEventListener(eventType, callback);
    // @ts-ignore TODO: this works for hook usage but typescript is not happy
    return () => context.removeEventListener(eventType, callback);
  }, [context, eventType, callback]);
};
