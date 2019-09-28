const { errorLogger } = require('../extend/logs');

module.exports = async (ctx, next) => {
  // 容错处理
  try {
    await next();
  } catch (error) {
    errorLogger.error(error);
    ctx.status = error.status || 500;
    ctx.$send(error || 'error', ctx.$config.resStatus.fail);
  }
};