"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _models = _interopRequireDefault(require("../models"));
var _constant = require("../constant");
var _lodash = _interopRequireDefault(require("lodash"));
var _transaction = require("../utils/transaction");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var _require = require("sequelize"),
  Op = _require.Op;
var sequelize = _models["default"].sequelize;
var MANAGEABLE_ROLE_IDS = new Map([[1, [2, 3, 4]], [4, [2, 3]]]);
var authorizationError = function authorizationError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "You are not allowed to manage this account.";
  return {
    code: _constant.ResponseCode.AUTHORIZATION_ERROR,
    message: message
  };
};
var resolveActor = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(actor, transaction) {
    var roleId, manageableRoleIds, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            roleId = Number(actor === null || actor === void 0 ? void 0 : actor.role_id);
            manageableRoleIds = MANAGEABLE_ROLE_IDS.get(roleId);
            if (!(!(actor !== null && actor !== void 0 && actor.phone_number) || !manageableRoleIds)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", null);
          case 4:
            _context.next = 6;
            return _models["default"].User.findOne({
              attributes: ["id", "phone_number", "role_id"],
              where: {
                phone_number: actor.phone_number,
                role_id: roleId
              },
              transaction: transaction
            });
          case 6:
            user = _context.sent;
            return _context.abrupt("return", user ? {
              user: user,
              manageableRoleIds: manageableRoleIds
            } : null);
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function resolveActor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var handleGetRoles = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(actor) {
    var actorContext, roles;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return resolveActor(actor);
          case 3:
            actorContext = _context2.sent;
            if (actorContext) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", authorizationError());
          case 6:
            _context2.next = 8;
            return _models["default"].Role.findAll({
              where: {
                id: actorContext.manageableRoleIds
              },
              order: [["id", "ASC"]]
            });
          case 8:
            roles = _context2.sent;
            if (!(roles.length > 0)) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get roles successfully",
              result: roles
            });
          case 11:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get roles failure"
            });
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function handleGetRoles(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var handleCountUsers = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(actor) {
    var actorContext, roleCounts, roles, countByRole;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return resolveActor(actor);
          case 3:
            actorContext = _context3.sent;
            if (actorContext) {
              _context3.next = 6;
              break;
            }
            return _context3.abrupt("return", authorizationError());
          case 6:
            _context3.next = 8;
            return _models["default"].User.findAll({
              attributes: ["role_id", [sequelize.fn("COUNT", sequelize.col("id")), "user_count"]],
              where: {
                role_id: actorContext.manageableRoleIds
              },
              group: ["role_id"],
              raw: true
            });
          case 8:
            roleCounts = _context3.sent;
            _context3.next = 11;
            return _models["default"].Role.findAll({
              where: {
                id: actorContext.manageableRoleIds
              },
              raw: true
            });
          case 11:
            roles = _context3.sent;
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
              _context3.next = 15;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get users count by role successfully",
              result: countByRole
            });
          case 15:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get users count by role failure"
            });
          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function handleCountUsers(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var handleGetUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(role_id, slug, page, keyword, actor) {
    var actorContext, currentPage, pageSize, where, searchKeyword, requestedRoleId, role, _yield$db$User$findAn, count, rows, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return resolveActor(actor);
          case 3:
            actorContext = _context4.sent;
            if (actorContext) {
              _context4.next = 6;
              break;
            }
            return _context4.abrupt("return", authorizationError());
          case 6:
            currentPage = page && !_lodash["default"].isNaN(page) ? Number(page) : 1;
            pageSize = 12;
            where = {
              role_id: actorContext.manageableRoleIds
            };
            searchKeyword = keyword === null || keyword === void 0 ? void 0 : keyword.trim();
            if (!(role_id && role_id !== "all")) {
              _context4.next = 15;
              break;
            }
            requestedRoleId = Number(role_id);
            if (actorContext.manageableRoleIds.includes(requestedRoleId)) {
              _context4.next = 14;
              break;
            }
            return _context4.abrupt("return", buildUserListResponse([], 0, currentPage, pageSize));
          case 14:
            where.role_id = requestedRoleId;
          case 15:
            if (!(slug && slug !== "all")) {
              _context4.next = 24;
              break;
            }
            _context4.next = 18;
            return _models["default"].Role.findOne({
              where: {
                slug: slug
              },
              raw: true
            });
          case 18:
            role = _context4.sent;
            if (role) {
              _context4.next = 21;
              break;
            }
            return _context4.abrupt("return", buildUserListResponse([], 0, currentPage, pageSize));
          case 21:
            if (actorContext.manageableRoleIds.includes(Number(role.id))) {
              _context4.next = 23;
              break;
            }
            return _context4.abrupt("return", buildUserListResponse([], 0, currentPage, pageSize));
          case 23:
            where.role_id = role.id;
          case 24:
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
            _context4.next = 27;
            return _models["default"].User.findAndCountAll({
              where: where,
              attributes: {
                exclude: ["password"]
              },
              order: [["id", "DESC"]],
              limit: pageSize,
              offset: (currentPage - 1) * pageSize
            });
          case 27:
            _yield$db$User$findAn = _context4.sent;
            count = _yield$db$User$findAn.count;
            rows = _yield$db$User$findAn.rows;
            if (!rows) {
              _context4.next = 35;
              break;
            }
            _context4.next = 33;
            return appendUserDisplayData(rows);
          case 33:
            result = _context4.sent;
            return _context4.abrupt("return", buildUserListResponse(result, count, currentPage, pageSize));
          case 35:
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Get user(s) failure."
            });
          case 38:
            _context4.prev = 38;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 42:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 38]]);
  }));
  return function handleGetUsers(_x5, _x6, _x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
var handleGetUserByUsername = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(username, actor) {
    var actorContext, user, _yield$appendUserDisp, _yield$appendUserDisp2, result, avatar;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return resolveActor(actor);
          case 3:
            actorContext = _context5.sent;
            if (actorContext) {
              _context5.next = 6;
              break;
            }
            return _context5.abrupt("return", authorizationError());
          case 6:
            _context5.next = 8;
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
          case 8:
            user = _context5.sent;
            if (!user) {
              _context5.next = 21;
              break;
            }
            if (actorContext.manageableRoleIds.includes(Number(user.role_id))) {
              _context5.next = 12;
              break;
            }
            return _context5.abrupt("return", authorizationError());
          case 12:
            _context5.next = 14;
            return appendUserDisplayData([user]);
          case 14:
            _yield$appendUserDisp = _context5.sent;
            _yield$appendUserDisp2 = _slicedToArray(_yield$appendUserDisp, 1);
            result = _yield$appendUserDisp2[0];
            _context5.next = 19;
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
            avatar = _context5.sent;
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get user successfully.",
              result: _objectSpread(_objectSpread({}, result), {}, {
                avatar: avatar
              })
            });
          case 21:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user."
            });
          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 24]]);
  }));
  return function handleGetUserByUsername(_x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}();
var handleCreateUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(user, actor) {
    var _user$birth, _user$bio, actorContext, phoneNumber, email, name, requestedRoleId, existedUser, hashedPassword, convertedAddress, createdUser;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return resolveActor(actor);
          case 3:
            actorContext = _context6.sent;
            if (actorContext) {
              _context6.next = 6;
              break;
            }
            return _context6.abrupt("return", authorizationError());
          case 6:
            phoneNumber = typeof user.phone_number === "string" ? user.phone_number.trim() : "";
            email = typeof user.email === "string" ? user.email.trim().toLowerCase() : "";
            name = typeof user.name === "string" ? user.name.trim() : "";
            if (!(!phoneNumber || !email)) {
              _context6.next = 11;
              break;
            }
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Phone number and email are required."
            });
          case 11:
            requestedRoleId = Number(user.role_id);
            if (!(!Number.isSafeInteger(requestedRoleId) || !actorContext.manageableRoleIds.includes(requestedRoleId))) {
              _context6.next = 14;
              break;
            }
            return _context6.abrupt("return", authorizationError("You are not allowed to assign that role."));
          case 14:
            if (isValidPassword(user.password)) {
              _context6.next = 16;
              break;
            }
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number."
            });
          case 16:
            _context6.next = 18;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: phoneNumber
              }, {
                email: email
              }])
            });
          case 18:
            existedUser = _context6.sent;
            if (!existedUser) {
              _context6.next = 21;
              break;
            }
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Phone number or email already in use."
            });
          case 21:
            hashedPassword = hashPassword(user.password);
            convertedAddress = handleConvertAddressType(user.address);
            _context6.next = 25;
            return _models["default"].User.create({
              phone_number: phoneNumber,
              email: email,
              password: hashedPassword,
              name: name || phoneNumber,
              birth: typeof user.birth === "string" ? user.birth.trim() || null : (_user$birth = user.birth) !== null && _user$birth !== void 0 ? _user$birth : null,
              bio: (_user$bio = user.bio) !== null && _user$bio !== void 0 ? _user$bio : null,
              address: convertedAddress,
              last_login: null,
              role_id: requestedRoleId
            });
          case 25:
            createdUser = _context6.sent;
            if (!createdUser) {
              _context6.next = 31;
              break;
            }
            if (!user.avatar) {
              _context6.next = 30;
              break;
            }
            _context6.next = 30;
            return _models["default"].Image.create({
              target_id: createdUser.id,
              target_type: "avatar",
              public_id: user.avatar.public_id,
              secure_url: user.avatar.secure_url,
              thumbnail_url: user.avatar.thumbnail_url
            });
          case 30:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create user successfully."
            });
          case 31:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Create user failure."
            });
          case 34:
            _context6.prev = 34;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 38:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 34]]);
  }));
  return function handleCreateUser(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var handleUpdateUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(user, actor) {
    var t, _user$birth2, actorContext, existedUser, requestedRoleId, duplicatedEmail, convertedAddress, updatedUser, passwordChanged, roleChanged, _yield$db$Image$findO, _yield$db$Image$findO2, created;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return sequelize.transaction();
          case 3:
            t = _context7.sent;
            _context7.next = 6;
            return resolveActor(actor, t);
          case 6:
            actorContext = _context7.sent;
            if (actorContext) {
              _context7.next = 11;
              break;
            }
            _context7.next = 10;
            return t.rollback();
          case 10:
            return _context7.abrupt("return", authorizationError());
          case 11:
            _context7.next = 13;
            return _models["default"].User.findOne({
              where: {
                phone_number: user.phone_number
              },
              transaction: t
            });
          case 13:
            existedUser = _context7.sent;
            if (existedUser) {
              _context7.next = 18;
              break;
            }
            _context7.next = 17;
            return t.rollback();
          case 17:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user account."
            });
          case 18:
            requestedRoleId = Number(user.role_id);
            if (!(existedUser.phone_number === actorContext.user.phone_number || !actorContext.manageableRoleIds.includes(Number(existedUser.role_id)) || !Number.isSafeInteger(requestedRoleId) || !actorContext.manageableRoleIds.includes(requestedRoleId))) {
              _context7.next = 23;
              break;
            }
            _context7.next = 22;
            return t.rollback();
          case 22:
            return _context7.abrupt("return", authorizationError());
          case 23:
            if (!(user.email && user.email !== existedUser.email)) {
              _context7.next = 31;
              break;
            }
            _context7.next = 26;
            return _models["default"].User.findOne({
              where: {
                email: user.email,
                id: _defineProperty({}, Op.ne, existedUser.id)
              },
              transaction: t
            });
          case 26:
            duplicatedEmail = _context7.sent;
            if (!duplicatedEmail) {
              _context7.next = 31;
              break;
            }
            _context7.next = 30;
            return t.rollback();
          case 30:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Email already in use."
            });
          case 31:
            convertedAddress = handleConvertAddressType(user.address);
            updatedUser = {
              name: user.name,
              email: user.email,
              role_id: requestedRoleId,
              birth: typeof user.birth === "string" ? user.birth.trim() || null : (_user$birth2 = user.birth) !== null && _user$birth2 !== void 0 ? _user$birth2 : null,
              bio: user.bio,
              address: convertedAddress
            };
            passwordChanged = Boolean(user.password && user.password.trim());
            roleChanged = Number(existedUser.role_id) !== requestedRoleId;
            if (!passwordChanged) {
              _context7.next = 41;
              break;
            }
            if (isValidPassword(user.password)) {
              _context7.next = 40;
              break;
            }
            _context7.next = 39;
            return t.rollback();
          case 39:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number."
            });
          case 40:
            updatedUser.password = hashPassword(user.password);
          case 41:
            _context7.next = 43;
            return _models["default"].User.update(updatedUser, {
              where: {
                phone_number: user.phone_number
              },
              transaction: t
            });
          case 43:
            if (!(passwordChanged || roleChanged)) {
              _context7.next = 46;
              break;
            }
            _context7.next = 46;
            return _models["default"].RefreshToken.destroy({
              where: {
                phone_number: existedUser.phone_number
              },
              transaction: t
            });
          case 46:
            if (!user.avatar) {
              _context7.next = 55;
              break;
            }
            _context7.next = 49;
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
          case 49:
            _yield$db$Image$findO = _context7.sent;
            _yield$db$Image$findO2 = _slicedToArray(_yield$db$Image$findO, 2);
            created = _yield$db$Image$findO2[1];
            if (created) {
              _context7.next = 55;
              break;
            }
            _context7.next = 55;
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
          case 55:
            _context7.next = 57;
            return t.commit();
          case 57:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update user successfully."
            });
          case 60:
            _context7.prev = 60;
            _context7.t0 = _context7["catch"](0);
            _context7.next = 64;
            return (0, _transaction.rollbackTransaction)(t);
          case 64:
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 66:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 60]]);
  }));
  return function handleUpdateUser(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var handleDeleteUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(user, actor) {
    var transaction, actorContext, existed;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return sequelize.transaction();
          case 3:
            transaction = _context8.sent;
            _context8.next = 6;
            return resolveActor(actor, transaction);
          case 6:
            actorContext = _context8.sent;
            if (actorContext) {
              _context8.next = 11;
              break;
            }
            _context8.next = 10;
            return transaction.rollback();
          case 10:
            return _context8.abrupt("return", authorizationError());
          case 11:
            _context8.next = 13;
            return _models["default"].User.findOne({
              where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email
              },
              transaction: transaction
            });
          case 13:
            existed = _context8.sent;
            if (existed) {
              _context8.next = 18;
              break;
            }
            _context8.next = 17;
            return transaction.rollback();
          case 17:
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user account."
            });
          case 18:
            if (!(existed.phone_number === actorContext.user.phone_number || !actorContext.manageableRoleIds.includes(Number(existed.role_id)))) {
              _context8.next = 22;
              break;
            }
            _context8.next = 21;
            return transaction.rollback();
          case 21:
            return _context8.abrupt("return", authorizationError());
          case 22:
            _context8.next = 24;
            return _models["default"].RefreshToken.destroy({
              where: {
                phone_number: existed.phone_number
              },
              transaction: transaction
            });
          case 24:
            _context8.next = 26;
            return _models["default"].User.destroy({
              where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email
              },
              transaction: transaction
            });
          case 26:
            _context8.next = 28;
            return transaction.commit();
          case 28:
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete user successfully."
            });
          case 31:
            _context8.prev = 31;
            _context8.t0 = _context8["catch"](0);
            _context8.next = 35;
            return (0, _transaction.rollbackTransaction)(transaction);
          case 35:
            console.log(_context8.t0);
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 37:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 31]]);
  }));
  return function handleDeleteUser(_x14, _x15) {
    return _ref8.apply(this, arguments);
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
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(users) {
    var plainUsers, userIds, roleIds, _yield$Promise$all, _yield$Promise$all2, roles, avatars;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
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
            _context9.next = 5;
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
            _yield$Promise$all = _context9.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            roles = _yield$Promise$all2[0];
            avatars = _yield$Promise$all2[1];
            return _context9.abrupt("return", plainUsers.map(function (user) {
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
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function appendUserDisplayData(_x16) {
    return _ref9.apply(this, arguments);
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