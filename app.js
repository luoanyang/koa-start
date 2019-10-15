const errorHandler = require('./app/middlewares/error-handler');
const httpLogger = require('./app/middlewares/http-logger');
const auth = require('./app/middlewares/auth');
const cors = require('./app/middlewares/cors');
const bodyParser = require('koa-bodyparser');
const extend = require('./app/extend');
const router = require('./app/router');
const static = require('koa-static');
const views = require('koa-views');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

// 跨域请求配置
app.use(cors);

// 把 写日志的方法 拓展的方法 和 config 配置 挂载到 ctx 上
app.use(extend);

// 报错处理
app.use(errorHandler);

// 权限管理
app.use(auth);

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
app.use(static(path.join(__dirname, './app/public')));

app.listen(3000, () => {
  console.log('service start: http://localhost:3000');
});