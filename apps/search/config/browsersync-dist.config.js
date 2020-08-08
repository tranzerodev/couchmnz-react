const historyApiFallback = require('connect-history-api-fallback');
module.exports = function () {
  return {
    server: {
      baseDir: [
        'dist'
      ],
      middleware: [ historyApiFallback() ]
    },
    open: false
  };
};
