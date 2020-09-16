const Router = require("koa-router")


//获取数据
var db = require("../models/todoList")

const router = new Router({
    prefix: '/api'
});


router.post("/todoList", async (ctx, next) => {
    // ctx.body = "this is add"

    console.log('接收到的参数', ctx.request.body)

    //增加数据
    ctx.body = {
        ok: 1,
        data: await db.add(ctx.request.body)
    }
})


router.get("/todoList", async (ctx, next) => {
    // ctx.body = "this is db"
    // let ret = await todoListDb.get()
    // console.log("--->",ret)
    ctx.body = await db.get()
})



router.delete("/todoList/:id", async (ctx, next) => {
    
    console.log('接收到 delete 请求',ctx.params)
    // ctx.body = "this is delete"
    
    ctx.body = {
        ok:1,
        data:await db.deleteById(ctx.params.id || 0)
    }
})


router.put("/todoList", async (ctx, next) => {
    // ctx.body = "this is add"

    console.log('put 接收到的参数', ctx.request.body)

    // ctx.body = "this is put"

    //修改数据
    ctx.body = {
        ok: 1,
        data: await db.modify(ctx.request.body._id || 0,ctx.request.body)
    }
})


module.exports = router;