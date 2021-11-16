import { getBroker } from 'utils/sync';
import { Dispatch } from 'store';
import { Middleware } from 'redux';

/**
 * Posts all actions to a receiver client.
 */
export function transferAction() {
  const transferStateMiddleware: Middleware =
    () => (next: Dispatch) => (action) => {
      const returnValue = next(action);
      const broker = getBroker('browser-tab');
      broker.sendData(action);
      return returnValue;
    };

  return transferStateMiddleware;
}
