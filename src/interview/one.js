/**
 * 声明式 --- 编程规范。要做什么。而不是如何做
 * 声明编程描述了应该做什么，而命令式编程描述了如何做
 * https://juejin.im/post/5cf0733de51d4510803ce34e#heading-37
 */
/**
 *  声明式函数 map
 * 下面例子，数组中的每个元素都乘以2
 */

const number = [1, 2, 3, 4, 5];
// 声明式  让编译器来完成其余的工作
const doubleWithDec = number.map((number) => number * 2);
console.log(doubleWithDec);

// 命令式  需要编写所有的流程步骤
const doubleWithImp = [];
for (let i = 0; i < number.length; i++) {
  const numberdouble = number[i] * 2;
  doubleWithImp.push(numberdouble);
}
console.log(doubleWithImp);

/**
 * 函数式编程
 * 函数式编程是声明式编程的一部分，函数式第一等公民。
 * 意味着函数式数据，可以像变量一样在应用程序中保存、检索和传递这些函数
 * 不可变性
 * 纯函数
 * 数据转换
 * 高阶函数
 * 递归
 * 组合
 */
/**
 * 不可变性
 * 意味着不可改变。在函数式编程中。你无法更改数据，也不能更改。如果要改变或更改数据，则必须复制数据副本来更改
 * 函数参数是对实际数据的引用
 */
let student = {
  firstName: "testing",
  lastName: "testing",
  marks: 600,
};
function changeName(student) {
  // student.firstName = 'testing1' 不应该这么做
  let copiedStudent = Object.assign({}, student);
  copiedStudent.firstName = "testing1";
  return copiedStudent;
}
/**
 * 纯函数
 * 始终接收一个或多个参数并计算参数并返回数据或函数的函数。没有副作用，例如设置全局更改，更改应用程序状态。总是将参数视为不可改变的数据
 * 纯函数，接收参数，基于参数计算，返回一个新对象而不是修改参数
 */
// 非纯函数
function appendAddress() {
  student.address = {
    streetNumber: "0000",
    streetName: "first",
    city: "somecity",
  };
}
//  纯函数
function appendAddress1(student) {
  let copystudent = Object.assign({}, student);
  copystudent.address = {
    streetNumber: "0000",
    streetName: "first",
    city: "somecity",
  };
  return copystudent;
}

/**
 * 数据转换
 */

/**
 * 什么是react
 * 组件设计模式、声明式编程范式和函数式编程。虚拟DOM有效地操作DOM。
 * 遵循高阶组件到低阶组件的单向数据流
 */

/**
 * 组件和不同类型
 */
