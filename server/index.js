const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const resolve = file => path.resolve(__dirname, file);
const api = require('./api');

app.set('port', (process.env.port || 8090));
app.use(bodyParser.json());

// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
// 处理静态文件
app.use(express.static(path.join(__dirname, '../dist')));
app.use(api);
app.get('*', (req, res) => {
  const html = fs.readFileSync(resolve('../dist/index.html'), 'utf-8');
  res.send(html);
});

const server = app.listen(app.get('port'), () => {
  const address = server.address();
  const { address: host, port } = address;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);
});

