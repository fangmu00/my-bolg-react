const express = require('express');
const db = require('./db');

const router = express.Router();

router.post('/api/login', ({ body }, res) => {
  const { username, password } = body;
  db.user.findOne({ username }, 'password', (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err);
        break;
      case !doc:
        res.send({
          isSuccess: false,
          message: '账号不存在',
        });
        break;
      case doc.password === password:
        res.send({
          isSuccess: true,
          message: '登陆成功',
        });
        break;
      case doc.password !== password:
        res.send({
          isSuccess: false,
          message: '密码错误',
        });
        break;
      default:
        res.send({
          isSuccess: false,
          message: '未知错误',
        });
    }
  });
});

router.get('/api/register', ({ query }, res) => {
  const { username, password } = query;
  db.user.findOne({ username }, 'username', (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err);
        break;
      case !doc:
        db.user.create({
          username,
          password,
        }, (error) => {
          if (error) {
            res.send({
              isSuccess: false,
              message: '注册失败',
            });
          } else {
            res.send({
              isSuccess: true,
              message: '注册成功',
            });
          }
        });
        break;
      case doc.username === username:
        res.send({
          isSuccess: false,
          message: '账号已经存在',
        });
        break;
      default:
        res.send({
          isSuccess: false,
          message: '未知错误',
        });
    }
  });
});

router.get('/api/queryUser', (req, res) => {
  db.user.find({}, (error, doc) => {
    if (error) {
      res.send({
        isSuccess: false,
        message: '查询失败',
      });
    } else {
      res.send({
        isSuccess: true,
        message: '操作成功',
        retValue: doc,
      });
    }
  });
});

module.exports = router;
