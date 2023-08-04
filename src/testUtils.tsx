import {render} from '@testing-library/react-native';
import {FunctionComponent, PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';

const RootApp: FunctionComponent<PropsWithChildren> = ({children}) => {
  return <SafeAreaView style={{}}>{children}</SafeAreaView>;
};

// @ts-ignore
const customRender = (ui, options) =>
  render(ui, {wrapper: RootApp, ...options});

// re-export everything
export * from '@testing-library/react-native';

export const flushPromises = () => new Promise(setImmediate);

// override render method
export {customRender as render};
