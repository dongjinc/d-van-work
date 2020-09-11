
// global.gc()
// console.log(process.memoryUsage())

// let map1 = new Map();
// let key = new Array(5 * 1024 * 1024);
// map1.set(key, 1);
// // global.gc();
// // console.log(process.memoryUsage()) // 51638272 ≈ 51.6M
// // //@ts-ignore
// // key = null
// // global.gc();
// // console.log(process.memoryUsage()) // 51638272 ≈ 51.6M

// map1.delete(key)
// // @ts-ignore
// key = null;
// global.gc();
// console.log(process.memoryUsage())  // 9.68M


global.gc();
console.log(process.memoryUsage())  // 9.15M
let wm = new WeakMap()
let key2 = new Array(5 * 1024 * 1024)
wm.set(key2, 1)
global.gc();
console.log(process.memoryUsage())  // 51.6M
// @ts-ignore
key2 = null
global.gc();
console.log(process.memoryUsage())  // 10.2M


