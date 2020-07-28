import React from "react";
import logo from "../logo.svg";
function formatName(user) {
  return user.firstName + "  " + user.lastName;
}
const user = {
  firstName: "Harper",
  lastName: "Perez1",
};

// const name = "Josh Perez";
// const element = <h1>Hello, {formatName(user)}</h1>;
// /**
//  * 表达式
//  */
// function getGreeting(user) {
//   if (user) {
//     return element;
//   }
//   return <h1>Hello, dongy</h1>;
// }

/**
 * 特定属性
 */
// const element = <div tabIndex="0">问我</div>;
/**
 * 属性嵌入js表达式时，不要再大括号外面加上引号。仅使用（字符串值）或大括号中的一个。对于同一属性不能同时使用这两种符号
 * 使用camelCase（小驼峰）来定义属性的名称，而不是用html属性名称
 */
// const element = <img src={logo} alt="123"></img>;
const element = (
  <div>
    <h1>Hello</h1>
    <h1>Hello。goo to</h1>
  </div>
);
export default element;
