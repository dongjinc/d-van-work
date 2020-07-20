/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
 * Object.keys 方法返回一个由给定对象自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象返回时的顺序一致
 * 1.不能遍历不可枚举属性
 * 2.只能枚举本身属性(可枚举属性)
 * 3.对象自身可枚举属性组成的数组
 * 获取对象本身属性(包含不可枚举)
 * Object.getOwnPropertyNames
 */

var arr = ["a", "b", "c"];
console.log(Object.keys(arr), 1);
/**
 * 类数组
 */
var anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.keys(anObj), 2)
export default {};

/**
 * 不能遍历不可枚举属性
 * Object.create() 第二个参数 给予默认属性是不可枚举的
 */
var myObj = Object.create({}, {
    getFoo: {
        value: function(){
            return this.foo
        }
    }
})
myObj.foo = 1
console.log(Object.keys(myObj), 3)
/**
 * 获取一个对象所有属性包含不可枚举的
 * Object.getOwnPropertyNames
 */
console.log(Object.getOwnPropertyNames(myObj))

/**
 * 注意 notice
 * 在ES5里，Object.keys 方法的参数不是对象时，会抛出TypeError
 * 在ES2015，非对象的参数将被强制转换为一个对象
 */
console.log(Object.keys("13w123"))
