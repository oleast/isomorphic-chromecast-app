type Listener<T> = (value: T) => void;

export const createSimpleSubscription = <TValue>(initialValue: TValue) => {
  type ValueListener = Listener<TValue>;
  let listeners: ValueListener[] = [];

  const subscribe = (listener: ValueListener) => {
    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }
  };

  const unSubscribe = (listener: ValueListener) => {
    if (listeners.includes(listener)) {
      listeners = listeners.filter((l) => l !== listener);
    }
  };

  interface ProxyObject {
    current: TValue;
  }

  const valueProxy: ProxyObject = new Proxy<ProxyObject>(
    { current: initialValue },
    {
      get: (proxy, prop: keyof ProxyObject) => proxy[prop],
      set: (proxy, prop: keyof ProxyObject, value: TValue) => {
        const current = proxy[prop];
        const isValueEqual = current === value;
        if (!isValueEqual) {
          proxy[prop] = value;
          listeners.forEach((listener) => listener(value));
        }
        return !isValueEqual;
      },
    }
  );

  const get = (): TValue => {
    return valueProxy.current;
  };

  const set = (value: TValue): void => {
    valueProxy.current = value;
  };

  return {
    subscribe,
    unSubscribe,
    value: valueProxy,
    get,
    set,
  };
};
