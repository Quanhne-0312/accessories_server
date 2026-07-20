"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var ResponseCode = require("../constant").ResponseCode;
var userAuthService = require("../services/userAuthService");
var customerAuthService = require("../services/customerAuthService");

/** -------------------------------- USER AUTH -------------------------------- */

var userLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
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
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$user;
    var phone_number, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            phone_number = (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.phone_number;
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
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
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
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$user2;
    var _req$body2, name, phone_number, email, password, avatar, address, birth, bio, authenticatedPhoneNumber, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, phone_number = _req$body2.phone_number, email = _req$body2.email, password = _req$body2.password, avatar = _req$body2.avatar, address = _req$body2.address, birth = _req$body2.birth, bio = _req$body2.bio;
            authenticatedPhoneNumber = (_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.phone_number;
            if (!(phone_number && authenticatedPhoneNumber && phone_number !== authenticatedPhoneNumber)) {
              _context4.next = 4;
              break;
            }
            return _context4.abrupt("return", res.status(403).json({
              code: ResponseCode.AUTHORIZATION_ERROR,
              message: "You can only update your own profile."
            }));
          case 4:
            if (!(name && authenticatedPhoneNumber && email)) {
              _context4.next = 9;
              break;
            }
            _context4.next = 7;
            return userAuthService.handleUpdateProfile({
              name: name,
              phone_number: authenticatedPhoneNumber,
              email: email,
              password: password,
              avatar: avatar,
              address: address,
              birth: birth,
              bio: bio
            });
          case 7:
            data = _context4.sent;
            return _context4.abrupt("return", res.status(200).json(data));
          case 9:
            return _context4.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 10:
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
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
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
            return _context5.abrupt("return", res.status(400).json({
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
  return function changeUserPassword(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

/** -------------------------------- CUSTOMER AUTH -------------------------------- */

var customerLogin = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, username, password, normalizedUsername, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;
            normalizedUsername = typeof username === "string" ? username.trim() : username;
            if (!(normalizedUsername && password)) {
              _context6.next = 7;
              break;
            }
            _context6.next = 5;
            return customerAuthService.handleLogin(normalizedUsername, password);
          case 5:
            data = _context6.sent;
            return _context6.abrupt("return", res.status(200).json(data));
          case 7:
            return _context6.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function customerLogin(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var customerLogout = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$user3;
    var phone_number, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            phone_number = (_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3.phone_number;
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
  return function customerLogout(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var customerRegister = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
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
  return function customerRegister(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
var customerUpdateProfile = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$user4;
    var _req$body5, email, phone_number, phoneNumber, name, birth, address, avatar, bio, normalizedPhoneNumber, authenticatedPhoneNumber, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$body5 = req.body, email = _req$body5.email, phone_number = _req$body5.phone_number, phoneNumber = _req$body5.phoneNumber, name = _req$body5.name, birth = _req$body5.birth, address = _req$body5.address, avatar = _req$body5.avatar, bio = _req$body5.bio;
            normalizedPhoneNumber = phone_number || phoneNumber;
            authenticatedPhoneNumber = (_req$user4 = req.user) === null || _req$user4 === void 0 ? void 0 : _req$user4.phone_number;
            if (!(normalizedPhoneNumber && authenticatedPhoneNumber && normalizedPhoneNumber !== authenticatedPhoneNumber)) {
              _context9.next = 5;
              break;
            }
            return _context9.abrupt("return", res.status(403).json({
              code: ResponseCode.AUTHORIZATION_ERROR,
              message: "You can only update your own profile."
            }));
          case 5:
            if (!(authenticatedPhoneNumber && email && name)) {
              _context9.next = 10;
              break;
            }
            _context9.next = 8;
            return customerAuthService.handleUpdateProfile({
              email: email,
              phone_number: authenticatedPhoneNumber,
              name: name,
              birth: birth,
              address: address,
              avatar: avatar,
              bio: bio
            });
          case 8:
            data = _context9.sent;
            return _context9.abrupt("return", res.status(200).json(data));
          case 10:
            return _context9.abrupt("return", res.status(400).json({
              code: ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function customerUpdateProfile(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
var customerVerifyRefreshToken = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(req, res) {
    var token, data;
    return _regeneratorRuntime().wrap(function _callee0$(_context0) {
      while (1) {
        switch (_context0.prev = _context0.next) {
          case 0:
            token = req.body["x-refresh-token"];
            if (token) {
              _context0.next = 3;
              break;
            }
            return _context0.abrupt("return", res.status(403).json({
              code: ResponseCode.AUTHORIZATION_ERROR,
              message: "Forbidden. Invalid refresh token."
            }));
          case 3:
            _context0.next = 5;
            return customerAuthService.handleVerifyRefreshToken(token);
          case 5:
            data = _context0.sent;
            return _context0.abrupt("return", res.status(200).json(data));
          case 7:
          case "end":
            return _context0.stop();
        }
      }
    }, _callee0);
  }));
  return function customerVerifyRefreshToken(_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}();
var customerRefreshTokens = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(req, res) {
    var token, data;
    return _regeneratorRuntime().wrap(function _callee1$(_context1) {
      while (1) {
        switch (_context1.prev = _context1.next) {
          case 0:
            token = req.body["x-refresh-token"];
            if (token) {
              _context1.next = 3;
              break;
            }
            return _context1.abrupt("return", res.status(403).json({
              code: ResponseCode.AUTHORIZATION_ERROR,
              message: "Forbidden. Invalid refresh token."
            }));
          case 3:
            _context1.next = 5;
            return customerAuthService.handleRefreshTokens(token);
          case 5:
            data = _context1.sent;
            return _context1.abrupt("return", res.status(200).json(data));
          case 7:
          case "end":
            return _context1.stop();
        }
      }
    }, _callee1);
  }));
  return function customerRefreshTokens(_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}();
var changeCustomerPassword = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$user5;
    var requestedPhoneNumber, phoneNumber, password, newPassword, data;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            requestedPhoneNumber = req.body.phone_number || req.body.phoneNumber;
            phoneNumber = (_req$user5 = req.user) === null || _req$user5 === void 0 ? void 0 : _req$user5.phone_number;
            password = req.body.password;
            newPassword = req.body.newPassword;
            if (!(requestedPhoneNumber && phoneNumber && requestedPhoneNumber !== phoneNumber)) {
              _context10.next = 6;
              break;
            }
            return _context10.abrupt("return", res.status(403).json({
              code: ResponseCode.AUTHORIZATION_ERROR,
              message: "You can only change your own password."
            }));
          case 6:
            if (!(!phoneNumber || !password || !newPassword)) {
              _context10.next = 8;
              break;
            }
            return _context10.abrupt("return", res.status(400).json({
              code: ResponseCode.AUTHENTICATION_ERROR,
              message: "Missing infomation."
            }));
          case 8:
            _context10.next = 10;
            return customerAuthService.handleChangePassword(phoneNumber, password, newPassword);
          case 10:
            data = _context10.sent;
            return _context10.abrupt("return", res.status(200).json(data));
          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function changeCustomerPassword(_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
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