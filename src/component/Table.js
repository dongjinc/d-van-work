import React, { Component } from "react";
// https://www.taniarascia.com/getting-started-with-react/
/**
 * 组件两种写法
 * 第一种 类组件
 * 注意：
 * 1.类组件必须包含render，并且return只能包含一个父节点
 */
// class Table extends Component {
//   render() {
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Job</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Charlie</td>
//             <td>Janitor</td>
//           </tr>
//           <tr>
//             <td>Mac</td>
//             <td>Bouncer</td>
//           </tr>
//           <tr>
//             <td>Dee</td>
//             <td>Aspiring actress</td>
//           </tr>
//           <tr>
//             <td>Dennis</td>
//             <td>Bartender</td>
//           </tr>
//         </tbody>
//       </table>
//     );
//   }
// }
/**
 * 第二种 简单组件
 */

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
};
// const TableBody = () => {
//   return (
//     <tbody>
//       <tr>
//         <td>Charlie</td>
//         <td>Janitor</td>
//       </tr>
//       <tr>
//         <td>Mac</td>
//         <td>Bouncer</td>
//       </tr>
//       <tr>
//         <td>Dee</td> <td>Aspiring actress</td>
//       </tr>
//       <tr>
//         <td>Dennis</td>
//         <td>Bartender</td>
//       </tr>
//     </tbody>
//   );
// };

/**
 * 如果内容在一行时，可以不需要含有括号
const SimpleComponent = () => {
    return <div>12332</div>
}
class ClassComponent extends Component{
    render() {
        return <div>123</div>
    }
}
*/

// class Table extends Component {
//   render() {
//     return (
//       <div>
//         <TableHeader />
//         <TableBody />
//       </div>
//     );
//   }
// }

/**
 * Props是只读的
 * 无法修改数据，可以通过 state进一步控制react中的数据处理
 */
const TableBody = (props) => {
  console.log(props);
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          {/**
           * onClick函数必须传递一个返回removeCharacter方法的函数，否则它将尝试自动运行
           */}
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
};

class Table extends Component {
  render() {
    const { characterData, removeCharacter } = this.props;
    return (
      <table>
        <TableHeader />
        <TableBody
          characterData={characterData}
          removeCharacter={removeCharacter}
        />
      </table>
    );
  }
}

// class TableComponent extends Component {
//   render() {
// const characters = [
//   {
//     name: "Charlie",
//     job: "Janitor",
//   },
//   {
//     name: "Mac",
//     job: "Bouncer",
//   },
//   {
//     name: "Dee",
//     job: "Aspring actress",
//   },
//   {
//     name: "Dennis",
//     job: "Bartender",
//   },
// ];
//     return (
//       <div className="container">
//         <Table characterData={characters} />
//       </div>
//     );
//   }
// }

class StateComponent extends Component {
  state = {
    characters: [
      {
        name: "Charlie",
        job: "Janitor",
      },
      {
        name: "Mac",
        job: "Bouncer",
      },
      {
        name: "Dee",
        job: "Aspring actress",
      },
      {
        name: "Dennis",
        job: "Bartender",
      },
    ],
  };
  /**
   * 更改数组必须要使用 this.setState 。this.state.property 是不工作的
   */
  removeCharacter = (index) => {
    const { characters } = this.state;
    this.setState({
      characters: characters.filter((characters, i) => {
        return i !== index;
      }),
    });
  };
  render() {
    const { characters } = this.state;
    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        ></Table>
      </div>
    );
  }
}

/**
 * 提交表单数据
 */
class FormComponent extends Component {
  state = {
    characters: [],
  };
  static getDerivedStateFromProps(props, state) {
    console.log(props, state, 3636);
    return props;
  }
  /**
   * 更改数组必须要使用 this.setState 。this.state.property 是不工作的
   */
  removeCharacter = (index) => {
    const { characters } = this.state;
    this.setState({
      characters: characters.filter((characters, i) => {
        return i !== index;
      }),
    });
  };
  handleSubmit = (characters) => {
    this.setState({
      characters: [...this.state.characters, characters],
    });
  };
  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
class Form extends Component {
  initialState = {
    name: "",
    job: "",
  };
  state = this.initialState;
  handleChange = (event) => {
    /**
     * 读取标签属性
     */
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };
  render() {
    const { name, job } = this.state;
    return (
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChange}
        />
        <label htmlFor="job">Job</label>
        <input
          type="text"
          name="job"
          id="job"
          value={job}
          onChange={this.handleChange}
        />
        <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}
console.log(StateComponent);
export default FormComponent;
