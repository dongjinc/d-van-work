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
setTimeout(() => {
  console.log("timeout1");
  Promise.resolve().then(() => {
    console.log("promise1");
  });
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
// 微任务 Promise(async) process.nextTick(优先级高)
// node中的任务比较

// 1.比较setImmediate 和setTimeout的执行顺序
// 两者执行顺序不固定
setTimeout((_) => console.log("setTimeout")); // timer周期
setImmediate((_) => console.log("setImmediate")); // check周期

// 2.如果两者都在一个poll阶段注册，那么执行顺序就能确定。
const fs = require("fs");
fs.readFile("./index.html", () => {
  setTimeout((_) => console.log("setTimeout"));
  setImmediate((_) => console.log("setImmediate"));
});
