const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '~': path.join(__dirname, '../src'),
    },
    extensions: ['.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../stories'),
        ],
        loader: require.resolve('awesome-typescript-loader'),
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      }
    ]
  }
};
