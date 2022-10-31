import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';

interface Props {
  children: ReactNode;
}

export const StateProvider: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
