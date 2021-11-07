import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'google-cast-launcher': GoogleCastLauncherAttributes;
    }

    interface GoogleCastLauncherAttributes
      extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
      class?: string;
    }
  }
}

export const GoogleCastLauncher = forwardRef<
  HTMLElement,
  JSX.GoogleCastLauncherAttributes
>((props, ref) => {
  const { className, ...restProps } = props;
  return <google-cast-launcher class={className} {...restProps} ref={ref} />;
});

GoogleCastLauncher.displayName = 'GoogleCastLauncher';
