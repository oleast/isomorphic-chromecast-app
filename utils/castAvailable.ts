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
  if (isAvailable) {
    initializeCastApi();
  }
});

globalThis.__onGCastApiAvailable = (isAvailable: boolean) => {
  castAvailability.set(isAvailable);
};
