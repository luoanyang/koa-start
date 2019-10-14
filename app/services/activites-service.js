const MysqlDao = require('./dao/mysql-dao');
const model = require('./models/activities');


class ActivitiesService {
  constructor() {
    this.activitiesDao = new MysqlDao(model);
  }

  /**
   * 查询活动数据 分页
   *
   * @param {object} where 查询条件
   * @param {number} pageNo 页码
   * @param {object} options 额外的选项
   */
  query(where, pageNo, options) {
    return this.activitiesDao.query(where, pageNo, 10, options);
  }

  /**
   * 添加活动数据
   *
   * @param {object} data 活动的数据
   */
  save(data) {
    return this.activitiesDao.save(data);
  }

  /**
   * 查询所有活动
   * 
   * @param {object} where 查询条件
   */
  findAll() {
    return this.activitiesDao.findAll({});
  }

  /**
   * 修改活动信息
   *
   * @param {number} id 活动的id.
   * @param {object} data 修改的数据
   */
  update(id, data) {
    return this.activitiesDao.update(id, data);
  }
  
  /**
   * 根据活动的id 删除
   *
   * @param {number} id 活动 id
   */
  delete(id) {
    return this.activitiesDao.delete(id);
  }
}

module.exports = new ActivitiesService();