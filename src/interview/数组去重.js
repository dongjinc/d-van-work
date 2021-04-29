// 临时数组法
// function uniqArray(arr) {
//   const temp = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (temp.indexOf(arr[i]) === -1) {
//       temp.push(arr[i]);
//     }
//   }
//   return temp;
// }

// 下标数组法
// function uniqArray(arr) {
//   const temp = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr.indexOf(arr[i]) === i) {
//       temp.push(arr[i]);
//     }
//   }
//   return temp;
// }

// set
function uniqArray(arr) {
  return Array.from(new Set(arr));
}

// 利用对象去重
function uniqArray(arr) {
  const uniqObj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!uniqObj[arr[i]]) {
      uniqObj[arr[i]] = arr[i];
    }
  }
  return Object.values(uniqObj);
}

// 对于不定参数采用的措施
// function restArray(...array) {
//   // console.log(Array.prototype.slice.call(arguments));
//   // console.log(Array.from(arguments));
//   // console.log([...arguments]);
//   // console.log(Object.values(arguments));
//   console.log(array);
// }
// restArray([1, 2, 3], [2, 3, 3]);
// restArray([1, 2, 3], [2, 3, 3], [2, 3, 1]);
console.log(uniqArray([1, 2, 2, 1, 2, 3, 4, 5, 4, 3]));
