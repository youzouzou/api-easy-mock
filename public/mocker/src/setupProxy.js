const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/mockAPI', {
            target: 'http://localhost:3006/',
            changeOrigin: true,
            pathRewrite: {
                '^/mockAPI': '/mockAPI'
            }
        })
    );
};
