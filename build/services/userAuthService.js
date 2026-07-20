"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _constant = require("../constant");
var _models = _interopRequireDefault(require("../models"));
var _transaction = require("../utils/transaction");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) { r.unshift(t); } return function e() { for (; r.length;) { if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; } return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("sequelize"),
  Op = _require.Op;
var sequelize = _models["default"].sequelize;
var STAFF_ROLE_IDS = new Set([1, 2, 4]);

/** USER */

var handleLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(username, password) {
    var normalizedUsername, user, anyRoleUser, isValidPassword, avatar, accessToken, refreshToken, userData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            normalizedUsername = typeof username === "string" ? username.trim() : username;
            _context.next = 4;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: normalizedUsername,
                role_id: _defineProperty({}, Op["in"], [1, 2, 4])
              }, {
                email: normalizedUsername,
                role_id: _defineProperty({}, Op["in"], [1, 2, 4])
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
            if (!(anyRoleUser && Number(anyRoleUser.role_id) === 3)) {
              _context.next = 11;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.AUTHENTICATION_ERROR,
              message: "Tài khoản này thuộc trang cửa hàng, vui lòng đăng nhập ở store."
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
            isValidPassword = _context.sent;
            if (isValidPassword) {
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
var handleLogout = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(phone_number) {
    var t;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return sequelize.transaction();
          case 3:
            t = _context2.sent;
            _context2.next = 6;
            return _models["default"].User.update({
              last_login: Date.now()
            }, {
              where: {
                phone_number: phone_number
              },
              transaction: t
            });
          case 6:
            _context2.next = 8;
            return _models["default"].RefreshToken.destroy({
              where: {
                phone_number: phone_number
              },
              transaction: t
            });
          case 8:
            _context2.next = 10;
            return t.commit();
          case 10:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Logout successfully."
            });
          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            _context2.next = 17;
            return (0, _transaction.rollbackTransaction)(t);
          case 17:
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function handleLogout(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var handleRefreshTokens = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(refreshToken) {
    var data, phoneNumber, _yield$Promise$all, _yield$Promise$all2, existedRefreshToken, currentUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = _jsonwebtoken["default"].verify(refreshToken, process.env.NODE_REFRESH_TOKEN_SECRET_KEY);
            phoneNumber = data === null || data === void 0 ? void 0 : data.phone_number;
            if (phoneNumber) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
              message: "Forbidden. Invalid refresh token."
            });
          case 5:
            _context3.next = 7;
            return Promise.all([_models["default"].RefreshToken.findOne({
              where: {
                phone_number: phoneNumber
              }
            }), _models["default"].User.findOne({
              where: {
                phone_number: phoneNumber
              }
            })]);
          case 7:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            existedRefreshToken = _yield$Promise$all2[0];
            currentUser = _yield$Promise$all2[1];
            if (!(!existedRefreshToken || existedRefreshToken.token !== refreshToken)) {
              _context3.next = 13;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
              message: "Forbidden. Invalid refresh token."
            });
          case 13:
            if (!(!currentUser || !STAFF_ROLE_IDS.has(Number(currentUser.role_id)) || Number(currentUser.role_id) !== Number(data.role_id))) {
              _context3.next = 17;
              break;
            }
            _context3.next = 16;
            return _models["default"].RefreshToken.destroy({
              where: {
                phone_number: phoneNumber
              }
            });
          case 16:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
              message: "Your account permissions changed. Please sign in again."
            });
          case 17:
            _context3.t0 = _constant.ResponseCode.SUCCESS;
            _context3.t1 = handleGenerateAccessToken(currentUser);
            _context3.next = 21;
            return handleGenerateRefreshToken(currentUser);
          case 21:
            _context3.t2 = _context3.sent;
            return _context3.abrupt("return", {
              code: _context3.t0,
              message: "Refresh successfully.",
              accessToken: _context3.t1,
              refreshToken: _context3.t2
            });
          case 25:
            _context3.prev = 25;
            _context3.t3 = _context3["catch"](0);
            if (!((_context3.t3 === null || _context3.t3 === void 0 ? void 0 : _context3.t3.name) === "JsonWebTokenError" || (_context3.t3 === null || _context3.t3 === void 0 ? void 0 : _context3.t3.name) === "TokenExpiredError")) {
              _context3.next = 29;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
              message: "Forbidden. Invalid refresh token."
            });
          case 29:
            console.error(_context3.t3);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred."
            });
          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 25]]);
  }));
  return function handleRefreshTokens(_x4) {
    return _ref3.apply(this, arguments);
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
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(user) {
    var newRefreshToken, expirationDate, newRecords, _yield$db$RefreshToke, _yield$db$RefreshToke2, refreshToken, created;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
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
            _context4.next = 6;
            return _models["default"].RefreshToken.findOrCreate({
              where: {
                phone_number: user.phone_number
              },
              defaults: newRecords
            });
          case 6:
            _yield$db$RefreshToke = _context4.sent;
            _yield$db$RefreshToke2 = _slicedToArray(_yield$db$RefreshToke, 2);
            refreshToken = _yield$db$RefreshToke2[0];
            created = _yield$db$RefreshToke2[1];
            if (created) {
              _context4.next = 13;
              break;
            }
            _context4.next = 13;
            return _models["default"].RefreshToken.update({
              token: newRefreshToken,
              expirationDate: expirationDate
            }, {
              where: {
                phone_number: user.phone_number
              }
            });
          case 13:
            return _context4.abrupt("return", newRefreshToken);
          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;
          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return function handleGenerateRefreshToken(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var handleUpdateProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(profile) {
    var t, user, duplicatedEmail, convertedAddress, updatedProfile, passwordChanged, _yield$db$Image$findO, _yield$db$Image$findO2, created;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return sequelize.transaction();
          case 3:
            t = _context5.sent;
            _context5.next = 6;
            return _models["default"].User.findOne({
              where: {
                phone_number: profile.phone_number
              },
              transaction: t
            });
          case 6:
            user = _context5.sent;
            if (user) {
              _context5.next = 11;
              break;
            }
            _context5.next = 10;
            return t.rollback();
          case 10:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid account."
            });
          case 11:
            if (!(profile.email && profile.email !== user.email)) {
              _context5.next = 19;
              break;
            }
            _context5.next = 14;
            return _models["default"].User.findOne({
              where: {
                email: profile.email,
                id: _defineProperty({}, Op.ne, user.id)
              },
              transaction: t
            });
          case 14:
            duplicatedEmail = _context5.sent;
            if (!duplicatedEmail) {
              _context5.next = 19;
              break;
            }
            _context5.next = 18;
            return t.rollback();
          case 18:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Email already in use."
            });
          case 19:
            convertedAddress = handleConvertAddressType(profile.address);
            updatedProfile = {
              name: profile.name,
              email: profile.email,
              birth: profile.birth || null,
              bio: profile.bio,
              address: convertedAddress
            };
            passwordChanged = Boolean(profile.password && profile.password.trim());
            if (passwordChanged) {
              updatedProfile.password = hashPassword(profile.password);
            }
            _context5.next = 25;
            return _models["default"].User.update(updatedProfile, {
              where: {
                phone_number: profile.phone_number
              },
              transaction: t
            });
          case 25:
            if (!passwordChanged) {
              _context5.next = 28;
              break;
            }
            _context5.next = 28;
            return _models["default"].RefreshToken.destroy({
              where: {
                phone_number: profile.phone_number
              },
              transaction: t
            });
          case 28:
            if (!profile.avatar) {
              _context5.next = 37;
              break;
            }
            _context5.next = 31;
            return _models["default"].Image.findOrCreate({
              where: {
                target_id: user.id,
                target_type: "avatar"
              },
              defaults: _objectSpread({
                target_id: user.id,
                target_type: "avatar"
              }, profile.avatar),
              transaction: t
            });
          case 31:
            _yield$db$Image$findO = _context5.sent;
            _yield$db$Image$findO2 = _slicedToArray(_yield$db$Image$findO, 2);
            created = _yield$db$Image$findO2[1];
            if (created) {
              _context5.next = 37;
              break;
            }
            _context5.next = 37;
            return _models["default"].Image.update({
              public_id: profile.avatar.public_id,
              secure_url: profile.avatar.secure_url,
              thumbnail_url: profile.avatar.thumbnail_url
            }, {
              where: {
                target_id: user.id,
                target_type: "avatar"
              },
              transaction: t
            });
          case 37:
            _context5.next = 39;
            return t.commit();
          case 39:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update profile successfully."
            });
          case 42:
            _context5.prev = 42;
            _context5.t0 = _context5["catch"](0);
            _context5.next = 46;
            return (0, _transaction.rollbackTransaction)(t);
          case 46:
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 48:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 42]]);
  }));
  return function handleUpdateProfile(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var handleChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(username, password, newPassword) {
    var transaction, normalizedUsername, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            normalizedUsername = typeof username === "string" ? username.trim() : username;
            _context6.next = 4;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: normalizedUsername
              }, {
                email: normalizedUsername
              }])
            });
          case 4:
            user = _context6.sent;
            _context6.t0 = !user;
            if (_context6.t0) {
              _context6.next = 10;
              break;
            }
            _context6.next = 9;
            return verifyPasswordAndUpgrade(user, password);
          case 9:
            _context6.t0 = !_context6.sent;
          case 10:
            if (!_context6.t0) {
              _context6.next = 12;
              break;
            }
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.AUTHENTICATION_ERROR,
              message: "Incorrect username or password"
            });
          case 12:
            _context6.next = 14;
            return sequelize.transaction();
          case 14:
            transaction = _context6.sent;
            _context6.next = 17;
            return _models["default"].User.update({
              password: hashPassword(newPassword)
            }, {
              where: {
                id: user.id
              },
              transaction: transaction
            });
          case 17:
            _context6.next = 19;
            return _models["default"].RefreshToken.destroy({
              where: {
                phone_number: user.phone_number
              },
              transaction: transaction
            });
          case 19:
            _context6.next = 21;
            return transaction.commit();
          case 21:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Password has been changed."
            });
          case 24:
            _context6.prev = 24;
            _context6.t1 = _context6["catch"](0);
            _context6.next = 28;
            return (0, _transaction.rollbackTransaction)(transaction);
          case 28:
            console.log(_context6.t1);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 30:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 24]]);
  }));
  return function handleChangePassword(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
var handleRegister = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(user) {
    var _user$name, existedUser, hashedPassword, convertedAddress, createdUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: user.phone_number
              }, {
                email: user.email
              }])
            });
          case 3:
            existedUser = _context7.sent;
            if (!existedUser) {
              _context7.next = 6;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Phone number or email already in use."
            });
          case 6:
            hashedPassword = hashPassword(user.password);
            convertedAddress = handleConvertAddressType(user.address);
            _context7.next = 10;
            return _models["default"].User.create({
              phone_number: user.phone_number,
              email: user.email,
              password: hashedPassword,
              name: (_user$name = user.name) !== null && _user$name !== void 0 ? _user$name : user.phone_number,
              address: convertedAddress,
              last_login: null,
              birth: null,
              role_id: 3,
              bio: null
            });
          case 10:
            createdUser = _context7.sent;
            delete createdUser.password;
            if (!createdUser) {
              _context7.next = 14;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Register successfully.",
              result: createdUser
            });
          case 14:
            _context7.next = 20;
            break;
          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 16]]);
  }));
  return function handleRegister(_x0) {
    return _ref7.apply(this, arguments);
  };
}();

