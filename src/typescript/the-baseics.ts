/**
 * static type-checking
 */
const message = "hello world";
// message()

/**
 * non-expection failures
 */
const user = {
  name: "Daniel",
  age: 26,
};
// user.location

const announcement = "hello world";
announcement.toLocaleLowerCase;

const value = Math.random() < 0.5 ? "a" : "b";
if (value === "a") {
  // ...
} else if (value === "b") {
}

/**
 * types for tooling
 */

/**
 * tsc, the typescript compiler
 * tsc --noEmitOnError xxx.ts
 */

/**
 * Explicit types
 */
function greet(persion: string, date: Date) {
  console.log(`Hello ${persion}, today is ${date.toDateString()}!`);
}
greet("1", new Date());

/**
 * infer types
 */
let msg = "hello there";

/**
 * erased types
 */

/**
 * downleveling
 * tsc --target es2015 xxx.ts
 */

/**
 * Strictness
 */

/**
 * noImplicitAny
 * strictNullChecks
 */

// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
