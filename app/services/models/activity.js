const Sequelize = require('sequelize');

module.exports = (db) => {
  let activity = db.define('activity', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: Sequelize.STRING,
      comment: '活动名称',
      allowNull: false
    },

    user_name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    user_mobile: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_province: {
      type: Sequelize.STRING,
    },
    user_city: {
      type: Sequelize.STRING
    },
    user_remark: {
      type: Sequelize.STRING
    },
    user_sex: {
      type: Sequelize.STRING
    },
    source: {
      type: Sequelize.STRING
    },
    create_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, { freezeTableName: true, timestamps: false });
  return activity;
};