/** SUPPORTER METHODS */

var hashPassword = function hashPassword(password) {
  var salt = _bcryptjs["default"].genSaltSync(10);
  return _bcryptjs["default"].hashSync(password, salt);
};
var isBcryptHash = function isBcryptHash(password) {
  return typeof password === "string" && /^\$2[aby]\$\d{2}\$/.test(password);
};
var verifyPasswordAndUpgrade = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(user, password) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!isBcryptHash(user.password)) {
              _context8.next = 2;
              break;
            }
            return _context8.abrupt("return", _bcryptjs["default"].compareSync(password, user.password));
          case 2:
            if (!(user.password !== password)) {
              _context8.next = 4;
              break;
            }
            return _context8.abrupt("return", false);
          case 4:
            _context8.next = 6;
            return _models["default"].User.update({
              password: hashPassword(password)
            }, {
              where: {
                id: user.id
              }
            });
          case 6:
            return _context8.abrupt("return", true);
          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function verifyPasswordAndUpgrade(_x1, _x10) {
    return _ref8.apply(this, arguments);
  };
}();
var handleConvertAddressType = function handleConvertAddressType(address) {
  if (!address) {
    return "";
  }

  // Nếu frontend gửi chuỗi thì trả luôn
  if (typeof address === "string") {
    return address;
  }
  return [address.location, address.ward, address.district, address.province].filter(Boolean).join(" - ");
};
var toPlainObject = function toPlainObject(data) {
  return typeof data.get === "function" ? data.get({
    plain: true
  }) : _objectSpread({}, data);
};
module.exports = {
  handleLogin: handleLogin,
  handleLogout: handleLogout,
  handleRegister: handleRegister,
  handleRefreshTokens: handleRefreshTokens,
  handleUpdateProfile: handleUpdateProfile,
  handleChangePassword: handleChangePassword
};