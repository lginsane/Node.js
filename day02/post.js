var http = require('http');
var querystring = require('querystring');
http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  // 设置请求权限
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'})
  if (req.url === '/user/update' && req.method === 'POST') {
    var dataAll = '';
    req.on('data',(chunk) => {
      dataAll += chunk
    })
    req.on('end', () => {
      var dataObj = querystring.parse(dataAll)
      res.write(JSON.stringify(dataObj))
      res.end()
    })
  } else {
    var dataObj = JSON.stringify({
      msg: '暂无此接口',
      code: 500,
      data: {}
    })
    res.end(dataObj)
  }
}).listen(8080, '192.168.0.101')