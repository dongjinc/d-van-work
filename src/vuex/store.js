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

  const result =
    entry.length > 1
      ? Promise.all(entry.map((handler) => handler(payload)))
      : entry[0](payload);
  result.then(() => {
    console.log(1);
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
