const { mysqlConfig, pageSize } = require('../../../config');
const { dbLogger } = require('./../../extend/logs');
const Sequelize = require('sequelize');

const db = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
  host: mysqlConfig.host,
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
   * 分页查询
   *
   * @param {object} where 查询条件.
   * @param {number} pageNo 页码
   * @param {number} size 页数，默认为 config 配置中的 pageSize字段.
   */
  async query(where, pageNo, size = pageSize) {
    dbLogger.debug(`[mysql query] tableName:${this.modelName} where:${JSON.stringify(where)} pageNo:${pageNo} size:${size}`);
    const lists = await this.model.findAll({ where, offset: (pageNo - 1) * size, limit: size });
    const count = await this.model.count({ where });
    return {
      lists,
      totalPage: Math.ceil(count / size),
      currentPage: pageNo
    }
  }



  /**
   * 根据 where 条件,查询所有数据.
   *
   * @param {object} where 查询的条件.
   * @param {array} order 排序顺序. [可空]
   * @param {object} options 额外条件. [可空]
   */
  async findAll(where, order = [], options = {}) {
    dbLogger.debug(`[mysql findAll] tableName:${this.modelName} where:${JSON.stringify(where)} order:${JSON.stringify(order)} options:${JSON.stringify(options)}`);
    return this.model.findAll(Object.assign({ where }, { order }, options));
  }

  /**
   * 根据 where 条件查询单条数据.
   *
   * @param {object} where 查询条件.
   * @param {object} options 额外条件. [可空]
   */
  async findOne(where, options = {}) {
    dbLogger.debug(`[mysql findOne] tableName:${this.modelName} where:${JSON.stringify(where)} options:${JSON.stringify(options)}`);
    return this.model.findOne(Object.assign({ where }, options));
  }

  /**
   * 根据 id 查询数据.
   *
   * @param {object} model 定义的表.
   * @param {number} id 表id.
   */
  async findById(id) {
    dbLogger.debug(`[mysql findById] tableName:${this.modelName} id:${id}`);
    console.log(this.model)
    return this.model.findOne({ where: { id } });
  }

  /**
   * 保存数据
   *
   * @param {object} data 保存的数据.
   * @returns 表结构的数据.
   */
  async save(data) {
    dbLogger.debug(`[mySql save] tableName:${this.modelName} data:${JSON.stringify(data)}`);
    return this.model.create(data);
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
    return this.model.destroy({ where: { id } });
  }


}

module.exports = MysqlDao;