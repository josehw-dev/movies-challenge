import '@testing-library/jest-native/extend-expect';
import { StatusBar } from 'react-native';

if (typeof StatusBar.currentHeight === 'undefined') {
  Object.defineProperty(StatusBar, 'currentHeight', {
    get: () => 24,
    configurable: true,
  });
}

['setStyle', 'setHidden', 'setNetworkActivityIndicatorVisible', 'setBarStyle'].forEach(fn => {
  if (typeof StatusBar[fn] !== 'function') {
    StatusBar[fn] = jest.fn();
  }
});
