// function* genNumbers(n) {
//   for (let i = 1; i < n; i++) {
//     yield i;
//   }
//   return "ok";
// }

// const gen = genNumbers(10);
// while (true) {
//   const ret = gen.next();
//   console.log(ret);
//   if (ret.done) {
//     break;
//   }
// }
// console.log("done");

function* genNumbers(n) {
  for (let i = 1; i < n; i++) {
    yield i;
  }
  return "ok";
}
const gen = genNumbers(10);
function test() {
  const ret = gen.next();
  if (ret.done) {
    console.log(ret);
  } else {
    setTimeout(() => {
      test();
    }, 200);
  }
}
test();
console.log("done");

function isPromise(p) {
  return p && typeof p.then === "function" && p.catch === "function";
}
function coroutine(genFn) {
  return function () {
    return new Promise((resolve, reject) => {
      const gen = genFn.apply(null, arguments);
      let ret;
      function next(value?: any) {
        ret = gen.next(value);

        if (ret.done) {
          return resolve(ret.value);
        } else {
          if (!isPromise(ret.value)) {
            new TypeError("you may error!");
          }
          ret.value.then(next).catch(reject);
        }
      }
      next();
    });
  };
}

// 一个协程中调用另一个协程
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

yieldPromise(function* () {
  var v1 = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Hello");
    }, 1500);
  });

  console.warn(v1);

  var v2 = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("World");
    }, 1500);
  });

  console.warn(v2);
});

function yieldPromise(generator) {
  var iterator = generator();
  console.log(iterator, "nk");
  recursiveCore.call(iterator, "1");
}

function recursiveCore(feedback) {
  var iterator = this,
    result = iterator.next(feedback);
  if (result.done) {
    return;
  }
  var promise = result.value;
  Promise.resolve(promise).then((v) => {
    recursiveCore.call(iterator, v);
  });
}

var arr = [
  {
    name: "q",
    a: 1,
    b: 2,
  },
  {
    name: "qw",
    a: 2,
    b: 4,
  },
  {
    name: "qwe",
    a: 1,
    b: 2,
  },
];
const obj = {};
for (let i = 0; i < arr.length; i++) {
  const key = arr[i].a + "+" + arr[i].b;
  if (obj[key]) {
    obj[key].name = obj[key].name + "," + arr[i].name;
  } else {
    obj[key] = arr[i];
  }
}
