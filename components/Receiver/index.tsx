import { Shotteboksen } from 'components/Shotteboksen';
import { useBrokerSubscription } from 'hooks/useBrokerSubscription';
import { FC } from 'react';
import { Broker } from 'utils/sync';

import _s from './index.module.scss';

interface Props {
  brokerType: Broker;
}

export const Receiver: FC<Props> = ({ brokerType }) => {
  useBrokerSubscription(brokerType);

  return (
    <div className={_s.receiver}>
      <Shotteboksen />
    </div>
  );
};
