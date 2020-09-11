// @ts-nocheck
const text = `

标题
[单项选择]您对我们的产品满意么？((这是字段描述))
非常满意
满意1
一般
不满意


[多项选择] 您从何处获知我们的产品？((这是字段123描述))
微信
微博
电梯间广告
朋友介绍

[多项选择]您从何处获知我们的产品？((这是字段123描述))
微信
微博
电梯间广告
朋友介绍
多项选择
[多项选择]您从何处获知我们的产品？((这是字段123描述))
微信
微博
电梯间广告
朋友介绍
多项选择
[单项选择]您对我们的产品满意么？((这是字段描述))
非常满意
满意
一般
不满意

[多项选择]您从何处获知我们的产品？((这是字段123描述))
微信
微博
电梯间广告
朋友介绍`;
const regS = text.match(/[\u4e00-\u9fa5]+\n/g);
// arr.forEach((item) => {
//   console.log(item);
// });
/**
 * 分类
 */
const type = text.match(/\[(.*?)\]/g);
const arrList = [];
for (let key in type) {
  const obj = {
    type: type[key],
  };
  arrList.push(obj);
}
``;
const title = text.match(
  /\[(.*?)\]+[\u4e00-\u9fa5|\w|\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]{0,}/g
);
const rules = "单项选择" | "多项选择";
const decribe = text.match(
  /(\[单项选择\]|\[多项选择\])[\u4e00-\u9fa5|+[\s|\u4e00-\u9fa5|\w|\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]{0,}/g
);

console.log(decribe);
// decribe.forEach((key) => {
//   console.log(key.match(/\[(.*?)\]/g)[0]);
// });
const type = {
  单项选择: "radio",
  多项选择: "mutiplate",
};
console.log(text.split("\n"));
let obj = {};
const list = [];
console.time("s");
text.split("\n").forEach((item) => {
  if (/\[(.*?)\]/.test(item)) {
    item = item.replace(/\s/, "");
    obj.type && list.push(obj);
    obj = {};
    obj.options = [];
    obj.title = item.match(
      /(\[单项选择\]|\[多项选择\])[\u4e00-\u9fa5|+[\s|\u4e00-\u9fa5|\w|\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]{0,}/g
    )[0];
    obj.type = item.match(/\[(.*?)\]/)[1];
    obj.describe = item.match(/\(\((.*?)\)\)/)[1];
  } else {
    obj.options && item && obj.options.push(item);
    // obj[key].options = item;
  }
});
list.push(obj);
console.timeEnd("s");
console.log(list);
/**
 * 选项
 */
// text.filter((item) => {
//   if (/[\u4e00-\u9fa5]+\n/.test(item)) {
//     console.log(item.match(/[\u4e00-\u9fa5]+\n/g));
//   }
// });
