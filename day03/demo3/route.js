const url = require('url')
const path = require('path')
const fs = require('fs')

let G = {
    _get: {},
    _post: {},
    staticPath: 'static'
}

// send
function changeRes(res) {
    res.send = (data) => {
        res.writeHead(200, {
            'Content-type': 'text/html;charset="utf-8"'
        })
        res.end(data)
    }
}

// Content-type 对应表
function getMime(extname) {
    const mimeObj = {
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.html': 'text/html'
    }
    return mimeObj[extname] || 'text/html'
}


function initStatic(req, res, staticPath) {
    let pathname = url.parse(req.url).pathname
    pathname = pathname === '/' ? '/index.html' : pathname
    let extname = path.extname(pathname)
    try {
        const data = fs.readFileSync(`./${staticPath}${pathname}`)
        if (data) {
            let mine = getMime(extname)
            res.writeHead(200, {
                'Content-type': `${mine};charset="utf-8"`
            })
            res.end(data)
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

let server = () => {
    const app = function (req, res) {
        // 扩展res.send方法
        changeRes(res)
        // 静态资源路径
        // 如果是静态资源就不往下进行，防止多次res.end()报错问题
        if (initStatic(req, res, G.staticPath)) return
    
        if (req.url === '/favicon.ico') {
            return
        }
        let pathname = url.parse(req.url).pathname
        let method = req.method.toLowerCase()
        if (G['_' + method][pathname]) {
            if (method === 'get') {
                G['_' + method][pathname](req, res)
            } else {
                let postData = '';
                req.on('data', (chunk) => {
                    postData += chunk
                })
                req.on('end', () => {
                    req.body = postData
                    G['_' + method][pathname](req, res)
                })
            }
        } else {
            res.writeHead(404, {
                'Content-type': 'text/html;charset="utf-8"'
            })
            res.end('404页面')
        }
    }
    app.get = (path, cb) => {
        G._get[path] = cb
    }
    
    app.post = (path, cb) => {
        G._post[path] = cb
    }
    
    app.static = (staticPath) => {
        G.staticPath = staticPath
    }
    return app
}

module.exports = server()
