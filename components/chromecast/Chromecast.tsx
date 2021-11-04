import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';

import _s from './Chromecast.module.scss';

export const Chromecast: NextPage = () => {
  const [messages, setMessages] = useState(['First message']);

  const handleMessage: SystemEventHandler = useCallback(
    (event) => {
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
      <h1 style={{ color: '#eeeeee' }}>TEST</h1>
      <ul>
        {messages.map((message, i) => (
          <li key={message + '_-_' + i}>{message}</li>
        ))}
      </ul>
    </div>
  );
};
