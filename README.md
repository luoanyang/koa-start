## 自己配的一个koa2脚手架
因为公司准备用中间层，所以自己搭了一个大概的koa2的脚手架，方便后续使用。

### 目录结构
```
|__ config                      // 配置文件
    |__ index.js                // 默认配置文件 
    |__ production.config.js    // 生产环境配置文件
|__ controllers                 // 路由处理
|__ docs                        // 生成测试文档和jsdoc文档
|__ logs                        // 日志输入目录
|__ middlewares                 // 中间件
|__ public                      // 静态文件目录
|__ tests                       // 测试文件目录
    |__ service                 // 服务接口测试
|__ utils                       // 辅助的工具目录
    |__ log.js                  // 打印日志的工具
|__ views                       // 模板引擎文件
|__ .gitignore                  // git忽略文件
|__ app.js                      // 入口文件
|__ mocha-run.js                // 测试启动文件
|__ pm2.json                    // pm2启动配置文件

```

### npm命令
```
> npm run dev    //启动开发环境
> npm run test   //启动测试用例生成文档到 docs/test/
> npm run docs   //启动生成jsdoc到 docs/jsdoc/
> npm run start  //启动生成环境
```

### 运行
```
> git clone git@github.com:luoanyang/koa-start.git
> cd koa-start
> npm i
> npm run dev
> 再浏览器上打开: http://localhost:3000/
```

### 部署在服务器上
服务部署建议用 pm2 部署，因为 Nodejs 是单线程，所以某个地方出错，整个服务就会挂掉，而 pm2 的好处有：
1. 内建负载均衡 (使用Node cluster 集群模块)
2. 线程守护，keep alive
3. 0秒停机重载，维护升级的时候不需要停机

```
> pm2 start pm2.json  // 用json的文件方式启动
```