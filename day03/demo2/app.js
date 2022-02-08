// 仿express
const http = require('http')
const app = require('./route')

http.createServer(app).listen(3000)

app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html;charset="utf-8"'
    })
    res.end('首页')
})

app.get('/login', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html;charset="utf-8"'
    })
    res.end('登录')
})
