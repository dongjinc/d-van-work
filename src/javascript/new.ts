function objectFactory() {
  const obj = {},
    constructor = [].shift.call(arguments);
  //  @ts-ignore
  obj.__proto__ == constructor.prototype;
  const ret = constructor.call(obj, arguments);
  return typeof ret === "object" ? ret : obj;
}

const _new = function () {
  var Constructor = [].shift.call(arguments);
  // 1. 创建一个对象，这个对象要继承与构造函数的原型对象
  var obj = Object.create(Constructor.prototype);
  // 2. 执行这个构造函数
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" ? ret || obj : obj;
};

// https://fecommunity.github.io/front-end-interview/%E7%BC%96%E7%A8%8B%E9%A2%98%E4%B8%8E%E5%88%86%E6%9E%90%E9%A2%98/3.new%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.html

function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}
const array = [1, 2, 3, 4];
async function process() {
  for (let i of array) {
    const result = doSomething(i);
    console.log(result);
  }
}
process();


onst asyncItems = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.asyncIterator]() {
        const items = this
        const keys = Object.keys(items)
        const len = keys.length
        let pointer = 0
        return {
            next() {
                const done = pointer >= len
                const value = !done ? items[keys[pointer++]] : undefined;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({value, done})
                    }, 1000)
                }) 
            }
        }
    }
}

const asyncItems = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]() {
        const items = this
        const keys = Object.keys(items)
        const len = keys.length
        let pointer = 0
        return {
            next() {
                const done = pointer >= len
                const value = !done ? items[keys[pointer++]] : undefined;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({value, done})
                    }, 1000)
                }) 
            }
        }
    }
}
async function process(array) {
  for await (let i of asyncItems) {
    console.log(i)
  }
}
process()