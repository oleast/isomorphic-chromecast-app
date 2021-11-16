import { useCallback, useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from 'store/hooks';
import { Broker, getBroker } from 'utils/sync';

export const useBrokerSubscription = (brokerType: Broker) => {
  const dispatch = useDispatch();

  const handleBrokerAction = useCallback(
    (action: AnyAction) => {
      dispatch(action);
    },
    [dispatch]
  );

  useEffect(() => {
    const broker = getBroker(brokerType);
    const unSubscribe = broker.subscribe(handleBrokerAction);
    return () => unSubscribe();
  }, [brokerType, handleBrokerAction]);
};
