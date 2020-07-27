import React, { Component } from "react";
/**
 * initializing state
 * 对于这种类型状态初始化移动到构造函数或属性初始值设定项内
 * before
 */
// class ExampleComponent extends Component{
//     state = {}
//     componentWillMount(){
//         this.setState({
//             currentColor: this.props.defaultColor,
//             palette: 'rgb'
//         })
//     }
// }
/**
 * after
 */
class ExampleComponent extends Component {
  state = {
    currentColor: this.props.defaultColor,
    palette: "rgb",
  };
}

/**
 * fetching external data
 * uses componentWillMount to fetch external data
 * before
 */
// class ExampleComponent1 extends Component{
//     state = {
//         externamData: null
//     }
//     componentWillMount(){
//         // eslint-disable-next-line no-undef
//         this._asyncRequest = loadMyAsyncData().then(external => {
//             this._asyncRequest = null
//             // eslint-disable-next-line no-undef
//             this.setState({externalData})
//         })
//     }
// }
/**
 * 常见的误解是，获取componentWillMount可以避免第一个空的呈现状态。
 * 实际上这从来不是真的，因为componentWillMount之后立即执行render。
 * 如果componentWillMount触发时，数据不可用。第一个渲染器仍将显示加载状态
 * after
 */
class ExampleComponent1 extends Component {
  state = {
    externalData: null,
  };
  componentDidMount() {
    // eslint-disable-next-line no-undef
    this._asyncRequest = loadMyAsyncData().then((external) => {
      this._asyncRequest = null;
      // eslint-disable-next-line no-undef
      this.setState({ externalData });
    });
  }
}
/**
 * Adding event listeners/subscriptions
 * 通常会认为componentWillMount和componentWillUnmount总是成对的。但这并不能保证
 * 只有调用了componentDidMount后，React才会保证稍后将调用componentWillUnmount进行清理
 * before
 */
// class ExampleComponent2 extends Component {
//     componentWillMount(){
//         this.setState({
//             subscribedValue: this.props.dataSource.subscribedValue
//         })
//         // this is not safe; it can leak
//         this.props.dataSource.subscribe(this.handleSubscriptionChange)
//     }
//     handleSubscriptionChange = dataSource => {
//         this.setState({
//             subscribedValue: dataSource.value
//         })
//     }
// }
/**
 * 对于添加Listener和subscriptions 在 componentDidMount生命周期中触发
 * after
 * 更新订阅以响应属性更改。除了Redux和MobX 16.3 create-subscription帮助实现这一点
 */
class ExampleComponent2 extends Component {
  state = {
    subscribedValue: this.props.dataSource.value,
  };
  componentDidMount() {
    this.props.dataSource.subscribe(this.handleSubscriptionChange);
    if (this.state.subscribedValue !== this.props.dataSource.value) {
      this.setState({
        subscribedValue: this.props.dataSource.value,
      });
    }
  }
  handleSubscriptionChange = (dataSource) => {
    this.setState({
      subscribedValue: dataSource.value,
    });
  };
}

/**
 * componentWillReceiveProps lifecycle to update state based on new props values
 */
// class ExampleComponent3 extends Component{
//     state = {
//         isScrollingDown: false
//     }
//     /**
//      * 尽管下面代码没有问题，但是componentWillReceiveProps生命周期经常被错误地使用，从而导致了问题的出现
//      * 该方法将被弃用
//      * before
//      */
//     componentWillReceiveProps(nextProps){
//         if(this.props.currentRow !== nextProps.currentRow){
//             this.setState({
//                 isScrollingDown: nextProps.currentRow > this.props.currentRow
//             })
//         }
//     }
// }
/**
 * after
 */
class ExampleComponent3 extends Component {
  // initalize state in constructor
  // or with a property initializer

  state = {
    isScrollingDown: false,
    lastRow: null,
  };
  static getDerivedStateFormProps(props, state) {
    /**
     * getDerivedStateFormProps能够以与componentWillReceiveProps中相同的方式访问先前的props值
     */
    if (props.currentRow !== state.lastRow) {
      return {
        isScrollingDown: props.currentRow > state.lastRow,
        lastRow: props.currentRow,
      };
    }
    return null;
  }
}

