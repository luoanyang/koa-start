const axios = require('axios');

describe('首页', function () {
  it('首页数据查询接口', function (done) {
    axios.get('http://localhost:3000/api/home').then(res => {
      console.log(res.data)
      if (res.data.code === '0') {
        done();
      } else {
        done(new Error('数据请求错误'));
      }
    }).catch(err => {
      done(err);
    });
  });
});