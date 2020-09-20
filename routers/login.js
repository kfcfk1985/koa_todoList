const Router = require("koa-router")


const router = new Router({
    prefix: '/api/log'
});



router.post("/in", async (ctx, next) => {
    console.log('\n\r接收到的参数', ctx.request.body)

    var date = new Date();
    console.log("当前系统时间:", date);

    let obj = ctx.request.body;
    // ctx.cookies.set("user", obj.name, {
    //     maxAge: 24 * 60 * 60 * 1000 //cookie 有效时间，1天.需要转化为毫秒单位
    // })

    ctx.session.user = obj.name;


    //增加数据
    ctx.body = {
        ok: 1,
        data: "login sueecss"
    }
})


router.get("/out", async (ctx, next) => {

    //设置 user 的值为null，就可以cookie中的 user 
    // ctx.cookies.set( "user", null )
    // ctx.cookies.set( "user.sig", null )

    ctx.cookies.set( "koa.sess", null )
    ctx.cookies.set( "koa.sess.sig", null )
    
    delete ctx.session.user;

    ctx.body = {
        ok: 1,
        data: "logout  sueecss"
    }
})


router.get("/getUser",
    (ctx, next) => {
        // let name = ctx.cookies.get("user");
        let name = ctx.session.user;
        console.log("当前登陆的用户名:", name);
        if (name == undefined) {
            ctx.body = {
                ok: -1,
                data: "没有登陆，没有权限"
            }
        }else{
            next()
        }
    },
    async (ctx, next) => {
        // let name = ctx.cookies.get("user");
        let name = ctx.session.user;
        ctx.body = {
            ok: 1,
            data: `当前登陆的用户是:${name}`
        }
    })

module.exports = router;