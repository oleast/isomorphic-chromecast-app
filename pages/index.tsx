import Head from 'next/head';
import { FC, useEffect, useRef } from 'react';
import { StateSyncBroker } from '../components/sync/StateSyncBroker';

const GoogleCastLauncher = 'google-cast-launcher' as 'div';

const IndexPage: FC = () => {
  const googleCastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (googleCastRef.current) {
      googleCastRef.current.style.display = 'block';
    }
  }, [googleCastRef]);

  useEffect(() => {
    const context = cast.framework.CastContext.getInstance();
    console.log(context);
    context.addEventListener(
      cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      function (event) {
        switch (event.sessionState) {
          case cast.framework.SessionState.SESSION_STARTED:
            console.log('CastSession started');
            break;
          case cast.framework.SessionState.SESSION_RESUMED:
            console.log('CastSession resumed');
            break;
          case cast.framework.SessionState.SESSION_ENDED:
            console.log('CastSession disconnected');
            break;
        }
      }
    );
  }, []);

  return (
    <>
      <Head>
        <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
      </Head>
      <GoogleCastLauncher ref={googleCastRef} />
      <StateSyncBroker />
    </>
  );
};

export default IndexPage;
