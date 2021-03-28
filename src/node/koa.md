Node.js 不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞 I/O、事件驱动机制，让 Node.js 程序宏观上也是并行的。

express 是 nodejs 基础框架，主要基于 connect 中间件，并且自身封装了路由(需要配合 bodyParser)，弊端 callback 回调方式
koa 使用 node 新特性的中间件框架。几乎所有功能都需要由第三方中间件完成，比如 koa-router、koa-view。
koa 利用 co 作为底层运行框架，利用 generator 的特性，实现"无回调"的异步处理

异步流程控制

- express 采用 callback 来处理异步
- koa1 采用 generator
- koa2 采用 async/await

中间件处理
express 中 app.use 是往中间件数组中塞入新的中间件，中间件处理方式是线性的，next 过后继续寻找下一个中间件
koa 中间件处理方式是一个洋葱模型
当 koa 处理中间件遇到 await next()的时候会暂停当前中间件进而处理下一个中间件，最后再回过头来继续处理剩下的任务
