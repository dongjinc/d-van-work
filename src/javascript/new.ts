// @ts-nocheck
/**
 * new运算符 创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
 * 1.访问构造函数属性
 * 2.访问原型属性
 */
function objectFactory() {
  const obj = {},
    constructor = [].shift.call(arguments);
  //  @ts-ignore
  obj.__proto__ == Object.create(constructor.prototype);
  const ret = constructor.apply(obj, arguments);
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
const __new = function () {
  const obj = {};
  const constructor = [].shift.call(arguments);
  obj.__proto__ = Object.create(constructor.prototype);
  const result = constructor.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
};
