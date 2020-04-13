var http = require('http');
var url = require("url");
http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  // 设置请求权限
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'})
  var pathname = url.parse(req.url, true).pathname

  if (pathname === '/user/create' && req.method === 'GET') {
    var parames = url.parse(req.url, true).query
    res.end(JSON.stringify(parames))
  } else {
    var dataObj = JSON.stringify({
      msg: '暂无此接口',
      code: 500,
      data: {}
    })
    res.end(dataObj)
  }
}).listen(8080, '192.168.0.101')