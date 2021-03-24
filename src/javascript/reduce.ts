// https://segmentfault.com/a/1190000021737914
https: var result = [
  {
    subject: "math",
    score: 88,
  },
  {
    subject: "chinese",
    score: 95,
  },
  {
    subject: "english",
    score: 80,
  },
];
// 累加累乘
var sum = result.reduce(function (prev, cur) {
  console.log(prev, cur);
  return cur.score + prev;
}, 0);

var dis = {
  math: 0.5,
  chinese: 0.3,
  english: 0.2,
};
// 权重求和
var qsum = result.reduce(function (prev, cur) {
  return prev + cur.score * dis[cur.subject];
}, 0);
console.log(sum, qsum);
// 字符串重复次数
var arrString = "abbssccbb";
const arrStr = arrString.split("").reduce((prev, cur) => {
  prev[cur] ? prev[cur]++ : (prev[cur] = 1);
  return prev;
}, {});

// 代替reverse
function reverse(arr = []) {
  return arr.reduceRight((prev, cur) => (prev.push(cur), prev), []);
}
console.log(reverse([1, 2, 3, 4, 5, 6]));

// 代替map或filter
