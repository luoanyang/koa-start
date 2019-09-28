const homeController = require('./controllers/homeController');
const adminController = require('./controllers/adminController');
const Router = require('koa-router');
const router = new Router();

console.log(adminController.save)

/**
 *  视图
 */
router.get('/', async (ctx, next) => await ctx.render('index', { title: 'hello nodejs!' }));


/**
 *  接口
 */
router.get('/api/home', homeController.getHome);

router.post('/api/login', adminController.find);

// 用户
router.get('/api/admin', adminController.findAll);
router.post('/api/admin', adminController.save);
router.put('/api/admin/:id', adminController.update);
router.delete('/api/admin/:id', adminController.delete);

module.exports = router;