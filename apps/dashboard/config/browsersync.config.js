const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConf = require('../webpack.config.js');
const webpackBundler = webpack(webpackConf);

module.exports = function () {
  return {
    server: {
      baseDir: [
        'build',
        'src'
      ],
      middleware: [
        webpackDevMiddleware(webpackBundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConf.output.publicPath,

          // Quiet verbose output in console
          quiet: true
        }),

        // bundler should be the same as above
        webpackHotMiddleware(webpackBundler)
      ]
    },
    open: false
  };
};
