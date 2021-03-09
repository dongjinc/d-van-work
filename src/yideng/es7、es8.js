/** es7 */
// 1.includes
// 2. **/Math.pow(2, 3)

/**
 * es8
 */
// Async、Await
// next => Promise

// 1.操作异步代码
// 解决 1.嵌套回调 2.Promise 3.Generators
async function add(num){
    const a = 1;
    return num + a;
}
console.log(add(2))
add(3).then(res => {
    console.log(res)
})

// 2.async异步函数 await 

// 错误处理
function promiseFn(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('错误信息')
        }, 1500)
    })
}

async function fn(){
    await promiseFn().catch(err => console.log(err))
    // 为了不影响下面代码执行，可以提前捕获错误信息
    console.log('依然会执行')
}

// 多个await异步命令 Promise.all  28.49

// 3.Object.values()

// 4.Object.entries() 遍历对象 键值
const yideng = {name: 'yideng', age: 4}
Object.entries(yideng)
Object.entries('yideng')

// 5.String Padding
// String.prototype.padStart()
// String.prototype.padEnd()

// 6.结尾允许逗号

// 7.Object.getOwnPropertyDescriptors() // 属性描述符

// 8.SharedArrayBuffer vs Atomics
// 给js带来了多线程的功能，高级特性，js引擎核心改进
new SharedArrayBuffer() // 缓冲区大小，字节byte为单位 1.01.48

// http://caibaojian.com/optimize-large-data.html
// http://caibaojian.com/es6/set-map.html

