/**
 * this全面解析
 */
/**
 * 2.2 绑定规则
 */
// 默认绑定
function foo(){
    console.log(this.a) // 2
}
var a = 2;
foo()

"use strict";
function foo(){
    console.log(this.a) // 2
}
var a = 2;
foo()

function foo(){
    console.log(this.a) // 2
}
var a = 2;

(function(){
    "use strict";
    foo()
})()

// 隐式绑定
function foo(){
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
}
console.log(obj.foo()) // 2

function foo(){
    console.log(this.a)
}
const obj2 = {
    a: 42,
    obj: foo
}
const obj1 = {
    a: 2,
    obj2: obj2
}
obj1.obj2.obj() // 42

function foo(){
    console.log(this.a)
}
const obj = {
    a: 2,
    foo: foo
}
const bar = obj.foo
const a = "oops，globals"
bar() // oops，globals

function foo(){
    console.log(this.a)
}
function doFoo(fn){
    fn()
}
var obj = {
    a: 2,
    foo
}
var a = "oops，globals";
doFoo(obj.foo) // oops，globals

// 显示绑定
function foo(){
    console.log(this.a)
}
var obj = {
    a: 2
}
foo.call(obj) // 2

// 1.硬绑定
function foo(){
    console.log(this.a)
}
var obj = {
    a: 2
}
var bar = function(){
    foo.call(obj)
}
setTimeout(bar, 10) // 2
// 硬绑定的bar不可能再修改它的this
bar.call(window) // 2

function foo(something){
    console.log(this.a, something)
    return this.a + something
}
var obj = {
    a: 2
}
var bar = function(){
    return foo.apply(obj, arguments)
}
var b = bar(3)
console.log(b) // 5

function foo(something){
    console.log(this.a, something)
    return this.a + something
}
function bind(fn, obj){
    return function(){
        return fn.apply(obj, arguments)
    }
}
var obj = {
    a: 2
}
var bar = bind(foo, obj)
console.log(bar(3)) // 5

function foo(el){
    console.log(el, this.id)
}
var obj = {
    id: "awesome"
};
// 调用foo是会把this绑定到obj
[1,2,3].forEach(foo, obj) // 1 "awesome" 2 "awesome" 3 "awesome" 
//  new绑定
function Foo(a){
    this.a = a
}
var bar = new Foo(2)
console.log(bar.a) // 2


// 隐式绑定与显式绑定优先级
function foo(){
    console.log(this.a)
}
var obj1 = {
    a: 2,
    foo
}
var obj2 = {
    a: 3,
    foo
}
obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2) // 3
obj2.foo.call(obj1) // 2

function foo(something){
    this.a = something
}
var obj1 = {
    foo
}
var obj2 = {
}

obj1.foo(2) 
console.log(obj1.a) // 2
obj1.foo.call(obj2, 3)
console.log(obj2.a) // 3
var bar = new obj1.foo(4);
console.log(obj1.a) // 2
console.log(bar.a) // 4

function foo(something){
    this.a = something
}
var obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2
var baz = new bar(3)
console.log(obj1.a) // 2 obj1并没有被修改，bind在被new过程中改变this指向
console.log(baz.a) // 3

function foo(p1, p2){
    this.val = p1 + p2
}
var bar = foo.bind(null, "p1")
var baz = new bar("p2")
console.log(baz.val) // p1p2


function foo(){
    console.log(this.a)
}
var a = 2;
foo.call(null) // 2

function foo(a,b){
    console.log("a:" + a, "b:"+ b)
}
console.log(foo.apply(null, [2, 3]))
var bar = foo.bind(null, 2)
bar(3)

function foo(a,b){
    console.log("a:" + a, "b:"+ b)
}
var dmz = Object.create(null)
foo.apply(dmz, [2, 3])
var bar = foo.bind(dmz, 2)
bar(3)

function foo(){
    console.log(this.a)
}

var a = 2;
var o = {a: 3, foo}
var p = {a: 4}
o.foo() // 3
(p.foo = o.foo)() //2

// 软绑定
Function.prototype.softBind = function(obj){
    var fn = this;
    var curried = [].slice.call(arguments, 1)
    var bound = function(){
        return fn.apply(
            (!this || this === window)? obj: this,
            curried.concat.apply(curried, arguments)
        )
    }
    bound.prototype = Object.create(fn.prototype)
    return bound
}

function foo(){
    console.log("name: " + this.name)
}
var obj = {
    name: 'obj'
},
obj2 = {name: 'obj2'},
obj3 = {name: 'obj3'};
var fooOBJ = foo.softBind(obj);
fooOBJ()  // name: obj

obj2.foo  = foo.softBind(obj)
obj2.foo()// name: obj2

fooOBJ.call(obj3) // name: obj3

setTimeout(obj2.foo, 10) // name: obj -- 应用了软绑定


// 箭头函数词法作用域
function foo(){
    return a => {
        // this继承自foo
        console.log(this.a)
    }
}
var obj1 = {
    a: 2
}
var obj2 = {
    a: 3
}
// foo()内部创建的箭头函数会捕获调用时foo()的this.
var bar = foo.call(obj1) // 由于foo的this会绑定到obj1，bar引用的箭头函数的this也会绑定到obj1，箭头函数的绑定无法被修改(new也不可以)
bar.call(obj2) // 2

function foo(){
    setTimeout(() => {
        // this在词法上会继承foo
        console.log(this.a)
    }, 10)
}
var obj = {
    a: 2
}
foo.call(obj) // 2

function foo(){
    var self = this;
    setTimeout(() => {
        console.log(self.a)
    }, 10)
}
var obj = {
    a: 2
}
foo.call(obj) // 2