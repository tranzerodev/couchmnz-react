"use strict";

exports.__esModule = true;
exports.default = compose;
// Exact copy over from recompose library
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/compose.js

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}
module.exports = exports["default"];