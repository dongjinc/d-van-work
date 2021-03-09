https://mp.weixin.qq.com/s/1KPGlsLlzKH2E8gpRZ1Rdg
这 7 道关于 this 的面试题，你能答对几个？

原创 前端小混混 前端先锋 今天
收录于话题 #精通 JavaScript 55 #面试题 2

// 每日前端夜话 第 493 篇
// 正文共：13 字
// 预计阅读时间：8 分钟
图片
在 JavaScript 中，this 是函数调用上下文。正是由于 this 的行为很复杂，所以在 JavaScript 面试中，总是会问到有关 this 的问题。

做好的准备面试的方法是练习，所以本文针对 this 关键字整理了 7 个有趣的面试。

注意：下面的 JavaScript 代码以非严格模式运行。

1：变量与属性

以下代码输出什么：

const object = {
message: 'Hello, World!',

getMessage() {
const message = 'Hello, Earth!';
return this.message;
}
};

console.log(object.getMessage()); // => ?
答案：

输出：'Hello, World!'

object.getMessage() 是方法调用，这就是为什么方法中的 this 等于 object 的原因。

方法中还有一个变量声明 const message ='Hello，Earth!'，该变量不会影响 this.message 的值。

2：猫的名字

以下代码输出什么：

function Pet(name) {
this.name = name;

this.getName = () => this.name;
}

const cat = new Pet('Fluffy');

console.log(cat.getName()); // => ?

const { getName } = cat;
console.log(getName()); // =>?
答案：

输出：'Fluffy' 和 'Fluffy'

当一个函数被当作构造函数调用时（ new Pet('Fluffy') ），构造函数内部的 this 等于构造的对象。

Pet 构造函数中的 this.name = name 表达式在构造的对象上创建 name 属性。

this.getName = () => this.name this.getName =（）=> this.name 在构造的对象上创建方法 getName。因为使用了箭头函数，所以箭头函数中的 this 等于外部作用域中的 this ，也就是构造函数 Pet。

调用 cat.getName() 和 getName() 会返回表达式 this.name，其结果为 'Fluffy'。

3：延迟输出

以下代码输出什么：

const object = {
message: 'Hello, World!',

logMessage() {
console.log(this.message); // => ?
}
};

setTimeout(object.logMessage, 1000);
答案：

延迟 1 秒钟后，输出：undefined

尽管 setTimeout() 函数使用 object.logMessage 作为回调，但仍把 object.logMessage 作为常规函数而非方法调用。并且在常规函数调用中 this 等于全局对象，在浏览器环境中是 window。这就是 logMessage 方法内的 console.log(this.message) 输出 window.message 的原因，后者是 undefined。

挑战：怎样修改这段代码使其输出 'Hello, World!'？在下面的评论中写出你的解决方案\*

4：补全代码

补全代码，使结果输出 "Hello，World!" 。

const object = {
message: 'Hello, World!'
};

function logMessage() {
console.log(this.message); // => "Hello, World!"
}

// Write your code here...
答案：

至少有 3 种方式可以把 logMessage() 作为对象上的方法调用。任何一个都被看作是正确答案：

const object = {
message: 'Hello, World!'
};

function logMessage() {
console.log(this.message); // => 'Hello, World!'
}

// 使用 func.call() 方法
logMessage.call(object);

// 使用 func.apply() 方法
logMessage.apply(object);

// 使用函数绑定
const boundLogMessage = logMessage.bind(object);
boundLogMessage();
5：问候与告别

以下代码输出什么：

const object = {
who: 'World',

greet() {
return `Hello, ${this.who}!`;
},

farewell: () => {
return `Goodbye, ${this.who}!`;
}
};

console.log(object.greet()); // => ?
console.log(object.farewell()); // => ?
答案：

输出：'Hello, World!' 和 'Goodbye, undefined!'

当调用 object.greet() 时，在方法 greet() 内部 this 的值等于 object，因为 greet 是常规函数。所以 object.greet() 返回 'Hello，World！'。

但是 farewell() 是一个箭头函数，所以箭头函数中 this 的值总是等于外部作用域的 this。farewell() 的外部作用域是全局作用域，其中 this 是全局对象。所以 object.farewell() 实际上会返回 'Goodbye, ${window.who}!' ，其结果为 'Goodbye, undefined!'。

6：棘手的 length

以下代码输出什么：

var length = 4;
function callback() {
console.log(this.length); // => ?
}

const object = {
length: 5,
method(callback) {
callback();
}
};

object.method(callback, 1, 2);
答案：

输出：4

使用 method() 内部的常规函数调用来调用 callback() 。因为在常规函数调用期间的 this 值等于全局对象，所以在 callback() 函数中 this.length 为 window.length。

位于最外层的第一个语句 var length = 4 在全局对象上创建了属性 length，所以 window.length 变为 4。

最后，在 callback() 函数内部，``this.length的值为window.length，最后输出4`。

7：调用参数

以下代码输出什么：

var length = 4;
function callback() {
console.log(this.length); // 输出什么
}

const object = {
length: 5,
method() {
arguments[0]();
}
};

object.method(callback, 1, 2);
答案：

输出：3

obj.method(callback, 1, 2) 用了 3 个参数进行调用：callback、1 和 2。结果 method() 内的 arguments 特殊变量是有以下结构的类似数组的对象：

{
0: callback,
1: 1,
2: 2,
length: 3
}
因为 arguments[0]() 是对 arguments 对象上 callback 的方法调用，所以 callback 内部的 this 等于 arguments。结果在 callback() 内部的 this.length 与 arguments.length 是相同的，都是 3
