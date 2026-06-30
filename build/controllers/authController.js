"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var ResponseCode = require("../constant").ResponseCode;
var userAuthService = require("../services/userAuthService");
var customerAuthService = require("../services/customerAuthService");

/** -------------------------------- USER AUTH -------------------------------- */

var userLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, password, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            if (!(username && password)) {
              _context.next = 6;
              break;
            }
            _context.next = 4;
            return userAuthService.handleLogin(username, password);
          case 4:
            data = _context.sent;
            return _context.abrupt("return", res.status(200).json(data));
          case 6:
            return _context.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function userLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var userLogout = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var phone_number, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            phone_number = req.body.phone_number;
            if (!phone_number) {
              _context2.next = 6;
              break;
            }
            _context2.next = 4;
            return userAuthService.handleLogout(phone_number);
          case 4:
            data = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(data));
          case 6:
            return _context2.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function userLogout(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var userRefresh = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var token, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.body["x-refresh-token"];
            if (!token) {
              _context3.next = 6;
              break;
            }
            _context3.next = 4;
            return userAuthService.handleRefreshTokens(token);
          case 4:
            data = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(data));
          case 6:
            return _context3.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function userRefresh(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, name, phone_number, email, password, avatar, address, birth, bio, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, phone_number = _req$body2.phone_number, email = _req$body2.email, password = _req$body2.password, avatar = _req$body2.avatar, address = _req$body2.address, birth = _req$body2.birth, bio = _req$body2.bio;
            if (!(name && phone_number && email)) {
              _context4.next = 6;
              break;
            }
            _context4.next = 4;
            return userAuthService.handleUpdateProfile({
              name: name,
              phone_number: phone_number,
              email: email,
              password: password,
              avatar: avatar,
              address: address,
              birth: birth,
              bio: bio
            });
          case 4:
            data = _context4.sent;
            return _context4.abrupt("return", res.status(200).json(data));
          case 6:
            return _context4.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function updateProfile(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var changeUserPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var username, password, newPassword, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            username = req.body.username;
            password = req.body.password;
            newPassword = req.body.newPassword;
            if (!(!username || !password || !newPassword)) {
              _context5.next = 5;
              break;
            }
            return _context5.abrupt("return", res.status(500).json({
              code: ResponseCode.AUTHENTICATION_ERROR,
              message: "Missing infomation."
            }));
          case 5:
            _context5.next = 7;
            return userAuthService.handleChangePassword(username, password, newPassword);
          case 7:
            data = _context5.sent;
            return _context5.abrupt("return", res.status(200).json(data));
          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function changeUserPassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/** -------------------------------- CUSTOMER AUTH -------------------------------- */

var customerLogin = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, username, password, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;
            if (!(username && password)) {
              _context6.next = 6;
              break;
            }
            _context6.next = 4;
            return customerAuthService.handleLogin(username, password);
          case 4:
            data = _context6.sent;
            return _context6.abrupt("return", res.status(200).json(data));
          case 6:
            return _context6.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function customerLogin(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var customerLogout = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var phone_number, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            phone_number = req.body.phone_number;
            if (!phone_number) {
              _context7.next = 6;
              break;
            }
            _context7.next = 4;
            return customerAuthService.handleLogout(phone_number);
          case 4:
            data = _context7.sent;
            return _context7.abrupt("return", res.status(200).json(data));
          case 6:
            return _context7.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function customerLogout(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var customerRegister = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body4, phone_number, email, password, confirm_password, name, address, data;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$body4 = req.body, phone_number = _req$body4.phone_number, email = _req$body4.email, password = _req$body4.password, confirm_password = _req$body4.confirm_password, name = _req$body4.name, address = _req$body4.address;
            if (!(phone_number && email && password && confirm_password && name && address)) {
              _context8.next = 6;
              break;
            }
            _context8.next = 4;
            return customerAuthService.handleRegister({
              phone_number: phone_number,
              email: email,
              password: password,
              confirm_password: confirm_password,
              name: name,
              address: address
            });
          case 4:
            data = _context8.sent;
            return _context8.abrupt("return", res.status(200).json(data));
          case 6:
            return _context8.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function customerRegister(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var customerUpdateProfile = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body5, email, phone_number, phoneNumber, name, birth, address, avatar, bio, normalizedPhoneNumber, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$body5 = req.body, email = _req$body5.email, phone_number = _req$body5.phone_number, phoneNumber = _req$body5.phoneNumber, name = _req$body5.name, birth = _req$body5.birth, address = _req$body5.address, avatar = _req$body5.avatar, bio = _req$body5.bio;
            normalizedPhoneNumber = phone_number || phoneNumber;
            if (!(normalizedPhoneNumber && email && name)) {
              _context9.next = 7;
              break;
            }
            _context9.next = 5;
            return customerAuthService.handleUpdateProfile({
              email: email,
              phone_number: normalizedPhoneNumber,
              name: name,
              birth: birth,
              address: address,
              avatar: avatar,
              bio: bio
            });
          case 5:
            data = _context9.sent;
            return _context9.abrupt("return", res.status(200).json(data));
          case 7:
            return _context9.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function customerUpdateProfile(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var customerVerifyRefreshToken = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var token, data;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            token = req.body["x-refresh-token"];
            if (token) {
              _context10.next = 3;
              break;
            }
            return _context10.abrupt("return", res.status(403).json({
              code: ResponseCode.AUTHORIZATION_ERROR,
              message: "Forbidden. Invalid refresh token."
            }));
          case 3:
            _context10.next = 5;
            return customerAuthService.handleVerifyRefreshToken(token);
          case 5:
            data = _context10.sent;
            return _context10.abrupt("return", res.status(200).json(data));
          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function customerVerifyRefreshToken(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var customerRefreshTokens = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var token, data;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            token = req.body["x-refresh-token"];
            if (token) {
              _context11.next = 3;
              break;
            }
            return _context11.abrupt("return", res.status(403).json({
              code: ResponseCode.AUTHORIZATION_ERROR,
              message: "Forbidden. Invalid refresh token."
            }));
          case 3:
            _context11.next = 5;
            return customerAuthService.handleRefreshTokens(token);
          case 5:
            data = _context11.sent;
            return _context11.abrupt("return", res.status(200).json(data));
          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return function customerRefreshTokens(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var changeCustomerPassword = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var phoneNumber, password, newPassword, data;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            phoneNumber = req.body.phone_number || req.body.phoneNumber;
            password = req.body.password;
            newPassword = req.body.newPassword;
            if (!(!phoneNumber || !password || !newPassword)) {
              _context12.next = 5;
              break;
            }
            return _context12.abrupt("return", res.status(500).json({
              code: ResponseCode.AUTHENTICATION_ERROR,
              message: "Missing infomation."
            }));
          case 5:
            _context12.next = 7;
            return customerAuthService.handleChangePassword(phoneNumber, password, newPassword);
          case 7:
            data = _context12.sent;
            return _context12.abrupt("return", res.status(200).json(data));
          case 9:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return function changeCustomerPassword(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var _default = {
  userLogin: userLogin,
  userLogout: userLogout,
  userRefresh: userRefresh,
  updateProfile: updateProfile,
  changeUserPassword: changeUserPassword,
  customerLogin: customerLogin,
  customerLogout: customerLogout,
  customerRegister: customerRegister,
  customerUpdateProfile: customerUpdateProfile,
  customerRefreshTokens: customerRefreshTokens,
  customerVerifyRefreshToken: customerVerifyRefreshToken,
  changeCustomerPassword: changeCustomerPassword
};
exports["default"] = _default;