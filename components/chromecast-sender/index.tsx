import { useCastEventListener } from 'hooks/useCastEventListener';
import { FC, useCallback, useState } from 'react';

export const ChromecastSender: FC = () => {
  const [sessionState, setSessionState] = useState<cast.framework.SessionState>(
    cast.framework.SessionState.NO_SESSION
  );

  const handleCastSessionStateChanged = useCallback(
    (event: cast.framework.SessionStateEventData) => {
      setSessionState(event.sessionState);
    },
    [setSessionState]
  );

  useCastEventListener(
    cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
    handleCastSessionStateChanged
  );

  return <div>{sessionState}</div>;
};
