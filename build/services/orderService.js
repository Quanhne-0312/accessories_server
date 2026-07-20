"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _models = _interopRequireDefault(require("../models"));
var _constant = require("../constant");
var _lodash = _interopRequireDefault(require("lodash"));
var _crypto = require("crypto");
var _transaction = require("../utils/transaction");
var _excluded = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded2 = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded3 = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded4 = ["id", "shipping_address_id", "payment_method_id", "status_id"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) { r.unshift(t); } return function e() { for (; r.length;) { if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; } return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var _require = require("sequelize"),
  Op = _require.Op;
var sequelize = _models["default"].sequelize;
var CHECKOUT_VOUCHERS = {
  NEW10: {
    percent: 10,
    minSubtotal: 0
  },
  YAY15: {
    percent: 15,
    minSubtotal: 500000
  },
  WOW20: {
    percent: 20,
    minSubtotal: 1000000
  }
};
var ORDER_TRANSITIONS = new Map([[_constant.OrderStateCode.PROCESSED, new Set([_constant.OrderStateCode.CONFIRMED, _constant.OrderStateCode.CANCELED])], [_constant.OrderStateCode.CONFIRMED, new Set([_constant.OrderStateCode.ON_SHIPPED, _constant.OrderStateCode.CANCELED])], [_constant.OrderStateCode.ON_SHIPPED, new Set([_constant.OrderStateCode.FINISHED])], [_constant.OrderStateCode.FINISHED, new Set()], [_constant.OrderStateCode.CANCELED, new Set()]]);
var canTransitionOrder = function canTransitionOrder(currentStatusId, nextStatusId) {
  var _ORDER_TRANSITIONS$ge;
  return ((_ORDER_TRANSITIONS$ge = ORDER_TRANSITIONS.get(Number(currentStatusId))) === null || _ORDER_TRANSITIONS$ge === void 0 ? void 0 : _ORDER_TRANSITIONS$ge.has(Number(nextStatusId))) === true;
};
var CheckoutValidationError = /*#__PURE__*/function (_Error) {
  _inherits(CheckoutValidationError, _Error);
  var _super = _createSuper(CheckoutValidationError);
  function CheckoutValidationError(message) {
    var _this;
    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constant.ResponseCode.VALIDATION_ERROR;
    _classCallCheck(this, CheckoutValidationError);
    _this = _super.call(this, message);
    _this.name = "CheckoutValidationError";
    _this.responseCode = code;
    return _this;
  }
  return _createClass(CheckoutValidationError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var normalizeCheckoutItems = function normalizeCheckoutItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
    throw new CheckoutValidationError("The order must contain between 1 and 100 products.");
  }
  var quantitiesByProductId = new Map();
  var _iterator = _createForOfIteratorHelper(items),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ref3, _item$id;
      var item = _step.value;
      var productId = Number((_ref3 = (_item$id = item === null || item === void 0 ? void 0 : item.id) !== null && _item$id !== void 0 ? _item$id : item === null || item === void 0 ? void 0 : item.product_id) !== null && _ref3 !== void 0 ? _ref3 : item === null || item === void 0 ? void 0 : item.productId);
      var quantity = Number(item === null || item === void 0 ? void 0 : item.quantity);
      if (!Number.isSafeInteger(productId) || productId <= 0) {
        throw new CheckoutValidationError("Invalid product identifier.");
      }
      if (!Number.isSafeInteger(quantity) || quantity <= 0) {
        throw new CheckoutValidationError("Product quantity must be a positive integer.");
      }
      var accumulatedQuantity = (quantitiesByProductId.get(productId) || 0) + quantity;
      if (!Number.isSafeInteger(accumulatedQuantity) || accumulatedQuantity > 1000) {
        throw new CheckoutValidationError("Product quantity exceeds the allowed limit.");
      }
      quantitiesByProductId.set(productId, accumulatedQuantity);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return _toConsumableArray(quantitiesByProductId.entries()).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      productId = _ref2[0],
      quantity = _ref2[1];
    return {
      productId: productId,
      quantity: quantity
    };
  });
};
var normalizeShippingAddress = function normalizeShippingAddress(shippingAddress) {
  var normalized = {
    receiver_name: String((shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.receiver_name) || "").trim(),
    receiver_phone: String((shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.receiver_phone) || "").trim(),
    receiver_address: String((shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.receiver_address) || "").trim()
  };
  if (!normalized.receiver_name || !normalized.receiver_phone || !normalized.receiver_address) {
    throw new CheckoutValidationError("Shipping address information is incomplete.");
  }
  if (normalized.receiver_name.length > 255 || normalized.receiver_phone.length > 30 || normalized.receiver_address.length > 2000) {
    throw new CheckoutValidationError("Shipping address information is too long.");
  }
  return normalized;
};
var calculateCheckoutTotals = function calculateCheckoutTotals(productsById, normalizedItems) {
  var paymentDetails = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var subtotal = normalizedItems.reduce(function (sum, item) {
    var product = productsById.get(item.productId);
    var price = Number(product === null || product === void 0 ? void 0 : product.price);
    if (!Number.isFinite(price) || price < 0) {
      throw new CheckoutValidationError("Invalid price for product ".concat(item.productId, "."));
    }
    return sum + price * item.quantity;
  }, 0);
  if (!Number.isSafeInteger(subtotal) || subtotal < 0) {
    throw new CheckoutValidationError("The calculated order subtotal is invalid.");
  }
  var voucherCode = String((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.voucher_code) || "").trim().toUpperCase();
  var voucher = voucherCode ? CHECKOUT_VOUCHERS[voucherCode] : null;
  if (voucherCode && !voucher) {
    throw new CheckoutValidationError("Invalid voucher code.");
  }
  if (voucher && subtotal < voucher.minSubtotal) {
    throw new CheckoutValidationError("The order does not meet the voucher minimum subtotal.");
  }
  var discount = voucher ? Math.floor(subtotal * voucher.percent / 100) : 0;
  var shippingFee = 0;
  return {
    subtotal: subtotal,
    discount: discount,
    shipping_fee: shippingFee,
    total: subtotal - discount + shippingFee
  };
};
var restoreOrderInventory = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(order, transaction) {
    var orderDetails, quantitiesByProductId, _iterator2, _step2, detail, productId, quantity, productIds, products, _iterator3, _step3, product, quantityToRestore, _yield$db$Order$updat, _yield$db$Order$updat2, updatedRows;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (order.inventory_reserved) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", false);
          case 2:
            _context.next = 4;
            return _models["default"].OrderDetail.findAll({
              attributes: ["product_id", "quantity"],
              where: {
                order_uuid: order.order_uuid
              },
              transaction: transaction,
              lock: transaction.LOCK.UPDATE
            });
          case 4:
            orderDetails = _context.sent;
            quantitiesByProductId = new Map();
            _iterator2 = _createForOfIteratorHelper(orderDetails);
            _context.prev = 7;
            _iterator2.s();
          case 9:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 18;
              break;
            }
            detail = _step2.value;
            productId = Number(detail.product_id);
            quantity = Number(detail.quantity);
            if (!(!Number.isSafeInteger(productId) || productId <= 0 || !Number.isSafeInteger(quantity) || quantity <= 0)) {
              _context.next = 15;
              break;
            }
            return _context.abrupt("continue", 16);
          case 15:
            quantitiesByProductId.set(productId, (quantitiesByProductId.get(productId) || 0) + quantity);
          case 16:
            _context.next = 9;
            break;
          case 18:
            _context.next = 23;
            break;
          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](7);
            _iterator2.e(_context.t0);
          case 23:
            _context.prev = 23;
            _iterator2.f();
            return _context.finish(23);
          case 26:
            productIds = _toConsumableArray(quantitiesByProductId.keys()).sort(function (left, right) {
              return left - right;
            });
            if (!productIds.length) {
              _context.next = 33;
              break;
            }
            _context.next = 30;
            return _models["default"].Product.findAll({
              where: {
                id: productIds
              },
              order: [["id", "ASC"]],
              transaction: transaction,
              lock: transaction.LOCK.UPDATE
            });
          case 30:
            _context.t1 = _context.sent;
            _context.next = 34;
            break;
          case 33:
            _context.t1 = [];
          case 34:
            products = _context.t1;
            _iterator3 = _createForOfIteratorHelper(products);
            _context.prev = 36;
            _iterator3.s();
          case 38:
            if ((_step3 = _iterator3.n()).done) {
              _context.next = 45;
              break;
            }
            product = _step3.value;
            quantityToRestore = quantitiesByProductId.get(Number(product.id));
            _context.next = 43;
            return _models["default"].Product.update({
              quantity: Number(product.quantity || 0) + quantityToRestore,
              sold: Math.max(Number(product.sold || 0) - quantityToRestore, 0)
            }, {
              where: {
                id: product.id
              },
              transaction: transaction
            });
          case 43:
            _context.next = 38;
            break;
          case 45:
            _context.next = 50;
            break;
          case 47:
            _context.prev = 47;
            _context.t2 = _context["catch"](36);
            _iterator3.e(_context.t2);
          case 50:
            _context.prev = 50;
            _iterator3.f();
            return _context.finish(50);
          case 53:
            _context.next = 55;
            return _models["default"].Order.update({
              inventory_reserved: false
            }, {
              where: {
                id: order.id,
                inventory_reserved: true
              },
              transaction: transaction
            });
          case 55:
            _yield$db$Order$updat = _context.sent;
            _yield$db$Order$updat2 = _slicedToArray(_yield$db$Order$updat, 1);
            updatedRows = _yield$db$Order$updat2[0];
            if (!(updatedRows !== 1)) {
              _context.next = 60;
              break;
            }
            throw new Error("Order inventory reservation changed while restoring stock.");
          case 60:
            return _context.abrupt("return", true);
          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 20, 23, 26], [36, 47, 50, 53]]);
  }));
  return function restoreOrderInventory(_x, _x2) {
    return _ref4.apply(this, arguments);
  };
}();
var handleGetPaymentMethods = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var paymentMethods;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models["default"].PaymentMethod.findAll();
          case 3:
            paymentMethods = _context2.sent;
            if (!paymentMethods) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get payment methods successfully",
              result: paymentMethods
            });
          case 6:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get payment methods failure"
            });
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function handleGetPaymentMethods() {
    return _ref5.apply(this, arguments);
  };
}();
var handleGetOrderStatuses = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var statuses;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models["default"].Status.findAll({
              order: [["id", "ASC"]]
            });
          case 3:
            statuses = _context3.sent;
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved order statuses successfully",
              result: statuses
            });
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving order statuses."
            });
          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function handleGetOrderStatuses() {
    return _ref6.apply(this, arguments);
  };
}();
var handleCountOrders = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var _yield$Promise$all, _yield$Promise$all2, statuses, orders, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Promise.all([_models["default"].Status.findAll({
              order: [["id", "ASC"]],
              raw: true
            }), _models["default"].Order.findAll({
              attributes: ["status_id"],
              raw: true
            })]);
          case 3:
            _yield$Promise$all = _context4.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            statuses = _yield$Promise$all2[0];
            orders = _yield$Promise$all2[1];
            result = statuses.map(function (status) {
              return _objectSpread(_objectSpread({}, status), {}, {
                slug: status.code,
                order_count: orders.filter(function (order) {
                  return Number(order.status_id) === Number(status.id);
                }).length
              });
            });
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders count successfully",
              result: result
            });
          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while counting orders."
            });
          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function handleCountOrders() {
    return _ref7.apply(this, arguments);
  };
}();
var handleGetAllOrders = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(status_id, page, keyword) {
    var currentPage, normalizedKeyword, where, _yield$Promise$all3, _yield$Promise$all4, shippingAddressesMatched, orderDetailsMatched, matchedShippingAddressIds, matchedOrderUuids, keywordFilter, _yield$db$Order$findA, count, orders, _yield$Promise$all5, _yield$Promise$all6, orderDetails, shippingAddresses, paymentMethods, orderStatuses, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            _context5.prev = 1;
            normalizedKeyword = "".concat(keyword || "").trim();
            where = {};
            if (status_id && status_id !== "all") {
              where.status_id = status_id;
            }
            if (!normalizedKeyword) {
              _context5.next = 19;
              break;
            }
            _context5.next = 8;
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
          case 8:
            _yield$Promise$all3 = _context5.sent;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
            shippingAddressesMatched = _yield$Promise$all4[0];
            orderDetailsMatched = _yield$Promise$all4[1];
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
          case 19:
            _context5.next = 21;
            return _models["default"].Order.findAndCountAll({
              where: where,
              order: [["id", "DESC"]],
              limit: 12,
              offset: (currentPage - 1) * 12
            });
          case 21:
            _yield$db$Order$findA = _context5.sent;
            count = _yield$db$Order$findA.count;
            orders = _yield$db$Order$findA.rows;
            if (!(count > 0)) {
              _context5.next = 35;
              break;
            }
            _context5.next = 27;
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
          case 27:
            _yield$Promise$all5 = _context5.sent;
            _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 4);
            orderDetails = _yield$Promise$all6[0];
            shippingAddresses = _yield$Promise$all6[1];
            paymentMethods = _yield$Promise$all6[2];
            orderStatuses = _yield$Promise$all6[3];
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
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: result
            });
          case 35:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Orders not found.",
              page: currentPage,
              total_pages: 1,
              total_results: 0,
              result: []
            });
          case 38:
            _context5.prev = 38;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 42:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 38]]);
  }));
  return function handleGetAllOrders(_x3, _x4, _x5) {
    return _ref8.apply(this, arguments);
  };
}();
var handleGetOneOrderByUuid = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(order_uuid) {
    var order, id, shipping_address_id, payment_method_id, status_id, rest, _yield$Promise$all7, _yield$Promise$all8, order_status, order_details, shipping_address, payment_method, history;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models["default"].Order.findOne({
              where: {
                order_uuid: order_uuid
              },
              raw: true
            });
          case 3:
            order = _context6.sent;
            if (!order) {
              _context6.next = 16;
              break;
            }
            id = order.id, shipping_address_id = order.shipping_address_id, payment_method_id = order.payment_method_id, status_id = order.status_id, rest = _objectWithoutProperties(order, _excluded2);
            _context6.next = 8;
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
            _yield$Promise$all7 = _context6.sent;
            _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 5);
            order_status = _yield$Promise$all8[0];
            order_details = _yield$Promise$all8[1];
            shipping_address = _yield$Promise$all8[2];
            payment_method = _yield$Promise$all8[3];
            history = _yield$Promise$all8[4];
            return _context6.abrupt("return", {
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
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Order ".concat(order_uuid, " not found.")
            });
          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the order."
            });
          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 19]]);
  }));
  return function handleGetOneOrderByUuid(_x6) {
    return _ref9.apply(this, arguments);
  };
}();
var handleGetOrdersByUuids = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(encodedUuids) {
    var decodedUuids, uuids, orders, _yield$Promise$all9, _yield$Promise$all0, orderDetails, orderStatuses, shippingAddresses, paymentMethods, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            decodedUuids = decodeURIComponent(encodedUuids);
            if (!_lodash["default"].isEmpty(decodedUuids)) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 4:
            uuids = decodedUuids.split(",");
            _context7.next = 7;
            return _models["default"].Order.findAll({
              where: {
                order_uuid: uuids
              }
            });
          case 7:
            orders = _context7.sent;
            if (!(orders.length > 0)) {
              _context7.next = 19;
              break;
            }
            _context7.next = 11;
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
          case 11:
            _yield$Promise$all9 = _context7.sent;
            _yield$Promise$all0 = _slicedToArray(_yield$Promise$all9, 4);
            orderDetails = _yield$Promise$all0[0];
            orderStatuses = _yield$Promise$all0[1];
            shippingAddresses = _yield$Promise$all0[2];
            paymentMethods = _yield$Promise$all0[3];
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
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              result: result
            });
          case 19:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 22:
            _context7.prev = 22;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 22]]);
  }));
  return function handleGetOrdersByUuids(_x7) {
    return _ref0.apply(this, arguments);
  };
}();
var handleGetOrdersByUserPhoneNumber = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(phone_number) {
    var user, orders, _yield$Promise$all1, _yield$Promise$all10, orderDetails, orderStatuses, shippingAddresses, paymentMethods, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _models["default"].User.findOne({
              where: {
                phone_number: phone_number
              }
            });
          case 3:
            user = _context8.sent;
            if (!user) {
              _context8.next = 19;
              break;
            }
            _context8.next = 7;
            return _models["default"].Order.findAll({
              where: {
                customer_phone_number: user.phone_number
              }
            });
          case 7:
            orders = _context8.sent;
            if (!(orders.length > 0)) {
              _context8.next = 19;
              break;
            }
            _context8.next = 11;
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
          case 11:
            _yield$Promise$all1 = _context8.sent;
            _yield$Promise$all10 = _slicedToArray(_yield$Promise$all1, 4);
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
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              result: result
            });
          case 19:
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 22:
            _context8.prev = 22;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 22]]);
  }));
  return function handleGetOrdersByUserPhoneNumber(_x8) {
    return _ref1.apply(this, arguments);
  };
}();
var handleCreateOrder = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(order) {
    var transaction, customerPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress, requireRegisteredCustomer, normalizedPhoneNumber, normalizedItems, paymentMethodId, normalizedShippingAddress, customer, validPaymentMethod, productIds, products, productsById, _iterator4, _step4, item, product, availableQuantity, calculatedPaymentDetails, orderUuid, shippingAddressRecord, _iterator5, _step5, _item, _product, _yield$db$Product$upd, _yield$db$Product$upd2, updatedRows;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            customerPhoneNumber = order.customerPhoneNumber, items = order.items, note = order.note, paymentDetails = order.paymentDetails, paymentMethod = order.paymentMethod, shippingAddress = order.shippingAddress, requireRegisteredCustomer = order.requireRegisteredCustomer;
            normalizedPhoneNumber = String(customerPhoneNumber || "").trim();
            normalizedItems = normalizeCheckoutItems(items);
            paymentMethodId = Number(paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.id);
            normalizedShippingAddress = normalizeShippingAddress(shippingAddress);
            if (!(!normalizedPhoneNumber || normalizedPhoneNumber.length > 30)) {
              _context9.next = 8;
              break;
            }
            throw new CheckoutValidationError("Invalid customer phone number.");
          case 8:
            if (!(!Number.isSafeInteger(paymentMethodId) || paymentMethodId <= 0)) {
              _context9.next = 10;
              break;
            }
            throw new CheckoutValidationError("Invalid payment method.");
          case 10:
            _context9.next = 12;
            return sequelize.transaction();
          case 12:
            transaction = _context9.sent;
            if (!requireRegisteredCustomer) {
              _context9.next = 19;
              break;
            }
            _context9.next = 16;
            return _models["default"].User.findOne({
              attributes: ["id"],
              where: {
                phone_number: normalizedPhoneNumber,
                role_id: 3
              },
              transaction: transaction
            });
          case 16:
            customer = _context9.sent;
            if (customer) {
              _context9.next = 19;
              break;
            }
            throw new CheckoutValidationError("The authenticated customer account is no longer available.", _constant.ResponseCode.AUTHORIZATION_ERROR);
          case 19:
            _context9.next = 21;
            return _models["default"].PaymentMethod.findOne({
              attributes: ["id"],
              where: {
                id: paymentMethodId
              },
              transaction: transaction
            });
          case 21:
            validPaymentMethod = _context9.sent;
            if (validPaymentMethod) {
              _context9.next = 24;
              break;
            }
            throw new CheckoutValidationError("Payment method not found.", _constant.ResponseCode.FILE_NOT_FOUND);
          case 24:
            productIds = normalizedItems.map(function (item) {
              return item.productId;
            });
            _context9.next = 27;
            return _models["default"].Product.findAll({
              where: {
                id: productIds
              },
              order: [["id", "ASC"]],
              transaction: transaction,
              lock: transaction.LOCK.UPDATE
            });
          case 27:
            products = _context9.sent;
            productsById = new Map(products.map(function (product) {
              return [Number(product.id), product];
            }));
            if (!(productsById.size !== productIds.length)) {
              _context9.next = 31;
              break;
            }
            throw new CheckoutValidationError("One or more products no longer exist.", _constant.ResponseCode.FILE_NOT_FOUND);
          case 31:
            _iterator4 = _createForOfIteratorHelper(normalizedItems);
            _context9.prev = 32;
            _iterator4.s();
          case 34:
            if ((_step4 = _iterator4.n()).done) {
              _context9.next = 42;
              break;
            }
            item = _step4.value;
            product = productsById.get(item.productId);
            availableQuantity = Number(product.quantity);
            if (!(!Number.isSafeInteger(availableQuantity) || availableQuantity < item.quantity)) {
              _context9.next = 40;
              break;
            }
            throw new CheckoutValidationError("Product ".concat(product.name, " does not have enough stock."));
          case 40:
            _context9.next = 34;
            break;
          case 42:
            _context9.next = 47;
            break;
          case 44:
            _context9.prev = 44;
            _context9.t0 = _context9["catch"](32);
            _iterator4.e(_context9.t0);
          case 47:
            _context9.prev = 47;
            _iterator4.f();
            return _context9.finish(47);
          case 50:
            calculatedPaymentDetails = calculateCheckoutTotals(productsById, normalizedItems, paymentDetails);
            orderUuid = (0, _crypto.randomUUID)(); // Shipping details are an immutable order snapshot. Never reuse one
            // address row between orders because an admin edit would mutate history.
            _context9.next = 54;
            return _models["default"].ShippingAddress.create(normalizedShippingAddress, {
              transaction: transaction
            });
          case 54:
            shippingAddressRecord = _context9.sent;
            _context9.next = 57;
            return _models["default"].Order.create(_objectSpread(_objectSpread({
              order_uuid: orderUuid,
              customer_phone_number: normalizedPhoneNumber,
              shipping_address_id: shippingAddressRecord.id,
              payment_method_id: paymentMethodId
            }, calculatedPaymentDetails), {}, {
              status_id: 1,
              inventory_reserved: true,
              note: typeof note === "string" ? note.slice(0, 5000) : ""
            }), {
              transaction: transaction
            });
          case 57:
            _context9.next = 59;
            return _models["default"].OrderDetail.bulkCreate(normalizedItems.map(function (_ref11) {
              var productId = _ref11.productId,
                quantity = _ref11.quantity;
              var product = productsById.get(productId);
              return {
                order_uuid: orderUuid,
                product_id: product.id,
                slug: product.slug,
                name: product.name,
                price: Number(product.price),
                quantity: quantity,
                feature_image_url: product.feature_image_url
              };
            }), {
              transaction: transaction
            });
          case 59:
            _context9.next = 61;
            return _models["default"].HistoryOrderUpdate.create({
              order_uuid: orderUuid,
              employee_id: null,
              status_id: 1,
              description: "Customer ".concat(normalizedPhoneNumber, " placed the order")
            }, {
              transaction: transaction
            });
          case 61:
            _iterator5 = _createForOfIteratorHelper(normalizedItems);
            _context9.prev = 62;
            _iterator5.s();
          case 64:
            if ((_step5 = _iterator5.n()).done) {
              _context9.next = 76;
              break;
            }
            _item = _step5.value;
            _product = productsById.get(_item.productId);
            _context9.next = 69;
            return _models["default"].Product.update({
              quantity: Number(_product.quantity) - _item.quantity,
              sold: Number(_product.sold || 0) + _item.quantity
            }, {
              where: {
                id: _item.productId,
                quantity: _defineProperty({}, Op.gte, _item.quantity)
              },
              transaction: transaction
            });
          case 69:
            _yield$db$Product$upd = _context9.sent;
            _yield$db$Product$upd2 = _slicedToArray(_yield$db$Product$upd, 1);
            updatedRows = _yield$db$Product$upd2[0];
            if (!(updatedRows !== 1)) {
              _context9.next = 74;
              break;
            }
            throw new CheckoutValidationError("Product ".concat(_product.name, " does not have enough stock."));
          case 74:
            _context9.next = 64;
            break;
          case 76:
            _context9.next = 81;
            break;
          case 78:
            _context9.prev = 78;
            _context9.t1 = _context9["catch"](62);
            _iterator5.e(_context9.t1);
          case 81:
            _context9.prev = 81;
            _iterator5.f();
            return _context9.finish(81);
          case 84:
            _context9.next = 86;
            return transaction.commit();
          case 86:
            return _context9.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create order successfully",
              result: orderUuid
            });
          case 89:
            _context9.prev = 89;
            _context9.t2 = _context9["catch"](0);
            _context9.next = 93;
            return (0, _transaction.rollbackTransaction)(transaction);
          case 93:
            console.log(_context9.t2);
            return _context9.abrupt("return", {
              code: _context9.t2 instanceof CheckoutValidationError ? _context9.t2.responseCode : _constant.ResponseCode.DATABASE_ERROR,
              message: _context9.t2 instanceof CheckoutValidationError ? _context9.t2.message : "An error occurred during the transaction."
            });
          case 95:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 89], [32, 44, 47, 50], [62, 78, 81, 84]]);
  }));
  return function handleCreateOrder(_x9) {
    return _ref10.apply(this, arguments);
  };
}();
var handleConfirmOrder;
var handleDeliveryOrder;
var handleFinishedOrder;
var handleCancelOrder;
var handleDeleteOrder;
var getEmployeeIdByPhone = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(phoneNumber, transaction) {
    var employee;
    return _regeneratorRuntime().wrap(function _callee0$(_context0) {
      while (1) {
        switch (_context0.prev = _context0.next) {
          case 0:
            if (phoneNumber) {
              _context0.next = 2;
              break;
            }
            return _context0.abrupt("return", null);
          case 2:
            _context0.next = 4;
            return _models["default"].User.findOne({
              attributes: ["id"],
              where: {
                phone_number: phoneNumber
              },
              transaction: transaction
            });
          case 4:
            employee = _context0.sent;
            return _context0.abrupt("return", (employee === null || employee === void 0 ? void 0 : employee.id) || null);
          case 6:
          case "end":
            return _context0.stop();
        }
      }
    }, _callee0);
  }));
  return function getEmployeeIdByPhone(_x0, _x1) {
    return _ref12.apply(this, arguments);
  };
}();
var handleUpdateOrder = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(data, employeePhoneNumber) {
    var t, order_uuid, status_id, note, payment_method_id, shipping_address, order, orderUpdates, hasStatusUpdate, nextStatusId, currentStatusId, status, previousShippingAddressId, shippingAddressSnapshot, remainingReferences;
    return _regeneratorRuntime().wrap(function _callee1$(_context1) {
      while (1) {
        switch (_context1.prev = _context1.next) {
          case 0:
            _context1.prev = 0;
            _context1.next = 3;
            return sequelize.transaction();
          case 3:
            t = _context1.sent;
            order_uuid = data.order_uuid, status_id = data.status_id, note = data.note, payment_method_id = data.payment_method_id, shipping_address = data.shipping_address;
            _context1.next = 7;
            return _models["default"].Order.findOne({
              where: {
                order_uuid: order_uuid
              },
              transaction: t,
              lock: t.LOCK.UPDATE
            });
          case 7:
            order = _context1.sent;
            if (order) {
              _context1.next = 12;
              break;
            }
            _context1.next = 11;
            return t.rollback();
          case 11:
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Order not found."
            });
          case 12:
            orderUpdates = {};
            hasStatusUpdate = status_id !== undefined && status_id !== null && status_id !== "";
            nextStatusId = hasStatusUpdate ? Number(status_id) : null;
            currentStatusId = Number(order.status_id);
            if (!(hasStatusUpdate && (!Number.isSafeInteger(nextStatusId) || !ORDER_TRANSITIONS.has(nextStatusId)))) {
              _context1.next = 20;
              break;
            }
            _context1.next = 19;
            return t.rollback();
          case 19:
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Invalid order status."
            });
          case 20:
            if (!(nextStatusId !== null && nextStatusId !== currentStatusId)) {
              _context1.next = 48;
              break;
            }
            if (canTransitionOrder(currentStatusId, nextStatusId)) {
              _context1.next = 25;
              break;
            }
            _context1.next = 24;
            return t.rollback();
          case 24:
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Order cannot transition from status ".concat(currentStatusId, " to ").concat(nextStatusId, ".")
            });
          case 25:
            _context1.next = 27;
            return _models["default"].Status.findOne({
              where: {
                id: nextStatusId
              },
              transaction: t
            });
          case 27:
            status = _context1.sent;
            if (status) {
              _context1.next = 32;
              break;
            }
            _context1.next = 31;
            return t.rollback();
          case 31:
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Order status not found."
            });
          case 32:
            if (!(nextStatusId === _constant.OrderStateCode.CANCELED)) {
              _context1.next = 35;
              break;
            }
            _context1.next = 35;
            return restoreOrderInventory(order, t);
          case 35:
            orderUpdates.status_id = nextStatusId;
            if (nextStatusId === _constant.OrderStateCode.FINISHED) {
              // A finished order consumes the reservation permanently. Stock
              // was already deducted at checkout, so clear the flag without
              // restoring inventory.
              orderUpdates.inventory_reserved = false;
            }
            _context1.t0 = _models["default"].HistoryOrderUpdate;
            _context1.t1 = order_uuid;
            _context1.next = 41;
            return getEmployeeIdByPhone(employeePhoneNumber, t);
          case 41:
            _context1.t2 = _context1.sent;
            _context1.t3 = nextStatusId;
            _context1.t4 = "Update order status to ".concat(status.code);
            _context1.t5 = {
              order_uuid: _context1.t1,
              employee_id: _context1.t2,
              status_id: _context1.t3,
              description: _context1.t4
            };
            _context1.t6 = {
              transaction: t
            };
            _context1.next = 48;
            return _context1.t0.create.call(_context1.t0, _context1.t5, _context1.t6);
          case 48:
            if (note !== undefined) {
              orderUpdates.note = note;
            }
            if (payment_method_id) {
              orderUpdates.payment_method_id = Number(payment_method_id);
            }
            previousShippingAddressId = order.shipping_address_id;
            if (!shipping_address) {
              _context1.next = 56;
              break;
            }
            _context1.next = 54;
            return _models["default"].ShippingAddress.create(normalizeShippingAddress(shipping_address), {
              transaction: t
            });
          case 54:
            shippingAddressSnapshot = _context1.sent;
            orderUpdates.shipping_address_id = shippingAddressSnapshot.id;
          case 56:
            if (!(Object.keys(orderUpdates).length > 0)) {
              _context1.next = 59;
              break;
            }
            _context1.next = 59;
            return _models["default"].Order.update(orderUpdates, {
              where: {
                order_uuid: order_uuid
              },
              transaction: t
            });
          case 59:
            if (!(shipping_address && previousShippingAddressId)) {
              _context1.next = 66;
              break;
            }
            _context1.next = 62;
            return _models["default"].Order.count({
              where: {
                shipping_address_id: previousShippingAddressId
              },
              transaction: t
            });
          case 62:
            remainingReferences = _context1.sent;
            if (!(remainingReferences === 0)) {
              _context1.next = 66;
              break;
            }
            _context1.next = 66;
            return _models["default"].ShippingAddress.destroy({
              where: {
                id: previousShippingAddressId
              },
              transaction: t
            });
          case 66:
            _context1.next = 68;
            return t.commit();
          case 68:
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update order successfully"
            });
          case 71:
            _context1.prev = 71;
            _context1.t7 = _context1["catch"](0);
            _context1.next = 75;
            return (0, _transaction.rollbackTransaction)(t);
          case 75:
            console.log(_context1.t7);
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while updating the order."
            });
          case 77:
          case "end":
            return _context1.stop();
        }
      }
    }, _callee1, null, [[0, 71]]);
  }));
  return function handleUpdateOrder(_x10, _x11) {
    return _ref13.apply(this, arguments);
  };
}();
var handleChangeOrderStatus = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(uuid, statusId, employeePhoneNumber, description) {
    var data;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return handleUpdateOrder({
              order_uuid: uuid,
              status_id: statusId
            }, employeePhoneNumber);
          case 2:
            data = _context10.sent;
            return _context10.abrupt("return", {
              code: data.code,
              message: data.code === _constant.ResponseCode.SUCCESS ? description : data.message
            });
          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function handleChangeOrderStatus(_x12, _x13, _x14, _x15) {
    return _ref14.apply(this, arguments);
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
var handleCustomerCancelOrder = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(orderUuid, customerPhoneNumber) {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            if (!(!orderUuid || !customerPhoneNumber)) {
              _context12.next = 2;
              break;
            }
            return _context12.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s)."
            });
          case 2:
            _context12.prev = 2;
            _context12.next = 5;
            return _models["default"].sequelize.transaction(/*#__PURE__*/function () {
              var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(transaction) {
                var order, currentStatusId, _yield$db$Order$updat3, _yield$db$Order$updat4, updatedRows;
                return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return _models["default"].Order.findOne({
                          where: {
                            order_uuid: orderUuid,
                            customer_phone_number: customerPhoneNumber
                          },
                          transaction: transaction,
                          lock: transaction.LOCK.UPDATE
                        });
                      case 2:
                        order = _context11.sent;
                        if (order) {
                          _context11.next = 5;
                          break;
                        }
                        return _context11.abrupt("return", {
                          code: _constant.ResponseCode.FILE_NOT_FOUND,
                          message: "Order not found."
                        });
                      case 5:
                        currentStatusId = Number(order.status_id);
                        if (!(currentStatusId === _constant.OrderStateCode.CANCELED)) {
                          _context11.next = 8;
                          break;
                        }
                        return _context11.abrupt("return", {
                          code: _constant.ResponseCode.VALIDATION_ERROR,
                          message: "Order has already been canceled."
                        });
                      case 8:
                        if (canTransitionOrder(currentStatusId, _constant.OrderStateCode.CANCELED)) {
                          _context11.next = 10;
                          break;
                        }
                        return _context11.abrupt("return", {
                          code: _constant.ResponseCode.VALIDATION_ERROR,
                          message: "Only processed or confirmed orders can be canceled."
                        });
                      case 10:
                        _context11.next = 12;
                        return _models["default"].Order.update({
                          status_id: _constant.OrderStateCode.CANCELED
                        }, {
                          where: {
                            id: order.id,
                            status_id: currentStatusId
                          },
                          transaction: transaction
                        });
                      case 12:
                        _yield$db$Order$updat3 = _context11.sent;
                        _yield$db$Order$updat4 = _slicedToArray(_yield$db$Order$updat3, 1);
                        updatedRows = _yield$db$Order$updat4[0];
                        if (!(updatedRows !== 1)) {
                          _context11.next = 17;
                          break;
                        }
                        throw new Error("Order status changed while canceling.");
                      case 17:
                        _context11.next = 19;
                        return restoreOrderInventory(order, transaction);
                      case 19:
                        _context11.next = 21;
                        return _models["default"].HistoryOrderUpdate.create({
                          order_uuid: orderUuid,
                          employee_id: null,
                          status_id: _constant.OrderStateCode.CANCELED,
                          description: "Customer ".concat(customerPhoneNumber, " canceled order")
                        }, {
                          transaction: transaction
                        });
                      case 21:
                        return _context11.abrupt("return", {
                          code: _constant.ResponseCode.SUCCESS,
                          message: "Cancel order successfully."
                        });
                      case 22:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));
              return function (_x18) {
                return _ref16.apply(this, arguments);
              };
            }());
          case 5:
            return _context12.abrupt("return", _context12.sent);
          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12["catch"](2);
            console.log(_context12.t0);
            return _context12.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while canceling the order."
            });
          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[2, 8]]);
  }));
  return function handleCustomerCancelOrder(_x16, _x17) {
    return _ref15.apply(this, arguments);
  };
}();
handleDeleteOrder = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(_ref17) {
    var id, uuid, order_uuid, where, t, targetOrder, remainingReferences;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            id = _ref17.id, uuid = _ref17.uuid, order_uuid = _ref17.order_uuid;
            where = order_uuid || uuid ? {
              order_uuid: order_uuid || uuid
            } : {
              id: id
            };
            if (!(!where.id && !where.order_uuid)) {
              _context13.next = 4;
              break;
            }
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing order identifier."
            });
          case 4:
            _context13.prev = 4;
            _context13.next = 7;
            return sequelize.transaction();
          case 7:
            t = _context13.sent;
            _context13.next = 10;
            return _models["default"].Order.findOne({
              where: where,
              transaction: t,
              lock: t.LOCK.UPDATE
            });
          case 10:
            targetOrder = _context13.sent;
            if (targetOrder) {
              _context13.next = 15;
              break;
            }
            _context13.next = 14;
            return t.rollback();
          case 14:
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "invalid order"
            });
          case 15:
            if (!(Number(targetOrder.status_id) !== _constant.OrderStateCode.CANCELED)) {
              _context13.next = 19;
              break;
            }
            _context13.next = 18;
            return t.rollback();
          case 18:
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Only canceled orders can be deleted."
            });
          case 19:
            _context13.next = 21;
            return restoreOrderInventory(targetOrder, t);
          case 21:
            _context13.next = 23;
            return _models["default"].HistoryOrderUpdate.destroy({
              where: {
                order_uuid: targetOrder.order_uuid
              },
              transaction: t
            });
          case 23:
            _context13.next = 25;
            return _models["default"].OrderDetail.destroy({
              where: {
                order_uuid: targetOrder.order_uuid
              },
              transaction: t
            });
          case 25:
            _context13.next = 27;
            return _models["default"].Order.destroy({
              where: {
                id: targetOrder.id
              },
              transaction: t
            });
          case 27:
            if (!targetOrder.shipping_address_id) {
              _context13.next = 34;
              break;
            }
            _context13.next = 30;
            return _models["default"].Order.count({
              where: {
                shipping_address_id: targetOrder.shipping_address_id
              },
              transaction: t
            });
          case 30:
            remainingReferences = _context13.sent;
            if (!(remainingReferences === 0)) {
              _context13.next = 34;
              break;
            }
            _context13.next = 34;
            return _models["default"].ShippingAddress.destroy({
              where: {
                id: targetOrder.shipping_address_id
              },
              transaction: t
            });
          case 34:
            _context13.next = 36;
            return t.commit();
          case 36:
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete order successfully."
            });
          case 39:
            _context13.prev = 39;
            _context13.t0 = _context13["catch"](4);
            _context13.next = 43;
            return (0, _transaction.rollbackTransaction)(t);
          case 43:
            console.log(_context13.t0);
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while deleting the order."
            });
          case 45:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[4, 39]]);
  }));
  return function handleDeleteOrder(_x19) {
    return _ref18.apply(this, arguments);
  };
}();
module.exports = {
  handleGetPaymentMethods: handleGetPaymentMethods,
  handleGetOrderStatuses: handleGetOrderStatuses,
  handleCountOrders: handleCountOrders,
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
  handleCustomerCancelOrder: handleCustomerCancelOrder,
  handleDeleteOrder: handleDeleteOrder
};