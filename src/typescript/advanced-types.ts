/**
 * 高级类型
 * 
 * 1.交叉类型
 * 2.联合类型
 * 3.类型保护
 * 4.null和undefined
 * 5.类型保护和类型断言
 * 6.类型别名
 * 7.字面量类型
 * 8.枚举成员类型
 * 9.可辨识联合
 */
// 交叉类型
 const mergeFunc = <T , U>(arg1: T, arg2: U): T & U => {
     let res = {} as T & U
    return res
}
// 联合类型
const getLengthFunc = (content: string | number): number => {
    if(typeof content === 'string') {
        return content.length
    } else {
        return content.toString().length
    }
}
// 类型保护
const lista = [11, '12']
const getRandomValue = () => {
    const number = Math.random() * 10
    if(number > 5) {
        return lista[0]
    } else {
        return lista[1]
    }
}
function isString(value: string | number): value is string{
    return typeof value === 'string'
}
const itema = getRandomValue()

if(isString(itema)){
    console.log(itema.length)
} else {
    console.log(itema.toFixed())
}
// typeof 类型保护 适用于 string/number/boolean/symbol
if(typeof itema === 'string'){
    console.log(item.length)
}
// instanceof 检测某个实例是来自于哪个构造函数以及类
class CreateClassInstance1 {
    public age = 1
    constructor(){}
}
class CreateClassInstance2 {
    public name = 'love'
    constructor(){}
}
const getRandomClass = () => {
    return Math.random() < 0.5? new CreateClassInstance1() : new CreateClassInstance2()
}
const item1 = getRandomClass()
if(item1 instanceof CreateClassInstance1){
    console.log(item1.age)
}

// null / undefined

// 类型保护和类型断言