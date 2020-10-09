const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/gql',
    createProxyMiddleware({
      target: 'http://tmdb.sandbox.zoosh.ie',
      pathRewrite: {'^/gql' : ''},
      changeOrigin: true,
    })
  );
  app.use(
    '/w/*',
    createProxyMiddleware({
      target: 'https://en.wikipedia.org',
      // pathRewrite: {'^/gql' : ''},
      changeOrigin: true,
    })
  );
};