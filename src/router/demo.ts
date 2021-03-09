// @ts-nocheck
// https://www.cnblogs.com/tugenhua0707/p/10859214.html
class HashRouter {
  routes = {};
  currentHash = "";
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }
  hashChangeUrl() {
    console.log(12);
    this.currentHash = location.hash.slice(1) || "/";
    this.routes[this.currentHash]();
  }
  constructor() {
    // this.hashChangeUrl = this.hashChangeUrl.bind(this)
    console.log(this);
    window.addEventListener("load", this.hashChangeUrl.bind(this), false);
    window.addEventListener("hashchange", this.hashChangeUrl.bind(this), false);
  }
}
const Router = new HashRouter();
const body = document.getElementById("app");
const changeTitle = (title) => {
  body.innerHTML = title;
};
Router.route("/", () => {
  changeTitle("首页");
});
Router.route("/b", () => {
  console.log(Router.routes);
  changeTitle("b");
});

// class History {
//   routes = {};
//   getRouter() {
//     const path = window.location.pathname;
//     return path || "/";
//   }
//   initRouter(path) {
//     history.replaceState("", "", path);
//     this.routes[path] && this.routes[path]();
//   }
//   go(path) {
//     history.pushState("", "", path);
//     this.routes[path] && this.routes[path]();
//   }
//   route(path, callback) {
//     this.routes[path] = callback || function () {};
//   }
//   constructor() {
//     window.addEventListener("popstate", () => {
//       console.log(12);
//       const path = this.getRouter();
//       this.routes[path] && this.routes[path]();
//     });
//   }
// }
// const router = new History();
// const dom = document.getElementById("app");
// function changeTitle(title) {
//   dom.innerHTML = title;
// }
// router.route("/", () => {
//   changeTitle("首页");
// });
// router.route("/one", () => {
//   changeTitle("第一页");
// });
// router.route("/two", () => {
//   changeTitle("第二页");
// });
// router.initRouter(window.location.pathname);
// const ul = document.querySelector("ul");
// ul.addEventListener("click", (e) => {
//   if (e.target.tagName === "A") {
//     e.preventDefault();
//     router.go(e.target.getAttribute("href"));
//   }
// });

async function t1() {
  console.log(1);
  console.log(2);
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 1 });
    }, 1);
  });
  console.log(3);
  console.log(4);
}
async function t3() {
  const data = await t1();
  console.log(data, "t3");
}
t1();
t3();

t2();

async function t2() {
  console.log(5);
  console.log(6);
  const love = await Promise.resolve().then(() => {
    console.log("t2");
    return "t2";
  });
  console.log(love, 12);
  console.log(7);
  console.log(8);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function t2() {
  return _t.apply(this, arguments);
}

function _t() {
  _t = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var love;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              console.log(5);
              console.log(6);
              _context.next = 4;
              return Promise.resolve().then(function () {
                console.log("t2");
                return "t2";
              });

            case 4:
              love = _context.sent;
              console.log(love, 12);
              console.log(7);
              console.log(8);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _t.apply(this, arguments);
}
