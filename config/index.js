const productionConfig = require('./production.config.js');

// 默认和测试环境配置
let config = {

  corsConfig: {
    whiteListHosts: ['http://localhost:8080']
  },

  logSrc: './logs/',

  resStatus: {
    ok: '0',
    fail: '01',
    unauthorize: '02'
  },

  pageSize: 10,

  jwtSecret: 'ceswadsdwak2312w%2213',

  // mysql 配置
  mysqlConfig: {
    host: 'localhost',
    database: 'my_db',
    username: 'root',
    password: ''
  }
};

// 生产环境配置
if (process.env.NODE_ENV === 'production') {
  config = Object.assign(config, productionConfig);
}
module.exports = config;