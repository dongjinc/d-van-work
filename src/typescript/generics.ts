/**
 * 泛型
 */

 // function identity(arg: number): number{
//     return arg
// }

/**
 * 类型变量
 * 是一种特殊的变量，用于表示类型而不是值
 */

// function identity<T>(arg: T): T{
//     return arg
// }

/**
 * 泛型函数两种方式
 * 第一种传入参数。包含类型参数
 */

//  let output = identity<string>("a")

/**
 * 第二种类型推论，根据传入的参数自动地帮助我们确定T的类型
 * 如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入T的类型。
 */

// let output = identity('a')

/**
 * 泛型变量
 */

//  function loggingIdentity<T>(arg: T):T{
//     //  console.log(arg.length) error 
//     /**
//      * 没有地方指明arg具有这个属性。记住这些类型变量代表的是任意类型。所以使用这个函数的人可能传入的是个数字
//      */
//      return arg
//  }

 /**
  * 假设我们想操作T类型的数组而不是T。所以length属性是存在的
  */
//  function loggingIdentity<T>(arg: T[]): T[]{
//      console.log(arg.length)
//      return arg
//  }

// function loggingIdentity<T>(arg: Array<T>): Array<T>{
//     console.log(arg.length)
//     return arg
// }

/**
 * 泛型类型
 */

 function identity<T>(arg: T): T{
     return arg
 }
//  let myIdentity: <T>(arg: T) => T = identity
 /**
  * 可以使用不同的泛型参数名，只要在数量和使用方式上能对应就可以
  */
//  let myIdentity: <U>(arg: U) => U = identity
 /**
  * 带有调用签名的对象字面量来定义泛型函数
  */
//  let myIdentity: {<U>(arg: U): U} = identity

 /**
  * 泛型接口
  */

//  interface GenericIdentityFn {
//      <T>(arg: T): T
//  }
//  let myIdentity: GenericIdentityFn = identity

 /**
  * 泛型参数当作整个接口的一个参数
  */

 interface GenericIdentityFn<T> {
     (arg: T): T
 }
 let myIdentity: GenericIdentityFn<number>
 myIdentity = function<T>(arg: T): T{
     return arg
 }
 myIdentity(1)

 /**
  * 泛型类
  * 无法创建泛型枚举和泛型命名空间
  * 泛型类是指实例部分的类型。所以类的静态属性不能使用这个泛型类型
  */

  class GenericNumber<T>{
      zeroValue!: T
      add!: (x: T, y: T) => T
  }
  let myGenericNumber = new GenericNumber<number>()
  myGenericNumber.add = function(x, y){
      console.log(x + 1)
      return x + y
  }
  myGenericNumber.zeroValue = 1

  /**
   * 泛型约束
   * 定义一个接口的描述约束条件，使用extends关键字来实现约束
   */
  interface Lengthwise {
      length: number
  }
  function loggingIdentity<T extends Lengthwise>(arg: T): T{
      console.log(arg.length)
    return arg
  }
  loggingIdentity('1')
  //  需要传入符合约束条件类型的值，必须包含必须的属性
  loggingIdentity({length: 1})

  /**
   * 泛型约束中使用类型参数
   * 可以声明一个类型参数，且它被另一个类型参数所约束
   * 现在我们想要用属性名从对象里获取这个属性，并且确保这个属性存在于对象obj上
   */
function getProperty<T, K extends keyof T>(obj: T, key: K){
    return obj[key]
}
let x = {a: 1, b: 2, c: 3}
getProperty(x, 'a')

/**
 * 在泛型里使用类类型
 * ts使用泛型创建工厂函数时，需要引用构造函数的类类型
 */
function createa<T>(c: {new(): T}){
    return new c
}
/**
 * 使用原型属性推断并约束构造函数与类实例的关系
 */
class BeeKeeper {
    hasMask!: boolean
}
class ZooKeeper {
    nametag!: string
}
class Animal {
    numLegs!: number
}
class Bee extends Animal {
    keeper!: BeeKeeper
}
class Lion extends Animal {
    keeper!: ZooKeeper
}
function createInstance<A extends Animal>(c: new () => A): A{
    return new c()
}
createInstance(Lion).numLegs

/**
 * 总结
 * 1.类型变量，是一种特殊的变量，表示类型而不是值
 * 泛型函数两种方式: 1.传入参数 2.类型推论
 * 2.泛型变量: 泛型变量代表的是任意类型。因此可能会传入数字
 * 3.泛型类型: 1.可以用不同的泛型参数名 2.调用签名的对象字面量来定义泛型函数
 * 4.泛型接口: 泛型参数当作整个接口的一个参数
 * 5.泛型类: 是指实例部分的型类，静态属性不能使用这个泛型类型。无法创建泛型枚举和泛型命名空间
 * 6.泛型约束: 1.定义一个接口来描述约束条件，使用extends关键字来实现约束 2.泛型约束中使用类型参数
 * 7.泛型使用类类型
 */