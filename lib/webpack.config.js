const terserWebpack = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  cache: true,
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  stats: {
    entrypoints: false,
    children: false
  },
  optimization: {
    minimizer: [
      new terserWebpack({
        parallel: true,
        terserOptions: {
          ecma: 8,
          compress: { warnings: false },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        ]
      }
    ]
  }
};
