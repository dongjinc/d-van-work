/**
 * https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-1
 * new操作符
 * 1.创建了一个新对象
 * 2.this会指向新创建的对象
 * 3.new创建的对象会被[prototype]链接到这个函数对象上
 * 4.__proto__
 * 5.如果函数没有返回对象Object，包含(Function,Array,Date,RegExg,Error)
 */
function NewOne(func: any){
    const obj = {} as any
    if(func.prototype !== null){
        obj.__proto__ = func.prototype;
    }
    const ret = func.apply(obj, Array.prototype.slice.call(arguments, 1))
    if((typeof ret === 'object' || typeof ret === 'function') && ret !== null){
        return ret;
    }
    return obj;
}
function Aa(age: any){
    //@ts-ignore
    this.name = '123'
    //@ts-ignore
    this.age = age
}
//@ts-ignore
const obj = NewOne(Aa, 1, 2)
console.log(obj, 111)