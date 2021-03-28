// @ts-nocheck
// 内存机制 浏览器运行原理 复习http
// ts
/**
 * 内存空间
 * 堆栈中的调用函数数量超出堆栈的实际大小，浏览器会抛出一个错误终止运行
 */
/**
 * 栈数据结构
 * 特点：后进先出 、 先进后出
 * 变量赋值、数组(push、pop)
 * 基本类型：因为这些类型在内存中分别占有固定大小的空间，通过按值来访问
 * 分类：栈内存、调用栈
 */

/**
 * 堆数据结构
 * 是一种树状结构。存取数据的方式与书架和书非常相似。在json格式的数据中，存储的key-value可以是无序的，顺序的不同并不影响我们的使用
 * 引用类型：这种值大小不固定，不能把它们保存在栈内存中，但内存地址大小固定，因此保存在栈内存中。
 * 当查询引用类型时，先从栈中读取内存地址，通过地址找到堆中的值 -- 引用访问
 */

/**
 * 队列
 * 特点：先进先出
 * 任务队列
 */

// 在计算机的数据结构中，栈比堆的运算速度快，Object是一个复杂的结构且可以扩展，数组可扩充，对象可添加属性，都可以增删改查
// 将他们放在堆中为了不影响栈的效率

// var a = 20;
// var b = a;
// b = 30;
// answer: a = 30
// a、b都是基本类型，存在栈中的，a、b分别有各自独立的栈空间，修改b值，a值不会发生变化

// var a = { name: "前端开发" };
// var b = a;
// b.name = "进阶";
// answer: a.name = 进阶
// a、b都是引用类型，栈内存中存放地址指向堆内存中的对象，引用类型的复制为新的变量自动分配一个新的值保存在变量对象中，但只是引用类型的一个地址指针而已
// 实际指向的是同一个对象，所以修改b.name值，相应的a.name也就发生了改变

var a = { name: "前端开发" };
var b = a;
a = null;
// answer b { name: "前端开发" }
// 对于问题3首先说明是null是基本类型，a=null之后只是把a存储的栈内存中地址改变成了基本类型null，并不会影响堆内存中的对象，所以b值不会受影响

/**
 * 内存空间管理
 * 1.分配你所需要的内存
 * 2.使用分配到的内存(读、写)
 * 3.不需要时将其释放、归还
 * js有自动垃圾收集机制，最常用的是通过标记清除的算法来找到那些对象是不再继续使用的，使用a=null其实仅仅只是做了一个释放引用的操作，让a原本对应的值失去引用，脱离执行环境，这个值
 * 会在下一次垃圾收集齐执行操作时被找到并释放
 * 在局部作用域中，函数执行完毕，局部变量也就没有存在的必要，因此垃圾收集器很容易作出判断并挥手。
 */
