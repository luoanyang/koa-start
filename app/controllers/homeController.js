class HomeController {
  async getHome(ctx, next) {
    ctx.body = {
      code: '0',
      data: 'hello'
    }
  }
}

module.exports = new HomeController();