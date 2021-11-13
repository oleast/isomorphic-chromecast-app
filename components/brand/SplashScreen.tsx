import { LogoAnimated } from 'components/brand/LogoAnimated';
import { FC, useEffect, useState } from 'react';
import { timeToMilliseconds } from 'utils/time';

import _s from './SplashScreen.module.scss';

const SPLASH_SCREEN_TIMEOUT = timeToMilliseconds(5, 'seconds');

export const SplashScreen: FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setShowSplashScreen(false),
      SPLASH_SCREEN_TIMEOUT
    );
    return () => clearTimeout(timeoutId);
  }, [setShowSplashScreen]);

  return showSplashScreen ? (
    <div className={_s.container}>
      <LogoAnimated className={_s.logo} />
    </div>
  ) : null;
};
