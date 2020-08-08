const webpack = require('webpack');
const path = require('path');
module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include : __dirname,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {},
      debug: true
    })
  ],
  devtool: 'source-map',
  externals: {
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'true'
  }
};
