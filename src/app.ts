// import '@/object/js-basic/entries'
// import '@/object/js-basic/keys'
// import '@/array/skill'
// import '@/interview/one'
// import "@/regex/demo";

// const { name } = require("@/node/module");
// console.log(name);
import "@/module/index";
/**
 * typescript
 */
// import "@/typescript/generics"
// import "@/typescript/function"
// import "@/typescript/class"
// import "@/typescript/enum"
// import "@/typescript/type"
// import "@/blog/prototype/this"

/**
 * js
 */
// import "@/youdontjs/extend";

// const list = {
//     caliber_style: [{value: "1", label: "DN15"}, {value: "2", label: "DN20"}, {value: "3", label: "DN25"}],
//     classifyone: [{value: "1", label: "总表"}, {value: "2", label: "分表"}, {value: "3", label: "单表"}],
//     meter_status: [{value: "1", label: "启用"}, {value: "2", label: "禁用"}, {value: "3", label: "注销"}],
//     meter_uses: [{value: "1", label: "终端计费"}, {value: "2", label: "区域计量"}],
//     rang_value: [{value: "1", label: "9999"}, {value: "2", label: "99999"}, {value: "3", label: "999999"}]
// }

// const list1 = [{EN: "size", code: "caliber_style"},
//  {EN: "watermeterRange", code: "rang_value"},
//  {EN: "meterstatus", code: "meter_status"},
//  {EN: "meterUses", code: "meter_uses"},
// {EN: "classifyone", code: "classifyone"}]

// for(let item of list1){
//     console.log(item)
// }
// function keyValue(beforeObj: any, afterObj: any){
// // @ts-ignore
//     beforeObj[afterObj['EN']] = list[afterObj['code']]
//     return beforeObj
// }
// // @ts-ignore
// const newObj = list1.reduce(keyValue, {})
// console.log(newObj, 6363)

// const list3 = list1.map(item => ({ //@ts-ignore
//     [item.EN]: list[item.code]
// }))
// const userStr = JSON.stringify(list)
// const newUserStr = JSON.parse(userStr, (key, value) => {
//     console.log(key, value)
//     return value
// })
