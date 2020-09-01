// 类型推论
// https://juejin.im/post/6844903981227966471
// https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html#%E4%B8%80%E4%B8%AA%E6%9C%89%E8%B6%A3%E7%9A%84%E9%97%AE%E9%A2%98
/**
 * 1.基础
 **/
let x2 = 3 ;
// 变量x类型被推断为数字。
// **推断发生在 初始化变量和成员、设置默认参数值、函数返回值

/**
 * 最佳通用类型
 * 多类型联合
 *  **计算通用类型算法会考虑所有的候选类型，给出一个兼容所有候选类型（number|null）的类型
 *  **候选类型并非一面盖全
 */
let x3: number[] = [0, 1, null]
// 下面例子中如果想要推断Animal类型。但数组没有对象是Animal10类型，因此不能推断出这个结果
class Elephant{}
type Animal10 = Rhino | Elephant

let zoo: Animal10[] = [new Rhino(), new Elephant()]
/**
 * 3.上下文类型
 * **如果window未找到，可通过配置tsconfig.json lib库，引入DOM
 * 通过左边类型推断出右边类型
 * **上下文归类，通过包含函数的参数，赋值表达式的右边、类型断言、对象成员和数组字面量、返回值
 */
window.onmousedown = (mouseEvent) => {
    console.log(mouseEvent); //<- OK
  };


/**
 * 类型兼容性
 * 基于结构子类型。结构类型是一种只使用其成员来描述类型的方式
 * 名义类型与结构类型
 * **在基于名义类型的类型系统中，数据类型的兼容性或等价性通过明确声明和类型名称决定
 * **而结构类型基于类型的组成结构，且不要求明确地声明
 */
interface Named{
    name: string
}
class Person2 {
    name: string
}
let p: Named
// 其类型必须相同
p = new Person2();
// 因为JS广泛地使用匿名对象。函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好
// **关于可靠型的注意：ts允许某些在编译阶段无法确认其安全性的操作

/**
 * **ts结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性
 */
interface Named1 {
    name: string
}
let x5: Named1
let y = {name: 'Alice', location: 'Seattle'}
x5 = y
// **这里要检查y是否能赋值给x，编辑器检查x中的每个属性，看能否在y中找到对应属性
// **检查函数参数时使用相同的规则
function greet(n: Named1){}
greet(y)

/**
 * 比较两个函数
 * 比较过程时递归进行的，检查每个成员以及子成员
 */
// 1.函数比较
let x4 = (a: number) => 0
let y4 = (b: number, s: string) => 0
y4 = x4 // 忽略额外参数   x每个参数必须能在y里找到
// **这里要检查x每个参数必须能在y里找到对应类型的参数。注意参数名字相同与否不重要，只看其类型
// x4 = y4 y有必须的第二个参数，但x没有
let items = [1,2,3]
items.forEach((item, index, array) => console.log(item))
// 可以省略额外参数
items.forEach(item => console.log(item))
// 2.返回值比较
let x6 = () => ({name: 'Alice'})
let y6 = () => ({name: 'Alice', location: 'Seattle'})
x6 = y6 // ** x的属性能否在y中找到 与函数参数与字面量赋值一样
// y6 = x6 lacks a location property
// **函数比较 与返回值和字面量比较不一样

/**
 * 需要理解
 * 函数参数双向斜变
 * 比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功
 */
// 协变（Covariant）父类 = 子类👌；子类 = 父类 🙅
// 逆变（Contravariant）父类 = 子类 🙅；子类 = 父类 👌
// 双向协变（Bivariant）父类 = 子类 👌；子类 = 父类 👌

// 对象兼容性 协变
interface Foo1 {
    name: string
}
interface Bar extends Foo1 {
    age: number
}
let x7: Foo1
let y7: Bar
x7 = y7
// y7 = x7

// 1.函数参数 双向协变、逆变
// 动物
interface Animal11 {
    name: string
}
// 猫
interface Cat extends Animal11 {
    color: string
}
// 美国短尾猫
interface USAShorthair extends Cat {
    age: number
}

