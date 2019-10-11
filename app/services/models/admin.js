const Sequelize = require('sequelize');

module.exports = (db) => {
  let admin = db.define('admin', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    role: {
      type: Sequelize.STRING,
      comment: 'SUPER_ADMIN=>超级管理员 ADMIN=》管理员 USER=》客户',
      allowNull: false
    },

    limits: {
      type: Sequelize.JSON,
      comment: '客户用户的功能限制'
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  });
  return admin;
};