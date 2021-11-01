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

  return (
    <>
      <GoogleCastLauncher ref={googleCastRef} />
      <StateSyncBroker />
    </>
  );
};

export default IndexPage;
