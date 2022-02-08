// 仿express
const http = require('http')
const ejs = require('ejs')
const app = require('./route')

http.createServer(app).listen(3000)

app.static('public')

app.get('/', (req, res) => {
    res.send('首页')
})

app.get('/login', (req, res) => {
    ejs.renderFile('./login.ejs',{},(err,data) => {
        res.send(data)
    })
   

})

app.post('/doLogin', (req, res) => {
    res.send(req.body)
})
