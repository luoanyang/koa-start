const activitesService = require('../services/activites-service');

class AdminController {

  // 查询所有活动
  async findAll(ctx, next) {
    const data = await activitesService.findAll();
    ctx.$send(data);
  }

  // 添加活动
  async save(ctx, next) {
    const { name, remark, customer } = ctx.request.body;
    const saveData = { name, remark, customer };
    const data = await activitesService.save(saveData);
    ctx.$send(data);
  }

  // 更新活动
  async update(ctx, next) {
    const id = parseInt(ctx.params.id);
    const { name, remark, customer } = ctx.request.body;
    const updateData = {
      name,
      remark,
      customer
    };
    const data = await activitesService.update(id, updateData);
    ctx.$send(data, !data && ctx.$config.resStatus.fail);
  }

  // 删除活动
  async delete(ctx, next) {
    const id = ctx.params.id;
    const data = await activitesService.delete(id);
    ctx.$send(data, !data && ctx.$config.resStatus.fail);
  }

}

module.exports = new AdminController();