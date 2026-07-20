"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _index = require("../constant/index.js");
var _orderService = _interopRequireDefault(require("../services/orderService.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var STAFF_ROLE_IDS = new Set([1, 2, 4]);
var isStaffRequest = function isStaffRequest(req) {
  var _req$user;
  return STAFF_ROLE_IDS.has(Number((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.role_id));
};
var authorizationError = function authorizationError(res) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "You are not allowed to access these orders.";
  return res.status(403).json({
    code: _index.ResponseCode.AUTHORIZATION_ERROR,
    message: message
  });
};
var getPaymentMethods = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
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
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
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
var countOrders = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _orderService["default"].handleCountOrders();
          case 2:
            data = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(data));
          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function countOrders(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getOrder = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$user2, _req$user3;
    var _req$query, order_uuid, order_id, encoded_uuids, phone_number, requestedOrderUuid, authenticatedPhoneNumber, staffRequest, _data$result, data, requestedOrderUuids, _data, _data2;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$query = req.query, order_uuid = _req$query.order_uuid, order_id = _req$query.order_id, encoded_uuids = _req$query.encoded_uuids, phone_number = _req$query.phone_number;
            requestedOrderUuid = order_uuid || order_id;
            authenticatedPhoneNumber = (_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.phone_number;
            staffRequest = isStaffRequest(req);
            if (!(!staffRequest && Number((_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3.role_id) !== 3)) {
              _context4.next = 6;
              break;
            }
            return _context4.abrupt("return", authorizationError(res));
          case 6:
            if (!requestedOrderUuid) {
              _context4.next = 13;
              break;
            }
            _context4.next = 9;
            return _orderService["default"].handleGetOneOrderByUuid(requestedOrderUuid);
          case 9:
            data = _context4.sent;
            if (!(data.code === _index.ResponseCode.SUCCESS && !staffRequest && ((_data$result = data.result) === null || _data$result === void 0 ? void 0 : _data$result.customer_phone_number) !== authenticatedPhoneNumber)) {
              _context4.next = 12;
              break;
            }
            return _context4.abrupt("return", authorizationError(res));
          case 12:
            return _context4.abrupt("return", res.status(200).json(data));
          case 13:
            if (!Object.prototype.hasOwnProperty.call(req.query, "encoded_uuids")) {
              _context4.next = 30;
              break;
            }
            if (encoded_uuids) {
              _context4.next = 16;
              break;
            }
            return _context4.abrupt("return", res.status(200).json({
              code: _index.ResponseCode.SUCCESS,
              message: "Orders not found.",
              result: []
            }));
          case 16:
            _context4.prev = 16;
            requestedOrderUuids = decodeURIComponent(encoded_uuids).split(",").map(function (value) {
              return value.trim();
            }).filter(Boolean);
            _context4.next = 23;
            break;
          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](16);
            return _context4.abrupt("return", res.status(400).json({
              code: _index.ResponseCode.VALIDATION_ERROR,
              message: "Invalid order identifiers."
            }));
          case 23:
            if (!(requestedOrderUuids.length === 0 || requestedOrderUuids.length > 50)) {
              _context4.next = 25;
              break;
            }
            return _context4.abrupt("return", res.status(400).json({
              code: _index.ResponseCode.VALIDATION_ERROR,
              message: "Between 1 and 50 order identifiers are required."
            }));
          case 25:
            _context4.next = 27;
            return _orderService["default"].handleGetOrdersByUuids(encoded_uuids);
          case 27:
            _data = _context4.sent;
            if (_data.code === _index.ResponseCode.SUCCESS && !staffRequest) {
              _data.result = (_data.result || []).filter(function (order) {
                return order.customer_phone_number === authenticatedPhoneNumber;
              });
            }
            return _context4.abrupt("return", res.status(200).json(_data));
          case 30:
            if (!phone_number) {
              _context4.next = 37;
              break;
            }
            if (!(!staffRequest && phone_number !== authenticatedPhoneNumber)) {
              _context4.next = 33;
              break;
            }
            return _context4.abrupt("return", authorizationError(res));
          case 33:
            _context4.next = 35;
            return _orderService["default"].handleGetOrdersByUserPhoneNumber(staffRequest ? phone_number : authenticatedPhoneNumber);
          case 35:
            _data2 = _context4.sent;
            return _context4.abrupt("return", res.status(200).json(_data2));
          case 37:
            return _context4.abrupt("return", res.status(400).json({
              code: _index.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s)."
            }));
          case 38:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[16, 20]]);
  }));
  return function getOrder(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllOrder = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$query2, status_id, status, page, keyword, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
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
            _context5.next = 3;
            return _orderService["default"].handleGetAllOrders(status_id || status, page, keyword);
          case 3:
            data = _context5.sent;
            return _context5.abrupt("return", res.status(200).json(data));
          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function getAllOrder(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var createOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$user4, _req$user5;
    var _req$body, requestedPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress, staffRequest, authenticatedCustomerPhoneNumber, customerPhoneNumber, data, status;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, requestedPhoneNumber = _req$body.customerPhoneNumber, items = _req$body.items, note = _req$body.note, paymentDetails = _req$body.paymentDetails, paymentMethod = _req$body.paymentMethod, shippingAddress = _req$body.shippingAddress;
            staffRequest = isStaffRequest(req);
            authenticatedCustomerPhoneNumber = Number((_req$user4 = req.user) === null || _req$user4 === void 0 ? void 0 : _req$user4.role_id) === 3 ? (_req$user5 = req.user) === null || _req$user5 === void 0 ? void 0 : _req$user5.phone_number : null;
            if (!(!staffRequest && requestedPhoneNumber && requestedPhoneNumber !== authenticatedCustomerPhoneNumber)) {
              _context6.next = 5;
              break;
            }
            return _context6.abrupt("return", authorizationError(res, "You can only place orders for your own account."));
          case 5:
            customerPhoneNumber = staffRequest ? requestedPhoneNumber : authenticatedCustomerPhoneNumber;
            if (!(customerPhoneNumber && items && paymentDetails && paymentMethod && shippingAddress)) {
              _context6.next = 12;
              break;
            }
            _context6.next = 9;
            return _orderService["default"].handleCreateOrder({
              customerPhoneNumber: customerPhoneNumber,
              items: items,
              note: note,
              paymentDetails: paymentDetails,
              paymentMethod: paymentMethod,
              shippingAddress: shippingAddress,
              requireRegisteredCustomer: !staffRequest
            });
          case 9:
            data = _context6.sent;
            status = data.code === _index.ResponseCode.SUCCESS ? 200 : data.code === _index.ResponseCode.FILE_NOT_FOUND ? 404 : data.code === _index.ResponseCode.AUTHORIZATION_ERROR ? 403 : 400;
            return _context6.abrupt("return", res.status(status).json(data));
          case 12:
            return _context6.abrupt("return", res.status(400).json({
              code: _index.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s)."
            }));
          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function createOrder(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var updateOrder = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var order_uuid, _req$user6, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            order_uuid = req.body.order_uuid;
            if (!order_uuid) {
              _context7.next = 6;
              break;
            }
            _context7.next = 4;
            return _orderService["default"].handleUpdateOrder(req.body, (_req$user6 = req.user) === null || _req$user6 === void 0 ? void 0 : _req$user6.phone_number);
          case 4:
            data = _context7.sent;
            return _context7.abrupt("return", res.status(200).json(data));
          case 6:
            return _context7.abrupt("return", res.status(400).json({
              code: _index.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s)."
            }));
          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function updateOrder(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var confirmOrder = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$user7, data;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!req.body.uuid) {
              _context8.next = 5;
              break;
            }
            _context8.next = 3;
            return _orderService["default"].handleConfirmOrder(req.body.uuid, (_req$user7 = req.user) === null || _req$user7 === void 0 ? void 0 : _req$user7.phone_number);
          case 3:
            data = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context8.abrupt("return", res.status(400).json({
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
  return function confirmOrder(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
var deliveryOrder = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$user8, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!req.body.uuid) {
              _context9.next = 5;
              break;
            }
            _context9.next = 3;
            return _orderService["default"].handleDeliveryOrder(req.body.uuid, (_req$user8 = req.user) === null || _req$user8 === void 0 ? void 0 : _req$user8.phone_number);
          case 3:
            data = _context9.sent;
            return _context9.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context9.abrupt("return", res.status(400).json({
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
  return function deliveryOrder(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
var finishedOrder = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(req, res) {
    var _req$user9, data;
    return _regeneratorRuntime().wrap(function _callee0$(_context0) {
      while (1) {
        switch (_context0.prev = _context0.next) {
          case 0:
            if (!req.body.uuid) {
              _context0.next = 5;
              break;
            }
            _context0.next = 3;
            return _orderService["default"].handleFinishedOrder(req.body.uuid, (_req$user9 = req.user) === null || _req$user9 === void 0 ? void 0 : _req$user9.phone_number);
          case 3:
            data = _context0.sent;
            return _context0.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context0.abrupt("return", res.status(400).json({
              code: 1,
              message: "missing parameter(s)"
            }));
          case 6:
          case "end":
            return _context0.stop();
        }
      }
    }, _callee0);
  }));
  return function finishedOrder(_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}();
var cancelOrder = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(req, res) {
    var _req$user0, data;
    return _regeneratorRuntime().wrap(function _callee1$(_context1) {
      while (1) {
        switch (_context1.prev = _context1.next) {
          case 0:
            if (!req.body.uuid) {
              _context1.next = 5;
              break;
            }
            _context1.next = 3;
            return _orderService["default"].handleCancelOrder(req.body.uuid, (_req$user0 = req.user) === null || _req$user0 === void 0 ? void 0 : _req$user0.phone_number);
          case 3:
            data = _context1.sent;
            return _context1.abrupt("return", res.status(200).json({
              code: data.code,
              message: data.message
            }));
          case 5:
            return _context1.abrupt("return", res.status(400).json({
              code: 1,
              message: "missing parameter(s)"
            }));
          case 6:
          case "end":
            return _context1.stop();
        }
      }
    }, _callee1);
  }));
  return function cancelOrder(_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}();
var customerCancelOrder = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$user1, _req$body2, order_uuid, uuid, data;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body2 = req.body, order_uuid = _req$body2.order_uuid, uuid = _req$body2.uuid;
            _context10.next = 4;
            return _orderService["default"].handleCustomerCancelOrder(order_uuid || uuid, (_req$user1 = req.user) === null || _req$user1 === void 0 ? void 0 : _req$user1.phone_number);
          case 4:
            data = _context10.sent;
            return _context10.abrupt("return", res.status(data.code === _index.ResponseCode.SUCCESS ? 200 : 400).json(data));
          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            console.error(_context10.t0);
            return _context10.abrupt("return", res.status(500).json({
              code: _index.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred while canceling the order."
            }));
          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function customerCancelOrder(_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();
var deleteOrder = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
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
            return _context11.abrupt("return", res.status(400).json({
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
  return function deleteOrder(_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  getPaymentMethods: getPaymentMethods,
  getOrderStatuses: getOrderStatuses,
  countOrders: countOrders,
  getAllOrder: getAllOrder,
  getOrder: getOrder,
  createOrder: createOrder,
  updateOrder: updateOrder,
  confirmOrder: confirmOrder,
  deliveryOrder: deliveryOrder,
  finishedOrder: finishedOrder,
  cancelOrder: cancelOrder,
  customerCancelOrder: customerCancelOrder,
  deleteOrder: deleteOrder
};