"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _constant = require("../constant");
var _models = _interopRequireDefault(require("../models"));
var _database = _interopRequireDefault(require("../config/database"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require("sequelize"),
  Op = _require.Op;
/** CUSTOMER */

var handleLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(username, password) {
    var normalizedUsername, user, anyRoleUser, _isValidPassword, avatar, accessToken, refreshToken, userData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            normalizedUsername = normalizeUsername(username);
            _context.next = 4;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: normalizedUsername,
                role_id: 3
              }, {
                email: normalizedUsername,
                role_id: 3
              }])
            });
          case 4:
            user = _context.sent;
            if (user) {
              _context.next = 12;
              break;
            }
            _context.next = 8;
            return _models["default"].User.findOne({
              attributes: ["role_id"],
              where: _defineProperty({}, Op.or, [{
                phone_number: normalizedUsername
              }, {
                email: normalizedUsername
              }]),
              raw: true
            });
          case 8:
            anyRoleUser = _context.sent;
            if (!(anyRoleUser && Number(anyRoleUser.role_id) !== 3)) {
              _context.next = 11;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.AUTHENTICATION_ERROR,
              message: "Tài khoản này thuộc trang quản trị, vui lòng đăng nhập ở admin."
            });
          case 11:
            return _context.abrupt("return", {
              code: _constant.ResponseCode.AUTHENTICATION_ERROR,
              message: "Incorrect Username or Password"
            });
          case 12:
            _context.next = 14;
            return verifyPasswordAndUpgrade(user, password);
          case 14:
            _isValidPassword = _context.sent;
            if (_isValidPassword) {
              _context.next = 17;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.AUTHENTICATION_ERROR,
              message: "Incorrect Username or Password"
            });
          case 17:
            _context.next = 19;
            return _models["default"].Image.findOne({
              attributes: {
                exclude: ["id", "target_id", "target_type"]
              },
              where: {
                target_id: user.id,
                target_type: "avatar"
              }
            });
          case 19:
            avatar = _context.sent;
            accessToken = handleGenerateAccessToken(user);
            _context.next = 23;
            return handleGenerateRefreshToken(user);
          case 23:
            refreshToken = _context.sent;
            userData = toPlainObject(user);
            delete userData.password;
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Authentication successfully",
              result: _objectSpread(_objectSpread({}, userData), {}, {
                avatar: avatar
              }),
              accessToken: accessToken,
              refreshToken: refreshToken
            });
          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 29]]);
  }));
  return function handleLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var handleRegister = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user) {
    var _user$name, normalizedUser, existedUser, hashedPassword, createdUser, createdUserData, accessToken, refreshToken;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            normalizedUser = _objectSpread(_objectSpread({}, user), {}, {
              phone_number: typeof user.phone_number === "string" ? user.phone_number.trim() : user.phone_number,
              email: typeof user.email === "string" ? user.email.trim().toLowerCase() : user.email
            });
            if (isValidPassword(user.password)) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number."
            });
          case 4:
            _context2.next = 6;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: normalizedUser.phone_number
              }, {
                email: normalizedUser.email
              }])
            });
          case 6:
            existedUser = _context2.sent;
            if (!existedUser) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Phone number or email already in use."
            });
          case 9:
            if (_lodash["default"].isEqual(user.password, user.confirm_password)) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Confirm password do not match."
            });
          case 11:
            hashedPassword = hashPassword(user.password);
            _context2.next = 14;
            return _models["default"].User.create({
              phone_number: normalizedUser.phone_number,
              email: normalizedUser.email,
              password: hashedPassword,
              name: (_user$name = user.name) !== null && _user$name !== void 0 ? _user$name : normalizedUser.phone_number,
              address: user.address,
              last_login: null,
              birth: null,
              role_id: 3,
              bio: null
            });
          case 14:
            createdUser = _context2.sent;
            if (!createdUser) {
              _context2.next = 23;
              break;
            }
            createdUserData = toPlainObject(createdUser);
            delete createdUserData.password;
            accessToken = handleGenerateAccessToken(createdUserData);
            _context2.next = 21;
            return handleGenerateRefreshToken(createdUserData);
          case 21:
            refreshToken = _context2.sent;
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Register successfully.",
              result: createdUserData,
              accessToken: accessToken,
              refreshToken: refreshToken
            });
          case 23:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Register unsuccessfully."
            });
          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 26]]);
  }));
  return function handleRegister(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/** TOKEN */
var handleLogout = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(phone_number) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models["default"].RefreshToken.destroy({
              where: {
                phone_number: phone_number
              }
            });
          case 3:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Logout successfully."
            });
          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return function handleLogout(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var handleRefreshTokens = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(refreshToken) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              _jsonwebtoken["default"].verify(refreshToken, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(error, data) {
                  var existedRefreshToken, newAccessToken, newRefreshToken;
                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!error) {
                            _context4.next = 4;
                            break;
                          }
                          reject({
                            code: _constant.ResponseCode.AUTHORIZATION_ERROR,
                            message: "Forbidden. Invalid refresh token."
                          });
                          _context4.next = 23;
                          break;
                        case 4:
                          _context4.prev = 4;
                          _context4.next = 7;
                          return _models["default"].RefreshToken.findOne({
                            where: {
                              phone_number: data.phone_number
                            }
                          });
                        case 7:
                          existedRefreshToken = _context4.sent;
                          if (!(existedRefreshToken && existedRefreshToken.token === refreshToken)) {
                            _context4.next = 16;
                            break;
                          }
                          newAccessToken = handleGenerateAccessToken(data);
                          _context4.next = 12;
                          return handleGenerateRefreshToken(data);
                        case 12:
                          newRefreshToken = _context4.sent;
                          resolve({
                            code: _constant.ResponseCode.SUCCESS,
                            message: "Refresh successfully.",
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken
                          });
                          _context4.next = 17;
                          break;
                        case 16:
                          reject({
                            code: _constant.ResponseCode.AUTHORIZATION_ERROR,
                            message: "Forbidden. Invalid refresh token."
                          });
                        case 17:
                          _context4.next = 23;
                          break;
                        case 19:
                          _context4.prev = 19;
                          _context4.t0 = _context4["catch"](4);
                          console.error(_context4.t0);
                          reject({
                            code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
                            message: "An error occurred."
                          });
                        case 23:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, null, [[4, 19]]);
                }));
                return function (_x6, _x7) {
                  return _ref5.apply(this, arguments);
                };
              }());
            })["catch"](function (err2) {
              console.log(err2);
              return err2;
            }));
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function handleRefreshTokens(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var handleUpdateProfile = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(profile) {
    var t, _profile$birth, _profile$bio, user, updates, _yield$db$Image$findO, _yield$db$Image$findO2, image, created;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _database["default"].transaction();
          case 2:
            t = _context6.sent;
            _context6.prev = 3;
            _context6.next = 6;
            return _models["default"].User.findOne({
              where: {
                phone_number: profile.phone_number,
                email: profile.email,
                role_id: 3
              },
              transaction: t
            });
          case 6:
            user = _context6.sent;
            if (user) {
              _context6.next = 11;
              break;
            }
            _context6.next = 10;
            return t.rollback();
          case 10:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid account."
            });
          case 11:
            updates = {
              name: profile.name,
              birth: (_profile$birth = profile.birth) !== null && _profile$birth !== void 0 ? _profile$birth : null,
              bio: (_profile$bio = profile.bio) !== null && _profile$bio !== void 0 ? _profile$bio : null
            };
            if (profile.address) {
              updates.address = typeof profile.address === "string" ? profile.address : handleConvertAddressType(profile.address);
            }
            _context6.next = 15;
            return _models["default"].User.update(updates, {
              where: {
                id: user.id
              },
              transaction: t
            });
          case 15:
            if (!profile.avatar) {
              _context6.next = 25;
              break;
            }
            _context6.next = 18;
            return _models["default"].Image.findOrCreate({
              where: {
                target_id: user.id,
                target_type: "avatar"
              },
              defaults: {
                target_id: user.id,
                target_type: "avatar",
                public_id: profile.avatar.public_id,
                secure_url: profile.avatar.secure_url,
                thumbnail_url: profile.avatar.thumbnail_url
              },
              transaction: t
            });
          case 18:
            _yield$db$Image$findO = _context6.sent;
            _yield$db$Image$findO2 = _slicedToArray(_yield$db$Image$findO, 2);
            image = _yield$db$Image$findO2[0];
            created = _yield$db$Image$findO2[1];
            if (created) {
              _context6.next = 25;
              break;
            }
            _context6.next = 25;
            return _models["default"].Image.update({
              public_id: profile.avatar.public_id,
              secure_url: profile.avatar.secure_url,
              thumbnail_url: profile.avatar.thumbnail_url
            }, {
              where: {
                id: image.id
              },
              transaction: t
            });
          case 25:
            _context6.next = 27;
            return t.commit();
          case 27:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update profile successfully."
            });
          case 30:
            _context6.prev = 30;
            _context6.t0 = _context6["catch"](3);
            _context6.next = 34;
            return t.rollback();
          case 34:
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 36:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 30]]);
  }));
  return function handleUpdateProfile(_x8) {
    return _ref6.apply(this, arguments);
  };
}();
var handleChangePassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(phoneNumber, password, newPassword) {
    var user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _models["default"].User.findOne({
              where: {
                phone_number: phoneNumber,
                role_id: 3
              }
            });
          case 3:
            user = _context7.sent;
            _context7.t0 = !user;
            if (_context7.t0) {
              _context7.next = 9;
              break;
            }
            _context7.next = 8;
            return verifyPasswordAndUpgrade(user, password);
          case 8:
            _context7.t0 = !_context7.sent;
          case 9:
            if (!_context7.t0) {
              _context7.next = 11;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.AUTHENTICATION_ERROR,
              message: "Incorrect phone number or password."
            });
          case 11:
            if (isValidPassword(newPassword)) {
              _context7.next = 13;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number."
            });
          case 13:
            _context7.next = 15;
            return _models["default"].User.update({
              password: hashPassword(newPassword)
            }, {
              where: {
                id: user.id
              }
            });
          case 15:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Password has been changed."
            });
          case 18:
            _context7.prev = 18;
            _context7.t1 = _context7["catch"](0);
            console.log(_context7.t1);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function handleChangePassword(_x9, _x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();
var handleGenerateAccessToken = function handleGenerateAccessToken(user) {
  var accessToken = _jsonwebtoken["default"].sign({
    time: Date(),
    email: user.email,
    phone_number: user.phone_number,
    role_id: user.role_id
  }, process.env.NODE_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: process.env.NODE_ACCESS_TOKEN_EXPIRES_IN
  });
  return accessToken;
};
var handleGenerateRefreshToken = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(user) {
    var newRefreshToken, expirationDate, newRecords, _yield$db$RefreshToke, _yield$db$RefreshToke2, refreshToken, created;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            newRefreshToken = _jsonwebtoken["default"].sign({
              time: Date(),
              email: user.email,
              phone_number: user.phone_number,
              role_id: user.role_id
            }, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, {
              expiresIn: process.env.NODE_REFRESH_TOKEN_EXPIRES_IN
            });
            expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            newRecords = {
              phone_number: user.phone_number,
              token: newRefreshToken,
              expirationDate: expirationDate
            };
            _context8.next = 6;
            return _models["default"].RefreshToken.findOrCreate({
              where: {
                phone_number: user.phone_number
              },
              defaults: newRecords
            });
          case 6:
            _yield$db$RefreshToke = _context8.sent;
            _yield$db$RefreshToke2 = _slicedToArray(_yield$db$RefreshToke, 2);
            refreshToken = _yield$db$RefreshToke2[0];
            created = _yield$db$RefreshToke2[1];
            if (created) {
              _context8.next = 13;
              break;
            }
            _context8.next = 13;
            return _models["default"].RefreshToken.update({
              token: newRefreshToken,
              expirationDate: expirationDate
            }, {
              where: {
                phone_number: user.phone_number
              }
            });
          case 13:
            return _context8.abrupt("return", newRefreshToken);
          case 16:
            _context8.prev = 16;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;
          case 19:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 16]]);
  }));
  return function handleGenerateRefreshToken(_x12) {
    return _ref8.apply(this, arguments);
  };
}();

