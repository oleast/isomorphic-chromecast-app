import { useCastSenderFramework } from './useCastSenderFramework';
export const useCastContext = () => {
  const framework = useCastSenderFramework();

  return framework.CastContext.getInstance();
};
