const MysqlDao = require('./dao/mysql-dao');
const model = require('./models/admin');

const adminDao = new MysqlDao(model);

/**
 * 管理员账号的增删改查类
 *
 * @class AdminService
 */
class AdminService {

  /**
   * 查询管理员
   *
   * @param {object} where 查询条件
   */
  find(where) {
    return adminDao.find(where);
  }
  /**
   * 查询管理员账号
   *
   */
  findAll() {
    return adminDao.find({});
  }

  /**
   * 创建管理员
   *
   * @param {object} data 创建管理员的账号
   */
  save(data) {
    return adminDao.save(data);
  }

  /**
   * 更新管理员账号信息
   *
   * @param {number} id 管理员的id.
   * @param {object} data 更新的数据.
   */
  update(id, data) {
    return adminDao.update(id, data);
  }

  /**
   * 根据管理员的账号id 删除
   *
   * @param {number} id 管理员 id
   */
  delete(id) {
    return adminDao.delete(id);
  }
}

module.exports = new AdminService();