import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'google-cast-launcher': GoogleCastLauncherAttributes;
    }

    type GoogleCastLauncherAttributes = DetailedHTMLProps<
      HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}

export const GoogleCastLauncher = forwardRef<HTMLElement>((props, ref) => {
  return <google-cast-launcher {...props} ref={ref} />;
});

GoogleCastLauncher.displayName = 'GoogleCastLauncher';
