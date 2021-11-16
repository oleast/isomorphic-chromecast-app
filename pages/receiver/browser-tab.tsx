import { SplashScreen } from 'components/brand/SplashScreen';
import { Receiver } from 'components/Receiver';
import { NextPage } from 'next';

const BrowserTabReceiverPage: NextPage = () => {
  return (
    <>
      <Receiver brokerType="browser-tab" />
      <SplashScreen />
    </>
  );
};

export default BrowserTabReceiverPage;
