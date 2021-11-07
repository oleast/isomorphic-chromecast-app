import { LogoAnimated } from 'components/brand/LogoAnimated';
import { FC } from 'react';

import _s from './index.module.scss';

const IndexPage: FC = () => {
  return (
    <div className={_s.container}>
      <LogoAnimated className={_s.logo} />
    </div>
  );
};

export default IndexPage;