type handler = (it: Cat) => void
// ok 是安全的
const handler: handler = (it: Animal11) => {}
// ok 不安全
// 因为type handle的参数是Cat类型，表明是可以允许接受其他Cat的子类型
// 如果it是USAShorthair类型，则会拒绝其他Cat的子类。所以不安全
const handler1: handler = (it: USAShorthair) => {
    it.name
}

// 如果开启strictFunctionTypes编译选项，会禁用函数参数的双向协变。参数类型是逆变的
const handler2: handler = (it: Animal11) => {}
// const handler3: handler = (it: USAShorthair) => {} error

// 2.返回值类型 协变
interface Foo1 {
    name: string
}
interface Bar extends Foo1 {
    age: number
}

let x11: () => Foo1
let y11: () => Bar
// Bar是Foo的子类，返回值类型兼容性是协变的
// Foo(父类) = Bar(子类) ok
x11 = y11
// y11 = x11 error
// 3.函数参数的数量兼容性 逆变
let x12: (a: number) => void = () => {}
let y12: (a: number, b: number) => void = () => {}
y12 = x12
// x12 = y12




enum EventType { Mouse, KeyBoard }
interface Event {
    timestamp: number
}
interface MouseEvent extends Event { x1: number; y1: number }
interface KeyEvent extends Event{
    keyCode: number
}
function listenEvent(eventType: EventType, handler: (n: Event) => void){

}
// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x, e.y))

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x1+','+(<MouseEvent>e).y1))
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x1, e.y1)))

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
// listenEvent(EventType.Mouse, (e: number) => console.log(e))

let funcA = (arg: number | string): void => {}
let funcB = (arg: number): void => {}
// funcA = funcB
// funcB = funcA

/**
 * 可选参数以及剩余参数
 * **对于可选参数来说，相当于传递了一些undefined
 */
function invokeLater(args: any[], callback: (...args: any[]) => void){
}
invokeLater([1,2], (x, y) => console.log(x, y))
invokeLater([1,2], (x, y?) => console.log(x, y))

/**
 * 枚举
 * **枚举类型与数字类型相互兼容。不同枚举类型之间是不兼容的
 */
enum Status {Ready, Waiting}
enum Color {Red1, Blue1, Green1}
let status1 = Status.Ready
// status1 = Color.Red1 error

/**
 * 类
 * **类有静态部分和实例部分的类型。比较两个类类型的对象时，只有实例的成员会被比较
 * 静态成员和构造函数不再比较的范围内
 */
class Animal12 {
    feet: number
    constructor(name: string, numFeet: number){}
}
class Size {
    feet: number;
    constructor(numFeet: number){}
}
let a1: Animal12
let a2: Size
a1 = a2
a2 = a1
 //**私有成员和受保护成员 
//  当检查类实例的兼容时，如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员。同样地，这条规则适用于受保护成员

class Parent {
    private age: number
    constructor(){}
}

class Children extends Parent {
    constructor(){
        super()
    }
}
class Children1 extends Parent {
    constructor(){
        super()
    }
}
class OtherClass {
    private age: number
}

const children: Parent = new Children1()
// const otherClass: Parent = new OtherClass() error

/**
 * 泛型
 * **对于没有指定泛型类型的泛型参数时，会把所有泛型参数当成any比较
 */
interface Empty<T>{

}
let x13: Empty<number>
let y13: Empty<string>
x13 = y13

interface NotEmpty<T>{
    data: T
}
let x14: NotEmpty<number>
let y14: NotEmpty<string>
// x14 = y14

let identity1 = function<T>(x: T): T {
    return x
}
let identity2 = function<U>(y: U): U {
    return y
}
identity1 = identity2

/**
 * 子类型与赋值
 * **ts里有两种兼容性：子类型和赋值。不同点在于，赋值扩展了子类型兼容性，增加了一些规则，允许和any来回赋值，以及enum和对应数字之间的来回赋值
 * 实际上，类型兼容性是由赋值兼容性来控制的
 */
/**
 * 基础
 * 函数兼容性
 * 1.参数个数
 * 2.参数类型
 * 3.返回值类型
 * 4.可选参数和剩余参数
 * 5.参数双向协变
 * 6.函数重载
 * 枚举
 * 类
 * 泛型
 */

