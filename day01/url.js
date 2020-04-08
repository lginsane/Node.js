const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  res.writeHead(200, {'Content-Type':'application/json'})
  // 将路径转化为对象
  // 默认第二个参数为false  query属性为字符串
  let urlObj1 = url.parse(req.url)
  // 第二个参数设置 true   query属性为对象
  let urlObj2 = url.parse(req.url, true)
  console.log(urlObj1)
  console.log(urlObj2)
  res.write(JSON.stringify(urlObj1))
  res.end()
}).listen(3000, '127.0.0.1')