class HomeController {
  async getHome(ctx, next) {
    ctx.body2 = {
      code: '0',
      data: 'hello'
    }
  }
}

module.exports = new HomeController();