import { CHROMECAST_APP_ID } from 'common/constants';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StateSyncBroker } from 'components/sync/StateSyncBroker';
import { ChromecastSender } from 'components/chromecast-sender';

const GoogleCastLauncher = 'google-cast-launcher' as 'div';

let isCastApiAvailable = false;
let isCastApiAvailableListener: null | ((isAvailable: boolean) => void) = null;

const initializeCastApi = () => {
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: CHROMECAST_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  });
};

globalThis['__onGCastApiAvailable'] = (isAvailable) => {
  if (isAvailable) {
    initializeCastApi();
    isCastApiAvailable = isAvailable;
    isCastApiAvailableListener?.(isAvailable);
  }
};

const ChromecastSenderPage: NextPage = () => {
  const [isCastAvailable, setIsCastAvailable] =
    useState<boolean>(isCastApiAvailable);
  const googleCastRef = useRef<HTMLDivElement | null>(null);

  const handleCastAvailable = useCallback(
    (isAvailable: boolean) => {
      setIsCastAvailable(isAvailable);
    },
    [setIsCastAvailable]
  );

  useEffect(() => {
    isCastApiAvailableListener = handleCastAvailable;
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