/** SUPPORTER METHODS */

var isExistPhone = function isExistPhone(currentPhone) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var customer;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _models["default"].Customer.findOne({
                where: {
                  phoneNumber: currentPhone
                }
              });
            case 3:
              customer = _context9.sent;
              if (customer) {
                resolve(true);
              } else {
                resolve(false);
              }
              _context9.next = 10;
              break;
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              reject(_context9.t0);
            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 7]]);
    }));
    return function (_x13, _x14) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var hashPassword = function hashPassword(password) {
  var salt = _bcryptjs["default"].genSaltSync(10);
  return _bcryptjs["default"].hashSync(password, salt);
};
var isBcryptHash = function isBcryptHash(password) {
  return typeof password === "string" && /^\$2[aby]\$\d{2}\$/.test(password);
};
var verifyPasswordAndUpgrade = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(user, password) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!isBcryptHash(user.password)) {
              _context10.next = 2;
              break;
            }
            return _context10.abrupt("return", _bcryptjs["default"].compareSync(password, user.password));
          case 2:
            if (!(user.password !== password)) {
              _context10.next = 4;
              break;
            }
            return _context10.abrupt("return", false);
          case 4:
            _context10.next = 6;
            return _models["default"].User.update({
              password: hashPassword(password)
            }, {
              where: {
                id: user.id
              }
            });
          case 6:
            return _context10.abrupt("return", true);
          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function verifyPasswordAndUpgrade(_x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();
var isValidPassword = function isValidPassword(password) {
  return typeof password === "string" && /^(?=.*\d)[A-Z].{6,}$/.test(password);
};
var normalizeUsername = function normalizeUsername(username) {
  var value = typeof username === "string" ? username.trim() : username;
  return typeof value === "string" && value.includes("@") ? value.toLowerCase() : value;
};
var toPlainObject = function toPlainObject(data) {
  return typeof data.get === "function" ? data.get({
    plain: true
  }) : _objectSpread({}, data);
};
var handleConvertAddressType = function handleConvertAddressType(address) {
  var values = [address.location, address.ward, address.district, address.province];
  return values.filter(Boolean).join(" - ");
};
module.exports = {
  handleLogin: handleLogin,
  handleLogout: handleLogout,
  handleRegister: handleRegister,
  handleRefreshTokens: handleRefreshTokens,
  handleUpdateProfile: handleUpdateProfile,
  handleChangePassword: handleChangePassword
};