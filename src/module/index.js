// let { counter, makeCounterIncrease } = require("./export");
import { counter, makeCounterIncrease } from "./export.js";
console.log(counter);
makeCounterIncrease();
console.log(counter);
// counter += 1; // error
console.log(counter);
