/**
 *  闭包：有权访问另外一个函数作用域中的变量的函数
 *  特点：
 *  1. 是一个函数
 *  2. 能访问另外一个函数作用域中的变量
 */

// 1.闭包可以访问当前函数以外的变量
function getOuter(){
    var date = '815'
    function getDate(str){
        console.log(str + date)
    }
}