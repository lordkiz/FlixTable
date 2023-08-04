module.exports = {
  preset: 'react-native',
  cacheDirectory: '.cache/jest',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  rootDir: '.',
  setupFilesAfterEnv: [
    'jest-extended',
    './src/setupJestFilesAfterEnv.ts',
    './src/setupJest.ts',
  ],
  testMatch: ['<rootDir>/src/**/*.tests.(ts|tsx|js)'],
  testEnvironment: 'node',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  transform: {
    '.*(ts|tsx|js|jsx)$': 'babel-jest',
  },
};
