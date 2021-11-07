import { NextPage } from 'next';
import Head from 'next/head';
import { ChromecastSender } from 'components/chromecast-sender';
import { useCastAvailability } from 'hooks/useCastAvailability';

const ChromecastSenderPage: NextPage = () => {
  const isCastAvailable = useCastAvailability(false);

  return (
    <>
      <Head>
        <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
      </Head>
      {isCastAvailable ? <ChromecastSender /> : null}
    </>
  );
};

export default ChromecastSenderPage;
