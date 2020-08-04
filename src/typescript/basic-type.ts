/**
 * 基本类型
 * 布尔值
 */
let isDone: boolean = false

/**
 * 数字
 * ts里所有数字都是浮点数，浮点数的类型都是number，支持十进制和十六进制字面量。es6--二进制和八进制字面量
 * 什么是字面量
 */
let octalLiteral: number = 0o7632
let binaryLiteral: number = 0b1010

/**
 * 字符串
 * 支持字符串模版
 */
let name1: string = 'Gene'
let age: number = 12
let sentence: string = `Hello, my name is ${name1} will be ${age}`

/**
 * 数组
 * 两种方式定义
 */
// 元素类型后面接上[]
// let list: number[] = [1,2,3]

// 使用数组泛型，Array<元素类型>
let list: Array<number> = [1,2,3]

/**
 * 元组 Tuple
 * 表示已知元素数量和类型的数组，各元素的类型不必相同
 */
let x1: [string, number];
x1 = ['hello', 1]
// 访问已知索引的元素，会得到正确的类型
console.log(x1[0].toLowerCase())
// 越界元素，在最新版本 会报错 (老版本对于越界元素，将会使用联合类型代替)
// x1[3] = 'world'  Property '3' does not exist on type '[string, number]'. / world not assign undefined
// x1[5].toString() // Tuple type '[string, number]' of length '2' has no element at index '5'

/**
 * 枚举
 * 是对js标准数据类型的一个补充。像C#等其它语言一样
 */
// 默认情况下，从0开始为元素编号
// enum Color {
//     Red,
//     Green,
//     Blue
// }

// 可以手动指定成员数值
// enum Color {
//     Red = 1,
//     Green,
//     Blue
// }

// 全部都采用手动赋值
// enum Color {
//     Red = 1,
//     Green = 2,
//     Blue = 3
// }
// let c: Color = Color.Blue

// 枚举类型提供的一个便利 可以由枚举的值得到它的名字。
enum Color {
    Red = 1,
    Green,
    Blue
}
// 利用了给对象赋值时，会返回赋予的值
let colorName: string = Color[2] // Green

/**
 * Any
 * 为那些在编程阶段还不清除类型的变量指定一个类型，来自用户输入或第三方代码库
 */
let notSure: any = 3
let list1: any = [12, '2']

/**
 * Void
 * 某种程度上来说，void类型像是与any类型相反，表示没有任何类型。当一个函数没有返回值时，其返回值类型是void
 */
function warnUser(): void{
    console.log('this is my warning message!')
}
// 声明一个void类型的变量没有什么大用，因为只能赋予undefined和null(only if --strictNullChecks is not specified)
let unusable: void = undefined

/**
 * Null和Undefined
 * 默认情况下null和undefined是所有类型的子类型。可以吧null和undefined赋值给number类型的变量(only if --strictNullChecks is not specified)
 */
let u: undefined = undefined
let num: number = 1

// num = u 

/**
 * Never类型表示那些用不存在的值的类型
 * never类型总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
 * 变量也可能是never类型
 * never类型是任何类型的子类型，可以赋值给任何类型
 */
// 返回never的函数必须存在无法达到的终点
function error(message: string): never{
    throw new Error('message')
}
function infiniteLoop(): never {
    while(true){}
}
// 推断的返回值类型为never
function fail(){
    throw new Error('meaga')
}
let lo: never
let num1: number = 1
num1 = error('')

/**
 * Object
 * 非原始类型
 */
function create(o: object): void{}
create({a: 1})

/**
 * 类型断言
 * 两种形式
 */
// 其一 "尖括号"
// let someValue: any = 'this is a string'
// let strLength: number = (<string>someValue).length
// 其二 as语法 
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length
// 两种形式是等价的。ts里使用JSX时，只有as语法断言是被允许的。

/**
 * 总结
 */
// 布尔值、数字、字符串、数组、元组、枚举、Any、Void、(Null、Undefined)、Never
// Object、类型断言