const path = require('path');
const webpack_config = require('../config/webpack');

module.exports = ({ config }) => {
  // merge(config, webpack_config)
  config.resolve.alias = webpack_config.resolve.alias;
  config.resolve.extensions.push(...webpack_config.resolve.extensions);
  config.module.rules.push(...webpack_config.module.rules);

  return config;
};
