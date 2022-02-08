const url = require('url')
const path = require('path')
const fs = require('fs')

const getMime = function(extname) {
    const mimeObj = {
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.html': 'text/html'
    }
    return mimeObj[extname] || 'text/html'
}

exports.static = function(req, res, staticPath) {
    let pathname = url.parse(req.url).pathname
    pathname = pathname === '/' ? '/index.html' : pathname
    let extname = path.extname(pathname)
    if (req.url !== '/favicon.ico') {
        try {
            const data = fs.readFileSync(`./${staticPath}${pathname}`)
            let mine = getMime(extname)
            res.writeHead(200, {
                'Content-type': `${mine};charset="utf-8"`
            })
            res.end(data)
        } catch (error) {
            res.writeHead(404, {
                'Content-type': 'text/html;charset="utf-8"'
            })
            res.end('404页面')
        }
    }
}
