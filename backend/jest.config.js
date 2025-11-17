export default {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: [
    '**/src/tests/**/*.test.js', 
  ],
  setupFilesAfterEnv: ['./src/tests/setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
};