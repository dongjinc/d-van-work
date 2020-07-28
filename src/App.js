import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "./component/Table";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" onClick="onEnter" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
/**
 * props 传递数据
 */
// 继承组件写法
/**
 * class Square extends Render.Component
 */
class Square extends Component {
  name: 1;
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ backgroundColor: "#fff" }}>123 {this.name}</div>
          {/* <img src={logo} alt="logo" /> */}
        </header>
        <Table />
      </div>
    );
  }
}

export default Square;
