import { LogoAnimated } from 'components/brand/LogoAnimated';
import { FC } from 'react';

import _s from './SplashScreen.module.scss';

export const SplashScreen: FC = () => {
  return (
    <div className={_s.container}>
      <LogoAnimated className={_s.logo} />
    </div>
  );
};
