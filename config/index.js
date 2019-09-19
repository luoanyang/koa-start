// 默认和测试环境配置
const defaultConfig = {
  logSrc: './logs/'
};


// 生产环境配置
const productionConfig = {};

let config = defaultConfig;

if (process.env.NODE_ENV === 'production') {
  config = Object.assign(defaultConfig, productionConfig);
}

module.exports = config;