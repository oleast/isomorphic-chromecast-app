import { CHROMECAST_APP_ID } from 'common/constants';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StateSyncBroker } from 'components/sync/StateSyncBroker';
import { ChromecastSender } from 'components/chromecast-sender';

const GoogleCastLauncher = 'google-cast-launcher' as 'div';

const initializeCastApi = () => {
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: CHROMECAST_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  });
};

globalThis['__onGCastApiAvailable'] = (isAvailable) => {
  if (isAvailable) {
    initializeCastApi();
  }
};

const ChromecastSenderPage: NextPage = () => {
  const [isCastAvailable, setIsCastAvailable] = useState<boolean>(false);
  const googleCastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (googleCastRef.current) {
      googleCastRef.current.style.display = 'block';
    }
  }, [googleCastRef]);

  const handleCastAvailable = useCallback(
    (isAvailable: boolean) => {
      setIsCastAvailable(isAvailable);
    },
    [setIsCastAvailable]
  );

  useEffect(() => {
    globalThis['__onGCastApiAvailable'] = handleCastAvailable;
  }, [handleCastAvailable]);

  useEffect(() => {
    if (isCastAvailable) {
      cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: CHROMECAST_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
    }
  }, [isCastAvailable]);

  return (
    <>
      <Head>
        <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
      </Head>
      <GoogleCastLauncher ref={googleCastRef} />
      {isCastAvailable ? (
        <>
          <StateSyncBroker />
          <ChromecastSender />
        </>
      ) : null}
    </>
  );
};

export default ChromecastSenderPage;
