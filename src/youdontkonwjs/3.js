/**
 * 3.对象
 */
// 3.1 语法 对象可以通过两种形式定义

// 3.2类型

// 内置对象
var strPrimitive = "i am a string";
typeof strPrimitive; // string
strPrimitive instanceof String; // false

var strObject = new Object("i am a string");
typeof strObject; // object
strObject instanceof String; // true
Object.prototype.toString.call(strObject); // [object String]

// 3.3 内容
var myObject = {
  a: 2,
};
myObject.a; // 2 - 属性访问
myObject["a"]; // 2 - 健访问

var myObject = {};
myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"]; // foo
myObject["3"]; // bar
myObject["[object Object]"]; // baz

var prefix = "foo";
var myObject = {
  [prefix + "bar"]: "hello",
  [prefix + "baz"]: "world",
};
myObject["foobar"]; // hello
myObject["foobaz"]; // world

function foo() {
  console.log("foo");
}
var someFoo = foo;
var myObject = {
  someFoo: foo,
};

//即使在对象以文字形式声明一个函数表达式，这个函数也不会"属于"这个对象--它们只是对于相同函数对象的多个引用
var myObject = {
  foo: function () {
    console.log("foo");
  },
};
var someFoo = myObject.foo;
someFoo;
myObject.foo;

// 3.3.3 数组
var myArray = ["foo", 42, "bar"];
myArray.length;
myArray[0];

var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
myArray.length; // 3

var myArray = ["foo", 42, "bar"];
myArray["3"] = "baz";
myArray.length; // 4

function anotherFunction() {}
var anotherObject = {
  c: true,
};
var anotherArray = [];
var myObject = {
  a: 2,
  b: anotherObject,
  c: anotherArray,
  d: anotherFunction,
};
anotherArray.push(anotherObject, myObject);
// 首先判断是否是浅复制还是深复制
// 深复制不可以复制相互引用的对象，会造成死循环

var newObj = Object.assign({}, myObject);

newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true

// 3.3.5 属性描述符
var myObject = {
  a: 2,
};
Object.getOwnPropertyDescriptor(myObject, "a");

var myObject = {};
Object.defineProperty(myObject, "a", {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true,
});

("use strict");
var myObject = {};
Object.defineProperty(myObject, "a", {
  value: 2,
  writable: false, // 不可写
  configurable: true,
  enumerable: true,
});
myObject.a = 3; // TypeError: Cannot assign to read only property 'a' of object
myObject.a;
