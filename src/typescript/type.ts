// 类型推论
/**
 * 1.基础
 * 
 * 2.多类型联合 |
 * 
 * 3.上下文类型
 */


window.onmousedown = (mouseEvent) => {
    console.log(mouseEvent); //<- OK
  };

// 类型兼容性
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
let funcA = (arg: number | string): void => {}
let funcB = (arg: number): void => {}
// funcA = funcB
// funcB = funcA

class Parent {
    private age: number
    constructor(){}
}

class Children extends Parent {
    constructor(){
        super()
    }
}

class OtherClass {
    private age: number
}

const children: Parent = new Children()
// const otherClass: Parent = new OtherClass()
