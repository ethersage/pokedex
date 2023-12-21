module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
