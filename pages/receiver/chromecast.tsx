import { SplashScreen } from 'components/brand/SplashScreen';
import { Receiver } from 'components/Receiver';
import { NextPage } from 'next';
import Head from 'next/head';

const ChromecastReceiverPage: NextPage = () => {
  return (
    <>
      <Head>
        <script src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
        <script src="//www.gstatic.com/cast/sdk/libs/devtools/debug_layer/caf_receiver_logger.js"></script>
      </Head>
      <Receiver brokerType="chromecast" />
      <SplashScreen />
    </>
  );
};

export default ChromecastReceiverPage;
