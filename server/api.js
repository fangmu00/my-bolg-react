const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./db');
const token = require('./token');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, './uploads'));
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    const mimetype = ['image/jpeg'];
    const type = ['jpg'];
    cb(null, `${Date.now()}.${type[file.mimetype.indexOf(mimetype)]}`);
  },
});
const upload = multer({ storage });
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

const upsert = (model, data, f) => {
  if (!data._id) {
    model.create(data, f);
  } else {
    const { _id: id } = data;
    delete data._id;
    model.findOneAndUpdate({ _id: id }, data, f);
  }
};


const easyRequest = (url, fn) => {
  router.get(url, (...arg) => {
    const params = arg[0].query;
    fn(params, ...arg);
  });
  router.post(url, (...arg) => {
    const params = arg[0].body;
    fn(params, ...arg);
  });
};

// router.use('/*.json', (req, res, next) => {
//   if (req.path.indexOf('/user/login') === -1 && req.path.indexOf('/article/getArticleDetail') === -1 && req.path.indexOf('/file-upload') === -1) {
//     const {
//       blogToken,
//     } = req.cookies;
//     if (token.checkToken(blogToken)) {
//       next();
//     } else {
//       successRet(res, {
//         isSuccess: false,
//         message: '请重新登录',
//         errorCode: -1,
//       });
//     }
//   } else {
//     next();
//   }
// });

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
      {
        const t = token.createToken({
          iss: 'sunguo',
          name: doc.username,
          id: doc._id,
        }, 15 * 60);
        res.cookie('blogToken', t, { maxAge: 900000 });
        res.cookie('name', username, { maxAge: 900000 });
        successRet(res, {
          isSuccess: true,
          message: '登陆成功',
        });
        break;
      }

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

// 注册
router.get('/user/cearteAdmin', (req, res) => {
  db.user.create({
    username: 'admin',
    password: '123456',
  }, (error) => {
    if (error) {
      successRet(res, {
        isSuccess: false,
        message: '注册失败',
      });
    } else {
      successRet(res, {
        isSuccess: true,
        message: '注册成功',
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
    name, type, operationCode, content, id,
  } = query;
  const {
    blogToken,
  } = cookies;
  const _token = token.decodeToken(blogToken);

  const updateData = {
    _id: id,
    name,
    type,
    operationCode,
    content,
    updateTime: new Date().getTime(),
    status: operationCode === 'add' ? 'released' : 'saved',
    autherId: _token.payload.id,
  };
  upsert(db.article, updateData, (error, doc) => {
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
        message: operationCode === 'saved' ? '保存成功' : '操作成功',
      });
    }
  });
});

// 获取文章详情
router.get('/article/getArticleDetail', ({ query }, res) => {
  const {
    id,
  } = query;
  if (!id) {
    successRet(res, {
      isSuccess: false,
      message: '参数错误',
    });
  } else {
    db.article.findOne({ _id: id }, null, (err, doc) => {
      if (err) {
        successRet(res, {
          isSuccess: false,
          message: '操作失败',
        });
      } else {
        const {
          _id,
          content,
          type,
          name,
          updateTime,
        } = doc;
        successRet(res, {
          isSuccess: true,
          retValue: {
            id: _id,
            content,
            type,
            name,
            updateTime,
          },
          message: '操作成功',
        });
      }
    });
  }
});

// 删除文章
router.get('/article/removeArticle', ({ query }, res) => {
  const {
    id,
  } = query;
  if (!id) {
    successRet(res, {
      isSuccess: false,
      message: '参数错误',
    });
  } else {
    db.article.remove({ _id: id }, (err) => {
      if (err) {
        successRet(res, {
          isSuccess: false,
          message: '操作失败',
        });
      } else {
        successRet(res, {
          isSuccess: true,
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
      .sort({ updateTime: 'desc' })
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
      .sort({ updateTime: 'desc' })
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

router.post('/file-upload', upload.single('file'), (req, res) => {
  successRet(res, {
    isSuccess: true,
    retValue: req.file,
    message: '操作成功',
  });
});

module.exports = router;