/**
 * 调用外部回调
 * 组件示例，在内部state发生变化时，调用了外部函数
 * before
 */
// class ExampleComponent4 extends Component{
//     componentWillUpdate(nextProps, nextState){
//         if(this.state.someStateFulValue !== nextState.someStateFulValue){
//             nextProps.onChange(nextState.someStateFulValue)
//         }
//     }
// }
/**
 * 使用componentWillUpdate出于错误的担心。当componentDidUpdate触发时，更新其他组件state已经太晚了？。事实上并非如此。
 * React可确保在用户看到更新UI之前，刷新在componentDidMount和ComponentDidUpdate。通常会避免这样的级联更新。
 * 但如果需要测量渲染的DOM元素后，定位工具的提示
 * 在异步模式下，使用componentWillUpdate都是不安全的。因为外部回调可能会一次更新中被多次调用。
 * 相反使用componentDidUpdate声明周期，保证每次更新只调用一次
 * after
 */
class ExampleComponent4 extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.state.someStatefulValue !== prevState.someStatefulValue) {
      this.props.onChange(this.state.someStatefulValue);
    }
  }
}

/**
 * props更新的副作用
 * 有时候组件在props发生变化时会产生副作用
 * 与componetWillUpdate类似，componentWillReceiveProps可能在一次更新中被多次调用，因此避免方法中产生副作用。
 * 应该使用componentDidUpdate。保证每次更新只调用一次
 */
// class ExampleComponent5 extends Component {
//   componentWillReceiveProps(nextProps) {
//     if (this.props.isVisible !== nextProps.isVisible) {
//       // eslint-disable-next-line no-undef
//       logVisibleChange(nextProps.isVisible);
//     }
//   }
// }

class ExampleComponent5 extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isVisible !== prevProps.isVisible) {
      // eslint-disable-next-line no-undef
      logVisibleChange(this.props.isVisible);
    }
  }
}

/**
 * props更新时获取外部数据
 * 根据props的值获取外部数据
 * before
 */
// class ExampleComponent6 extends Component {
//     state = {
//         externalData: null
//     }
//     componentWillReceiveProps(nextProps){
//         if(nextProps.id !== this.props.id){
//             this.setState({
//                 externalData: null
//             })
//             this._loadAsyncData(nextProps.id);
//         }
//     }
// }

/**
 * after
 */
class ExampleComponent6 extends Component {
  state = {
    externalData: null,
  };
  static getDerivedStateFormProps(props, state) {
    // 保存prevId在state中，以便我们在props变化时进行对比
    // 清除之前加载的数据
    if (props.id !== state.prevId) {
      return {
        externalData: null,
        prevId: props.id,
      };
    }
    // 无需更新state
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id);
    }
  }
  /**
   * 卸载时取消正在进行的请求
   */
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  _loadAsyncData(id) {
    // eslint-disable-next-line no-undef
    this._asyncRequest = loadMyAsyncData(id).then((externalData) => {
      this._asyncRequest = null;
      this.setState({ externalData });
    });
  }
}

/**
 * 更新前读取DOM属性
 * 该组件在更新之前从DOM中读取属性，
 * 以便在列表中保持滚动的位置
 */
class ScrollingList extends Component {
  componentWillUpdate(nextProps, nextState) {
    // 我们正在向列表添加新项目吗？
    // 捕获滚动位置，以便于稍后我们可以调整滚动位置
    if (this.props.list.length < nextProps.list.length) {
      this.previousScrollOffset =
        this.listRef.scrollHeight - this.listRef.scrollTop;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // 如果我们刚刚添加了新项，并且设置了 previousScrollOffset。
    // 调整滚动位置，以便这些新项不会把旧项挤出视图。
    if (this.previousScrollOffset !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - this.previousScrollOffset;
      this.previousScrollOffset = null;
    }
  }
}

export default ExampleComponent;
