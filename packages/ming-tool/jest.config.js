const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
  },
};
