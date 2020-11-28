var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if(path === '/' || path=== '/index.html'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        const  string = fs.readFileSync('./public/index.html')
        response.write(string)
        response.end()
    } else if(path === '/xiaoznz.js'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync("./public/xiaoznz.js"))
        response.end()
    }else if (path === '/friends.json'){
        // 重新复习一遍CORS和JSONP
        // 首先是CORS,我们需要两个不同的服务器
        // response.statusCode = 200;
        // response.setHeader('Content-Type','text/json,charset="utf-8"')
        // response.setHeader('Access-Control-Allow-Origin',"*")
        // response.write(fs.readFileSync("./public/friends.json"))
        // response.end()
        // 用CORS的方法就实现了
        // 此时用JSONP再来实现一遍
        // 此时应该注意到，JSON是不能直接通过普通的协议获得的，于是我们用js绕过他来获得，我们先写一个friends.js
    }else if (path === '/friends.js'){
        response.statusCode = 200;
        response.setHeader('Content-Type','charset="utf-8"')
        const data = fs.readFileSync('./public/friends.json')
        let string = `window.xxx({{data}})`.replace('{{data}}',data).replace('xxx',query.callback)
        response.write(string)
        response.end()
    }
    else{
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)