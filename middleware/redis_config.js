

const redis = require("redis");                           //nodejs 驱动 redis 的库
const redisClient = redis.createClient(6379,"127.0.0.1"); //创建redis客户端


var wrapper = require('co-redis');          //co-redis 用于对 redis库的函数进行promise 包装。原来的是回调函数的形式
var clientPromise = wrapper(redisClient);

const redisStore = require('koa-redis');  //用来把 转换后的 redis 的promise接口 转换成 store 接口

module.exports = {
    store:redisStore({clientPromise}),
    client:redisClient
}