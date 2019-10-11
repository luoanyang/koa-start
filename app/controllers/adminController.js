const adminService = require('../services/admin-service');
const jwt = require('jsonwebtoken');

class AdminController {

  async login(ctx, next) {
    const where = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    };
    const data = await adminService.find(where);
    if (!data) {
      ctx.$send(null);
      return;
    }

    // 登陆成功
    const token = jwt.sign({ userId: data.id }, ctx.$config.jwtSecret, { expiresIn: '1h' });
    ctx.$send(token);
  }

  async findUserById(ctx, next) {
    const { token } = ctx.header;
    try {
      const { userId } = jwt.verify(token, ctx.$config.jwtSecret);
      const { username, nickname, role, limits } = await adminService.findById(userId);
      ctx.$send({ username, nickname, role, limits });
    } catch (err) {
      ctx.$errorLogger.error(err);
      ctx.$send('账号未登录！', ctx.$config.resStatus.unauthorize);
    }
  }

  async findAll(ctx, next) {
    const data = await adminService.findAll();
    ctx.$send(data);
  }

  async save(ctx, next) {
    const { username, password, rule } = ctx.request.body;
    const saveData = {
      username,
      password,
      rule
    };
    const data = await adminService.save(saveData);
    ctx.$send(data);
  }

  async update(ctx, next) {
    const id = ctx.params.id;
    const updateData = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    };
    const data = await adminService.update(id, updateData);
    ctx.$send(data, !data && ctx.$config.resStatus.fail);
  }

  async delete(ctx, next) {
    const id = ctx.params.id;
    const data = await adminService.delete(id);
    ctx.$send(data, !data && ctx.$config.resStatus.fail);
  }

}

module.exports = new AdminController();