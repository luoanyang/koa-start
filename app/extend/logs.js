const config = require('../../config');
const log4js = require('log4js');

log4js.configure({
  disableClustering: true,
  appenders: {
    http: { type: 'file', filename: config.logSrc + 'http.log' },
    db: { type: 'file', filename: config.logSrc + 'db.log' },
    error: { type: 'file', filename: config.logSrc + 'error.log' },
  },
  categories: {
    default: { appenders: ['http'], level: 'debug' },
    db: { appenders: ['db'], level: 'debug' },
    error: { appenders: ['error'], level: 'debug' },
  }
});

module.exports = {
  httpLogger: log4js.getLogger(),
  dbLogger: log4js.getLogger('db'),
  errorLogger: log4js.getLogger('error'),
};