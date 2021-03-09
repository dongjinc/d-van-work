/**
 * 1.变量 var 在函数内是不会提升的
 * 2.tdz暂时性死区
 */
// var a = 20
// (function(){
//     console.log(1)
// })()
// 1.变量、函数提升 
// 变量提升  es3 - es5
/**
 * 1.es3 - es5 没有块作用域，只有函数作用域下，函数内定义的var不会提升到函数外。但{}块内定义的var变量、函数会提升到块外部。即使if(false){}内定义的变量和函数，也会进行提升
 * 2.
 */
alert(a);
a();
var a = 3;
function a(){
    alert(10)
}
alert(a);
a = 6;
a()

// a 会提升括号外
if(false){
    var a = 20;
}
console.log(a)
// a 不会提升到函数外
function yideng(){
    // 会提升到函数的顶端
    var a = 20;
}

// 包裹在外部的函数就是一个闭包

// 外部a不会影响块内的a
var a = 3
{
    a = 5
    console.log(a)
    let a 
}


{
    function init(){}
}
console.log(init) // 可以拿到


{
    function init(){}
    init = 3
}
console.log(init) // init 


{
    // 不同浏览器 结果不一样  *** 特殊 如何解释
    init = 4;
    function init(){}
    init = 3;
}
console.log(init) // 4


{
    let init = function init(){}
}
console.log(init) // 

function fn(){
    console.log('out')
}
if(false){
    function fn(){
        console.log('inner')
    }
}
fn() // 

function fn(){
    console.log('out')
}
function init(){
    // var fn 声明提出
    if(false){
        function fn(){
            console.log('inner')
        }
    }
    fn() // is not function
}
init() // 

"use strict";
function fn(){
    console.log('out')
}
function init(){
    // var fn 声明提出
    if(false){
        function fn(){
            console.log('inner')
        }
    }
    fn() // is not function
}
init() // 严格模式是不同的 


// ------------

var x = 1, y = 0,z = 0;
function add(x){
    return (x = x + 1);
}
y = add(x)
console.log(y) // 4
function add (x){ // 提升 函数名会被覆盖
    return (x = x + 3);
}
z = add(x)  
console.log(z)


// ------ this   EcmaScript核心知识专辑  48分钟

this.a = 20;
var test = {
    a: 50,
    init: function(fn){
        // function go(){
        //     console.log(this.a) // window
        // }
        var go = () => {console.log(this.a)}
        go()  // 50
    }
}



this.a = 20;
function go(){ // 构造函数
    console.log(this.a);
    this.a = 30;
}
go.prototype.a = 40;
var test = {
    a: 50,
    init: function(fn){
        fn();
        console.log(this.a);
        return fn
    }
}
console.log(new go().a); // 30
test.init(go)
var p = test.init(go)
p()


/** -------- */
// 严格模式 必须出现在具体函数内部，而不是放在执行函数上面。 严格模式不允许this指向全局对象（函数内部）
var num = 1;
function yideng(){
    'use strict';
    console.log(this.num++)
}
function yideng2(){
    console.log(++this.num)
}
(function(){
    'use strict';  // 不会生效
    yideng2()
})()



// 按址传递 按值传递
// 引用传递 是按 址传递    1.34.50
function test(m){
    m = {v: 5}; // 址 重写了 
}
var m = {k: 30};
test(m)
console.log(m.v)


/** ----- class */
class Car{
    constructor(color){
        this.color = color
    }
    static yideng = '京城一灯🍎';
}
class BWM extends Car{
    constructor(){
        super() // 继承父类方法
    }
}

function Car(color){
    this.color = color;
}
Car.myname = '京城一灯🍎'; // 静态属性
Car.prototype.x = function (){
    console.log('父类方法')
}
function BWM(color){
    Car.call(this, color)
}
// 1.按引用传递，子类改变会影响父类
// BWM.prototype = Car.prototype; //
// 2.父类会执行两遍，call和new
// BWM.prototype = new Car();
// 3.会有几率导致__proto重写
// var __proto = Object.create(Car.prototype)
// __proto.constructor = BWM // 修订constructor
// BWM.prototype = __proto
BWM.prototype = Object.create(Car.prototype, {
    constructor: {
        value: BWM,
        writeable: false
    },
    test: {
        value: function(){}
    }
})
const staticKeys = Object.entries(Car)
for(const [key, value] of staticKeys){
    BWM[key] = value
}

var bwm = new BWM()


// 1.54.01

// 多看重构书
10 - 98/10


// 
var regex = /yideng/g
console.log(regex.test('yideng'));
console.log(regex.test('yideng'));
console.log(regex.test('yideng'));
console.log(regex.test('yideng'));

function cloneReg(target, isDeep){
    var regFlag = /\w*$/;
    var result = new target.constructor(target.source, regFlag.exec(target))
    if(isDeep){
        result.lastIndex = 0
    } else [
        result.lastIndex = result.lastIndex
    ]
}


// 块作用域
var yideng = function yideng(){
    // 函数内，与函数名相同的标识符是改变不了的，因为是只读的
    yideng = 1
    console.log(typeof yideng) // function
}
yideng()

// window.length iframe 数量
// Atomics 锁线程 
var length = 10;
function fn(){
    console.log(this.length)
}
var yideng = {
    length: 5,
    method: function(fn){
        fn();
        console.log(arguments) // 特殊 ** 可研究 this指向 arguments
        arguments[0]()
    }
}
yideng.method(fn, 1)

// v8回收 1.设为null 2.weakMap


// 克隆
const allocUnsafe = Buffer?Buffer.allocUnsafe: undefined;
function cloneBuffer(buffer, isDeep){
    if(!isDeep){
        return buffer.slice()
    }
    const length = buffer.length
    result = allocUnsafe? allocUnsafe(length): new buffer.constructor(length)
    return result
}

const buf = Buffer.from('laoyuan');
// const buf2 = buf;
const buf2 = cloneBuffer(buf, true)
buf2.write('nodejs')
buf2.write('22')
console.log('buf', buf.toString('utf-8'))
console.log('buf2', buf2.toString('utf-8'))
//  正则与buffer 最难clone