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
 * ** 在ts里成员都默认为public
 */
class Animal3 {
    public name: string;
    public constructor(theName: string){
        this.name = theName;
    }
    public move(distanceInMeters: number){
        console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
}
// **private 当成员标记成private时，就不能在声明它的类外部访问
class Animal4 {
    private name: string;
    constructor(theName: string){
        this.name = theName
    }
}
// new Animal4("Cat").name error name是私有的
// **比较带有private或protected成员的类型时候。
// **其中一个类型里包含一个private成员，那么只有当另外一个类型中也存在这样的private成员，并且它们都是来自同一处声明时
// **私有属性不能在派生类中访问
class Animal5 {
    private name: string;
    constructor(theName: string){
        this.name = theName
    }
}
class Rhino extends Animal5 {
    constructor(){
        super("Rhino")
    }
}
class Employee {
    private name: string;
    constructor(theName: string){
        this.name = theName
    }
}
let animal = new Animal5("Goat")
let rhino = new Rhino()
let employee = new Employee("Bob")

animal = rhino
// animal = employee error Types have separate declarations of a private property 'name'.
// 尽管employee里有一个私有成员name，但它明显不是Animal5里面定义的那个

// protected
// protected成员在派生类中仍然可以访问
class Person {
    protected name: string
    constructor(name: string){
        this.name = name
    }
}
class Employee1 extends Person {
    private department: string;
    constructor(name: string, department: string){
        super(name)
        this.department = department
    }
    public getElevatorPitch(){
        return `Hello, my name is ${this.name} and i work in ${this.department}`
    }
}
let howard = new Employee1('Howard', "Sales")
console.log(howard.getElevatorPitch())
// console.log(howard.name) error 不能在Person类外使用name，但我们仍然可以通过Employee的实例方法访问

// **构造函数也可以标记成protected，意味着这个类不能在包含它的类外被实例化，但是能被继承

class Person1 {
    protected name: string
    protected constructor(theName: string){
        this.name = theName
    }
}
class Employee2 extends Person1 {
    private department: string;
    constructor(name: string, department: string){
        super(name)
        this.department = department
    }
    public getElevatorPitch(){
        return `Hello, my name is ${this.name} and i work in ${this.department}`
    }
}
let howard1 = new Employee2("Howard", "sales")
// let john = new Person1("John") error Person1的构造函数是被保护的

// protected
// 1.派生类中可以访问
// 2.构造函数可以标记为protected。意味着这个类不能实例化
// 3.外部可以通过派生类的实例方法访问

// private
// 1.派生类中无法访问

// readonly修饰符
// readonly关键字将属性设置为只读的。
// **只读属性必须在声明时或构造函数里被初始化
// 参数属性
class Octopus {
    readonly numberOfLegs: number = 8;
    // **参数属性可以方便地让我们在一个地方定义并初始化一个成员
    constructor(readonly name: string){}
}
// **仅在构造函数里使用readonly name: string参数来创建和初始化name成员。把声明和赋值合并在一处
// **通过给构造函数参数前面添加一个访问限定符来声明。private、public、protected

// 存取器
class Employee3 {
    fullName: string
}
let employee1 = new Employee3()
employee1.fullName = "Bob Smith"
if(employee1.fullName){
    console.log(employee1.fullName)
}
// 使用get/set
let passcode = "secret passcode"
class Employee4 {
    private _fullName: string;
    get fullName(): string{
        return this._fullName
    }
    set fullName(newName: string){
        if(passcode && passcode === 'secret passcode'){
            this._fullName = newName
        }
        else {
            console.log('error')
        }
    }
}
let employee2 = new Employee4()
employee2.fullName = "Bob smith"
if(employee2.fullName){
    console.log(employee2.fullName)
}
// **存取器要求编译器输出ECMScript5或更高，不支持降级到ECMScript3
// **只带有get不带有set的存取器自动被推断为readonly
// **从代码生成.d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许改变它的值

// 静态属性
// **对于类的实例成员 仅当类被实例化的时候才会被初始化的属性。
// **对于静态成员，存在与类本身上面而不是类的实例上。
class Grid {
    static origin = {x: 0, y: 0}
    calculateDistanceFromOrigin(point: {x: number; y: number}){
        let xDist = (point.x - Grid.origin.x)
        let yDist = (point.y - Grid.origin.y)
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
    }
    constructor(public scale: number){}
}
let grid1 = new Grid(1.0)
let grid2 = new Grid(5.0)
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}))

// 抽象类
// **抽象类作为其他派生类的基类使用。一般不会直接被实例化
// **不同于接口，抽象类可以包含成员的实现细节
// **abstract关键字是用于定义抽象类和抽象类内部定义抽象方法。不同于接口
abstract class Animal6 {
    abstract makeSound(): void;
    move(): void{
        console.log('roaming then earch...')
    }
}

// **抽象类中的抽象方法不包含具体实现，并且必须在派生类中实现。
// **抽象方法必须包含abstract关键字并且可以包含访问修饰符
abstract class Department {
    constructor(public name: string){}
    printName(): void {
        console.log(`Department name: ${this.name}`)
    }
    abstract printMeeting(): void // 必须在派生类中实现
}
class AccountingDepartment extends Department {
    constructor(){
        super("Accounting and Auditing") // 派生类的构造函数中必须调用super()
    }
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.')
    }
    generateReports(): void {
        console.log('Generating accounting ..')
    }
}
let department: Department
// department = new Department() error 不能创建一个抽象类的实例
department = new AccountingDepartment()
department.printName()
department.printMeeting()
// department.generateReports() error 方法在声明的抽象类中不存在

/**
 * 高级技巧
 */