const homeController = require('./controllers/home');
const adminController = require('./controllers/admin');
const activityController = require('./controllers/activity');
const activitiesController = require('./controllers/activities');
const Router = require('koa-router');
const router = new Router();


/**
 *  视图
 */
router.get('/', async (ctx, next) => await ctx.render('index', { title: 'hello nodejs!' }));


/**
 *  接口
 * 
 *  '/open/api' 为公开接口 
 */
router.get('/api/home', homeController.getHome);

router.post('/api/login', adminController.login);

// 用户
router.get('/api/admin', adminController.findUserById);
router.get('/api/adminAll', adminController.findAll);
router.post('/api/admin', adminController.save);
router.put('/api/admin/:id', adminController.update);
router.delete('/api/admin/:id', adminController.delete);

// 活动报名
router.get('/api/activity', activityController.query);
router.get('/api/activityAll/:activityName', activityController.findAll);
router.post('/api/activity', activityController.save);
router.get('/api/activityExcel', activityController.activityExcel);
router.post('/open/api/activity', activityController.save); // 公共开放接口

// 活动列表
router.get('/api/activities', activitiesController.findAll);
router.post('/api/activities', activitiesController.save);
router.put('/api/activities/:id', activitiesController.update);
router.delete('/api/activities/:id', activitiesController.delete);

module.exports = router;