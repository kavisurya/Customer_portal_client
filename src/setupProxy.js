const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api', {
  target: 'https://monitor.kaarcloud.com',
  changeOrigin: true,
  secure:false,
  pathRewrite: {
    '^/api': '/api_jsonrpc.php',
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

module.exports = function (app) {
  app.use(apiProxy);
};