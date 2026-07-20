"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constant = require("../constant");
var _userService = _interopRequireDefault(require("../services/userService"));
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
var getActor = function getActor(req) {
  var _req$user, _req$user2;
  return {
    phone_number: (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.phone_number,
    role_id: Number((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.role_id)
  };
};
var sendServiceResponse = function sendServiceResponse(res, data) {
  var status = data.code === _constant.ResponseCode.AUTHORIZATION_ERROR ? 403 : data.code === _constant.ResponseCode.FILE_NOT_FOUND ? 404 : data.code === _constant.ResponseCode.SUCCESS ? 200 : 400;
  return res.status(status).json(data);
};
var getRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userService["default"].handleGetRoles(getActor(req));
          case 2:
            data = _context.sent;
            return _context.abrupt("return", sendServiceResponse(res, data));
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getRoles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var countUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userService["default"].handleCountUsers(getActor(req));
          case 2:
            data = _context2.sent;
            return _context2.abrupt("return", sendServiceResponse(res, data));
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function countUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$query, username, role_id, slug, page, keyword, _data, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$query = req.query, username = _req$query.username, role_id = _req$query.role_id, slug = _req$query.slug, page = _req$query.page, keyword = _req$query.keyword;
            if (!username) {
              _context3.next = 6;
              break;
            }
            _context3.next = 4;
            return _userService["default"].handleGetUserByUsername(username, getActor(req));
          case 4:
            _data = _context3.sent;
            return _context3.abrupt("return", sendServiceResponse(res, _data));
          case 6:
            _context3.next = 8;
            return _userService["default"].handleGetUsers(role_id, slug, page, keyword, getActor(req));
          case 8:
            data = _context3.sent;
            return _context3.abrupt("return", sendServiceResponse(res, data));
          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var createUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, password, name, phone_number, email, avatar, address, role_id, birth, bio, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, password = _req$body.password, name = _req$body.name, phone_number = _req$body.phone_number, email = _req$body.email, avatar = _req$body.avatar, address = _req$body.address, role_id = _req$body.role_id, birth = _req$body.birth, bio = _req$body.bio;
            if (!(password && phone_number && email && address && role_id)) {
              _context4.next = 6;
              break;
            }
            _context4.next = 4;
            return _userService["default"].handleCreateUser({
              password: password,
              name: name,
              phone_number: phone_number,
              email: email,
              avatar: avatar,
              address: address,
              role_id: role_id,
              birth: birth,
              bio: bio
            }, getActor(req));
          case 4:
            data = _context4.sent;
            return _context4.abrupt("return", sendServiceResponse(res, data));
          case 6:
            return _context4.abrupt("return", res.status(400).json({
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function createUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var updateUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, name, phone_number, email, password, avatar, address, role_id, birth, bio, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, phone_number = _req$body2.phone_number, email = _req$body2.email, password = _req$body2.password, avatar = _req$body2.avatar, address = _req$body2.address, role_id = _req$body2.role_id, birth = _req$body2.birth, bio = _req$body2.bio;
            if (!(name && phone_number && email && role_id)) {
              _context5.next = 6;
              break;
            }
            _context5.next = 4;
            return _userService["default"].handleUpdateUser({
              name: name,
              phone_number: phone_number,
              email: email,
              password: password,
              avatar: avatar,
              address: address,
              role_id: role_id,
              birth: birth,
              bio: bio
            }, getActor(req));
          case 4:
            data = _context5.sent;
            return _context5.abrupt("return", sendServiceResponse(res, data));
          case 6:
            return _context5.abrupt("return", res.status(400).json({
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function updateUser(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, id, phone_number, email, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, id = _req$body3.id, phone_number = _req$body3.phone_number, email = _req$body3.email;
            if (!(id && phone_number && email)) {
              _context6.next = 6;
              break;
            }
            _context6.next = 4;
            return _userService["default"].handleDeleteUser({
              id: id,
              phone_number: phone_number,
              email: email
            }, getActor(req));
          case 4:
            data = _context6.sent;
            return _context6.abrupt("return", sendServiceResponse(res, data));
          case 6:
            return _context6.abrupt("return", res.status(400).json({
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            }));
          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function deleteUser(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  getRoles: getRoles,
  countUsers: countUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};