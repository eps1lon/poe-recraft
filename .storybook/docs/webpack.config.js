const path = require('path');

const genBaseConfig = require('../webpack.config');

// extends ../webpack.config
module.exports = (baseConfig, env) => {
  const config = genBaseConfig(baseConfig, env);

  config.module.rules = [
    ...config.module.rules.filter(rule => !isAtLoaderRule(rule)),
    // split up first rule for at-loader
    // add react-docgen to src and just at-loader for stories
    {
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, '../../src'),
      loaders: [
        require.resolve('awesome-typescript-loader'),
        require.resolve('react-docgen-typescript-loader'),
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, '../../stories'),
      loaders: [
        require.resolve('awesome-typescript-loader'),
        // FIXME support for ts
        // require.resolve('@storybook/addon-storysource/loader'),
      ],
      enforce: 'pre',
    },
  ];

  return config;
};

function isAtLoaderRule(rule) {
  return (
    typeof rule.loader === 'string' &&
    rule.loader.indexOf('awesome-typescript-loader') !== -1
  );
}
