/**
 * Object.entries() 返回一个给定对象自身可枚举属性的键值对数组
 * 与for-in循环区别在于。for-in还会枚举原型链中的属性
 * 1.不能遍历不可枚举属性
 * 2.只能枚举本身属性(可枚举)
 * 3.对象自身可枚举属性的键值
 * 4.Object可转换Map
 */
const obj1 = {
    a: 'something',
    b: 42
}
for(const [key, value] of Object.entries(obj1)){
    // console.log(`${key}: ${value}`)
}
/**
 * 类数组
 */
const obj2 = {0: 'a', 1: 'b', 2: 'c'}
// console.log(Object.entries(obj2), 111)

/**
 * 不能遍历不可枚举属性
 */
const myObj = Object.create({}, {getFoo: {value(){ return this.foo}}})
myObj.foo = 'bar'
// console.log(Object.entries(myObj), 222)

/**
 * array extras
 */
Object.entries(obj1).forEach(([key, value]) => {
    console.log(`${key}, ${value}`)
})

/**
 * Object转换成Map
 * Map接受一个可迭代entries。
 */
var obj3 = {foo: 'bar', baz: 42};
var map = new Map(Object.entries(obj3))
console.log(map, 1)

/**
 * Polyfill
 */
// @ts-ignore
Object.entriess = function(obj){
    let ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i)
    while(i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;    
}
// @ts-ignore
console.log(Object.entriess(obj3), 6)