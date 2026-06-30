"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _index = require("../constant/index.js");
var _orderService = _interopRequireDefault(require("../services/orderService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var jwt = require("jsonwebtoken");
var getPaymentMethods = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _orderService["default"].handleGetPaymentMethods();
          case 2:
            data = _context.sent;
            return _context.abrupt("return", res.status(200).json(data));
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getPaymentMethods(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getOrderStatuses = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _orderService["default"].handleGetOrderStatuses();
          case 2:
            data = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(data));
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getOrderStatuses(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getOrder = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$query, order_uuid, encoded_uuids, phone_number, data, _data, _data2;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$query = req.query, order_uuid = _req$query.order_uuid, encoded_uuids = _req$query.encoded_uuids, phone_number = _req$query.phone_number;
            if (!order_uuid) {
              _context3.next = 6;
              break;
            }
            _context3.next = 4;
            return _orderService["default"].handleGetOneOrderByUuid(order_uuid);
          case 4:
            data = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(data));
          case 6:
            if (!encoded_uuids) {
              _context3.next = 11;
              break;
            }
            _context3.next = 9;
            return _orderService["default"].handleGetOrdersByUuids(encoded_uuids);
          case 9:
            _data = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(_data));
          case 11:
            if (!phone_number) {
              _context3.next = 16;
              break;
            }
            _context3.next = 14;
            return _orderService["default"].handleGetOrdersByUserPhoneNumber(phone_number);
          case 14:
            _data2 = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(_data2));
          case 16:
            return _context3.abrupt("return", res.status(500).json({
              code: _index.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s)."
            }));
          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getOrder(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllOrder = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$query2, status_id, status, page, keyword, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // const authorizationHeader = req.headers["authorization"];
            // const token = authorizationHeader.split(" ")[1]; // 'Beaer <Token>'
            // jwt.verify(token, process.env.NODE_ACCESS_TOKEN_SECRET_KEY, (err, data) => {
            //     if (err || data.role_id >= 3) {
            //         return res.status(401).json({
            //             code: ResponseCode.AUTHORIZATION_ERROR,
            //             message: "Forbidden. Access denied.",
            //         });
            //     }
            // });
            // delete req.headers["authorization"];
            _req$query2 = req.query, status_id = _req$query2.status_id, status = _req$query2.status, page = _req$query2.page, keyword = _req$query2.keyword;
            _context4.next = 3;
            return _orderService["default"].handleGetAllOrders(status_id || status, page, keyword);
          case 3:
            data = _context4.sent;
            return _context4.abrupt("return", res.status(200).json(data));
          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function getAllOrder(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var createOrder = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, customerPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, customerPhoneNumber = _req$body.customerPhoneNumber, items = _req$body.items, note = _req$body.note, paymentDetails = _req$body.paymentDetails, paymentMethod = _req$body.paymentMethod, shippingAddress = _req$body.shippingAddress;
            if (!(customerPhoneNumber && items && paymentDetails && paymentMethod && shippingAddress)) {
              _context5.next = 6;
              break;
            }
            _context5.next = 4;
            return _orderService["default"].handleCreateOrder({
              customerPhoneNumber: customerPhoneNumber,
              items: items,
              note: note,
              paymentDetails: paymentDetails,
              paymentMethod: paymentMethod,
              shippingAddress: shippingAddress
            });
          case 4:
            data = _context5.sent;
            return _context5.abrupt("return", res.status(200).json(data));
          case 6:
            return _context5.abrupt("return", res.status(500).json({
              code: _index.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s)."
            }));
          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function createOrder(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updateOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var order_uuid, _req$user, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            order_uuid = req.body.order_uuid;
            if (!order_uuid) {
              _context6.next = 6;
              break;
            }
            _context6.next = 4;
            return _orderService["default"].handleUpdateOrder(req.body, (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.phone_number);
          case 4:
            data = _context6.sent;
            return _context6.abrupt("return", res.status(200).json(data));
          case 6:
            return _context6.abrupt("return", res.status(400).json({
              code: _index.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s)."
            }));
          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function updateOrder(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var confirmOrder = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$user2, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!req.body.uuid) {
              _context7.next = 5;
              break;
            }
            _context7.next = 3;
            return _orderService["default"].handleConfirmOrder(req.body.uuid, (_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.phone_number);
          case 3:
            data = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context7.abrupt("return", res.status(200).json({
              code: 1,
              message: "missing parameter(s)"
            }));
          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function confirmOrder(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var deliveryOrder = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$user3, data;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!req.body.uuid) {
              _context8.next = 5;
              break;
            }
            _context8.next = 3;
            return _orderService["default"].handleDeliveryOrder(req.body.uuid, (_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3.phone_number);
          case 3:
            data = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context8.abrupt("return", res.status(200).json({
              code: 1,
              message: "missing parameter(s)"
            }));
          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function deliveryOrder(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var finishedOrder = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$user4, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!req.body.uuid) {
              _context9.next = 5;
              break;
            }
            _context9.next = 3;
            return _orderService["default"].handleFinishedOrder(req.body.uuid, (_req$user4 = req.user) === null || _req$user4 === void 0 ? void 0 : _req$user4.phone_number);
          case 3:
            data = _context9.sent;
            return _context9.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context9.abrupt("return", res.status(200).json({
              code: 1,
              message: "missing parameter(s)"
            }));
          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function finishedOrder(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var cancelOrder = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$user5, data;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!req.body.uuid) {
              _context10.next = 5;
              break;
            }
            _context10.next = 3;
            return _orderService["default"].handleCancelOrder(req.body.uuid, (_req$user5 = req.user) === null || _req$user5 === void 0 ? void 0 : _req$user5.phone_number);
          case 3:
            data = _context10.sent;
            return _context10.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context10.abrupt("return", res.status(200).json({
              code: 1,
              message: "missing parameter(s)"
            }));
          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function cancelOrder(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var deleteOrder = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!(req.body.id || req.body.uuid || req.body.order_uuid)) {
              _context11.next = 5;
              break;
            }
            _context11.next = 3;
            return _orderService["default"].handleDeleteOrder(req.body);
          case 3:
            data = _context11.sent;
            return _context11.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context11.abrupt("return", res.status(200).json({
              code: 1,
              message: "missing parameter(s)"
            }));
          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return function deleteOrder(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var _default = {
  getPaymentMethods: getPaymentMethods,
  getOrderStatuses: getOrderStatuses,
  getAllOrder: getAllOrder,
  getOrder: getOrder,
  createOrder: createOrder,
  updateOrder: updateOrder,
  confirmOrder: confirmOrder,
  deliveryOrder: deliveryOrder,
  finishedOrder: finishedOrder,
  cancelOrder: cancelOrder,
  deleteOrder: deleteOrder
};
exports["default"] = _default;