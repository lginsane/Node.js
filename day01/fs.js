const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'})
  // 1、创建文件夹
  // fs.mkdir('./files',{ recursive: true }, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.end('创建成功')
  // })
  // 2、创建文件(无内容)
  // fs.writeFile('./files/file.html', (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.end('创建成功')
  // })
  // 3、创建文件(有内容)
   // fs.writeFile('./files/file2.html', 'Node.js中文网', 'utf8', (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.end('创建成功')
  // })
  // 4、读取文件
  // fs.readFile('./files/file3.html', (err, data)=> {
  //   if (err) {
  //     throw err;
  //   }
  //   res.end(data)
  // })
  // 5.1、查询某个文件夹下面的所有文件
  // fs.readdir('./files',(err, files) => {
  //   if (err) {
  //     throw err;
  //   }
  //   var fileArr = [];
  //   (function callback(i) {
  //     if (i === files.length) {
  //       console.log(fileArr)
  //       res.end(JSON.stringify(fileArr))
  //       return
  //     };
  //     fs.stat('./files/'+ files[i] , (err, stats) => {
  //       if (err) {
  //         throw err;
  //       }
  //       if (stats.isDirectory()) {
  //         fileArr.push(files[i])
  //       }
  //       callback(i+1)
  //     })
  //   })(0)
  // })
  // 5.2.查询某个文件夹下面的所有文件
  var fileArr = [];
  let files = fs.readdirSync('./files')
  files.forEach(file => {
    let stats = fs.lstatSync('./files/'+file)
    if (stats.isDirectory()) {
      fileArr.push(file)
    }
  });
  console.log(fileArr)
  res.end()
})
server.listen(3000, '127.0.0.1')