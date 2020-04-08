var http = require('http')
var path = require('path')
http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'})
  // 获取路径后缀名
  let suffix = path.extname(req.url)
  res.end(suffix)
}).listen(3000, '127.0.0.1')