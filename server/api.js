const express = require('express');
const db = require('./db');

const router = express.Router();

const successRet = (res, ret) => {
  res.status(200).jsonp({
    success: true,
    content: ret,
  });
};

const errorRet = (res, error) => {
  console.error(error);
  res.status(500).jsonp({
    success: false,
    error,
  });
};

// 登录
router.get('/user/login', ({ query }, res) => {
  const { username, password } = query;
  db.user.findOne({ username }, 'password', (err, doc) => {
    switch (true) {
      case !!err:
        errorRet(res, err);
        break;
      case !doc:
        successRet(res, {
          isSuccess: false,
          message: '账号不存在',
        });
        break;
      case doc.password === password:
        res.cookie('userId', doc._id);
        res.cookie('user', username);
        successRet(res, {
          isSuccess: true,
          message: '登陆成功',
        });
        break;
      case doc.password !== password:
        successRet(res, {
          isSuccess: false,
          message: '密码错误',
        });
        break;
      default:
        successRet(res, {
          isSuccess: false,
          message: '未知错误',
        });
    }
  });
});

// 注册
router.post('/user/register', ({ body }, res) => {
  const { username, password } = body;
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
            res.send(successRet({
              isSuccess: false,
              message: '注册失败',
            }));
          } else {
            res.send(successRet({
              isSuccess: true,
              message: '注册成功',
            }));
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

router.get('/user/queryUser', (req, res) => {
  db.user.find({}, (error, doc) => {
    if (error) {
      console.log(error);
      successRet(res, {
        isSuccess: false,
        message: '查询失败',
      });
    } else {
      successRet(res, {
        isSuccess: true,
        message: '操作成功',
        retValue: doc,
      });
    }
  });
});

// 新增编辑文章
router.get('/article/manageArticle', ({ query, cookies }, res) => {
  const {
    name, type, operationCode, content,
  } = query;
  const {
    userId,
  } = cookies;
  if (!userId) {
    successRet(res, {
      isSuccess: false,
      message: '请先登录',
    });
  } else {
    db.article.create({
      name,
      type,
      content,
      autherId: userId,
      status: operationCode === 'add' ? 'released' : 'saved',
    }, (error, doc) => {
      if (error) {
        successRet(res, {
          isSuccess: false,
          message: '操作失败',
        });
      } else {
        successRet(res, {
          isSuccess: true,
          retValue: {
            id: doc._id,
          },
          message: '操作成功',
        });
      }
    });
  }
});

router.get('/article/queryArticle', ({ query }, res) => {
  const {
    queryVo = '{}', current, pageSize,
  } = query;
  const {
    name, type, updateDateRange = [], status,
  } = JSON.parse(queryVo);
  const reg = new RegExp(name || '', 'i');
  const q = { name: { $regex: reg } };
  if (type) {
    q.type = type;
  }
  if (status) {
    q.status = status;
  }
  if (updateDateRange.length) {
    db.article
      .find(q)
      .where('updateTime').gt(updateDateRange[0]).lt(updateDateRange[1])
      .then((doc) => {
        const total = doc.length;
        const d = doc.splice((current - 1) * pageSize, current * pageSize);
        successRet(res, {
          isSuccess: true,
          message: '操作成功',
          retValue: {
            data: d,
            current: Number(current),
            pageSize: Number(pageSize),
            total,
          },
        });
      })
      .catch(() => {
        successRet(res, {
          isSuccess: false,
          message: '查询失败',
        });
      });
  } else {
    db.article
      .find(q)
      .then((doc) => {
        const total = doc.length;
        const d = doc.splice((current - 1) * pageSize, current * pageSize);
        successRet(res, {
          isSuccess: true,
          message: '操作成功',
          retValue: {
            data: d,
            current: Number(current),
            pageSize: Number(pageSize),
            total,
          },
        });
      })
      .catch(() => {
        successRet(res, {
          isSuccess: false,
          message: '查询失败',
        });
      });
  }
});

module.exports = router;
