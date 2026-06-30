"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _models = _interopRequireDefault(require("../models"));
var _database = _interopRequireDefault(require("../config/database"));
var _constant = require("../constant");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require("sequelize"),
  Op = _require.Op;
var handleGetRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(role_id) {
    var roles;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].Role.findAll({
              where: {
                id: _defineProperty({}, Op.gt, role_id !== null && role_id !== void 0 ? role_id : 5)
              }
            });
          case 3:
            roles = _context.sent;
            if (!(roles.length > 0)) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get roles successfully",
              result: roles
            });
          case 6:
            return _context.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get roles failure"
            });
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function handleGetRoles(_x) {
    return _ref.apply(this, arguments);
  };
}();
var handleCountUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(role_id) {
    var roleCounts, roles, countByRole;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models["default"].User.findAll({
              attributes: ["role_id", [_database["default"].fn("COUNT", _database["default"].col("id")), "user_count"]],
              group: ["role_id"],
              raw: true
            });
          case 3:
            roleCounts = _context2.sent;
            _context2.next = 6;
            return _models["default"].Role.findAll({
              raw: true
            });
          case 6:
            roles = _context2.sent;
            countByRole = roleCounts.map(function (item) {
              var role = roles.find(function (role) {
                return role.id === item.role_id;
              });
              return {
                id: item.role_id,
                name: (role === null || role === void 0 ? void 0 : role.name) || "Unknown",
                slug: (role === null || role === void 0 ? void 0 : role.slug) || "unknown",
                user_count: Number(item.user_count)
              };
            }).sort(function (a, b) {
              return a.id - b.id;
            });
            if (!countByRole) {
              _context2.next = 10;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get users count by role successfully",
              result: countByRole
            });
          case 10:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get users count by role failure"
            });
          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function handleCountUsers(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var handleGetUsers = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(role_id, slug, page, keyword) {
    var currentPage, pageSize, where, searchKeyword, role, _yield$db$User$findAn, count, rows, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            currentPage = page && !_lodash["default"].isNaN(page) ? Number(page) : 1;
            pageSize = 12;
            where = {};
            searchKeyword = keyword === null || keyword === void 0 ? void 0 : keyword.trim();
            if (!(slug && slug !== "all")) {
              _context3.next = 12;
              break;
            }
            _context3.next = 8;
            return _models["default"].Role.findOne({
              where: {
                slug: slug
              },
              raw: true
            });
          case 8:
            role = _context3.sent;
            if (role) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("return", buildUserListResponse([], 0, currentPage, pageSize));
          case 11:
            where.role_id = role.id;
          case 12:
            if (searchKeyword) {
              where[Op.or] = [{
                name: _defineProperty({}, Op.iLike, "%".concat(searchKeyword, "%"))
              }, {
                phone_number: _defineProperty({}, Op.iLike, "%".concat(searchKeyword, "%"))
              }, {
                email: _defineProperty({}, Op.iLike, "%".concat(searchKeyword, "%"))
              }, {
                address: _defineProperty({}, Op.iLike, "%".concat(searchKeyword, "%"))
              }];
            }
            _context3.next = 15;
            return _models["default"].User.findAndCountAll({
              where: where,
              attributes: {
                exclude: ["password"]
              },
              order: [["id", "DESC"]],
              limit: pageSize,
              offset: (currentPage - 1) * pageSize
            });
          case 15:
            _yield$db$User$findAn = _context3.sent;
            count = _yield$db$User$findAn.count;
            rows = _yield$db$User$findAn.rows;
            if (!rows) {
              _context3.next = 23;
              break;
            }
            _context3.next = 21;
            return appendUserDisplayData(rows);
          case 21:
            result = _context3.sent;
            return _context3.abrupt("return", buildUserListResponse(result, count, currentPage, pageSize));
          case 23:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Get user(s) failure."
            });
          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 26]]);
  }));
  return function handleGetUsers(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var handleGetUserByUsername = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(username) {
    var user, _yield$appendUserDisp, _yield$appendUserDisp2, result, avatar;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].User.findOne({
              attributes: {
                exclude: ["password"]
              },
              where: _defineProperty({}, Op.or, [{
                phone_number: username
              }, {
                email: username
              }])
            });
          case 3:
            user = _context4.sent;
            if (!user) {
              _context4.next = 14;
              break;
            }
            _context4.next = 7;
            return appendUserDisplayData([user]);
          case 7:
            _yield$appendUserDisp = _context4.sent;
            _yield$appendUserDisp2 = _slicedToArray(_yield$appendUserDisp, 1);
            result = _yield$appendUserDisp2[0];
            _context4.next = 12;
            return _models["default"].Image.findOne({
              attributes: {
                exclude: ["id", "target_id", "target_type"]
              },
              where: {
                target_id: user.id,
                target_type: "avatar"
              }
            });
          case 12:
            avatar = _context4.sent;
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get user successfully.",
              result: _objectSpread(_objectSpread({}, result), {}, {
                avatar: avatar
              })
            });
          case 14:
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user."
            });
          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function handleGetUserByUsername(_x7) {
    return _ref4.apply(this, arguments);
  };
}();
var handleCreateUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user) {
    var _user$name, _user$birth, _user$bio, _user$role_id, existedUser, hashedPassword, convertedAddress, createdUser;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            if (isValidPassword(user.password)) {
              _context5.next = 3;
              break;
            }
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number."
            });
          case 3:
            _context5.next = 5;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: user.phone_number
              }, {
                email: user.email
              }])
            });
          case 5:
            existedUser = _context5.sent;
            if (!existedUser) {
              _context5.next = 8;
              break;
            }
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Phone number or email already in use."
            });
          case 8:
            hashedPassword = hashPassword(user.password);
            convertedAddress = handleConvertAddressType(user.address);
            _context5.next = 12;
            return _models["default"].User.create({
              phone_number: user.phone_number,
              email: user.email,
              password: hashedPassword,
              name: (_user$name = user.name) !== null && _user$name !== void 0 ? _user$name : user.phone_number,
              birth: (_user$birth = user.birth) !== null && _user$birth !== void 0 ? _user$birth : null,
              bio: (_user$bio = user.bio) !== null && _user$bio !== void 0 ? _user$bio : null,
              address: convertedAddress,
              last_login: null,
              role_id: (_user$role_id = user.role_id) !== null && _user$role_id !== void 0 ? _user$role_id : 3
            });
          case 12:
            createdUser = _context5.sent;
            if (!createdUser) {
              _context5.next = 18;
              break;
            }
            if (!user.avatar) {
              _context5.next = 17;
              break;
            }
            _context5.next = 17;
            return _models["default"].Image.create({
              target_id: createdUser.id,
              target_type: "avatar",
              public_id: user.avatar.public_id,
              secure_url: user.avatar.secure_url,
              thumbnail_url: user.avatar.thumbnail_url
            });
          case 17:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create user successfully."
            });
          case 18:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Create user failure."
            });
          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 21]]);
  }));
  return function handleCreateUser(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var handleUpdateUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(user) {
    var t, existedUser, duplicatedEmail, convertedAddress, updatedUser, _yield$db$Image$findO, _yield$db$Image$findO2, created;
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
                phone_number: user.phone_number
              }
            });
          case 6:
            existedUser = _context6.sent;
            if (existedUser) {
              _context6.next = 11;
              break;
            }
            _context6.next = 10;
            return t.rollback();
          case 10:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user account."
            });
          case 11:
            if (!(user.email && user.email !== existedUser.email)) {
              _context6.next = 19;
              break;
            }
            _context6.next = 14;
            return _models["default"].User.findOne({
              where: {
                email: user.email,
                id: _defineProperty({}, Op.ne, existedUser.id)
              }
            });
          case 14:
            duplicatedEmail = _context6.sent;
            if (!duplicatedEmail) {
              _context6.next = 19;
              break;
            }
            _context6.next = 18;
            return t.rollback();
          case 18:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Email already in use."
            });
          case 19:
            convertedAddress = handleConvertAddressType(user.address);
            updatedUser = {
              name: user.name,
              email: user.email,
              role_id: user.role_id,
              birth: user.birth || null,
              bio: user.bio,
              address: convertedAddress
            };
            if (!(user.password && user.password.trim())) {
              _context6.next = 27;
              break;
            }
            if (isValidPassword(user.password)) {
              _context6.next = 26;
              break;
            }
            _context6.next = 25;
            return t.rollback();
          case 25:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number."
            });
          case 26:
            updatedUser.password = hashPassword(user.password);
          case 27:
            _context6.next = 29;
            return _models["default"].User.update(updatedUser, {
              where: {
                phone_number: user.phone_number
              },
              transaction: t
            });
          case 29:
            if (!user.avatar) {
              _context6.next = 38;
              break;
            }
            _context6.next = 32;
            return _models["default"].Image.findOrCreate({
              where: {
                target_id: existedUser.id,
                target_type: "avatar"
              },
              defaults: _objectSpread({
                target_id: existedUser.id,
                target_type: "avatar"
              }, user.avatar),
              transaction: t
            });
          case 32:
            _yield$db$Image$findO = _context6.sent;
            _yield$db$Image$findO2 = _slicedToArray(_yield$db$Image$findO, 2);
            created = _yield$db$Image$findO2[1];
            if (created) {
              _context6.next = 38;
              break;
            }
            _context6.next = 38;
            return _models["default"].Image.update({
              public_id: user.avatar.public_id,
              secure_url: user.avatar.secure_url,
              thumbnail_url: user.avatar.thumbnail_url
            }, {
              where: {
                target_id: existedUser.id,
                target_type: "avatar"
              },
              transaction: t
            });
          case 38:
            _context6.next = 40;
            return t.commit();
          case 40:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update user successfully."
            });
          case 43:
            _context6.prev = 43;
            _context6.t0 = _context6["catch"](3);
            _context6.next = 47;
            return t.rollback();
          case 47:
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 49:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 43]]);
  }));
  return function handleUpdateUser(_x9) {
    return _ref6.apply(this, arguments);
  };
}();
var handleDeleteUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(user) {
    var existed;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _models["default"].User.findOne({
              where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email
              }
            });
          case 3:
            existed = _context7.sent;
            if (existed) {
              _context7.next = 6;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user account."
            });
          case 6:
            _context7.next = 8;
            return _models["default"].User.destroy({
              where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email
              }
            });
          case 8:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete user successfully."
            });
          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function handleDeleteUser(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

/** SUPPORTER METHODS */

var isNumeric = function isNumeric(input) {
  return !isNaN(input);
};
var handleConvertAddressType = function handleConvertAddressType(address) {
  if (!address) {
    return "";
  }
  if (typeof address === "string") {
    return address;
  }
  var values = [address.location, address.ward, address.district, address.province];
  return values.filter(Boolean).join(" - ");
};
var appendUserDisplayData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(users) {
    var plainUsers, userIds, roleIds, _yield$Promise$all, _yield$Promise$all2, roles, avatars;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            plainUsers = users.map(function (user) {
              return toPlainObject(user);
            });
            userIds = plainUsers.map(function (user) {
              return user.id;
            });
            roleIds = _toConsumableArray(new Set(plainUsers.map(function (user) {
              return user.role_id;
            }).filter(Boolean)));
            _context8.next = 5;
            return Promise.all([_models["default"].Role.findAll({
              where: {
                id: _defineProperty({}, Op["in"], roleIds.length > 0 ? roleIds : [0])
              },
              raw: true
            }), _models["default"].Image.findAll({
              where: {
                target_id: _defineProperty({}, Op["in"], userIds.length > 0 ? userIds : [0]),
                target_type: "avatar"
              },
              raw: true
            })]);
          case 5:
            _yield$Promise$all = _context8.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            roles = _yield$Promise$all2[0];
            avatars = _yield$Promise$all2[1];
            return _context8.abrupt("return", plainUsers.map(function (user) {
              var role = roles.find(function (role) {
                return role.id === user.role_id;
              });
              var avatar = avatars.find(function (image) {
                return image.target_id === user.id;
              });
              return _objectSpread(_objectSpread({}, user), {}, {
                role: (role === null || role === void 0 ? void 0 : role.name) || "",
                role_slug: (role === null || role === void 0 ? void 0 : role.slug) || "",
                avatar_url: (avatar === null || avatar === void 0 ? void 0 : avatar.secure_url) || null
              });
            }));
          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function appendUserDisplayData(_x11) {
    return _ref8.apply(this, arguments);
  };
}();
var buildUserListResponse = function buildUserListResponse(result, count, currentPage, pageSize) {
  return {
    code: _constant.ResponseCode.SUCCESS,
    message: "Get user(s) successfully.",
    page: currentPage,
    total_pages: Math.max(Math.ceil(count / pageSize), 1),
    total_results: count,
    result: result
  };
};
var toPlainObject = function toPlainObject(data) {
  return typeof data.get === "function" ? data.get({
    plain: true
  }) : _objectSpread({}, data);
};
var hashPassword = function hashPassword(password) {
  var salt = _bcryptjs["default"].genSaltSync(10);
  return _bcryptjs["default"].hashSync(password, salt);
};
var isValidPassword = function isValidPassword(password) {
  return typeof password === "string" && /^(?=.*\d)[A-Z].{6,}$/.test(password);
};
module.exports = {
  handleGetRoles: handleGetRoles,
  handleCountUsers: handleCountUsers,
  handleGetUsers: handleGetUsers,
  handleGetUserByUsername: handleGetUserByUsername,
  handleCreateUser: handleCreateUser,
  handleUpdateUser: handleUpdateUser,
  handleDeleteUser: handleDeleteUser
};