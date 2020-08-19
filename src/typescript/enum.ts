/**
 * 1.数字枚举
 */
// 初始化值
enum Direction {
    Up = 1,
    Down,
    Left,
}
// 非初始化值
enum Direction1 {
    up,
    down,
    left
}
// **枚举成员可以是常量或计算出来的 。如果其中计算的值，后者需要初始化值
enum E {
    A = getSomeValue(),
    // B error 
}

function getSomeValue(){
    return 1
}

/**
 * 2.反向映射
 * **数字枚举成员具有反向映射
 * **字符串枚举成员不会生成反向映射
 */
enum Enum{
    A
}
let a = Enum.A
console.log(Enum[a])

// 3.字符串枚举
enum Direction1 {
    LP = "LP",
    DOWN = "DOWN"
}
/**
 * 4.异构枚举
 * 可以混合字符串和数字成员
 */
enum BooleanLikeHeterogeneousEnum{
    No = 0,
    Yes = "YES"
}
// **常量枚举表达式是TS表达式的子集，可以在编译阶段求值
enum FileAcces {
    // constant members
    None,
    Read = 1 << 2,
    Write = 1 << 3,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length
}
// 5.枚举成员类型、联合枚举成员
// **存在一种特殊的非计算的常量枚举成员子集：字面量枚举成员
// **字面量枚举成员是指不带有初始值的常量枚举成员、或者初始化为
// **任何字符串字面量，任何数字字面量、一元符号数字字面量
// 当所有枚举成员都拥有字面量枚举值时，就有了一种特殊的语义
enum ShapeKind {
    Circle,
    Square
}
interface Circle {
    kind: ShapeKind.Circle,
    radius: number
}
interface Square {
    kind: ShapeKind.Square,
    radius: number
}
// 另外一个变化，枚举类型本身变成了每个枚举成员的联合
// 无法应用于另外一个枚举成员类型
// let c: Circle = {
//     // kind: ShapeKind.Square, error
//     radius: 11
// }
/**
 * 6.运行时的枚举
 * 枚举是在运行时真正存在的对象
 */
enum E {
    X,
    Y,
    Z
}
function f(obj: {X: number}){
    return obj.X
}
// console.log(f(E))
/**
 * 7.const
 * 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员访问。可以使用const
 * **编译阶段会被删除。常量枚举成员在使用的地方会被内联进来。之所以可以这么做
 * 是因为常量枚举不允许包含计算成员
 */
const enum Directions {
    UP,
    Down
}
let directions = [Directions.Down, Directions.UP]
/**
 * 枚举在编译时
 */
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}
type LogLevelStrings = keyof typeof LogLevel
function Lko(param: LogLevel){}

/**
 * 总结
 * 枚举成员可以是常量或通过计算得出。
 * 如果其中某成员通过计算得出值，后者成员必须初始化值
 * 
 * 1.数字枚举
 *  反向映射
 * 2.字符串
 *  不支持反向映射
 * 3.异构枚举
 *  支持混合字符串和数字成员
 * 4.枚举成员类型、联合枚举成员
 * （1）常量枚举表达式是TS表达式的子集，可以在编译阶段求值
 * （2）字面量枚举成员：存在一种特殊非计算常量枚举成员子集。枚举类型本身变成了每个枚举成员的联合类型，来自不同枚举类型，相互无法应用
 * 字面量枚举成员是指不带有初始值的常量枚举成员，或者初始化为 任何字符串、数字、一元符号数字字面量
 * 5.反向映射
 * 6.运行时的枚举：真正存在的对象
 * 7.编译时的枚举：keyof typeof 
 * 8.const枚举
 * 为了避免在额外生成的代码上开销和额外的非直接的对枚举成员访问
 * 编译阶段会被删除。常量枚举成员在使用的地方会被内联进来。不允许包含计算成员
 */