
module.exports = {
  transformIgnorePatterns: ['node_modules/*'],
  modulePaths: ['src'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.spec.{js,jsx}'],
  setupFiles: ['./src/setupTests.js'],
  coverageThreshold: {
    global: {
      statements: 10,
    },
  },
};
