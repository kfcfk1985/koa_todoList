const koa = require("koa")
const app = new koa();

// 可以 通过 ctx.request.body  获取请求的数据
const koaBody = require('koa-body')
app.use(koaBody());


// 路由初始化
app.use(require("./routers/todoList").routes())


// 静态资源初始化
const staticServer = require("koa-static") 
app.use(staticServer(__dirname+"/public"))


// 数据库初始化
require("./models/mongoose")
// var todoListDb = require("./todoList")



app.listen(3000)




