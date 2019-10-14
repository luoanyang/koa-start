const { httpLogger } = require('../extend/logs');
module.exports = async (ctx, next) => {

  const { url, method, body, header } = ctx.request;

  let logContent = `[${method}] ${url} `;

  if (typeof body == 'object' && Object.keys(body).length) {
    logContent += ` body:${JSON.stringify(body)}`;
  }

  httpLogger.info(logContent);
  console.debug(logContent);

  await next();
};