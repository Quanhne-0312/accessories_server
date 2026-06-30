"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _lodash = _interopRequireDefault(require("lodash"));
var _database = _interopRequireDefault(require("../config/database"));
var _constant = require("../constant");
var _models = _interopRequireDefault(require("../models"));
var _imageService = _interopRequireDefault(require("./imageService"));
var _excluded = ["images"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var _require = require("sequelize"),
  Op = _require.Op;
var normalizeCatalogValue = function normalizeCatalogValue(value) {
  return slugifyFilterOption(String(value || "").trim());
};
var isSameCatalogValue = function isSameCatalogValue(productValue, option) {
  var normalizedProductValue = normalizeCatalogValue(productValue);
  var candidates = [option.id, option.slug, option.name].filter(function (value) {
    return value !== null && value !== undefined;
  }).map(function (value) {
    return normalizeCatalogValue(value);
  });
  return candidates.includes(normalizedProductValue);
};
var addProductCountToOptions = function addProductCountToOptions(options, products, field) {
  return options.map(function (option) {
    return _objectSpread(_objectSpread({}, option), {}, {
      product_count: products.filter(function (product) {
        return isSameCatalogValue(product[field], option);
      }).length
    });
  });
};
var handleGetCategories = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _yield$Promise$all, _yield$Promise$all2, categories, products;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Promise.all([_models["default"].Category.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].Product.findAll({
              raw: true,
              attributes: ["category"]
            })]);
          case 3:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            categories = _yield$Promise$all2[0];
            products = _yield$Promise$all2[1];
            if (!categories) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get categories successfully",
              result: addProductCountToOptions(categories, products, "category")
            });
          case 9:
            return _context.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get categories failure"
            });
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function handleGetCategories() {
    return _ref.apply(this, arguments);
  };
}();
var handleGetMaterials = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _yield$Promise$all3, _yield$Promise$all4, materials, products;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Promise.all([_models["default"].Material.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].Product.findAll({
              raw: true,
              attributes: ["material"]
            })]);
          case 3:
            _yield$Promise$all3 = _context2.sent;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
            materials = _yield$Promise$all4[0];
            products = _yield$Promise$all4[1];
            if (!materials) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get materials successfully",
              result: addProductCountToOptions(materials, products, "material")
            });
          case 9:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get materials failure"
            });
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function handleGetMaterials() {
    return _ref2.apply(this, arguments);
  };
}();
var ensureColorsTable = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].sequelize.query("\n        create table if not exists colors (\n            id serial primary key,\n            slug varchar(255) unique,\n            name varchar(255) unique,\n            \"createdAt\" timestamp with time zone not null default now(),\n            \"updatedAt\" timestamp with time zone not null default now()\n        )\n    ");
          case 2:
            _context4.next = 4;
            return _models["default"].sequelize.query("\n        insert into colors (slug, name, \"createdAt\", \"updatedAt\")\n        select distinct\n            lower(regexp_replace(unaccent(color), '[^a-zA-Z0-9]+', '-', 'g')) as slug,\n            color as name,\n            now(),\n            now()\n        from products\n        where color is not null and trim(color) <> ''\n        on conflict do nothing\n    ")["catch"]( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var products, colors, _iterator, _step, color;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _models["default"].Product.findAll({
                        raw: true,
                        attributes: ["color"]
                      });
                    case 2:
                      products = _context3.sent;
                      colors = _toConsumableArray(new Set(products.map(function (product) {
                        return product.color;
                      }).filter(Boolean))).map(function (color) {
                        return {
                          slug: slugifyFilterOption(color),
                          name: color
                        };
                      });
                      _iterator = _createForOfIteratorHelper(colors);
                      _context3.prev = 5;
                      _iterator.s();
                    case 7:
                      if ((_step = _iterator.n()).done) {
                        _context3.next = 13;
                        break;
                      }
                      color = _step.value;
                      _context3.next = 11;
                      return _models["default"].sequelize.query("\n                insert into colors (slug, name, \"createdAt\", \"updatedAt\")\n                values (:slug, :name, now(), now())\n                on conflict do nothing\n                ", {
                        replacements: color
                      });
                    case 11:
                      _context3.next = 7;
                      break;
                    case 13:
                      _context3.next = 18;
                      break;
                    case 15:
                      _context3.prev = 15;
                      _context3.t0 = _context3["catch"](5);
                      _iterator.e(_context3.t0);
                    case 18:
                      _context3.prev = 18;
                      _iterator.f();
                      return _context3.finish(18);
                    case 21:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, null, [[5, 15, 18, 21]]);
            })));
          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function ensureColorsTable() {
    return _ref3.apply(this, arguments);
  };
}();
var handleGetColors = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var _yield$Promise$all5, _yield$Promise$all6, colors, products;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return ensureColorsTable();
          case 3:
            _context5.next = 5;
            return Promise.all([_models["default"].sequelize.query("\n                select id, slug, name\n                from colors\n                order by id asc\n                ", {
              type: _models["default"].sequelize.QueryTypes.SELECT
            }), _models["default"].Product.findAll({
              raw: true,
              attributes: ["color"]
            })]);
          case 5:
            _yield$Promise$all5 = _context5.sent;
            _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 2);
            colors = _yield$Promise$all6[0];
            products = _yield$Promise$all6[1];
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get colors successfully",
              result: addProductCountToOptions(colors, products, "color")
            });
          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function handleGetColors() {
    return _ref5.apply(this, arguments);
  };
}();
var getCatalogModel = function getCatalogModel(type) {
  if (type === "category") return _models["default"].Category;
  if (type === "material") return _models["default"].Material;
  return null;
};
var getCatalogTableName = function getCatalogTableName(type) {
  if (type === "category") return "categories";
  if (type === "material") return "materials";
  return null;
};
var ensureCatalogSequence = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(type) {
    var tableName;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            tableName = getCatalogTableName(type);
            if (tableName) {
              _context6.next = 3;
              break;
            }
            return _context6.abrupt("return");
          case 3:
            _context6.next = 5;
            return _models["default"].sequelize.query("\n        select setval(\n            pg_get_serial_sequence('".concat(tableName, "', 'id'),\n            coalesce((select max(id) from ").concat(tableName, "), 0) + 1,\n            false\n        )\n    "));
          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function ensureCatalogSequence(_x) {
    return _ref6.apply(this, arguments);
  };
}();
var getCatalogUsageCount = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(type, option) {
    var _rows$, rows;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!(type === "category")) {
              _context7.next = 2;
              break;
            }
            return _context7.abrupt("return", _models["default"].Product.count({
              where: {
                category: [String(option.id), option.slug, option.name]
              }
            }));
          case 2:
            if (!(type === "material")) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return", _models["default"].Product.count({
              where: {
                material: [String(option.id), option.slug, option.name]
              }
            }));
          case 4:
            if (!(type === "color")) {
              _context7.next = 9;
              break;
            }
            _context7.next = 7;
            return _models["default"].sequelize.query("\n            select count(*)::int as count\n            from products\n            where color in (:values)\n            ", {
              replacements: {
                values: [String(option.id), option.slug, option.name]
              },
              type: _models["default"].sequelize.QueryTypes.SELECT
            });
          case 7:
            rows = _context7.sent;
            return _context7.abrupt("return", Number(((_rows$ = rows[0]) === null || _rows$ === void 0 ? void 0 : _rows$.count) || 0));
          case 9:
            return _context7.abrupt("return", 0);
          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function getCatalogUsageCount(_x2, _x3) {
    return _ref7.apply(this, arguments);
  };
}();
var handleCreateCatalogOption = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref8) {
    var type, name, slug, normalizedOption, _existed, _created, Model, existed, created;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            type = _ref8.type, name = _ref8.name, slug = _ref8.slug;
            _context8.prev = 1;
            if (!(!name || !["category", "material", "color"].includes(type))) {
              _context8.next = 4;
              break;
            }
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            });
          case 4:
            normalizedOption = {
              name: name.trim(),
              slug: (slug === null || slug === void 0 ? void 0 : slug.trim()) || slugifyFilterOption(name)
            };
            if (!(type === "color")) {
              _context8.next = 17;
              break;
            }
            _context8.next = 8;
            return ensureColorsTable();
          case 8:
            _context8.next = 10;
            return _models["default"].sequelize.query("\n                select id from colors where slug = :slug or name = :name limit 1\n                ", {
              replacements: normalizedOption,
              type: _models["default"].sequelize.QueryTypes.SELECT
            });
          case 10:
            _existed = _context8.sent;
            if (!(_existed.length > 0)) {
              _context8.next = 13;
              break;
            }
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Option already exists."
            });
          case 13:
            _context8.next = 15;
            return _models["default"].sequelize.query("\n                insert into colors (slug, name, \"createdAt\", \"updatedAt\")\n                values (:slug, :name, now(), now())\n                returning id, slug, name\n                ", {
              replacements: normalizedOption,
              type: _models["default"].sequelize.QueryTypes.SELECT
            });
          case 15:
            _created = _context8.sent;
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create option successfully.",
              result: _created[0]
            });
          case 17:
            Model = getCatalogModel(type);
            _context8.next = 20;
            return ensureCatalogSequence(type);
          case 20:
            _context8.next = 22;
            return Model.findOne({
              raw: true,
              where: _defineProperty({}, Op.or, [{
                slug: normalizedOption.slug
              }, {
                name: normalizedOption.name
              }])
            });
          case 22:
            existed = _context8.sent;
            if (!existed) {
              _context8.next = 25;
              break;
            }
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Option already exists."
            });
          case 25:
            _context8.next = 27;
            return Model.create(normalizedOption);
          case 27:
            created = _context8.sent;
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create option successfully.",
              result: toPlainObject(created)
            });
          case 31:
            _context8.prev = 31;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 35:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 31]]);
  }));
  return function handleCreateCatalogOption(_x4) {
    return _ref9.apply(this, arguments);
  };
}();
var handleUpdateCatalogOption = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref10) {
    var type, id, name, slug, normalizedOption, rows, _existed2, Model, existed;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            type = _ref10.type, id = _ref10.id, name = _ref10.name, slug = _ref10.slug;
            _context10.prev = 1;
            if (!(!id || !name || !["category", "material", "color"].includes(type))) {
              _context10.next = 4;
              break;
            }
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            });
          case 4:
            normalizedOption = {
              name: name.trim(),
              slug: (slug === null || slug === void 0 ? void 0 : slug.trim()) || slugifyFilterOption(name)
            };
            if (!(type === "color")) {
              _context10.next = 17;
              break;
            }
            _context10.next = 8;
            return ensureColorsTable();
          case 8:
            _context10.next = 10;
            return _models["default"].sequelize.query("select id, slug, name from colors where id = :id", {
              replacements: {
                id: id
              },
              type: _models["default"].sequelize.QueryTypes.SELECT
            });
          case 10:
            rows = _context10.sent;
            _existed2 = rows[0];
            if (_existed2) {
              _context10.next = 14;
              break;
            }
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Option not found."
            });
          case 14:
            _context10.next = 16;
            return _models["default"].sequelize.transaction( /*#__PURE__*/function () {
              var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(transaction) {
                return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return _models["default"].sequelize.query("\n                    update colors\n                    set slug = :slug, name = :name, \"updatedAt\" = now()\n                    where id = :id\n                    ", {
                          replacements: _objectSpread(_objectSpread({}, normalizedOption), {}, {
                            id: id
                          }),
                          transaction: transaction
                        });
                      case 2:
                        _context9.next = 4;
                        return _models["default"].Product.update({
                          color: normalizedOption.name
                        }, {
                          where: {
                            color: [String(_existed2.id), _existed2.slug, _existed2.name]
                          },
                          transaction: transaction
                        });
                      case 4:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));
              return function (_x6) {
                return _ref12.apply(this, arguments);
              };
            }());
          case 16:
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update option successfully."
            });
          case 17:
            Model = getCatalogModel(type);
            _context10.next = 20;
            return Model.findOne({
              raw: true,
              where: {
                id: id
              }
            });
          case 20:
            existed = _context10.sent;
            if (existed) {
              _context10.next = 23;
              break;
            }
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Option not found."
            });
          case 23:
            _context10.next = 25;
            return Model.update(normalizedOption, {
              where: {
                id: id
              }
            });
          case 25:
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update option successfully."
            });
          case 28:
            _context10.prev = 28;
            _context10.t0 = _context10["catch"](1);
            console.log(_context10.t0);
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 32:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 28]]);
  }));
  return function handleUpdateCatalogOption(_x5) {
    return _ref11.apply(this, arguments);
  };
}();
var handleDeleteCatalogOption = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(_ref13) {
    var type, id, rows, _existed3, _usageCount, Model, existed, usageCount;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            type = _ref13.type, id = _ref13.id;
            _context11.prev = 1;
            if (!(!id || !["category", "material", "color"].includes(type))) {
              _context11.next = 4;
              break;
            }
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            });
          case 4:
            if (!(type === "color")) {
              _context11.next = 21;
              break;
            }
            _context11.next = 7;
            return ensureColorsTable();
          case 7:
            _context11.next = 9;
            return _models["default"].sequelize.query("select id, slug, name from colors where id = :id", {
              replacements: {
                id: id
              },
              type: _models["default"].sequelize.QueryTypes.SELECT
            });
          case 9:
            rows = _context11.sent;
            _existed3 = rows[0];
            if (_existed3) {
              _context11.next = 13;
              break;
            }
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Option not found."
            });
          case 13:
            _context11.next = 15;
            return getCatalogUsageCount(type, _existed3);
          case 15:
            _usageCount = _context11.sent;
            if (!(_usageCount > 0)) {
              _context11.next = 18;
              break;
            }
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Option is being used by products."
            });
          case 18:
            _context11.next = 20;
            return _models["default"].sequelize.query("delete from colors where id = :id", {
              replacements: {
                id: id
              }
            });
          case 20:
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete option successfully."
            });
          case 21:
            Model = getCatalogModel(type);
            _context11.next = 24;
            return Model.findOne({
              raw: true,
              where: {
                id: id
              }
            });
          case 24:
            existed = _context11.sent;
            if (existed) {
              _context11.next = 27;
              break;
            }
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Option not found."
            });
          case 27:
            _context11.next = 29;
            return getCatalogUsageCount(type, existed);
          case 29:
            usageCount = _context11.sent;
            if (!(usageCount > 0)) {
              _context11.next = 32;
              break;
            }
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Option is being used by products."
            });
          case 32:
            _context11.next = 34;
            return Model.destroy({
              where: {
                id: id
              }
            });
          case 34:
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete option successfully."
            });
          case 37:
            _context11.prev = 37;
            _context11.t0 = _context11["catch"](1);
            console.log(_context11.t0);
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 41:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 37]]);
  }));
  return function handleDeleteCatalogOption(_x7) {
    return _ref14.apply(this, arguments);
  };
}();
var slugifyOption = function slugifyOption(text) {
  return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};
