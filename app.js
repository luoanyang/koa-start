const errorHandler = require('./app/middlewares/errorHandler');
const httpLogger = require('./app/middlewares/httpLogger');
const bodyParser = require('koa-bodyparser');
const router = require('./app/router');
const static = require('koa-static');
const views = require('koa-views');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

// 报错处理
app.use(errorHandler);

// 解析请求body
app.use(bodyParser());

// 日志中间件
app.use(httpLogger);

// 加载模版引擎的文件夹
app.use(views(path.join(__dirname, './app/views'), {
  extension: 'ejs'
}));

// 路由
app.use(router.routes());

// 静态资源目录配置
app.use(static(path.join(__dirname, './public')));

app.listen(3000, () => {
  console.log('service start: http://localhost:3000');
});