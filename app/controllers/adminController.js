const adminService = require('../services/admin-service');

class AdminController {

  async find(ctx, next) {
    const where = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    };
    const data = await adminService.find(where);
    ctx.$send(data);
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