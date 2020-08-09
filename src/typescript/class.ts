/**
 * 1.对象的set和get方法 es5和es6
 * 2.匿名函数和函数表达式
 * 3.class 两种写法
 * 4.类静态方法是无法继承的
 * 5.es6没有明确定义静态属性
 * 6.es6私有属性(#)和方法(_)
 * 8.new.target 构造函数
 * Function.name
 * 
 * es5和es6实现创建实例
 * 静态方法
 * constructor方法
 * 实例属性其他写法
 * 类的实例
 * 实现私有方法
 * 取值函数和存值函数 set 和 get
 * class表达式
 */

/**
 * 私有方法
 */
 const _func2 = () => {}
 class Point {
     func1(){
         _func2.call(this)
     }
 }

 /**
  * 类
  * 传统的js程序使用函数和基于原型的继承来创建可重用的组件。
  * ECMScript2015 也就是ECMScript6开始，可以使用基于类的面向对象的方式
  */
//  声明一个Greeter类。greeting属性、构造函数和greet方法
class Greeter {
    greeting: string;
    constructor(message: string){
        this.greeting = message
    }
    greet(){
        return "Hello, " + this.greeting
    }
}
let greeter = new Greeter('world')

/**
 * 继承
 * **基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类
 */
// 类从基类继承了属性和方法
// Dog是一个派生类。派生自Animal基类。通过extends关键字
// **派生类通常被称作子类。基类通常被称作超类
 class Animal1 {
     move(distanceInMeters: number = 0){
         console.log(`Animal moved ${distanceInMeters}`)
     }
 }
class Dog extends Animal1{
    bark(){
        console.log(`Woof Woof !`)
    }
}
const dog = new Dog()
dog.bark()

class Animal2 {
    name: string;
    constructor(theName: string){
        this.name = theName
    }
    move(distanceInMeters: number = 0){
        console.log(`${this.name} moved ${distanceInMeters}`)
    }
}
class Snake extends Animal2 {
    constructor(name: string){
        super(name)
    }
    move(distanceInMeters = 5){
        console.log("Slithering...")
        super.move(distanceInMeters)
    }
}

class Horse extends Animal2 {
    // 与前一个例子不同点是，派生类包含了构造函数
    // **必须调用super()。会执行基类的构造函数，在构造函数里访问this的属性之前，一定调用super()
    constructor(name: string){
        super(name)
    }
    move(distanceInMeters = 45){
        console.log("Galloping...")
        super.move(distanceInMeters)
    }
}
let sam = new Snake("Sammy the Python")
let tom: Animal2 = new Horse("Tommy the Palomino")
sam.move()
tom.move(34)

/**
 * 公共、私有与受保护的修饰符
 */