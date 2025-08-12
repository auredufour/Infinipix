module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  // Transform TypeScript, JavaScript **and** ESM `.mjs` files through Babel so that
  // packages shipping ESM only (e.g. `lucide-react/dynamic`) can run in Jest.
  transform: { '^.+\\.(mjs|[tj]sx?)$': 'babel-jest' },
  // By default Jest skips `node_modules` from transformation. We need to make an
  // exception for `lucide-react` because it is published as ESM only.
  transformIgnorePatterns: ['/node_modules/(?!(lucide-react)/)'],
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
