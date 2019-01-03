const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.join(__dirname, '../tsconfig.build.json'),
              compilerOptions: {
                declaration: false
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: 'production',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, '../dist/umd')
  }
};