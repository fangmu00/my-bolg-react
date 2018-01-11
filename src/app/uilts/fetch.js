import nattyFetch from 'natty-fetch';
import { message } from 'antd';

const Fetch = {};
const urlMaps = {}; // 用于存放url映射
// nattyFetch.setGlobal({
//   urlPrefix: '//127.0.0.1:8090/',
// });

const context = nattyFetch.context({
  urlPrefix: '//127.0.0.1:8090/',
});

const request = (method, key, params = {}, { showError = true }) => {
  context.create({
    [key]: {
      url: urlMaps[key],
      method: method === 'JSONP' ? 'GET' : method,
      jsonp: method === 'JSONP',
    },
  });
  return context.api[key](params).then((content) => {
    if (showError && content.isSuccess === false) {
      message.error(content.message);
      if (content.errorCode && content.errorCode === -1) { // 未登录
        window.location.href = '/Login';
      }
    }
    return content;
  }).catch((error) => {
    message.error(error);
  });
};

Fetch.set = (o) => {
  Object.keys(o).forEach((item) => {
    urlMaps[item] = o[item];
  });
};

Fetch.get = (key, params, options = {}) => request('GET', key, params, options);

Fetch.post = (key, params, options = {}) => request('POST', key, params, options);

Fetch.jsonp = (key, params, options = {}) => request('JSONP', key, params, options);

export default Fetch;
