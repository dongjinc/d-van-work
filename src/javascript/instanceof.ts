// 1.typeof 操作符唯一目的就是检查数据类型
/**
 * 基本类型
 * typeof undefined === "undefined"  undefined
 * typeof true === "boolean"   -- Boolean
 * typeof 1 === "number"  -- Number
 * typeof '1' === "string" --- String
 * typeof BigInt(9007199254740991) === 'bigint'  --- BigInt
 * typeof Symbol(12) === "symbol"  --- Symbol
 * typeof null === "object"
 * 引用类型
 * typeof Object(Object、Array、Map、Set)  === "object"
 * typeof Function === "function"
 */
// 使用typeof来判断引用类型变量，无论是什么类型的变量，都会返回Object，为此引入了instanceof

/**
 * 2.instanceof
 * instanceof 与typeof相比，instanceof方法要求开发者明确的确认对象为某特定类型。
 * 即 instanceof用于判断引用类型属于哪个构造函数的方法
 * 按照instanceof的逻辑，真正决定类型的是prototype，而不是构造函数
 */

const arr1 = [];
arr1 instanceof Array; // true

// instanceof 操作符检测过程中也会将继承考虑在内，所以instanceof可以在继承关系中用来判断一个实例是否属于它的父类型

function myInstanceOf(left, right) {
  if (typeof left !== "object" || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

// 原始值的instanceof
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === "string";
  }
}

/**
 * 3.Object.prototype.toString
 * 可以利用这个方法对一个变量的类型来进行比较准确的判断
 * 任何一个对象调用Object原生的toString方法都会返回"[object type]"，其中type是对象的类型
 */
const objectDelcare = {};
console.log(objectDelcare);
console.log(objectDelcare.toString());

/**
 * [[Class]]
 * 每个实例都有一个[[Class]]属性，这个属性制定了上述字符串中type(构造函数名)
 * [[Class]]不能直接被访问的，但通常可以间接地通过在这个值上借用默认的Object.prototype.toString.call()
 */

function generator(type) {
  return function (value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  };
}
const isFunction = generator("Function");

/**
 * Symbol.toStringTag
 * 可以使用这个特殊的对象属性进行自定义输出type类型
 */
const bottle = {
  [Symbol.toStringTag]: "Bottle",
};
console.log(Object.prototype.toString.call(bottle)); // [object Bottle]

/**
 * 大部分和环境相关的对象也有这个属性。
 */
console.log(window[Symbol.toStringTag]); // window

// instanceof在涉及多层类结构的场合中比较实用，这种情况下需要将类的继承关系考虑在内

// null为什么被typeof错误的判断为了 "object"
/**
 * 在javascript最初的视线中，javascript中的值是由一个表示类型的标签和实际数据值表示的。
 * 对象的类型标签是0，由于null代表的空指针(大多数平台下的值为0x00)，因此null的类型标签为0
 * 曾又一个ECMAScript的修复提案（通过选择性加入的方式），但被拒绝了，该提案会导致type null === 'null'
 */
