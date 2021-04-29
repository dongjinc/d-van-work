// @ts-nocheck
class Koa {
  constructor() {
    this.middiles = [];
  }
  use(ctx) {
    this.middiles.push(ctx);
  }
  callback() {
    const fn = compose(this.middiles);
    this.handleRequest(fn);
  }
  handleRequest(middiles) {
    return middiles().then(() => {
      console.log("over");
    });
  }
}
/**
 * @param {string} middiles
 * @returns 1
 */
function compose(middiles) {
  return function (context, next) {
    return dispatch(0);
    function dispatch(i) {
      let fn = middiles[i];
      if (i === middiles.length) fn = next;
      if (!fn) return Promise.resolve();
      console.log(fn);
      // try {
      // return Promise.resolve(fn(context, dispatch.bind(null, i + i)));
      // } catch (err) {
      //   return Promise.reject(err);
      // }
    }
  };
}

const app = new Koa();
app.use(async (ctx, next) => {
  console.log(1);
  await next();
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
});

app.callback();

console.log(app.middiles);

async function promise1() {
  console.log(1);
  await promise2();
  console.log(2);
}

async function promise2() {
  console.log(3);
  await promise3();
  console.log(4);
}

async function promise3() {
  console.log(3);
}
promise1();

function koaPromise(ctx, next) {}
