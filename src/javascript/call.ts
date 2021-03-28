/**
 * 类数组
 * 1.具有：指向对象元素的数字索引下标和length属性
 * 2.不具有：比如push、unshift、forEach、indexOf方法
 */
// 类数组对象转数组
// [].slice.call(arguments)
// Array.from(arguments) 类数组、可遍历对象
// [...arguments]

// 为什么要有类数组对象
/**
 * JavaScript类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。
 * Array存储的对象能动态增多和减少，并且可以存储任何JavaScript值。
 * JavaScript引擎会做一些内部优化，以便对数组的操作可以很快。
 * 然而，随着Web应用程序变得越来越强大，尤其一些新增加的功能例如：音频视频编辑，访问WebSockets的原始数据等，
 * 很明显有些时候如果使用JavaScript代码可以快速方便地通过类型化数组来操作原始的二进制数据，这将会非常有帮助。
 * 主要是可以更快的操作复杂数据
 */

//@ts-nocheck
Function.prototype.call2 = function (ctx) {
  ctx = ctx ? Object(ctx) : window;
  ctx.fn = this;

  var args = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  // 类数组转数组方法
  var result = eval("context.fn(" + args + ")");
  delete ctx.fn;
  return result;
};

Function.prototype.apply2 = function (ctx, arr) {
  ctx = ctx ? Object(ctx) : window;
  ctx.fn = this;

  var result;
  // 是否有第二个参数
  if (!arr) {
    result = ctx.fn();
  } else {
    var args = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("ctx.fn(" + args + ")");
  }
  delete ctx.fn;
  return result;
};
