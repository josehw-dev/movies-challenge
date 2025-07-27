module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
  'node_modules/(?!(react-native' +
    '|@react-native' +
    '|@react-navigation' +
    '|@expo' +
    '|expo' +
    '|expo-constants' +
    '|expo-modules-core' +
    '|expo-status-bar' +
    '|expo-splash-screen' +
    '|expo-font' +
    '|expo-haptics' +
    '|expo-web-browser' +
    '|expo-blur' +
    '|react-native-reanimated' +
    '|react-native-ui-lib' +
    '|uilib-native' +
    '|@testing-library' +
    ')/)',
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/__tests__/testUtils.tsx'],
};
