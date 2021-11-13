import { Shotteboksen } from 'components/Shotteboksen';
import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';

import _s from './Chromecast.module.scss';

export const Chromecast: NextPage = () => {
  const [messages, setMessages] = useState(['First message']);

  const handleMessage = useCallback(
    (event: CustomMessageEvent<{ message: string }>) => {
      const data =
        typeof event.data === 'string'
          ? event.data
          : typeof event.data === 'object'
          ? JSON.stringify(event.data)
          : '';

      setMessages((current) => [...current, event.type, data]);
    },
    [setMessages]
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const context = cast.framework.CastReceiverContext.getInstance();
    context.addCustomMessageListener('urn:x-cast:COMMON', handleMessage);
    context.start();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cast.framework.CastReceiverContext.getInstance().setLoggerLevel(
      cast.framework.LoggerLevel.DEBUG
    );
    return () => {
      context.removeCustomMessageListener('urn:x-cast:COMMON', handleMessage);
    };
  }, [handleMessage]);

  return (
    <div className={_s.chromecastApp}>
      <Shotteboksen />
    </div>
  );
};

interface CustomMessageEvent<TData> extends Event {
  data: TData;
  senderId: string;
  type: string;
}
