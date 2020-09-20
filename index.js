const koa = require("koa")
const app = new koa();

//引入koa-session配置文件
require("./middleware/koa_session_config.js")(app)



// 可以 通过 ctx.request.body  获取请求的数据
const koaBody = require('koa-body')
app.use(koaBody());

// 路由初始化
app.use(require("./routers/todoList").routes())
app.use(require("./routers/login").routes())

//检查是否登陆，若没有登陆，改写url到登陆界面
app.use(async (ctx, next) => {
    console.log('访问的网址：', ctx.url)
    // let name = ctx.cookies.get("user");
    let name = ctx.session.user;
    console.log("当前登陆的用户名:", name);
    if (name == undefined) {
        ctx.url = '/login.html'
    }
    await next();
})

// 静态资源初始化
const staticServer = require("koa-static")
app.use(staticServer(__dirname + "/public"))

//输入不存在的页面，重定向
app.use((ctx, next) => {
    console.log('ctx.status',ctx.status)
    if (404 != ctx.status) return;
    ctx.redirect('/');
})

// 数据库初始化
require("./models/mongoose")
// var todoListDb = require("./todoList")
app.listen(3000)