"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _models = _interopRequireDefault(require("../models"));
var _constant = require("../constant");
var _database = _interopRequireDefault(require("../config/database"));
var _lodash = _interopRequireDefault(require("lodash"));
var _excluded = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded2 = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded3 = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded4 = ["id", "shipping_address_id", "payment_method_id", "status_id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require("sequelize"),
  Op = _require.Op;
var handleGetPaymentMethods = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var paymentMethods;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].PaymentMethod.findAll();
          case 3:
            paymentMethods = _context.sent;
            if (!paymentMethods) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get payment methods successfully",
              result: paymentMethods
            });
          case 6:
            return _context.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get payment methods failure"
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
  return function handleGetPaymentMethods() {
    return _ref.apply(this, arguments);
  };
}();
var handleGetOrderStatuses = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var statuses;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models["default"].Status.findAll({
              order: [["id", "ASC"]]
            });
          case 3:
            statuses = _context2.sent;
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved order statuses successfully",
              result: statuses
            });
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving order statuses."
            });
          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function handleGetOrderStatuses() {
    return _ref2.apply(this, arguments);
  };
}();
var handleGetAllOrders = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(status_id, page, keyword) {
    var t, currentPage, normalizedKeyword, where, _yield$Promise$all, _yield$Promise$all2, shippingAddressesMatched, orderDetailsMatched, matchedShippingAddressIds, matchedOrderUuids, keywordFilter, _yield$db$Order$findA, count, orders, _yield$Promise$all3, _yield$Promise$all4, orderDetails, shippingAddresses, paymentMethods, orderStatuses, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            t = _database["default"].transaction();
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            _context3.prev = 2;
            normalizedKeyword = "".concat(keyword || "").trim();
            where = {};
            if (status_id && status_id !== "all") {
              where.status_id = status_id;
            }
            if (!normalizedKeyword) {
              _context3.next = 20;
              break;
            }
            _context3.next = 9;
            return Promise.all([_models["default"].ShippingAddress.findAll({
              attributes: ["id"],
              where: _defineProperty({}, Op.or, [{
                receiver_address: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
              }, {
                receiver_name: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
              }, {
                receiver_phone: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
              }])
            }), _models["default"].OrderDetail.findAll({
              attributes: ["order_uuid"],
              where: _defineProperty({}, Op.or, [{
                name: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
              }, {
                slug: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
              }])
            })]);
          case 9:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            shippingAddressesMatched = _yield$Promise$all2[0];
            orderDetailsMatched = _yield$Promise$all2[1];
            matchedShippingAddressIds = shippingAddressesMatched.map(function (address) {
              return address.id;
            });
            matchedOrderUuids = orderDetailsMatched.map(function (detail) {
              return detail.order_uuid;
            });
            keywordFilter = [{
              order_uuid: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
            }, {
              customer_phone_number: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
            }, {
              note: _defineProperty({}, Op.iLike, "%".concat(normalizedKeyword, "%"))
            }];
            if (!Number.isNaN(Number(normalizedKeyword))) {
              keywordFilter.push({
                total: Number(normalizedKeyword)
              });
            }
            if (matchedShippingAddressIds.length > 0) {
              keywordFilter.push({
                shipping_address_id: matchedShippingAddressIds
              });
            }
            if (matchedOrderUuids.length > 0) {
              keywordFilter.push({
                order_uuid: matchedOrderUuids
              });
            }
            where[Op.or] = keywordFilter;
          case 20:
            _context3.next = 22;
            return _models["default"].Order.findAndCountAll({
              where: where,
              order: [["id", "DESC"]],
              limit: 12,
              offset: (currentPage - 1) * 12
            });
          case 22:
            _yield$db$Order$findA = _context3.sent;
            count = _yield$db$Order$findA.count;
            orders = _yield$db$Order$findA.rows;
            if (!(count > 0)) {
              _context3.next = 36;
              break;
            }
            _context3.next = 28;
            return Promise.all([_models["default"].OrderDetail.findAll({
              where: {
                order_uuid: orders.map(function (order) {
                  return order.order_uuid;
                })
              }
            }), _models["default"].ShippingAddress.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.shipping_address_id;
                })
              }
            }), _models["default"].PaymentMethod.findAll(), _models["default"].Status.findAll()]);
          case 28:
            _yield$Promise$all3 = _context3.sent;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 4);
            orderDetails = _yield$Promise$all4[0];
            shippingAddresses = _yield$Promise$all4[1];
            paymentMethods = _yield$Promise$all4[2];
            orderStatuses = _yield$Promise$all4[3];
            result = orders.map(function (order) {
              var id = order.id,
                shipping_address_id = order.shipping_address_id,
                payment_method_id = order.payment_method_id,
                status_id = order.status_id,
                rest = _objectWithoutProperties(order, _excluded);
              var orderStatus = orderStatuses.find(function (status) {
                return status.id === status_id;
              });
              var orderDetail = orderDetails.filter(function (detail) {
                return detail.order_uuid === order.order_uuid;
              });
              var shippingAddress = shippingAddresses.find(function (address) {
                return address.id === shipping_address_id;
              });
              var paymentMethod = paymentMethods.find(function (method) {
                return method.id === payment_method_id;
              });
              return _objectSpread(_objectSpread({}, rest), {}, {
                status: orderStatus,
                items: orderDetail,
                shipping_address: shippingAddress,
                payment_method: paymentMethod
              });
            });
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: result
            });
          case 36:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Orders not found.",
              page: currentPage,
              total_pages: 1,
              total_results: 0,
              result: []
            });
          case 39:
            _context3.prev = 39;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 43:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 39]]);
  }));
  return function handleGetAllOrders(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
var handleGetOneOrderByUuid = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(order_uuid) {
    var order, id, shipping_address_id, payment_method_id, status_id, rest, _yield$Promise$all5, _yield$Promise$all6, order_status, order_details, shipping_address, payment_method, history;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].Order.findOne({
              where: {
                order_uuid: order_uuid
              },
              raw: true
            });
          case 3:
            order = _context4.sent;
            if (!order) {
              _context4.next = 16;
              break;
            }
            id = order.id, shipping_address_id = order.shipping_address_id, payment_method_id = order.payment_method_id, status_id = order.status_id, rest = _objectWithoutProperties(order, _excluded2);
            _context4.next = 8;
            return Promise.all([_models["default"].Status.findOne({
              where: {
                id: status_id
              },
              raw: true
            }), _models["default"].OrderDetail.findAll({
              where: {
                order_uuid: order_uuid
              },
              raw: true
            }), _models["default"].ShippingAddress.findOne({
              where: {
                id: shipping_address_id
              },
              raw: true
            }), _models["default"].PaymentMethod.findOne({
              where: {
                id: payment_method_id
              },
              raw: true
            }), _models["default"].HistoryOrderUpdate.findAll({
              where: {
                order_uuid: order_uuid
              },
              order: [["createdAt", "DESC"]],
              raw: true
            })]);
          case 8:
            _yield$Promise$all5 = _context4.sent;
            _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 5);
            order_status = _yield$Promise$all6[0];
            order_details = _yield$Promise$all6[1];
            shipping_address = _yield$Promise$all6[2];
            payment_method = _yield$Promise$all6[3];
            history = _yield$Promise$all6[4];
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved order ".concat(order_uuid, " successfully"),
              result: _objectSpread(_objectSpread({}, rest), {}, {
                status: order_status,
                items: order_details,
                shipping_address: shipping_address,
                payment_method: payment_method,
                history: history
              })
            });
          case 16:
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Order ".concat(order_uuid, " not found.")
            });
          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the order."
            });
          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 19]]);
  }));
  return function handleGetOneOrderByUuid(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var handleGetOrdersByUuids = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(encodedUuids) {
    var t, decodedUuids, uuids, orders, _yield$Promise$all7, _yield$Promise$all8, orderDetails, orderStatuses, shippingAddresses, paymentMethods, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            t = _database["default"].transaction();
            _context5.prev = 1;
            decodedUuids = decodeURIComponent(encodedUuids);
            if (!_lodash["default"].isEmpty(decodedUuids)) {
              _context5.next = 5;
              break;
            }
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 5:
            uuids = decodedUuids.split(",");
            _context5.next = 8;
            return _models["default"].Order.findAll({
              where: {
                order_uuid: uuids
              }
            });
          case 8:
            orders = _context5.sent;
            if (!(orders.length > 0)) {
              _context5.next = 20;
              break;
            }
            _context5.next = 12;
            return Promise.all([_models["default"].OrderDetail.findAll({
              where: {
                order_uuid: uuids
              }
            }), _models["default"].Status.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.status_id;
                })
              }
            }), _models["default"].ShippingAddress.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.shipping_address_id;
                })
              }
            }), _models["default"].PaymentMethod.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.payment_method_id;
                })
              }
            })]);
          case 12:
            _yield$Promise$all7 = _context5.sent;
            _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 4);
            orderDetails = _yield$Promise$all8[0];
            orderStatuses = _yield$Promise$all8[1];
            shippingAddresses = _yield$Promise$all8[2];
            paymentMethods = _yield$Promise$all8[3];
            result = orders.map(function (order) {
              var id = order.id,
                shipping_address_id = order.shipping_address_id,
                payment_method_id = order.payment_method_id,
                status_id = order.status_id,
                rest = _objectWithoutProperties(order, _excluded3);
              var orderStatus = orderStatuses.find(function (status) {
                return status.id === status_id;
              });
              var orderDetail = orderDetails.filter(function (detail) {
                return detail.order_uuid === order.order_uuid;
              });
              var shippingAddress = shippingAddresses.find(function (address) {
                return address.id === shipping_address_id;
              });
              var paymentMethod = paymentMethods.find(function (method) {
                return method.id === payment_method_id;
              });
              return _objectSpread(_objectSpread({}, rest), {}, {
                status: orderStatus,
                items: orderDetail,
                shipping_address: shippingAddress,
                payment_method: paymentMethod
              });
            });
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              result: result
            });
          case 20:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 23:
            _context5.prev = 23;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 23]]);
  }));
  return function handleGetOrdersByUuids(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var handleGetOrdersByUserPhoneNumber = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(phone_number) {
    var t, user, orders, _yield$Promise$all9, _yield$Promise$all10, orderDetails, orderStatuses, shippingAddresses, paymentMethods, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            t = _database["default"].transaction();
            _context6.prev = 1;
            _context6.next = 4;
            return _models["default"].User.findOne({
              where: {
                phone_number: phone_number
              }
            });
          case 4:
            user = _context6.sent;
            if (!user) {
              _context6.next = 20;
              break;
            }
            _context6.next = 8;
            return _models["default"].Order.findAll({
              where: {
                customer_phone_number: user.phone_number
              }
            });
          case 8:
            orders = _context6.sent;
            if (!(orders.length > 0)) {
              _context6.next = 20;
              break;
            }
            _context6.next = 12;
            return Promise.all([_models["default"].OrderDetail.findAll({
              where: {
                order_uuid: orders.map(function (order) {
                  return order.order_uuid;
                })
              }
            }), _models["default"].Status.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.status_id;
                })
              }
            }), _models["default"].ShippingAddress.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.shipping_address_id;
                })
              }
            }), _models["default"].PaymentMethod.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.payment_method_id;
                })
              }
            })]);
          case 12:
            _yield$Promise$all9 = _context6.sent;
            _yield$Promise$all10 = _slicedToArray(_yield$Promise$all9, 4);
            orderDetails = _yield$Promise$all10[0];
            orderStatuses = _yield$Promise$all10[1];
            shippingAddresses = _yield$Promise$all10[2];
            paymentMethods = _yield$Promise$all10[3];
            result = orders.map(function (order) {
              var id = order.id,
                shipping_address_id = order.shipping_address_id,
                payment_method_id = order.payment_method_id,
                status_id = order.status_id,
                rest = _objectWithoutProperties(order, _excluded4);
              var orderDetail = orderDetails.filter(function (detail) {
                return detail.order_uuid === order.order_uuid;
              });
              var orderStatus = orderStatuses.find(function (status) {
                return status.id === status_id;
              });
              var shippingAddress = shippingAddresses.find(function (address) {
                return address.id === shipping_address_id;
              });
              var paymentMethod = paymentMethods.find(function (method) {
                return method.id === payment_method_id;
              });
              return _objectSpread(_objectSpread({}, rest), {}, {
                status: orderStatus,
                items: orderDetail,
                shipping_address: shippingAddress,
                payment_method: paymentMethod
              });
            });
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              result: result
            });
          case 20:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 27:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 23]]);
  }));
  return function handleGetOrdersByUserPhoneNumber(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var handleCreateOrder = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(order) {
    var t, thisMoment, datetimeUuid, customerPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress, _yield$db$ShippingAdd, _yield$db$ShippingAdd2, shipping_adddress, created, orderDataToInsert, orderItemsToInsert, historyDataToInsert;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _database["default"].transaction();
          case 2:
            t = _context7.sent;
            _context7.prev = 3;
            thisMoment = new Date();
            datetimeUuid = thisMoment.valueOf();
            customerPhoneNumber = order.customerPhoneNumber, items = order.items, note = order.note, paymentDetails = order.paymentDetails, paymentMethod = order.paymentMethod, shippingAddress = order.shippingAddress;
            _context7.next = 9;
            return _models["default"].ShippingAddress.findOrCreate({
              where: _objectSpread({}, shippingAddress),
              defaults: shippingAddress,
              transaction: t
            });
          case 9:
            _yield$db$ShippingAdd = _context7.sent;
            _yield$db$ShippingAdd2 = _slicedToArray(_yield$db$ShippingAdd, 2);
            shipping_adddress = _yield$db$ShippingAdd2[0];
            created = _yield$db$ShippingAdd2[1];
            orderDataToInsert = _objectSpread(_objectSpread({
              order_uuid: datetimeUuid,
              customer_phone_number: customerPhoneNumber,
              shipping_address_id: shipping_adddress.id,
              payment_method_id: paymentMethod.id
            }, paymentDetails), {}, {
              status_id: 1,
              note: note
            });
            orderItemsToInsert = items.map(function (_ref8) {
              var id = _ref8.id,
                name = _ref8.name,
                slug = _ref8.slug,
                price = _ref8.price,
                quantity = _ref8.quantity,
                feature_image_url = _ref8.feature_image_url;
              return {
                order_uuid: datetimeUuid,
                product_id: id,
                slug: slug,
                name: name,
                price: price,
                quantity: quantity,
                feature_image_url: feature_image_url
              };
            });
            historyDataToInsert = {
              order_uuid: datetimeUuid,
              employee_id: null,
              status_id: 1,
              description: "Kh\xE1ch ".concat(customerPhoneNumber, " \u0111\u1EB7t h\xE0ng")
            };
            _context7.next = 18;
            return Promise.all([_models["default"].Order.create(orderDataToInsert, {
              transaction: t
            }), _models["default"].OrderDetail.bulkCreate(orderItemsToInsert, {
              transaction: t
            }), _models["default"].HistoryOrderUpdate.create(historyDataToInsert, {
              transaction: t
            })]);
          case 18:
            _context7.next = 20;
            return t.commit();
          case 20:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create order successfully",
              result: datetimeUuid
            });
          case 23:
            _context7.prev = 23;
            _context7.t0 = _context7["catch"](3);
            _context7.next = 27;
            return t.rollback();
          case 27:
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred during the transaction."
            });
          case 29:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 23]]);
  }));
  return function handleCreateOrder(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var handleConfirmOrder = function handleConfirmOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              data = {};
              _context8.prev = 1;
              _context8.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context8.sent;
              if (!targetOrder) {
                _context8.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code < 1)) {
                _context8.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 1,
                description: "Đã xác nhận",
                time: thisMoment.toISOString()
              }]);
              _context8.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "this order has been confirmed";
            case 14:
              _context8.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context8.next = 24;
              break;
            case 21:
              _context8.prev = 21;
              _context8.t0 = _context8["catch"](1);
              reject(_context8.t0);
            case 24:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[1, 21]]);
    }));
    return function (_x8, _x9) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var handleDeliveryOrder = function handleDeliveryOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              data = {};
              _context9.prev = 1;
              _context9.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context9.sent;
              if (!targetOrder) {
                _context9.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code < 2)) {
                _context9.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 2,
                description: "Đang giao hàng",
                time: thisMoment.toISOString()
              }]);
              _context9.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "this order being delivery";
            case 14:
              _context9.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context9.next = 24;
              break;
            case 21:
              _context9.prev = 21;
              _context9.t0 = _context9["catch"](1);
              reject(_context9.t0);
            case 24:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[1, 21]]);
    }));
    return function (_x10, _x11) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var handleFinishedOrder = function handleFinishedOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              data = {};
              _context10.prev = 1;
              _context10.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context10.sent;
              if (!targetOrder) {
                _context10.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code === 2)) {
                _context10.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 3,
                description: "Giao hàng thành công",
                time: thisMoment.toISOString()
              }]);
              _context10.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "delivery success";
            case 14:
              _context10.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context10.next = 24;
              break;
            case 21:
              _context10.prev = 21;
              _context10.t0 = _context10["catch"](1);
              reject(_context10.t0);
            case 24:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[1, 21]]);
    }));
    return function (_x12, _x13) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var handleCancelOrder = function handleCancelOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              data = {};
              _context11.prev = 1;
              _context11.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context11.sent;
              if (!targetOrder) {
                _context11.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code !== 4)) {
                _context11.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 4,
                description: "Đã hủy",
                time: thisMoment.toISOString()
              }]);
              _context11.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "this order has been cancelled";
            case 14:
              _context11.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context11.next = 24;
              break;
            case 21:
              _context11.prev = 21;
              _context11.t0 = _context11["catch"](1);
              reject(_context11.t0);
            case 24:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[1, 21]]);
    }));
    return function (_x14, _x15) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var handleDeleteOrder = function handleDeleteOrder(orderId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var data, targetOrder;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              data = {};
              _context12.prev = 1;
              _context12.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  id: orderId
                }
              });
            case 4:
              targetOrder = _context12.sent;
              if (!targetOrder) {
                _context12.next = 12;
                break;
              }
              _context12.next = 8;
              return _models["default"].Order.destroy({
                where: {
                  id: orderId
                }
              });
            case 8:
              data.code = 0;
              data.message = "delete order success";
              _context12.next = 14;
              break;
            case 12:
              data.code = 1;
              data.message = "invalid order";
            case 14:
              resolve(data);
              _context12.next = 20;
              break;
            case 17:
              _context12.prev = 17;
              _context12.t0 = _context12["catch"](1);
              reject(_context12.t0);
            case 20:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[1, 17]]);
    }));
    return function (_x16, _x17) {
      return _ref13.apply(this, arguments);
    };
  }());
};
var getEmployeeIdByPhone = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(phoneNumber) {
    var employee;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (phoneNumber) {
              _context13.next = 2;
              break;
            }
            return _context13.abrupt("return", null);
          case 2:
            _context13.next = 4;
            return _models["default"].User.findOne({
              attributes: ["id"],
              where: {
                phone_number: phoneNumber
              }
            });
          case 4:
            employee = _context13.sent;
            return _context13.abrupt("return", (employee === null || employee === void 0 ? void 0 : employee.id) || null);
          case 6:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return function getEmployeeIdByPhone(_x18) {
    return _ref14.apply(this, arguments);
  };
}();
var handleUpdateOrder = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data, employeePhoneNumber) {
    var t, order_uuid, status_id, note, payment_method_id, shipping_address, order, orderUpdates, nextStatusId, status;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _database["default"].transaction();
          case 2:
            t = _context14.sent;
            _context14.prev = 3;
            order_uuid = data.order_uuid, status_id = data.status_id, note = data.note, payment_method_id = data.payment_method_id, shipping_address = data.shipping_address;
            _context14.next = 7;
            return _models["default"].Order.findOne({
              where: {
                order_uuid: order_uuid
              },
              transaction: t
            });
          case 7:
            order = _context14.sent;
            if (order) {
              _context14.next = 12;
              break;
            }
            _context14.next = 11;
            return t.rollback();
          case 11:
            return _context14.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Order not found."
            });
          case 12:
            orderUpdates = {};
            nextStatusId = status_id ? Number(status_id) : null;
            if (!(nextStatusId && nextStatusId !== Number(order.status_id))) {
              _context14.next = 34;
              break;
            }
            _context14.next = 17;
            return _models["default"].Status.findOne({
              where: {
                id: nextStatusId
              },
              transaction: t
            });
          case 17:
            status = _context14.sent;
            if (status) {
              _context14.next = 22;
              break;
            }
            _context14.next = 21;
            return t.rollback();
          case 21:
            return _context14.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Order status not found."
            });
          case 22:
            orderUpdates.status_id = nextStatusId;
            _context14.t0 = _models["default"].HistoryOrderUpdate;
            _context14.t1 = order_uuid;
            _context14.next = 27;
            return getEmployeeIdByPhone(employeePhoneNumber);
          case 27:
            _context14.t2 = _context14.sent;
            _context14.t3 = nextStatusId;
            _context14.t4 = "Update order status to ".concat(status.code);
            _context14.t5 = {
              order_uuid: _context14.t1,
              employee_id: _context14.t2,
              status_id: _context14.t3,
              description: _context14.t4
            };
            _context14.t6 = {
              transaction: t
            };
            _context14.next = 34;
            return _context14.t0.create.call(_context14.t0, _context14.t5, _context14.t6);
          case 34:
            if (note !== undefined) {
              orderUpdates.note = note;
            }
            if (payment_method_id) {
              orderUpdates.payment_method_id = Number(payment_method_id);
            }
            if (!shipping_address) {
              _context14.next = 39;
              break;
            }
            _context14.next = 39;
            return _models["default"].ShippingAddress.update({
              receiver_name: shipping_address.receiver_name,
              receiver_phone: shipping_address.receiver_phone,
              receiver_address: shipping_address.receiver_address
            }, {
              where: {
                id: order.shipping_address_id
              },
              transaction: t
            });
          case 39:
            if (!(Object.keys(orderUpdates).length > 0)) {
              _context14.next = 42;
              break;
            }
            _context14.next = 42;
            return _models["default"].Order.update(orderUpdates, {
              where: {
                order_uuid: order_uuid
              },
              transaction: t
            });
          case 42:
            _context14.next = 44;
            return t.commit();
          case 44:
            return _context14.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update order successfully"
            });
          case 47:
            _context14.prev = 47;
            _context14.t7 = _context14["catch"](3);
            _context14.next = 51;
            return t.rollback();
          case 51:
            console.log(_context14.t7);
            return _context14.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while updating the order."
            });
          case 53:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[3, 47]]);
  }));
  return function handleUpdateOrder(_x19, _x20) {
    return _ref15.apply(this, arguments);
  };
}();
var handleChangeOrderStatus = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(uuid, statusId, employeePhoneNumber, description) {
    var data;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return handleUpdateOrder({
              order_uuid: uuid,
              status_id: statusId
            }, employeePhoneNumber);
          case 2:
            data = _context15.sent;
            return _context15.abrupt("return", {
              code: data.code,
              message: data.code === _constant.ResponseCode.SUCCESS ? description : data.message
            });
          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return function handleChangeOrderStatus(_x21, _x22, _x23, _x24) {
    return _ref16.apply(this, arguments);
  };
}();
handleConfirmOrder = function handleConfirmOrder(uuid, employeePhoneNumber) {
  return handleChangeOrderStatus(uuid, 2, employeePhoneNumber, "this order has been confirmed");
};
handleDeliveryOrder = function handleDeliveryOrder(uuid, employeePhoneNumber) {
  return handleChangeOrderStatus(uuid, 3, employeePhoneNumber, "this order being delivery");
};
handleFinishedOrder = function handleFinishedOrder(uuid, employeePhoneNumber) {
  return handleChangeOrderStatus(uuid, 4, employeePhoneNumber, "delivery success");
};
handleCancelOrder = function handleCancelOrder(uuid, employeePhoneNumber) {
  return handleChangeOrderStatus(uuid, 5, employeePhoneNumber, "this order has been cancelled");
};
handleDeleteOrder = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(_ref17) {
    var id, uuid, order_uuid, t, where, targetOrder;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            id = _ref17.id, uuid = _ref17.uuid, order_uuid = _ref17.order_uuid;
            _context16.next = 3;
            return _database["default"].transaction();
          case 3:
            t = _context16.sent;
            where = order_uuid || uuid ? {
              order_uuid: order_uuid || uuid
            } : {
              id: id
            };
            _context16.prev = 5;
            _context16.next = 8;
            return _models["default"].Order.findOne({
              where: where,
              transaction: t
            });
          case 8:
            targetOrder = _context16.sent;
            if (targetOrder) {
              _context16.next = 13;
              break;
            }
            _context16.next = 12;
            return t.rollback();
          case 12:
            return _context16.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "invalid order"
            });
          case 13:
            _context16.next = 15;
            return Promise.all([_models["default"].HistoryOrderUpdate.destroy({
              where: {
                order_uuid: targetOrder.order_uuid
              },
              transaction: t
            }), _models["default"].OrderDetail.destroy({
              where: {
                order_uuid: targetOrder.order_uuid
              },
              transaction: t
            })]);
          case 15:
            _context16.next = 17;
            return _models["default"].Order.destroy({
              where: {
                id: targetOrder.id
              },
              transaction: t
            });
          case 17:
            _context16.next = 19;
            return t.commit();
          case 19:
            return _context16.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "delete order success"
            });
          case 22:
            _context16.prev = 22;
            _context16.t0 = _context16["catch"](5);
            _context16.next = 26;
            return t.rollback();
          case 26:
            console.log(_context16.t0);
            return _context16.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while deleting the order."
            });
          case 28:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[5, 22]]);
  }));
  return function handleDeleteOrder(_x25) {
    return _ref18.apply(this, arguments);
  };
}();
module.exports = {
  handleGetPaymentMethods: handleGetPaymentMethods,
  handleGetOrderStatuses: handleGetOrderStatuses,
  handleGetAllOrders: handleGetAllOrders,
  handleGetOneOrderByUuid: handleGetOneOrderByUuid,
  handleGetOrdersByUuids: handleGetOrdersByUuids,
  handleGetOrdersByUserPhoneNumber: handleGetOrdersByUserPhoneNumber,
  handleCreateOrder: handleCreateOrder,
  handleUpdateOrder: handleUpdateOrder,
  handleConfirmOrder: handleConfirmOrder,
  handleDeliveryOrder: handleDeliveryOrder,
  handleFinishedOrder: handleFinishedOrder,
  handleCancelOrder: handleCancelOrder,
  handleDeleteOrder: handleDeleteOrder
};