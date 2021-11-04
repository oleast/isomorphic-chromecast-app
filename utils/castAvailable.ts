import { CHROMECAST_APP_ID } from 'common/constants';
import { createSimpleSubscription } from 'common/lib/simpleSubscription';

export const castAvailability = createSimpleSubscription(false);

const initializeCastApi = () => {
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: CHROMECAST_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  });
};

castAvailability.subscribe((isAvailable) => {
  console.log('subscriber', isAvailable);
  if (isAvailable) {
    initializeCastApi();
  }
});

globalThis.__onGCastApiAvailable = (isAvailable: boolean) => {
  console.log('first');
  let a = castAvailability.value.current;
  a = isAvailable;
  console.log('second', a);
  castAvailability.value.current = isAvailable;
};
