const MysqlDao = require('./dao/mysql-dao');
const model = require('./models/admin');

/**
 * 管理员账号的增删改查服务
 *
 * @class AdminService
 */
class AdminService {
  constructor() {
    this.adminDao = new MysqlDao(model);
  }

  /**
   * 查询管理员
   *
   * @param {object} where 查询条件
   */
  find(where) {
    return this.adminDao.findOne(where);
  }

  /**
   * 查询管理员账号
   *
   */
  findAll() {
    return this.adminDao.findAll({});
  }

  /**
   * 创建管理员
   *
   * @param {object} data 创建管理员的账号
   */
  save(data) {
    return this.adminDao.save(data);
  }

  /**
   * 更新管理员账号信息
   *
   * @param {number} id 管理员的id.
   * @param {object} data 更新的数据.
   */
  update(id, data) {
    return this.adminDao.update(id, data);
  }

  /**
   * 根据管理员的账号id 删除
   *
   * @param {number} id 管理员 id
   */
  delete(id) {
    return this.adminDao.delete(id);
  }

  /**
   * 根据管理员的账号id 查询信息
   *
   * @param {number} id 管理员id
   */
  findById(id) {
    return this.adminDao.findById(id);
  }
}

module.exports = new AdminService();