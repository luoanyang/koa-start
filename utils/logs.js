const log4js = require('log4js');
const config = require('../config');

log4js.configure({
  appenders: {
    http: { type: 'file', filename: config.logSrc + 'http.log' },
    db: { type: 'file', filename: config.logSrc + 'db.log' },
    error: { type: 'file', filename: config.logSrc + 'error.log' },
  },
  categories: {
    default: { appenders: ['http'], level: 'debug' },
    db: { appenders: ['db'], level: 'debug' },
    error: { appenders: ['error'], level: 'error' },
  }
});

module.exports = {
  httpLogger: log4js.getLogger(),
  dbLogger: log4js.getLogger('db'),
  errorLogger: log4js.getLogger('error'),
};