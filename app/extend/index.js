const crypto = require('crypto');
const config = require('./../../config');
const { errorLogger, httpLogger, dbLogger } = require('./logs');

module.exports = async (ctx, next) => {
  // config 文件挂载到 ctx.
  ctx.$config = config;
  ctx.$errorLogger = errorLogger;
  ctx.$httpLogger = httpLogger;
  ctx.$dbLogger = dbLogger;
  ctx.$helper = helper;

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

const helper = {

  formatDate(dateObj, datetime) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    let result = year + '-' + this.formatNumber(month) + '-' + this.formatNumber(day);
    if (datetime) {
      const hour = dateObj.getHours();
      const minute = dateObj.getMinutes();
      const second = dateObj.getSeconds();
      result += ' ' + this.formatNumber(hour) + ':' + this.formatNumber(minute) + ':' + this.formatNumber(second);
    }
    return result;
  },

  formatNumber(n) {
    return n >= 10 ? n.toString() : '0' + n;
  },

  md5(content) {
    return crypto.createHash('md5').update(content).digest('hex');
  }

}