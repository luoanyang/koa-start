const activityService = require('./../services/activity-service');
const excelPort = require('excel-export');
const path = require('path');
const fs = require('fs');

class ActivityController {
  // 根据分页查询活动
  async query(ctx, next) {
    const { activityName, pageNo } = ctx.query;
    console.log(activityName)
    console.log(pageNo)
    const data = await activityService.query({ name: activityName }, pageNo, {
      attributes: [
        'source',
        ['name', 'activityName'],
        ['user_name', 'userName'],
        ['user_city', 'city'],
        ['user_mobile', 'mobile'],
        ['user_province', 'province'],
        ['user_sex', 'sex'],
        ['user_remark', 'remark'],
        ['create_time', 'createdAt']
      ]
    });
    ctx.$send(data);
  }

  // 查询所有活动
  async findAll(ctx, next) {
    const { activityName } = ctx.params;
    const data = await activityService.findAll({ name: activityName });
    ctx.$send(data);
  }

  // 活动报名
  async save(ctx, next) {
    const { activityName, name, mobile, province, city, sex, source, remark } = ctx.request.body;
    const data = {
      name: activityName,
      user_name: name,
      user_mobile: mobile,
      user_province: province,
      user_city: city,
      user_sex: sex === '男' ? '男' : '女',
      source: source,
      user_remark: remark,
    };
    const result = await activityService.save(data);
    ctx.$send(result);
  }

  // 下载活动报表
  async activityExcel(ctx, next) {
    const { name } = ctx.query;
    const data = await activityService.findAll({ name });
    data.forEach(item => {
      item.create_time = ctx.$helper.formatDate(new Date(item.create_time), true);
    });

    const filename = ctx.$helper.formatDate(new Date(), true).replace(/:/g, '-').replace(' ', '-');
    console.log('filename >>>>')
    console.log(filename)
    const conf = {};
    conf.cols = [{
      caption: '姓名',
      type: 'string',
      width: 20,
    }, {
      caption: '性别',
      type: 'string',
      width: 20,
    }, {
      caption: '电话',
      type: 'string',
      width: 20,
    }, {
      caption: '省市',
      type: 'string',
      width: 20,
    }, {
      caption: '城市',
      type: 'string',
      width: 20,
    }, {
      caption: '来源',
      type: 'string',
      width: 20,
    }, {
      caption: '提交时间',
      type: 'string',
      width: 100,
    }];

    conf.rows = data.map(item => {
      return [item.user_name, item.user_sex, item.user_mobile, item.user_province, item.user_city, item.source, ctx.$helper.formatDate(item.create_time, true)];
    });

    const content = excelPort.execute(conf);
    const uploadDir = path.join(__dirname, '../', '/public/');
    console.log('uploadDir')
    console.log(uploadDir)
    const filePath = uploadDir + filename + '.xlsx';
    const fileUrl = ctx.$config.fileUrl + filename + '.xlsx';
    await writeFile(filePath, content);
    ctx.$send(fileUrl);
  }
}

module.exports = new ActivityController();



function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'binary', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(console.log('写入完成'));
    });
  });
}