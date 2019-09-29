const axios = require('axios');
const baseUrl = 'http://localhost:3000/api/admin';

let id;

describe('管理员服务测试', () => {
  it('查询所有', done => {
    axios.get(baseUrl).then(res => {
      console.log(res.data);
      if (res.data.code === '0') {
        done();
      } else {
        done(new Error('数据请求错误'));
      }
    }).catch(err => {
      done(err);
    });
  });

  it('保存', done => {
    axios.post(baseUrl, {
      username: '123',
      password: '444',
      rule: 'SUPER_ADMIN'
    }).then(res => {
      console.log(res.data);
      id = res.data.data.id;
      if (res.data.code === '0') {
        done();
      } else {
        done(new Error(res));
      }
    }).catch(err => {
      done(err);
    });
  });

  it('修改', done => {
    axios.put(`${baseUrl}/${id}`, {
      username: '123',
      password: '222',
      rule: 'SUPER_ADMIN'
    }).then(res => {
      console.log(res.data);
      if (res.data.code === '0') {
        done();
      } else {
        done(new Error(res));
      }
    }).catch(err => {
      done(err);
    });
  });

  it('删除', done => {
    axios.delete(`${baseUrl}/${id}`).then(res => {
      console.log(res.data);
      if (res.data.code === '0') {
        done();
      } else {
        done(new Error(res));
      }
    }).catch(err => {
      done(err);
    });
  });
});