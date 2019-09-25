const { httpLogger, debugLogger } = require('../utils/logs');
module.exports = async (ctx, next) => {

  const { url, method, body } = ctx.request;

  let logContent = `[${method}] ${url} `;

  if (typeof body == 'object' && Object.keys(body).length) {
    logContent += `body:${JSON.stringify(body)}`;
  }

  httpLogger.info(logContent);
  console.debug(logContent);

  await next();
};