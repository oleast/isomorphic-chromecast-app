import { FC } from 'react';
import cx from 'classnames';

import _s from './LogoAnimated.module.scss';

const TEXT = {
  NAME: 'stemning',
  SEPARATOR: '.',
  DOMAIN: 'party',
};

interface Props {
  className?: string;
}

export const LogoAnimated: FC<Props> = ({ className }) => {
  return (
    <p className={cx(className, _s.container)}>
      <span className={_s.name}>{TEXT.NAME}</span>
      <span className={_s.separator}>{TEXT.SEPARATOR}</span>
      <span className={_s.domain}>{TEXT.DOMAIN}</span>
    </p>
  );
};
