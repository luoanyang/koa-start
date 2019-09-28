const productionConfig = require('./production.config.js');

// 默认和测试环境配置
let config = {
  logSrc: './logs/',

  resStatus: {
    ok: '0',
    fail: '01',
    unauthorize: '02'
  },

  // mysql 配置
  mysqlConfig: {
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