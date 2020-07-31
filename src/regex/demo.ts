// @ts-nocheck
const text = `[单项a选择]您对我们的产品满意么？((这是字段描述))
非常满意
满意
一般
不满意

[多项选择]您从何处获知我们的产品？((这是字段123描述))
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
`;
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
console.log(title);
const rules = "单项选择" | "多项选择";
const decribe = text.match(
  /(\[单项\*]|\[多项选择\])[\u4e00-\u9fa5|+[\u4e00-\u9fa5|\w|\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]{0,}/g
);

console.log(decribe);
// decribe.forEach((key) => {
//   console.log(key.match(/\[(.*?)\]/g)[0]);
// });

const item = [];
/**
 * 选项
 */
// text.filter((item) => {
//   if (/[\u4e00-\u9fa5]+\n/.test(item)) {
//     console.log(item.match(/[\u4e00-\u9fa5]+\n/g));
//   }
// });
