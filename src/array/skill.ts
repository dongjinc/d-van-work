// var a = 0,  
// b = 0;
// function A(a) {
// A = function (b) {
//     console.log(1, 3)
//     console.log(a + b++)
// }
// console.log(a++)
// }
// A(1)
// A(2)


/**
 * 数组交集
 * https://juejin.im/post/5a00226b5188255695390a74#comment
 * https://juejin.im/post/5f12a11b6fb9a07e777eaca5 js 41个技巧
 */
// 数组
// const arr1 = [1,2,3,4,5,8,9], arr2 = [5,6,7,8,9]
// const intersection = arr1.filter(val => ~arr2.indexOf(val))
// console.log(intersection)

// 数组对象
// const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name5', id: 5 }];
// const arr2 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
// const result = arr1.filter(n => arr2.some(m => JSON.stringify(m) === JSON.stringify(n)))
// console.log(result)

/**
 * 数组拷贝复制
 * 浅拷贝
 */
let array1 = [1, 'a', true, null, undefined]
// slice方法
let c1 = array1.slice()
// concat方法
let cc1 = array1.concat()
// from方法
let fc1 = Array.from(array1)
// push方法
let pc1 = [] as any;
Array.prototype.push.apply(pc1, array1)
// map方法
let mc1 = array1.map(val => val)
console.log(mc1)

/**
 * 浅拷贝
 * 1.直接拷贝对象，拷贝引用，两个变量object1和object2之间还是会相互影响
 * 2.只是简单的拷贝对象的第一层属性，基本类型值不再相互影响，如果是引用类型，拷贝的是其引用，内部还是会相互影响的
 */
function shallowClone(source: any){
    if(!source || typeof source !== 'object'){
        return ;
    }
    const targetObj: any = source.constructor === Array?[]:{}
    for(let key in source){
        if(source.hasOwnProperty(key)){
            targetObj[key] = source[key]
        }
    }
    return targetObj
}
var object1 = {
    a: 1,
    obj: {
      b: 'string'
    }
  }
const obj4 = shallowClone(object1)
console.log(obj4)
obj4.a = 2
obj4.obj.b = 3
console.log(obj4, object1)

/**
 * 对象深度拷贝
 * JSON.stringify深度克隆对象
 * 1.无法对函数、RegExp等特殊对象的克隆
 * 2.会抛弃对象的constructor,所有的构造函数会指向Object
 * 3.对象有循环引用，会报错
 * 4.数组中项有undefind，那么转后会变成null
 */




/**
 * 数组是否包含值
 */
// 普通数组
console.log([1,2,3].includes(4)) // boolean
console.log([1,2,3].indexOf(4)) // 返回索引或-1
console.log([1,2,3].find(item => item === 4))   // 数组中没有值返回undefined
console.log([1,2,3].findIndex(item => item === 1))   //如果数组中无值返回-1
// 数组对象
const flag = [{age: 1}, {age: 2}].some(v=>JSON.stringify(v) === JSON.stringify({age: 2}))
console.log(flag)

/**
 * 嵌套对象属性解构
 */
const {info:{dec}}: any = { name: '张三', age: 13, info:{dec: '描述1', info: '信息' }}
console.log(dec)