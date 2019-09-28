const mysql = require('../services/dao/mysql-dao');

class HomeController {
  async getHome(ctx, next) {
    ctx.$send("hello home");
  }
}

module.exports = new HomeController();