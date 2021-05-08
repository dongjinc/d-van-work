/**
 * 箭头函数与普通函数区别
 * 1.外形不同
 */
// 普通函数
function func() {
  // coo
}
// 箭头函数
let funca = () => {
  // coo
};
/**
 * 箭头函数全是匿名函数
 * 普通函数既可以匿名、也可以具名函数
 */
// 具名
function func1() {}
// 匿名
let func2 = function () {};

/**
 * 箭头函数不能用于构造函数
 * 普通函数可用于构造函数，以此创建对象实例
 */

/**
 * 箭头函数中的this指向不同
 * 普通函数，this指向它调用的对象，用作构造函数this指向创建对象的实例
 */

/**
 * 箭头函数不具有arguments对象
 */

/**
 * 箭头函数没有prototype属性
 */

/**
 * 通过call、apply调用
 * 由于箭头函数没有自己的this指针，通过call()或apply()方法调用一个函数时，只能传递
 * 参数（不能绑定this），他们的第一个参数会被忽略。对于bind方法同样成立
 */

var adder = {
  base: 1,
  add(a) {
    const f = (v) => v + this.base;
    return f(a);
  },
  addThruCall(a) {
    const f = function (v) {
      // @ts-ignore
      return v + this.base;
    };
    var b = {
      base: 2,
    };
    return f.call(b, a);
  },
};
console.log(adder.addThruCall(1));
function alove() {}
