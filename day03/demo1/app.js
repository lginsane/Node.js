const http = require('http')
const routes = require('./routes')


http.createServer((req, res) => {
    routes.static(req, res, 'day03/demo1/static')
    
}).listen(3000)

console.log('http://127.0.0.1:3000/')
