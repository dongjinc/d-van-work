// 函数式编程
// 1.思维 范畴论
// 使用函数编程
function test(){}
if(true){
    test()
}

// 函数必须总是接受一个参数、函数必须返回一个值 
// 什么是高阶组件？

// 函数式编程解释
// 1.函数是一等公民。可以赋值给其他变量、也可以作为参数，传入另一个函数，或者作为别的函数的返回值
// 2.不可改变量
// 3.map reduce最常用的函数式编程的方法
// 特点：
// 1.函数是一等公民
// 2.只用表达式，不用语句
// 3.没有“副作用”
// 4.不修改状态
// 5.引用透明

// 纯函数 对于相同的输入，永远会得倒相同的输出，没有任务可观察的副作用，也不依赖于外部环境的状态  
// Array.slice 是纯函数 没有副作用，对于固定的输入，获取固定输出

// 纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如缓存

// 偏应用函数 
// 带一个函数参数和该函数的部分参数
const partial = (f, ...args) => (...moreArgs) => f(...args, ...moreArgs)
const add3 = (a, b, c) => a+b+c
// 偏应用`2`和`3`到`add3`给你一个单参数的函数
const fivePlus = partial(add3, 2, 3)
fivePlus(4)
// bind实现
const add1More = add.bind(null, 2, 3)

// 1.柯里化是偏应用的一种
const checkage = min => (age => age > min)
const checkage18 = checkage(18)
checkage18(20)
// 柯里化之前
function add(x, y){
    return x + y
}
add(1, 2)
// 柯里化之后
function addX(y){
    return function(x){
        return x + y;
    }
}
addX(2)(1)

const curry = (fn, arr =[]) => (...args) => (arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg))([...arr, ...args])
let curryTest = curry((a,b,c,d) => a+b+c+d)
curryTest(1,2,3)(4)
// 事实上，柯里化是一种“预加载”函数的方法，通过传递较少的参数，得倒一个已经记住了这些参数的新函数。某种意义上讲，这是一种对参数的“缓存”


// 反柯里化
Function.prototype.uncurring = function(){
    const self = this;
    return function(){
        // 参数一次性都吃掉
        const obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments)
    }
}
const push = Array.prototype.push.uncurring(), obj = {}
push(obj, "first", "two")
console.log(obj)

// ---  49.43

// 函数的柯里化code
function foo(p1,p2){
    this.val = p1 + p2
}
var bar = foo.bind(null, "p1");
var baz = new bar("p2")
console.log(baz.val)

/**
 * 函数组合
 * 纯函数以及如何把它柯里化写出的洋葱代码 h(g(f(x)))
 * 为了解决函数嵌套的问题，需要用到"函数组合"
 */
const compose = (f, g) => (x => f(g(x)))
const first = arr => arr[0]
const reverse = arr => arr.reverse()
const last = compose(first, reverse)
last([1,2,3,4,5])

/**
 * 函数组合子
 * 辅助组合子
 * 谓语组合子
 * 其他
 * 分属于SKI组合子
 */
/**
 * 把一些对象自带的方法转化成纯函数，不要命名转瞬即逝的中间变量
 * str作为中间变量，这个中间变量除了让代码变得长了一点以外是毫无疑义的
 */
const f = str => str.toUpperCase().split(' ');

// 帮助我们减少不必要的命名，可以复用
const toUpperCase = word => word.toUpperCase()
const split = x => (str => str,split(x))
const f = compose(split(' '), toUpperCase)
f("abcd efghg")

/**
 * 命令式
 * 通过编写一条又一条指令去让计算机执行一些动作，一般都会涉及到很多繁杂的细节
 */
let ceos = [];
for(let i = 0; i < companies.length; i++){
    ceos.push(companies[i].Ceo)
}
/**
 * 声明式
 * 通过写表达式的方式来声明我们想干什么，而不是通过一步步的指示
 */
let ceos = companies.map(c => c.Ceo)

 /**
  * 惰性链、惰性求值、惰性函数
  */

  /**
   * 专业术语
   * 高阶函数、尾调用优化PTC、闭包
   * 容器、Functor
   * 错误处理、Either、AP
   * IO
   * Monad
   */

//  高阶函数 - 函数当参数，把传入的函数做一个封装，然后返回这个封装函数，达到更高程度的抽象
// 一等公民、函数作为参数、以一个函数作为返回结果
/**
 * 命令式
 */
const add = function(a, b){
    return a + b;
}
function math(func, array){
    return func(array[0], array[1])
}
math(add, [1,2])

// 尾调用优化
/**
 * 指函数内部的最后一个动作是函数调用自己
 * 1.尾递归判断标准最后一步是否调用自身，而不是 是否在函数的最后一行调用自身
 * 最后一行调用其他函数，并返回叫尾调用
 * 2.尾递归调用调用栈永远都是更新当前的栈帧而已，这样就完全避免了爆栈的危险。但如今的浏览器并未完全支持
 * 原因有两点：1.引擎层面消除递归是一个隐式的行为，程序员意识不到。 2.堆栈信息丢失了 开发者难以调试
 * 蹦床函数 trampoline 避免递归
 */

//  范畴与容器
