export type Broker = 'browser-tab' | 'chromecast';

export const postMessageToBroker = <TData = unknown>(
  broker: Broker,
  data: TData
) => {
  switch (broker) {
    case 'browser-tab': {
      broadcastChannelBroker.sendData(data);
    }
    case 'chromecast': {
      chromechastBroker.sendData(data);
    }
  }
};

type UnSubscribeFunction = () => void;

export const subscribeToBroker = <TData = unknown>(
  broker: Broker,
  callback: (data: TData) => void
): UnSubscribeFunction => {
  switch (broker) {
    case 'browser-tab': {
      return broadcastChannelBroker.subscribe(callback);
    }
    case 'chromecast': {
      return chromechastBroker.subscribe(callback);
    }
  }
};

export const getBroker = (brokerType: Broker): MessageBroker => {
  switch (brokerType) {
    case 'browser-tab': {
      return broadcastChannelBroker;
    }
    case 'chromecast': {
      return chromechastBroker;
    }
  }
};

interface MessageBroker {
  sendData<TData = unknown>(data: TData): Promise<void> | void;
  subscribe<TData = unknown>(
    callback: (data: TData) => void
  ): UnSubscribeFunction;
  unSubscribe<TData = unknown>(callback: (data: TData) => void): void;
}

class BroadcastChannelBroker implements MessageBroker {
  #channelName = 'BROWSER_TAB_BROKER';
  #broadcastChannel: BroadcastChannel | null = null;
  #listeners = new WeakMap<
    (data: unknown) => void,
    (event: MessageEvent<unknown>) => void
  >();

  private getOrCreateBroadcastChannel(): BroadcastChannel {
    if (this.#broadcastChannel === null) {
      this.#broadcastChannel = new BroadcastChannel(this.#channelName);
    }
    return this.#broadcastChannel;
  }

  sendData<TData = unknown>(data: TData) {
    const channel = this.getOrCreateBroadcastChannel();
    channel.postMessage(data);
  }

  subscribe<TData = unknown>(callback: (data: TData) => void) {
    const channel = this.getOrCreateBroadcastChannel();
    const listenerCallback = (event: MessageEvent<unknown>) => {
      callback(event.data as TData);
    };
    this.#listeners.set(callback as () => void, listenerCallback);
    channel.addEventListener('message', listenerCallback);

    return () => this.unSubscribe(callback);
  }

  unSubscribe<TData = unknown>(callback: (data: TData) => void) {
    const channel = this.getOrCreateBroadcastChannel();
    const listenerCallback = this.#listeners.get(callback as () => void);
    if (listenerCallback) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      channel.removeEventListener('message', listenerCallback);
    }
  }
}

const broadcastChannelBroker = new BroadcastChannelBroker();

class ChromecastBroker implements MessageBroker {
  #namespace = 'urn:x-cast:COMMON';
  #castSession: cast.framework.CastSession | null = null;
  #listeners = new WeakMap<
    (data: unknown) => void,
    (namespace: string, message: string) => void
  >();

  private getCurrentCastSession() {
    this.#castSession =
      cast.framework.CastContext.getInstance().getCurrentSession();
    return this.#castSession;
  }

  sendData<TData = unknown>(data: TData) {
    const session = this.getCurrentCastSession();
    if (session) {
      session.sendMessage(this.#namespace, data);
    }
  }

  subscribe<TData = unknown>(callback: (data: TData) => void) {
    const session = this.getCurrentCastSession();
    if (session) {
      const listenerCallback = (_: string, message: string) => {
        const data = JSON.parse(message) as TData;
        callback(data);
      };
      this.#listeners.set(callback as () => void, listenerCallback);
      session.addMessageListener(this.#namespace, listenerCallback);
    }

    return () => this.unSubscribe(callback);
  }

  unSubscribe<TData = unknown>(callback: (data: TData) => void) {
    const session = this.getCurrentCastSession();
    if (session) {
      const listenerCallback = this.#listeners.get(callback as () => void);
      if (listenerCallback) {
        session.removeMessageListener(this.#namespace, listenerCallback);
      }
    }
  }
}

const chromechastBroker = new ChromecastBroker();
