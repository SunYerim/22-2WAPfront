const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://50.18.213.243:8080",
      // target: "http://localhost:9000",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      secure: false,
    })
  );
};
