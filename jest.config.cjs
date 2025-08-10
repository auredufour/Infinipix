module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: { '^.+\\.(t|j)sx?$': 'babel-jest' },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpe?g|webp)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.woff2?$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
