import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  /* 
      "@/*": ["./src/*"]
  */
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

module.exports = createJestConfig(customJestConfig);
