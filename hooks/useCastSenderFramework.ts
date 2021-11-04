import { useCastAvailability } from './useCastAvailability';
export const useCastSenderFramework = () => {
  const isCastAvailable = useCastAvailability();

  if (!isCastAvailable) {
    throw new Error(
      '"useCastSenderFramework" can not be used before cast is available'
    );
  }

  return cast.framework;
};
