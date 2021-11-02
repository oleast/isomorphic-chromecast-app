import { FC, useCallback, useEffect, useState } from 'react';

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

  useEffect(() => {
    const context = cast.framework.CastContext.getInstance();
    console.log(context);
    context.addEventListener(
      cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      handleCastSessionStateChanged
    );
    return () =>
      context.removeEventListener(
        cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        handleCastSessionStateChanged
      );
  }, [handleCastSessionStateChanged]);

  return <div>{sessionState}</div>;
};
