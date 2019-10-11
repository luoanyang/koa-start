const homeController = require('./controllers/homeController');
const adminController = require('./controllers/adminController');
const Router = require('koa-router');
const router = new Router();


/**
 *  视图
 */
router.get('/', async (ctx, next) => await ctx.render('index', { title: 'hello nodejs!' }));


/**
 *  接口
 */
router.get('/api/home', homeController.getHome);

router.post('/api/login', adminController.login);

// 用户
router.get('/api/admin', adminController.findUserById);
router.get('/api/adminAll', adminController.findAll);
router.post('/api/admin', adminController.save);
router.put('/api/admin/:id', adminController.update);
router.delete('/api/admin/:id', adminController.delete);

module.exports = router;