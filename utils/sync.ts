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

interface MessageBroker {
  sendData<T = unknown>(data: T): Promise<void> | void;
}

class BroadcastChannelBroker implements MessageBroker {
  #channelName = 'BROWSER_TAB_BROKER';
  #broadcastChannel: BroadcastChannel | null = null;

  private initialize() {
    if (this.#broadcastChannel === null) {
      this.#broadcastChannel = new BroadcastChannel(this.#channelName);
    }
  }

  sendData<TData = unknown>(data: TData) {
    this.initialize();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.#broadcastChannel!.postMessage(data);
  }
}

const broadcastChannelBroker = new BroadcastChannelBroker();

class ChromecastBroker implements MessageBroker {
  #namespace = 'urn:x-cast:COMMON';
  #castSession: cast.framework.CastSession | null = null;

  private initialize() {
    this.#castSession =
      cast.framework.CastContext.getInstance().getCurrentSession();
  }

  sendData<TData = unknown>(data: TData) {
    this.initialize();
    console.log(this.#castSession);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.#castSession!.sendMessage(this.#namespace, data);
  }
}

const chromechastBroker = new ChromecastBroker();
