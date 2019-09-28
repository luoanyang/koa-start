const config = require('./../../config');

module.exports = async (ctx, next) => {
  // config 文件挂载到 ctx.
  ctx.$config = config;

  // 请求返回方法挂载到 ctx.
  ctx.$send = (data, code) => {
    console.log(`data: ${JSON.stringify(data)}`);
    ctx.set('Content-Type', 'application/json');
    ctx.body = {
      data,
      code: code || config.resStatus.ok
    };
  }
  await next();
}