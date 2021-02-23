let buffer = new ArrayBuffer(8);
let view = new Uint32Array(buffer);
console.log(Uint32Array.BYTES_PER_ELEMENT); // 4
console.log(Uint16Array.BYTES_PER_ELEMENT); // 2
console.log(Uint8Array.BYTES_PER_ELEMENT); // 1
console.log(view.length);
console.log(view.byteLength);
view[0] = 123;
for (let num of view) {
  console.log(num);
}

// let arr = new Uint8Array([1, 2, 3, 4]);
// console.log(arr.length);

// let arr16 = new Uint16Array([1, 1000]);
// let arr8 = new Uint8Array(arr16);
// console.log(arr8);

// let unit8array = new Uint8Array(16);
// let num = 256;
// console.log(num.toString(2));
// unit8array[0] = 256;
// unit8array[1] = 257;
// console.log(unit8array);

// DataView
// let buffer = new Uint8Array([255, 255, 255, 255]).buffer;
// let dataView = new DataView(buffer);
// console.log(dataView.getUint8(0));
// console.log(dataView.getUint16(0));
// console.log(dataView.getUint32(0));

function closure() {
  const obj = {
    name: "dongjincheng",
  };
  function modifyObj(name) {
    obj.name = name || "djk";
  }
  function getObj() {
    return obj;
  }
  return {
    modifyObj,
    getObj,
  };
}
const closure1 = closure();
closure1.modifyObj();
console.log(closure1.getObj(), 1);
const closure2 = closure();
console.log(closure2.getObj(), 2);

function callName(age, name) {
  this.age = age;
  this.name = name;
}

const nameBind = callName.bind(null, 18);
const djc = new nameBind("dongjincheng");
console.log(djc);
