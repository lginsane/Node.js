const http = require('http');
// 创建服务器服务
const server = http.createServer((req, res) => {
  // 响应头
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=UTF-8'
  });
  res.write('<strong>hello world!</strong>');
  res.end()
})
server.listen(3000, '127.0.0.1')