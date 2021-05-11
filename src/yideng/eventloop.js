// 1.
setTimeout(() => {
  console.log("timeout");
}, 0);

const promise = new Promise((resolve) => {
  console.log("promise init");
  resolve(1);
  console.log("promise end");
});

promise.then((res) => {
  console.log("promise result", res);
});

// 2.宏任务微任务交错执行
setTimeout(async () => {
  console.log("timeout1");
  await Promise.resolve().then(() => {
    console.log("promise1");
  });
  console.log("rpm");
}, 0);
Promise.resolve().then(() => {
  console.log("promise2");
  setTimeout(() => {
    console.log("timeout2");
  }, 0);
});

/**
 * prmise2;
 * timeout1;
 * promise1;
 * timeout2;
 */
// 3.
async function fn() {
  //   1.return await 1234; //mdn 默认会转换成Promise.reslove(1234)
  //   return Promise.resolve(1234);
  //   2.如果返回一个对象，会调用对象中的then方法
  return {
    then(reslove) {
      reslove({
        then(r) {
          // 遇到thenable会递归使用promise.then 调用
          // 直到resolve返回值是一个基础类型。
          r(1);
        },
      });
    },
  };
}
fn().then((res) => {
  console.log(res);
});

// 4.
async function async1() {
  console.log("async1 start");
  //   await async2();
  //   console.log("async1 end");
  // await 中的方法与下列方式实现一样
  const result = await new Promise((resolve) => {
    console.log("async2");
    resolve();
  });
  console.log("end");
  //   .then((res) => console.log("async2 end"));
}
// async function async2() {
//   console.log("async2");
// }
async1();
console.log("script");

// 5.没有reslove或reject
async function async1() {
  console.log("async1 start");
  await new Promise((resolve, reject) => {
    console.log("promise1");
    // 如果不执行resolve或执行reject 下面代码是不会打印出来
    // reject();
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("script start");
async1().then((res) => console.log(res));
console.log("script end");

// 6.某大厂面试题
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise1");
  resolve();
})
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  })
  .then(() => {
    console.log("promise4");
  });
console.log("script end");

// 7.resolve处理thenable，也会包裹一层promise
// async本身会返回一个promise
async function async1() {
  console.log("async1 start");
  return new Promise((resolve) => {
    // resolve 处理 thenable 也会再包裹一层 promise
    resolve(async2());
  }).then(() => {
    console.log("async1 end");
  });
}
// async 本身也会返回 promise 导致顺序的关键问题
function async2() {
  console.log("async2");
  return 1;
}
setTimeout(() => {
  console.log("setTimeout");
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise3");
  resolve();
})
  .then(() => {
    console.log("promise5");
  })
  .then(() => {
    console.log("promise6");
  })
  .then(() => {
    console.log("promise7");
  });

// nodejs任务队列
// 宏任务 setTimeout setInterval setImmediate IO
// 微任务 Promise(async) process.nextTick(优先级高，
// 每一次清空微任务列表的时候，都是先执行process.nextTick)

// 什么是事件循环
// nodejs处理非阻塞I/O操作的机制

/**
 * Timers类型的宏任务队列
 * setTimeout()
 * setInterval()
 * Check类型的宏任务队列
 * setImmediate()
 * close callback类型的宏任务队列
 * socket.on('close', () => {})
 * poll类型的宏任务队列
 * 除了上面几种的其他所有回调
 * 读取文件
 */

// node中的任务比较

// 1.比较setImmediate 和setTimeout的执行顺序
/**
 * node并不能保证timers在预设事件到了就会立即执行
 * 因为node对timers的国旗检查不一定靠谱，它会受及其上其他运行程序影响，或者那个时间点主线程不空闲
 * 虽然setTimeout延时为0，一般情况node把0会设置为1ms，当node准备eventloop的时间大于1ms时
 * 进入timers阶段时，setTimeout已经到期，则会先执行setTimeout
 * 反之，若进入timers阶段用时小雨1ms，setTimeout尚未到期，则会错过timers阶段，先进入check阶段，执行setImmediate
 */
// 两者执行顺序不固定
setTimeout((_) => console.log("setTimeout")); // timer周期
setImmediate((_) => console.log("setImmediate")); // check周期

// 2.如果两者都在一个poll阶段注册，那么执行顺序就能确定。
// 此时setTimeout和setImmediate都是写在I/O callbacks中的，这意味着
// 我们处于poll阶段，然后是check阶段，此时无论setTimeout到期多那么迅速，都会先执行setImmediate
// 本质上是因为，我们从poll阶段开始执行
const fs = require("fs");
fs.readFile("./index.html", () => {
  setTimeout((_) => console.log("setTimeout"));
  setImmediate((_) => console.log("setImmediate"));
});

// 理解process.nextTick
// 每一个阶段执行完成之后，在当前阶段尾部触发nextTick
// 案例：常见的nodejs回调函数第一个参数，都是抛出的错误
function apiCall(arg, callback) {
  if (typeof arg !== "string") {
    // 之所以放在nextTick是因为防止主线程崩掉。
    return process.nextTick(
      callback,
      new TypeError("argument should be string")
    );
  }
}

// 比较process.nextTick 和 setImmediate
// process.nextTick() 同一个阶段尾部立即执行
// setImmediate() 在事件循环的check阶段触发

setImmediate(() => {
  console.log("setImmediate");
});
process.nextTick(() => {
  console.log("nextTick");
});

/**
 * 不同node版本中的Eventloop
 * node11版本之前
 * 一旦执行一个阶段，会先将这个阶段里的所有任务执行完成之后，才会执行该阶段剩下的微任务
 * node11版本之后(浏览器行为保持了一致)
 * 一旦执行一个阶段里的一个宏任务，就立刻执行对应的微任务队列
 */
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(() => {
    console.log("promise1");
  });
}, 0);

setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(() => {
    console.log("promise2");
  });
}, 0);

/**
 *node11版本之前
 timer1
 timer2
 promise1
 promise2
 node11版本之后
 timer1
 promise1
 timer2
 promise2
 */

setImmediate(() => console.log("immediate1"));
setImmediate(() => {
  console.log("immediate2");
  Promise.resolve().then(() => console.log("promise resolve"));
});
setImmediate(() => console.log("immediate3"));
setImmediate(() => console.log("immediate4"));

/**
 node11版本之前
  immediate1
  immediate2
  immediate3
  immediate4
  promise resolve
 node11版本之后
  mmediate1
  immediate2
  promise resolve
  immediate3
  immediate4
 */

setImmediate(() => console.log("immediate1"));
setImmediate(() => {
  console.log("immediate2");
  process.nextTick(() => console.log("next tick"));
});
setImmediate(() => console.log("immediate3"));
setImmediate(() => console.log("immediate4"));

/**
 node11版本之前
  immediate1
  immediate2
  immediate3
  immediate4
  next tick
 node11版本之后
  mmediate1
  immediate2
  next tick
  immediate3
  immediate4
 */

// 学习下node eventloop
// process.nextTick
