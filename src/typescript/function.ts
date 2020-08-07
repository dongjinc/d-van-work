// function add(arg1: number, arg2: number): number {
//     return arg1 + arg2
// }
// const add = (arg1: number, arg2: number) => arg1 + arg2

// type AddFunction = (arg1: number, arg2: number, arg3?: number ) => number
// let addFunction: AddFunction
// addFunction = (x, b) => x + b
// addFunction = (x, b, c) => x + b + c

/**
 * 函数
 * 创建有名函数和匿名函数
 */
// function add(x, y){
//     return x + y
// }
// let myAdd = function(x, y){
//     return x + y;
// }

// javascript里，函数可以使用函数体外部的变量
// let z = 100
// function addToZ(x, y){
//     return x + y + z
// }

/**
 * 函数类型
 * 参数添加类型之后再为函数本身添加返回值类型
 */
// function add(x: number, y: number): number {
//     return x + y
// }
// let myAdd = (x: number, y: number) => x + y

// ts能够根据返回语句自动推断出返回值类型，因此我们通常省略它
// function add1(x: number, y: number){
//     return x + y
// }

// 书写完整的函数类型
// 函数类型包含两部分，参数类型和返回值类型
// 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确
// 第二部分是返回值类型，对于返回值，函数和返回值类型之间使用 =>
// 函数中使用的捕获变量不会体现再类型里，这些变量是函数的隐藏状态并不是组成API的一部分
// let myAdd: (x: number, y: number) => number = function (x, y) {
//     return x + y
// }

// 推断类型
// let myAdd = function(x: number, y: number): number {
//     return x + y
// }
// 赋值语句一边指定了类型，另一边没有类型的话。ts会自动识别类型
// 这叫 按上下文归类，类型推论的一种。
let myAdd: (baseValue: number, increment: number) => number = function(x, y){
    return x + y
}

/**
 * 可选参数和默认参数
 * 传递给一个函数的参数个数必须与函数期望的参数个数一致。
 */
// function buildName(firstName: string, lastName: string){
//     return buildName + " " + lastName
// }
// let result1 = buildName("Bob") //error. too few parameters
// let result2 = buildName("Bob", "lovea", "as") //error. too many parameters
// let result3 = buildName("Bob", "lovea") //ah, just right

// 可选参数 ？，没传参数的时候，值为undefined
// **可选参数必须跟在必填参数后面
// function buildName(firstName: string, lastName?: string){
//     if(lastName){
//         return firstName +" "+ lastName
//     } else {
//         return firstName
//     }
// }
// let result1 = buildName("Bob")
// let result2 = buildName("Bob", "love", "lop") //error
// let result = buildName("Bob", "Lop")

// **默认参数，当用户没有传递这个参数或传递的值是undefined。叫做默认初始化值的参数
// function buildName(firstName: string, lastName = "Smith"){
//     return firstName + " " + lastName
// }
// let result1 = buildName('Klo')
// let result2 = buildName("Bob", undefined)

// **所有必填参数后面带有默认初始化的参数都是可选的，在调用函数时，可以省略

// function buildName(firstName: string, lastName?: string){

// }
// 和
// function buildName(firstName: string, lastName: string = "Smith"){

// }
type buildName1 = (firstName: string, lastName: string) => string
// **与普通可选参数不同是，默认值的参数不需要放在必填参数的后面。
// **如果默认值的参数出现在参数前面，必须明确传入undefined获得默认值
// function buildName(firstName = "Will", lastName: string) {
//     return firstName + " " + lastName
// }

// let result1 = buildName("Bob") error too few parameters
// let result2 = buildName("Bob", "Admas", "Sr.") error too many parameters
// let result3 = buildName(undefined, "Bjk")


/**
 * 剩余参数
 * **必要参数、默认和可选参数有个共同点：表示某一个参数
 * 如果要操作多个参数，在js中使用arguments
 * **剩余参数会被当作数不限的可选参数。可以一个都没有，同样可以有任意个
 */
// function buildName(firstName: string, ...restOfName: string[]){
//     return firstName + " " + restOfName.join(" ")
// }
// let empolyeeName = buildName("Joseph", "Lucas", "Kolo")
// console.log(empolyeeName)

// 函数类型
function buildName(firstName: string, ...restOfName: string[]){
    return firstName + " " + restOfName.join(' ')
}
let buildNameFn: (fname: string, ...rest: string[]) => string = buildName

/**
 * this和箭头函数
 * **this的值在函数被调用的时候才会指定
 */

let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // 对于this指向问题，ts可以警告这个错误，如果编译器设置了 --noImplicitThis标记
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// this 参数 上面栗子中，this.suits[pickedSuit]类型依旧为any
// **修改方法，提供一个显式的this参数
interface Card{
    suit: string,
    catd: number
}
interface Deck{
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => void
}

let deck1: Deck  = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // this是Deck类型，而非any
    createCardPicker(this){
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {
                suit: this.suits[pickedSuit],
                card: pickedCard % 13
            }
        }
    }
}

// this参数在回调函数里
interface UIElement {
    addClickListener(onclick: (this: void, e:  Event) => void): void
}

// class Handler {
//     info: string;
//     onClickBad(this: Handler, e: Event){
//         // @ts-ignore
//         this.info = e.message
//     }
// }
// let h = new Handler()
let uiElement: UIElement
// uiElement.addClickListener(h.onClickBad) error

// **指定了this类型后，显式声明onClickBad必须在Handler的实例上调用。ts监测到addClickListener要求函数带有this: void。
// class Handler {
//     info: string;
//     onClickGood(this: void, e: Event){
//         console.log('clicked!')
//     }
// }
// let h = new Handler();
// uiElement.addClickListener(h.onClickGood)

// 因为onClickGood指定了this类型为void，因此传递给addClickListener是合法的。当然，这也意味着不能使用this.info。所以不得不使用箭头函数
class Handler{
    info: string;
    onClickGood = (e: Event) => {
        // @ts-ignore
        this.info = e.message
    }
}
let h = new Handler()
uiElement.addClickListener(h.onClickGood)
// ** 这是可行的因为箭头函数不会捕获this。所以把他们传给期望this: void
// 缺点： Handler对象都会创建一个箭头函数。另一方面，添加到Handler原型链上。它们在不同Handler对象间是共享的

/**
 * 重载
 * 一定要把最精确的定义放在最前面
 * 其中带有any类型并不是重载列表的一部分
 */

 /**
  * 总结
  * 1.函数类型 (1)参数添加类型之后再为函数本身添加返回值类型;
  *                  (2)ts能够根据返回语句自动推断出返回值类型，因此我们通常省略它
  * 包含两部分: 参数类型和返回值类型
  * 推断类型 ts会自动识别类型
  * 2.可选参数和默认参数
  * (1)可选参数必须跟在必填参数后面
  * (2)所有必填参数后面带有默认初始化参数都是可选的，调用函数时，可省略
  * 必填参数带有默认初始化参数 与 普通可选参数不同
  * (1)默认值的参数不需要放在必填参数后面
  * (2)默认值的参数出现在参数前面，必须明确传入undefined获得默认值
  * 3.剩余参数
  * 必要参数、默认和可选参数有共同点：表示某一个参数
  * 剩余参数当作不限的可选参数
  * 4.this和箭头函数
  */