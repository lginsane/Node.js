const url = require('url')
let G = {

}
const app = function(req, res) {
    if (req.url === '/favicon.ico') {
        return
    }
    let pathname = url.parse(req.url).pathname
    if (G[pathname]) {
        G[pathname](req, res)
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html;charset="utf-8"'
        })
        res.end('404页面')
    }
}
app.get = (path, cb) => {
    G[path] = cb
}
module.exports = app