var slugifyFilterOption = function slugifyFilterOption(text) {
  var normalizedText = String(text).replace(/\u0111/g, "d").replace(/\u0110/g, "D").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};
var handleCountProducts = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var _yield$Promise$all7, _yield$Promise$all8, categories, materials, colors, products;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return ensureColorsTable();
          case 3:
            _context12.next = 5;
            return Promise.all([_models["default"].Category.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].Material.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].sequelize.query("\n                select id, slug, name\n                from colors\n                order by id asc\n                ", {
              type: _models["default"].sequelize.QueryTypes.SELECT
            }), _models["default"].Product.findAll({
              attributes: ["category", "material", "color"],
              raw: true
            })]);
          case 5:
            _yield$Promise$all7 = _context12.sent;
            _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 4);
            categories = _yield$Promise$all8[0];
            materials = _yield$Promise$all8[1];
            colors = _yield$Promise$all8[2];
            products = _yield$Promise$all8[3];
            return _context12.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get products count by category successfully",
              result: [{
                count_by: "category",
                data: addProductCountToOptions(categories, products, "category")
              }, {
                count_by: "material",
                data: addProductCountToOptions(materials, products, "material")
              }, {
                count_by: "color",
                data: addProductCountToOptions(colors, products, "color")
              }]
            });
          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            return _context12.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 18:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 14]]);
  }));
  return function handleCountProducts() {
    return _ref15.apply(this, arguments);
  };
}();
var getQueryValues = function getQueryValues(value) {
  if (!value || value === "all") {
    return [];
  }
  return decodeURIComponent(value).split(",").map(function (item) {
    return item.trim();
  }).filter(Boolean);
};
var getOptionValues = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(Model, slugs) {
    var rows;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (!_lodash["default"].isEmpty(slugs)) {
              _context13.next = 2;
              break;
            }
            return _context13.abrupt("return", []);
          case 2:
            _context13.next = 4;
            return Model.findAll({
              raw: true,
              where: {
                slug: slugs
              }
            });
          case 4:
            rows = _context13.sent;
            return _context13.abrupt("return", rows.flatMap(function (item) {
              return [String(item.id), item.name, item.slug];
            }));
          case 6:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return function getOptionValues(_x8, _x9) {
    return _ref16.apply(this, arguments);
  };
}();
var getColorValues = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(slugs) {
    var products;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!_lodash["default"].isEmpty(slugs)) {
              _context14.next = 2;
              break;
            }
            return _context14.abrupt("return", []);
          case 2:
            _context14.next = 4;
            return _models["default"].Product.findAll({
              raw: true,
              attributes: ["color"]
            });
          case 4:
            products = _context14.sent;
            return _context14.abrupt("return", _toConsumableArray(new Set(products.map(function (product) {
              return product.color;
            }).filter(function (color) {
              return color && (slugs.includes(color) || slugs.includes(slugifyFilterOption(color)));
            }))));
          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return function getColorValues(_x10) {
    return _ref17.apply(this, arguments);
  };
}();
var handleGetProducts = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(_ref18) {
    var _ref18$categories, categories, materials, colors, page, currentPage, _yield$Promise$all9, _yield$Promise$all10, categoryValues, materialValues, colorValues, where, _yield$db$Product$fin, count, rows;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _ref18$categories = _ref18.categories, categories = _ref18$categories === void 0 ? "all" : _ref18$categories, materials = _ref18.materials, colors = _ref18.colors, page = _ref18.page;
            _context15.prev = 1;
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            _context15.next = 5;
            return Promise.all([getOptionValues(_models["default"].Category, getQueryValues(categories)), getOptionValues(_models["default"].Material, getQueryValues(materials)), getColorValues(getQueryValues(colors))]);
          case 5:
            _yield$Promise$all9 = _context15.sent;
            _yield$Promise$all10 = _slicedToArray(_yield$Promise$all9, 3);
            categoryValues = _yield$Promise$all10[0];
            materialValues = _yield$Promise$all10[1];
            colorValues = _yield$Promise$all10[2];
            where = {};
            if (!_lodash["default"].isEmpty(categoryValues)) {
              where.category = categoryValues;
            }
            if (!_lodash["default"].isEmpty(materialValues)) {
              where.material = materialValues;
            }
            if (!_lodash["default"].isEmpty(colorValues)) {
              where.color = colorValues;
            }
            _context15.next = 16;
            return _models["default"].Product.findAndCountAll({
              where: where,
              attributes: {
                exclude: ["description", "color"]
              },
              order: [["id", "DESC"]],
              limit: 12,
              offset: (currentPage - 1) * 12
            });
          case 16:
            _yield$db$Product$fin = _context15.sent;
            count = _yield$db$Product$fin.count;
            rows = _yield$db$Product$fin.rows;
            return _context15.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get products successfully.",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: rows
            });
          case 22:
            _context15.prev = 22;
            _context15.t0 = _context15["catch"](1);
            console.log(_context15.t0);
            return _context15.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 26:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 22]]);
  }));
  return function handleGetProducts(_x11) {
    return _ref19.apply(this, arguments);
  };
}();
var handleGetProductBy = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(_ref20) {
    var slug, id, where, product, productData, _yield$Promise$all11, _yield$Promise$all12, images, category, material, color;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            slug = _ref20.slug, id = _ref20.id;
            _context16.prev = 1;
            where = id ? {
              id: id
            } : {
              slug: slug
            };
            _context16.next = 5;
            return _models["default"].Product.findOne({
              attributes: {
                exclude: ["image_url"]
              },
              where: where
            });
          case 5:
            product = _context16.sent;
            if (!product) {
              _context16.next = 19;
              break;
            }
            productData = toPlainObject(product);
            _context16.next = 10;
            return ensureColorsTable();
          case 10:
            _context16.next = 12;
            return Promise.all([_models["default"].Image.findAll({
              raw: true,
              where: {
                target_id: productData.id,
                target_type: "product"
              }
            }), _models["default"].Category.findOne({
              raw: true,
              where: _defineProperty({}, Op.or, [{
                id: Number(productData.category) || 0
              }, {
                name: productData.category
              }, {
                slug: productData.category
              }])
            }), _models["default"].Material.findOne({
              raw: true,
              where: _defineProperty({}, Op.or, [{
                id: Number(productData.material) || 0
              }, {
                name: productData.material
              }, {
                slug: productData.material
              }])
            }), _models["default"].sequelize.query("\n                        select id, slug, name\n                        from colors\n                        where id::text = :color or slug = :color or name = :color\n                        limit 1\n                        ", {
              replacements: {
                color: productData.color
              },
              type: _models["default"].sequelize.QueryTypes.SELECT
            }).then(function (rows) {
              return rows[0];
            })]);
          case 12:
            _yield$Promise$all11 = _context16.sent;
            _yield$Promise$all12 = _slicedToArray(_yield$Promise$all11, 4);
            images = _yield$Promise$all12[0];
            category = _yield$Promise$all12[1];
            material = _yield$Promise$all12[2];
            color = _yield$Promise$all12[3];
            return _context16.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get product successfully",
              result: _objectSpread(_objectSpread({}, productData), {}, {
                category_name: (category === null || category === void 0 ? void 0 : category.name) || productData.category,
                material_name: (material === null || material === void 0 ? void 0 : material.name) || productData.material,
                color_name: (color === null || color === void 0 ? void 0 : color.name) || productData.color,
                images: images
              })
            });
          case 19:
            return _context16.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get product failure"
            });
          case 22:
            _context16.prev = 22;
            _context16.t0 = _context16["catch"](1);
            console.log(_context16.t0);
            return _context16.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 26:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[1, 22]]);
  }));
  return function handleGetProductBy(_x12) {
    return _ref21.apply(this, arguments);
  };
}();
var handleSearchProducts = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(keyword, page) {
    var currentPage, _yield$db$Product$fin2, count, rows;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            if (!keyword) {
              _context17.next = 11;
              break;
            }
            _context17.next = 5;
            return _models["default"].Product.findAndCountAll({
              where: _defineProperty({}, Op.or, [{
                name: _defineProperty({}, Op.iLike, "%".concat(keyword, "%"))
              }, {
                slug: _defineProperty({}, Op.iLike, "%".concat(keyword, "%"))
              }, {
                description: _defineProperty({}, Op.iLike, "%".concat(keyword, "%"))
              }]),
              order: [["id", "DESC"]],
              limit: 12,
              offset: (currentPage - 1) * 12
            });
          case 5:
            _yield$db$Product$fin2 = _context17.sent;
            count = _yield$db$Product$fin2.count;
            rows = _yield$db$Product$fin2.rows;
            if (!rows) {
              _context17.next = 10;
              break;
            }
            return _context17.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved search products successfully",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: rows
            });
          case 10:
            return _context17.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "No product match, check again."
            });
          case 11:
            return _context17.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Get products failure."
            });
          case 14:
            _context17.prev = 14;
            _context17.t0 = _context17["catch"](0);
            console.log(_context17.t0);
            return _context17.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 18:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 14]]);
  }));
  return function handleSearchProducts(_x13, _x14) {
    return _ref22.apply(this, arguments);
  };
}();
var handleCreateProduct = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(product) {
    var productToInsert, createdProduct, imagesToInsert;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            productToInsert = _objectSpread(_objectSpread({}, product), {}, {
              sold: 0
            });
            _context18.next = 4;
            return _models["default"].Product.create(productToInsert);
          case 4:
            createdProduct = _context18.sent;
            if (!createdProduct) {
              _context18.next = 10;
              break;
            }
            imagesToInsert = product.images.map(function (image) {
              return {
                target_id: createdProduct.id,
                target_type: "product",
                public_id: image.public_id,
                secure_url: image.secure_url,
                thumbnail_url: image.thumbnail_url
              };
            });
            _context18.next = 9;
            return _models["default"].Image.bulkCreate(imagesToInsert);
          case 9:
            return _context18.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create product successfully."
            });
          case 10:
            _context18.next = 12;
            return _imageService["default"].handleRemoveImagesFromCloud(product.images);
          case 12:
            return _context18.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create product successfully."
            });
          case 15:
            _context18.prev = 15;
            _context18.t0 = _context18["catch"](0);
            console.log(_context18.t0);
            return _context18.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 19:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 15]]);
  }));
  return function handleCreateProduct(_x15) {
    return _ref23.apply(this, arguments);
  };
}();
var handleUpdateProduct = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(product) {
    var t, _where5, _product$images, images, productFields, existed, lastVersionImages, normalizedImages, removedImages, uploadedImages;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return _database["default"].transaction();
          case 2:
            t = _context19.sent;
            _context19.prev = 3;
            _product$images = product.images, images = _product$images === void 0 ? [] : _product$images, productFields = _objectWithoutProperties(product, _excluded);
            _context19.next = 7;
            return _models["default"].Product.findOne({
              where: {
                id: productFields.id
              }
            });
          case 7:
            existed = _context19.sent;
            if (existed) {
              _context19.next = 12;
              break;
            }
            _context19.next = 11;
            return t.rollback();
          case 11:
            return _context19.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid product."
            });
          case 12:
            _context19.next = 14;
            return _models["default"].Image.findAll({
              raw: true,
              where: {
                target_id: productFields.id,
                target_type: "product"
              }
            });
          case 14:
            lastVersionImages = _context19.sent;
            normalizedImages = images.filter(function (image) {
              return image && image.secure_url && image.public_id;
            });
            removedImages = lastVersionImages.filter(function (image) {
              return !normalizedImages.some(function (item) {
                return item.id === image.id || item.public_id === image.public_id;
              });
            });
            uploadedImages = normalizedImages.filter(function (image) {
              return !lastVersionImages.some(function (item) {
                return item.id === image.id || item.public_id === image.public_id;
              });
            });
            _context19.next = 20;
            return Promise.all([removedImages.length > 0 && _models["default"].Image.destroy({
              where: (_where5 = {}, _defineProperty(_where5, Op.or, [{
                id: removedImages.map(function (image) {
                  return image.id;
                }).filter(Boolean)
              }, {
                public_id: removedImages.map(function (image) {
                  return image.public_id;
                }).filter(Boolean)
              }]), _defineProperty(_where5, "target_id", productFields.id), _defineProperty(_where5, "target_type", "product"), _where5),
              transaction: t
            }), uploadedImages.length > 0 && _models["default"].Image.bulkCreate(uploadedImages.map(function (image) {
              return {
                target_id: productFields.id,
                target_type: "product",
                public_id: image.public_id,
                secure_url: image.secure_url,
                thumbnail_url: image.thumbnail_url
              };
            }), {
              transaction: t
            }), _models["default"].Product.update(_objectSpread({}, productFields), {
              where: {
                id: productFields.id
              },
              transaction: t
            })]);
          case 20:
            _context19.next = 22;
            return t.commit();
          case 22:
            return _context19.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update product successfully."
            });
          case 25:
            _context19.prev = 25;
            _context19.t0 = _context19["catch"](3);
            _context19.next = 29;
            return t.rollback();
          case 29:
            console.log(_context19.t0);
            return _context19.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 31:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[3, 25]]);
  }));
  return function handleUpdateProduct(_x16) {
    return _ref24.apply(this, arguments);
  };
}();
var handleDeleteProduct = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(product) {
    var t, existed, images;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return _database["default"].transaction();
          case 2:
            t = _context20.sent;
            _context20.prev = 3;
            _context20.next = 6;
            return _models["default"].Product.findOne({
              where: {
                id: product.id,
                name: product.name,
                price: product.price
              }
            });
          case 6:
            existed = _context20.sent;
            if (existed) {
              _context20.next = 9;
              break;
            }
            return _context20.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid product."
            });
          case 9:
            _context20.next = 11;
            return _models["default"].Image.findAll({
              where: {
                target_id: product.id,
                target_type: "product"
              }
            });
          case 11:
            images = _context20.sent;
            _context20.next = 14;
            return Promise.all([_models["default"].Product.destroy({
              where: {
                id: product.id
              },
              transaction: t
            }), _models["default"].Image.destroy({
              where: {
                target_id: product.id,
                target_type: "product"
              },
              transaction: t
            })]);
          case 14:
            _context20.next = 16;
            return t.commit();
          case 16:
            _context20.next = 18;
            return _imageService["default"].handleRemoveImagesFromCloud(images);
          case 18:
            return _context20.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete product successfully."
            });
          case 21:
            _context20.prev = 21;
            _context20.t0 = _context20["catch"](3);
            _context20.next = 25;
            return t.rollback();
          case 25:
            console.log(_context20.t0);
            return _context20.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 27:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[3, 21]]);
  }));
  return function handleDeleteProduct(_x17) {
    return _ref25.apply(this, arguments);
  };
}();

/** SUPPORT METHODS */

var getDifference = function getDifference(originArray, newArray) {
  var difference = [];
  var _iterator2 = _createForOfIteratorHelper(newArray),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var element = _step2.value;
      if (!originArray.includes(element)) {
        difference.push(element);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return difference;
};
var toPlainObject = function toPlainObject(data) {
  return typeof (data === null || data === void 0 ? void 0 : data.get) === "function" ? data.get({
    plain: true
  }) : _objectSpread({}, data);
};
module.exports = {
  handleGetCategories: handleGetCategories,
  handleGetMaterials: handleGetMaterials,
  handleGetColors: handleGetColors,
  handleCountProducts: handleCountProducts,
  handleCreateCatalogOption: handleCreateCatalogOption,
  handleUpdateCatalogOption: handleUpdateCatalogOption,
  handleDeleteCatalogOption: handleDeleteCatalogOption,
  handleGetProducts: handleGetProducts,
  handleSearchProducts: handleSearchProducts,
  handleGetProductBy: handleGetProductBy,
  handleCreateProduct: handleCreateProduct,
  handleUpdateProduct: handleUpdateProduct,
  handleDeleteProduct: handleDeleteProduct
};