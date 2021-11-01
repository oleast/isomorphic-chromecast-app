import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';

import { CHROMECAST_APP_ID } from 'common/constants';

import 'cssremedy/css/remedy.css';
import 'cssremedy/css/reminders.css';
import 'cssremedy/css/quotes.css';

type Props = AppProps & {
  err?: Error;
};

const initializeCastApi = function () {
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: CHROMECAST_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  });
};

globalThis['__onGCastApiAvailable'] = function (isAvailable) {
  if (isAvailable) {
    initializeCastApi();
  }
};

const App: FC<Props> = ({ Component, pageProps, err }) => {
  // Workaround for https://github.com/zeit/next.js/issues/8592
  const modifiedPageProps = { ...pageProps, err };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icons/icon-64.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main>
        <noscript>
          Denne nettsiden bruker JavaScript for all interaktivitet, for å dra
          full nytte av nettsiden må du derfor aktivere JavaScript.
        </noscript>
        <Component {...modifiedPageProps} />
      </main>
    </>
  );
};

export default App;
