import { StateSyncBroker } from 'components/sync/StateSyncBroker';
import { useCastEventListener } from 'hooks/useCastEventListener';
import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import { GoogleCastLauncher } from './GoogleCastLauncher';

import _s from './index.module.scss';

export const ChromecastSender: FC = () => {
  const googleCastRef = useRef<HTMLDivElement | null>(null);

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

  const handleOuterButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    googleCastRef.current?.click();
  };

  return (
    <div className={_s.castSenderContainer}>
      <GoogleCastLauncher ref={googleCastRef} className={_s.castLauncher} />
      <StateSyncBroker />
      {sessionState}
    </div>
  );
};
