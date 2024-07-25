import { config } from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

config();

export default {
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  setupFiles: ['dotenv/config']
};