// @ts-nocheck
Function.prototype.binda = function (context) {
  var self = this;
  var args = [].slice.call(arguments, 1);
  var fNop = function () {};

  var fBound = function () {
    var bindArgs = [].slice.call(arguments);
    return self.apply(
      this instanceof fNop ? this : context,
      args.concat(bindArgs)
    );
  };
  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
};

Function.prototype.softBind = function (obj) {
  var fn = this;
  var args = [].slice.call(arguments, 1);

  var bound = function () {
    var arguments = [].slice.call(arguments);
    return fn.apply(
      !this || this === (window || globalThis) ? obj : this,
      args.concat(arguments)
    );
  };
  bound.prototype = Object.create(this.prototype);
  return bound;
};

/**
 * 原型 原型链 继承
 */
function bingFn(ctx) {
  const self = this;
  const args = [].slice.call(arguments, 1);
  function fNop() {}
  const fnBind = function () {
    const bindArgs = [].slice.call(arguments);
    return self.apply(
      this instanceof fnBind ? this : ctx,
      args.concat(bindArgs)
    );
  };
  fNop.prototype = this.prototype;
  fnBind.prototype = new fNop();
  return fnBind;
}

function softBinds(ctx) {
  const self = this;
  const args = [].slice.call(arguments, 1);
  const bindFn = function () {
    const bindArgs = [].slice.call(arguments);
    return self.apply(
      !this || this === (globalThis || window) ? ctx : this,
      args.concat(bindArgs)
    );
  };
  bindFn.prototype = Object.create(this.prototype);
  return bindFn;
}
