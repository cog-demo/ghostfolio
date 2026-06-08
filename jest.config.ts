import type { Config } from 'jest';

const config: Config = {
  projects: ['<rootDir>/services/*/jest.config.ts'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['services/**/*.ts', '!services/**/*.test.ts', '!services/**/index.ts'],
};

export default config;
