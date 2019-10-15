const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  const { url, header: { token } } = ctx;

  // 不用验证权限的接口
  if (/^\/open\/api/.test(url) || url == '/api/login') {
    return await next();
  }

  // 验证  /api/ 开头的接口
  const routeNeedAuth = routeAuthMap[url];
  console.log(routeNeedAuth)

  if (routeNeedAuth) {
    try {
      const { role } = jwt.verify(token, ctx.$config.jwtSecret);
      if (routeNeedAuth.length && routeNeedAuth.every(i => i !== role)) {
        return ctx.$send('此账户无权限', ctx.$config.resStatus.forbidden);
      } else {
        return await next();
      }
    } catch (err) {
      ctx.$errorLogger.error(err);
      return ctx.$send('账号未登录！', ctx.$config.resStatus.unauthorize);
    }
  }
  await next();
};

// 路由对应权限
let routeAuthMap = {
  '/api/admin': ['SUPER_ADMIN'],
  '/api/activities': ['SUPER_ADMIN', 'ADMIN'],
  '/api/activity': ['SUPER_ADMIN', 'ADMIN', 'USER'],
  '/api/admin/info': ['SUPER_ADMIN', 'ADMIN', 'USER']
};