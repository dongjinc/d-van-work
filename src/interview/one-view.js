var func;
if (true) {
  var name = "func";
  func = function () {
    console.log(name);
  };
  // func()
}
name = "kobe";
func();
var name = 2;
function love() {
  var name = 1;
  return function () {
    console.log(name);
  };
}

async function async1() {
  await Promise.resolve();
  console.log(1);
}
async1().then(() => {
  console.log(2);
});
