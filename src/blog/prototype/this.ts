//@ts-nocheck
// 显示绑定

/**
    function foo(){
        console.log(this.a)
    }
    var obj = {
        a: 2
    }
    foo.call(obj)
 */

// 显示绑定无法解决丢失绑定问题

/**
 *  硬绑定
 * */

 /**
   var bar = function(){
        foo.call(obj)
    }
    bar()
    setTimeout(bar, 100)

  */

// 硬绑定的bar不可能再修改它的this
// bar.call(window)

/**
    function foo(something){
        console.log(this.a, something)
        return this.a + something
    }
    var obj = {
        a: 2
    }
    var bar = function (){
        return foo.apply(obj, arguments)
    }
    var b = bar(3)
    console.log(b)
 */

 /**
  * 重复使用的辅助函数
  */
 /*
    function foo(something){
        console.log(this.a, something)
        return this.a + something
    }
    function bind(fn, obj){
        return function (){
            return fn.apply(obj, arguments)
        }
    }
    var obj = {
        a: 2
    }
    var bar = bind(foo, obj)
    var b = bar(3)
    console.log(b)
*/

/**
 * bind
 */
function foo(el){
    console.log(el, this.id)
}
 var myArray = [1,2,3]
 var obj = {
     id: 'dong'
 }
 myArray.forEach(foo, obj)
 