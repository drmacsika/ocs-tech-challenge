/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testTimeout: 500000,
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  testPathIgnorePatterns: ['src/__tests__/__utils.ts', 'src/__tests__/__queries.ts'],
  coveragePathIgnorePatterns: ['src/__tests__/__utils.ts', 'src/__tests__/__queries.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
};
