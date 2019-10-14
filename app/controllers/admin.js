const adminService = require('../services/admin-service');
const jwt = require('jsonwebtoken');

class AdminController {

  // 登陆
  async login(ctx, next) {
    const { username, password } = ctx.request.body;
    const where = {
      username: username.toString(),
      password: ctx.$helper.md5(ctx.$helper.md5(password.toString()))
    };
    const data = await adminService.find(where);
    if (!data) {
      ctx.$send(null);
      return;
    }

    // 登陆成功
    const token = jwt.sign({ userId: data.id, role: data.role }, ctx.$config.jwtSecret, { expiresIn: '1d' });
    ctx.$send(token);
  }

  //查询用户信息
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

  // 查询所有账号
  async findAll(ctx, next) {
    const { token } = ctx.header;
    try {
      const { role } = jwt.verify(token, ctx.$config.jwtSecret);
      const admins = await adminService.findAll();

      const data = admins.filter(item => {
        item.password = null;
        return (item.role != 'SUPER_ADMIN' && item.role != role) || item.role == 'USER';
      })
      ctx.$send(data);
    } catch (err) {
      ctx.$errorLogger.error(err);
      ctx.$send('账号未登录！', ctx.$config.resStatus.unauthorize);
    }
  }

  // 添加账号
  async save(ctx, next) {
    const { nickname, username, password, role, limits } = ctx.request.body;
    console.log(nickname, username, password, role, limits)
    const saveData = {
      nickname,
      username,
      password: ctx.$helper.md5(ctx.$helper.md5(password)),
      limits,
      role
    };
    const data = await adminService.save(saveData);
    ctx.$send(data);
  }

  // 更新账号
  async update(ctx, next) {
    const id = ctx.params.id;
    const { nickname, username, password, role, limits } = ctx.request.body;
    const updateData = {
      nickname,
      username,
      role,
      limits
    };
    if (password) {
      updateData.password = password;
    }
    const data = await adminService.update(id, updateData);
    ctx.$send(data, !data && ctx.$config.resStatus.fail);
  }

  // 删除账号
  async delete(ctx, next) {
    const id = ctx.params.id;
    const data = await adminService.delete(id);
    ctx.$send(data, !data && ctx.$config.resStatus.fail);
  }

}

module.exports = new AdminController();