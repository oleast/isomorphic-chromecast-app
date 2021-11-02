import { Chromecast } from 'components/chromecast/Chromecast';
import { NextPage } from 'next';
import Head from 'next/head';

const ChromecastReceiverPage: NextPage = () => {
  return (
    <>
      <Head>
        <script src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
        <script src="//www.gstatic.com/cast/sdk/libs/devtools/debug_layer/caf_receiver_logger.js"></script>
      </Head>
      <Chromecast />
    </>
  );
};

export default ChromecastReceiverPage;
