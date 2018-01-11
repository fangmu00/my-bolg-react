const crypto = require('crypto');

module.exports = {
  createToken(obj, timeout) {
    const obj2 = {
      data: obj, // payload
      created: parseInt(Date.now() / 1000, 10), // token生成的时间的，单位秒
      exp: parseInt(timeout, 10) || 3, // token有效期
    };

    // payload信息
    const base64Str = Buffer.from(JSON.stringify(obj2), 'utf8').toString('base64');

    // 添加签名，防篡改
    const secret = 'sunguo520';
    const hash = crypto.createHmac('sha256', secret);
    hash.update(base64Str);
    const signature = hash.digest('base64');

    return `${base64Str}.${signature}`;
  },

  decodeToken(token) {
    if (!token) {
      return false;
    }
    const decArr = token.split('.');
    if (decArr.length < 2) {
      // token不合法
      return false;
    }

    let payload = {};
    // 将payload json字符串 解析为对象
    try {
      payload = JSON.parse(Buffer.from(decArr[0], 'base64').toString('utf8'));
    } catch (e) {
      return false;
    }

    // 检验签名
    const secret = 'sunguo520';
    const hash = crypto.createHmac('sha256', secret);
    hash.update(decArr[0]);
    const checkSignature = hash.digest('base64');

    return {
      payload,
      signature: decArr[1],
      checkSignature,
    };
  },
  checkToken(token) {
    const resDecode = this.decodeToken(token);
    if (!resDecode) {
      return false;
    }

    // 是否过期
    const expState = !((parseInt(Date.now() / 1000, 10) - parseInt(resDecode.payload.created, 10)) > parseInt(resDecode.payload.exp, 10));
    if (resDecode.signature === resDecode.checkSignature && expState) {
      return true;
    }

    return false;
  },

};
