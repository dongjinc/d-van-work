/**
 * 分析store
 */
const store = this;
const { dispatch, commit } = this;
// this.$store.dispatch
// this,$store.commit
this.dispatch = function boundDispatch(type, payload) {
  return dispatch.call(store, type, payload);
};
/**
 * mutation
 * vuex commit两种写法
 * 一种（type+提交载荷） store.commit('increment', {amount: 10})
 * 另一种（对象风格的提交） store.commit({type: 'increment', amount: 10})
 * @param {*} type mutations  中定义的方法
 * @param {*} payload 额外的参数，即 mutation 的 载荷（payload）
 * @param {*} options
 * @returns
 */

this.commit = function boundCommit(type, payload, options) {
  return commit.call(store, type, payload, options);
};
/**
 * commit方法的实现
 * @param {*} _type
 * @param {*} _payload
 * @param {*} _options
 */
function commit(_type, _payload, _options) {
  // type - 方法名
  // payload - 参数
  const { type, payload, options } = unifyObjectStyle(
    _type,
    _payload,
    _options
  );
  const mutation = { type, payload };
  // _mutations Object.create(null) 对于相同type方法名
  // {[type]: [mutations]}
  const entry = this._mutations[type];
  this._withCommit(() => {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
}

function dispath(_type, _payload) {
  const { type, payload } = unifyObjectStyle(_type, _payload);
  const action = { type, payload };
  const entry = this._actions[type];

  // 订阅 store 的 action。
  // handler 会在每个 action 分发的时候调用并接收 action 描述和当前的 store 的 state 这两个参数：
  /**
   * 通常用于插件
   * 例子
     store.subscribeAction((action, state) => {
        console.log(action.type, action.payload)
      })
   */
  try {
    this._actionSubscribers
      .slice()
      .filter((sub) => sub.before)
      .forEach((sub) => sub.before(action, this.state));
  } catch (e) {
    if (__DEV__) {
      console.warn(`[vuex] error in before action subscribers: `);
      console.error(e);
    }
  }

  // 如果entry是不大于1时，返回的函数是Promise形式
  // store内actions方法
  const result =
    entry.length > 1
      ? Promise.all(entry.map((handler) => handler(payload)))
      : entry[0](payload);

  return new Promise((resolve, reject) => {
    result.then(
      (res) => {
        try {
          this._actionSubscribers
            .filter((sub) => sub.after)
            .forEach((sub) => sub.after(action, this.state));
        } catch (e) {
          if (__DEV__) {
            console.warn(`[vuex] error in after action subscribers: `);
            console.error(e);
          }
        }
        resolve(res);
      },
      (error) => {
        /**
         * 自 3.4.0 起，subscribeAction 也
         * 可以指定一个 error 处理函数以捕获分发 action 的时候被抛出的错误。
         * 该函数会从第三个参数接收到一个 error 对象。
         */
        // 例子
        store.subscribeAction({
          error: (action, state, error) => {
            console.log(`error action ${action.type}`);
            console.error(error);
          },
        });
        try {
          this._actionSubscribers
            .filter((sub) => sub.error)
            .forEach((sub) => sub.error(action, this.state, error));
        } catch (e) {}
      }
    );
  });
}

/**
 * 注册actions
 * @param {*} store 实例
 * @param {*} type 方法名
 * @param {*} handler 方法体
 * @param {*} local
 */
function registerAction(store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
    });
    // https://github.com/vuejs/vuex/blob/dev/src/util.js
    if (isPromise(res)) {
    }
  });
}

/**
 * 统一对象风格，由于stroe.commit 有两种提交风格写法，底层是为了统一做了处理
 * @param {*} type
 * @param {*} payload
 * @param {*} options
 */
function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    // 🤔️ 为何payload当作参数化为第一种的形式，不将type.type删除呢？
    options = payload;
    payload = type;
    type = type.type;
  }
  // __DEV__ --> webpack定义全局环境变量默认为true
  // 经过统一风格，type值必须是string类型，🤔️ 这里会忽略一个问题(传空字符串)
  // 当然可以在做具体逻辑时已经处理了
  if (__DEV__) {
    assert(
      typeof type === "string",
      `expects string as the type, but found ${typeof type}.`
    );
  }

  return { type, payload, options };
}

/**
 * 判断是否为对象
 */
function isObject() {
  return obj !== null && typeof obj === "object";
}

/**
 * 判断promise
 */
function isPromise(val) {
  return vall && typeof val.then === "function";
}

// 抛出错误信息
function assert(condition, msg) {
  if (!condition) throw new Error("[vuex] " + msg);
}
/**
 * 开启严格模式
 */
function enableStrictMode(store) {
  store._vm.$watch(
    function () {
      return this._data.$$state;
    },
    () => {
      assert(
        store._committing,
        `do not mutate vuex store state outside mutation handlers.`
      );
    },
    {
      deep: true,
      sync: true,
    }
  );
}
/**
 * 用于判断是否在commit逻辑处理中，
 * 一般用于严格模式时，如果通过actions直接改变state数据时，会报错误。
 */
function _withCommit(fn) {
  const committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
}

/**
 * store -> action事件注册
 * @param {(Function | {before: Function, after: Function, error: Function})} fn
 * @param {*} options
 */
function subscribeAction(fn, options) {
  // 从 3.1.0 起，subscribeAction 也可以指定订阅处理函数的被调用时机应该
  // 在一个 action 分发之前还是之后 (默认行为是之前)：
  const subs = typeof fn === "function" ? { before: fn } : fn;
  genericSubscribe(subs, this._actionSubscribers, options);
}
// 用法
// 实例1 store.subscribeAction(handler, { prepend: true })
// 实例2
// store.subscribeAction({
//   before: (action, state) => {},
//   after: (action, state) => {},
// });

/**
 * 注册事件
 * @param {*} fn
 * @param {*} subs
 * @param {*} options
 */
function genericSubscribe(fn, subs, options) {
  // 默认情况下，新的处理函数会被添加到其链的尾端，因此它会在其它之前已经被添加了的处理函数之后执行。
  // 这一行为可以通过向 `options` 添加 `prepend: true` 来覆写，即把处理函数添加到其链的最开始
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  //  要停止订阅，调用此方法返回的函数即可停止订阅。
  return () => {
    const i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}
