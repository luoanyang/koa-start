const { corsWhiteListHosts } = require('./../../config');
const cors = require('koa2-cors');

module.exports = cors({
  origin: function (ctx) {
    if (/^\/open\/api/.test(ctx.url)) {
      return "*"; // 允许来自所有域名请求
    }
    const referer = ctx.header.referer;
    if (corsWhiteListHosts.some(item => item === referer)) {
      return referer.replace(/\/$/, '');
    }
    return corsWhiteListHosts[0]; // 这样就能只允许域名的请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token'],
});