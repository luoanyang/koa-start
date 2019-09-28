const { mysqlConfig } = require('../../../config');
const { dbLogger } = require('./../../extend/logs');
const Sequelize = require('sequelize');

const db = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
  host: 'localhost',
  dialect: 'mysql',
  // 连接池
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    // 是否开始日志，默认是用console.log
    // 建议开启，方便对照生成的sql语句
    logging: true,
  }
});

// 同步所有尚未在数据库中的模型
// db.sync()

// 强制同步所有模型
// db.sync({force: true});

db.authenticate()
  .then(() => {
    dbLogger.debug(`Mysql connect success!`);
  })
  .catch(err => {
    dbLogger.debug(`Mysql error: ${JSON.stringify(err)}`);
  });

/**
 * 根据 model 生成 dao 
 *
 * @class MysqlDao
 */
class MysqlDao {
  /**
   * 初始化dao
   *
   * @param {function} model 定义表结构的方法.
   * @memberof MysqlDao
   */
  constructor(model) {
    this.model = model(db);
    this.modelName = this.model.name;
  }
  /**
   * 根据 where 条件查询.
   *
   * @param {object} where 查询的条件.
   * @param {array} order 排序顺序. [可空]
   * @param {object} options 额外条件. [可空]
   */
  async find(where, order = [], options = {}) {
    dbLogger.debug(`[mysql find] tableName:${this.modelName} where:${JSON.stringify(where)} order:${JSON.stringify(order)} options:${JSON.stringify(options)}`);
    return await this.model.findAll(Object.assign({ where }, { order }, options));
  }

  /**
   * 根据 where 条件查询单条数据.
   *
   * @param {object} where 查询条件.
   * @param {object} options 额外条件. [可空]
   */
  async findOne(where, options = {}) {
    dbLogger.debug(`[mysql findOne] tableName:${this.modelName} where:${JSON.stringify(where)} options:${JSON.stringify(options)}`);
    return await this.model.findOne(object.assign({ where }, options));
  }

  /**
   * 根据 id 查询数据.
   *
   * @param {object} model 定义的表.
   * @param {number} id 表id.
   */
  async findById(id) {
    dbLogger.debug(`[mysql findById] tableName:${this.modelName} id:${id}`);
    return await this.model.findById(id);
  }

  /**
   * 保存数据
   *
   * @param {object} data 保存的数据.
   * @returns 表结构的数据.
   */
  async save(data) {
    dbLogger.debug(`[mySql save] tableName:${this.modelName} data:${JSON.stringify(data)}`);
    return await this.model.create(data);
  }

  /**
   * 根据 id 更新数据
   *
   * @param {number} id 数据 id.
   * @param {object} data 更新的数据.
   * @returns: success:1, fail:0
   */
  async update(id, data) {
    dbLogger.debug(`[mysql update] tableName:${this.modelName} id:${id} data:${JSON.stringify(data)}`);
    const res = await this.model.update(data, { where: { id } });
    return res && res[0] == '1' ? 1 : 0;
  }
  /**
   * 更加 id 删除数据
   *
   * @param {number} id 数据 id.
   * @returns: success:1, fail:0 
   */
  async delete(id) {
    dbLogger.debug(`[mysql delete] tableName:${this.modelName} id:${id}`);
    return await this.model.destroy({ where: { id } });
  }


}

module.exports = MysqlDao;