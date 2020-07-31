// @ts-nocheck
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
    this.name = '123'
    this.age = age
}
// 
const obj = NewOne(Aa, 1, 2)
console.log(obj, 111)

/**
 * 实现一个JSON.stringify
 * Boolean Number String 类型自动转换成对应的原始值
 */
function jsonStringify(obj: any){
    let type = typeof obj
    if(type !== "object"){
        if(/string|undefined|function/.test(type)){
            obj = '"'+ obj +'"'
        }
    } else {
        let json = []
        let arr = Array.isArray(obj)
        for (let k in obj){
            let v = obj[k]
            let type = typeof v
            if(/string|undefined|function/.test(type)){
                v = '"'+ v +'"'
            } else if(type === "object"){
                v = jsonStringify(v)
            }
            json.push((arr?"": `"${k}":${String(v)}`))
            console.log(json, 123)
        }
        return (arr?"[":"{") + String(json) + (arr?"]": "}")
    }
}
console.log(jsonStringify([undefined]))
/**
 * 实现一个继承
 * 寄生组合式继承
 */
function Parent(name: any){
    this.name = name
}
Parent.prototype.sayName = function(){
    console.log('parent name:'+ this.name)
}
function Child(name: any, parentName: any){
    Parent.call(this, parentName)
    this.name = name
}
function create(proto: any){
    function F(){}
    F.prototype = proto
    return new F()
}
Child.prototype = create(Parent.prototype)

Child.prototype.constructor = Child

const parent = new Parent('father')
parent.sayName()
const child = new Child('dong', 'yy')
child.sayName()

/**
 * 柯里化
 * 接受多个参数的函数变成接受一个单一参数的函数
 */
function curry(fn, arg){
    /**
     * 函数multiFn实参个数
     */
    const length = fn.length
    const arg = arg || []
    return function () {
        const newArgs = arg.concat(Array.prototype.slice.call(arguments))
        if(newArgs.length < length){
        console.log(newArgs)
            return curry.call(this, fn, newArgs)
        } else {
            return fn.apply(this, newArgs)
        }
    }
}

function multiFn(a, b, c, d){
    return a * b * c
}
const multi = curry(multiFn)
// console.log(multi(1,2,3))
console.log(multi(1)(2)(3))
