const Sequelize = require('sequelize');

module.exports = (db) => {
  let activities = db.define('activities', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    remark: {
      type: Sequelize.STRING
    },
    customer: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }, { freezeTableName: true });
  return activities;
};