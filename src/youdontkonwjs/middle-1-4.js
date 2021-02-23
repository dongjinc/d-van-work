var o = {};
var a = {
  b: 42,
  c: o,
  d: function () {},
};
o.e = a;
JSON.stringify(a);
a.toJSON = function () {
  return { b: this.b };
};

var a = {
  val: [1, 2, 3],
  toJSON() {
    return this.val.slice(1);
  },
};

var a = {
  b: 42,
  c: "42",
  d: [1, 2, 3],
};
JSON.stringify(a, ["b", "c"]);
JSON.stringify(a, (k, v) => {
  if (k !== "c") return v;
});

var a = {
  valueOf() {
    return "42";
  },
};
var b = {
  toString() {
    return 43;
  },
};
Number(b);

var str = "\
  <div>我爱你的</div>\
";

// https://zhuanlan.zhihu.com/p/84212558
// https://juejin.cn/post/6844904086358212621#heading-4
