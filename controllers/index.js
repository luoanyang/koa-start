const homeController = require('./home');
const Router = require('koa-router');
const router = new Router();

// 视图
router.get('/', async (ctx, next) => await ctx.render('index', { title: 'hello nodejs!' }));

// API
router.get('/api/home', homeController.getHome);

module.exports = router;