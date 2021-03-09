/**
 * 1.显示混入
 */

//  function Vehicle(){
//      this.engines = 1
//  }
//  Vehicle.prototype.ig

// function mixin(sourceObj, targetObj){
//     for(const key in sourceObj){
//         console.log(key in targetObj, 1)
//         if(!(key in targetObj)){
//             targetObj[key] = sourceObj[key]
//         }
//     }
//     return targetObj
// }

var Vehicle = {
  engines: 1,
  ignition: function () {
    console.log("turning");
  },
  drive: function () {
    this.ignition();
    console.log("Streeing", this);
  },
};

// drive: function(){
//     // 由于Car和Vehicle中都有drive函数，为了指明调用对象，必须使用绝对引用。
//     // 如果直接执行Vehicle.dirve()函数调用this会被绑定到Vehicle对象而不是Car对象，使用.call(this)来确保drive在Car对象的上下文执行
//     复杂显示伪多态方法
//     Vehicle.drive.call(this)
//     console.log(this.wheels)
// }
/**
 * 如果函数Car.drive的名称标识符并没有和Vehicle.drive重叠（可以理解为Car对象中不存在drive方法），就不需要实现方法多态。因为调用mixin时，会把函数Vehicle.drive引用复制到Car中。可以直接访问this.drive
 */
// var Car = mixin(Vehicle, {
//     wheels: 4
// })
// console.log(Car.drive())

/**
 * 混合复制
 *
 */
function mixins(sourceObj, targetObj) {
  for (const key in sourceObj) {
    targetObj[key] = sourceObj[key];
  }
  return sourceObj;
}

const Car1 = mixins(Vehicle, {});
const love = mixins(
  {
    wheels: 4,
    drive: function () {
      console.log(this.wheels);
    },
  },
  Car1
);
// Car1.drive()
// console.log(Vehicle.drive)

/**
 * 寄生继承
 * 显示混入模式到一种变体被称为"寄生继承"，既是显示又是隐式的
 */

function Vehicle1() {
  this.engines = 1;
}
Vehicle1.prototype.ignition = function () {
  console.log("Turning on my");
};
Vehicle1.prototype.drive = function () {
  this.ignition();
  console.log("Streeing");
};
function Car2() {
  const car = new Vehicle1();
  car.wheels = 4;
  const vehDrive = car.drive;
  car.drive = function () {
    vehDrive.call(this);
    console.log(this.wheels);
  };
  return car;
}
const myCar = Car2();
myCar.drive();

/**
 * 隐式混入
 * 与之前提到的显式伪多态很像
 */
const something = {
  cool: function () {
    // @ts-ignore
    this.greeting = "hello world";
    // @ts-ignore
    this.count = this.count ? this.count + 1 : 1;
  },
};
something.cool();
// @ts-ignore
console.log(something.greeting);

const another = {
  cool: function () {
    something.cool.call(this);
  },
};
another.cool();
// @ts-ignore
console.log(another.greeting);
