module.exports = {
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  rootDir: '../../',
  testMatch: ['<rootDir>/**/*.test.js'],
  verbose: true,
};
