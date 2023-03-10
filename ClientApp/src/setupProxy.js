const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:4478";

const context = [
  "/api",
  "/api/auth/register",
  "/api/post",
  "/api/auth/login",
  "/api/postdraft",
  "/api/post/createpost",
  "/api/comment",
  "/api/post/like",
  "/api/post/dislike",
  "/api/follow",
  "/api/user",
  "/api/user/posts",
  "/api/post/edit",
];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};
