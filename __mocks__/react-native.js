const ReactNative = jest.requireActual('react-native');

ReactNative.NativeModules.StatusBarManager = {
  getHeight: jest.fn((callback) => callback({ height: 20 })),
};

module.exports = ReactNative;