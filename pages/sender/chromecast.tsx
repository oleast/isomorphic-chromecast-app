import { NextPage } from 'next';
import Head from 'next/head';
import { useRef } from 'react';
import { StateSyncBroker } from 'components/sync/StateSyncBroker';
import { ChromecastSender } from 'components/chromecast-sender';
import { useCastAvailability } from 'hooks/useCastAvailability';

const GoogleCastLauncher = 'google-cast-launcher' as 'div';

const ChromecastSenderPage: NextPage = () => {
  const isCastAvailable = useCastAvailability();
  const googleCastRef = useRef<HTMLDivElement | null>(null);

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
