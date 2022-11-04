const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://mphlz5jhpg.execute-api.us-east-1.amazonaws.com",
      changeOrigin: true,
    })
  );
};
