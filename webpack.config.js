const stream = require.resolve('stream-browserify');

module.exports = {
  resolve: {
    fallback: {
      stream
    }
  }
};
