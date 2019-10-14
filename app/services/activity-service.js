const MysqlDao = require('./dao/mysql-dao');
const model = require('./models/activity');


class ActivityService {
  constructor() {
    this.activityDao = new MysqlDao(model);
  }

  /**
   * 查询活动数据 分页
   *
   * @param {object} where 查询条件
   * @param {number} pageNo 页码
   * @param {object} options 额外的选项
   */
  query(where, pageNo, options) {
    return this.activityDao.query(where, pageNo, 10, options);
  }

  /**
   * 添加活动数据
   *
   * @param {object} data 活动的数据
   */
  save(data) {
    return this.activityDao.save(data);
  }

  /**
   *  查询所有活动
   * 
   * @param {object} where 查询条件
   */
  findAll(where) {
    return this.activityDao.findAll(where);
  }
}

module.exports = new ActivityService();