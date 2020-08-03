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

function loggingIdentity<T>(arg: Array<T>): Array<T>{
    console.log(arg.length)
    return arg
}

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