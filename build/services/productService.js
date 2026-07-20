"use strict";

var _lodash = _interopRequireDefault(require("lodash"));
var _constant = require("../constant");
var _models = _interopRequireDefault(require("../models"));
var _imageService = _interopRequireDefault(require("./imageService"));
var _transaction = require("../utils/transaction");
var _excluded = ["images"],
  _excluded2 = ["images"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) { r.unshift(t); } return function e() { for (; r.length;) { if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; } return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("sequelize"),
  Op = _require.Op;
var sequelize = _models["default"].sequelize;
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
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
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
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
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
var handleGetColors = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _yield$Promise$all5, _yield$Promise$all6, colors, products;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Promise.all([_models["default"].Color.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].Product.findAll({
              raw: true,
              attributes: ["color"]
            })]);
          case 3:
            _yield$Promise$all5 = _context3.sent;
            _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 2);
            colors = _yield$Promise$all6[0];
            products = _yield$Promise$all6[1];
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get colors successfully",
              result: addProductCountToOptions(colors, products, "color")
            });
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function handleGetColors() {
    return _ref3.apply(this, arguments);
  };
}();
var getCatalogModel = function getCatalogModel(type) {
  if (type === "category") return _models["default"].Category;
  if (type === "material") return _models["default"].Material;
  if (type === "color") return _models["default"].Color;
  return null;
};
var getCatalogTableName = function getCatalogTableName(type) {
  if (type === "category") return "categories";
  if (type === "material") return "materials";
  if (type === "color") return "colors";
  return null;
};
var ensureCatalogSequence = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(type) {
    var tableName;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tableName = getCatalogTableName(type);
            if (tableName) {
              _context4.next = 3;
              break;
            }
            return _context4.abrupt("return");
          case 3:
            _context4.next = 5;
            return _models["default"].sequelize.query("\n        select setval(\n            pg_get_serial_sequence('".concat(tableName, "', 'id'),\n            coalesce((select max(id) from ").concat(tableName, "), 0) + 1,\n            false\n        )\n    "));
          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function ensureCatalogSequence(_x) {
    return _ref4.apply(this, arguments);
  };
}();
var getCatalogUsageCount = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(type, option) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _models["default"].Product.count({
              where: _defineProperty({}, type, [String(option.id), option.slug, option.name])
            }));
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function getCatalogUsageCount(_x2, _x3) {
    return _ref5.apply(this, arguments);
  };
}();
var handleCreateCatalogOption = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref6) {
    var type, name, slug, normalizedOption, Model, existed, created;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            type = _ref6.type, name = _ref6.name, slug = _ref6.slug;
            _context6.prev = 1;
            if (!(!name || !["category", "material", "color"].includes(type))) {
              _context6.next = 4;
              break;
            }
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            });
          case 4:
            normalizedOption = {
              name: name.trim(),
              slug: (slug === null || slug === void 0 ? void 0 : slug.trim()) || slugifyFilterOption(name)
            };
            Model = getCatalogModel(type);
            _context6.next = 8;
            return ensureCatalogSequence(type);
          case 8:
            _context6.next = 10;
            return Model.findOne({
              raw: true,
              where: _defineProperty({}, Op.or, [{
                slug: normalizedOption.slug
              }, {
                name: normalizedOption.name
              }])
            });
          case 10:
            existed = _context6.sent;
            if (!existed) {
              _context6.next = 13;
              break;
            }
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Option already exists."
            });
          case 13:
            _context6.next = 15;
            return Model.create(normalizedOption);
          case 15:
            created = _context6.sent;
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create option successfully.",
              result: toPlainObject(created)
            });
          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 19]]);
  }));
  return function handleCreateCatalogOption(_x4) {
    return _ref7.apply(this, arguments);
  };
}();
var handleUpdateCatalogOption = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref8) {
    var type, id, name, slug, normalizedOption, Model, existed, duplicate;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            type = _ref8.type, id = _ref8.id, name = _ref8.name, slug = _ref8.slug;
            _context7.prev = 1;
            if (!(!id || !name || !["category", "material", "color"].includes(type))) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            });
          case 4:
            normalizedOption = {
              name: name.trim(),
              slug: (slug === null || slug === void 0 ? void 0 : slug.trim()) || slugifyFilterOption(name)
            };
            Model = getCatalogModel(type);
            _context7.next = 8;
            return Model.findOne({
              raw: true,
              where: {
                id: id
              }
            });
          case 8:
            existed = _context7.sent;
            if (existed) {
              _context7.next = 11;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Option not found."
            });
          case 11:
            _context7.next = 13;
            return Model.findOne({
              raw: true,
              where: _defineProperty({
                id: _defineProperty({}, Op.ne, id)
              }, Op.or, [{
                slug: normalizedOption.slug
              }, {
                name: normalizedOption.name
              }])
            });
          case 13:
            duplicate = _context7.sent;
            if (!duplicate) {
              _context7.next = 16;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Option already exists."
            });
          case 16:
            _context7.next = 18;
            return Model.update(normalizedOption, {
              where: {
                id: id
              }
            });
          case 18:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update option successfully."
            });
          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 21]]);
  }));
  return function handleUpdateCatalogOption(_x5) {
    return _ref9.apply(this, arguments);
  };
}();
var handleDeleteCatalogOption = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref0) {
    var type, id, Model, existed, usageCount;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            type = _ref0.type, id = _ref0.id;
            _context8.prev = 1;
            if (!(!id || !["category", "material", "color"].includes(type))) {
              _context8.next = 4;
              break;
            }
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Missing parameter(s). Check again."
            });
          case 4:
            Model = getCatalogModel(type);
            _context8.next = 7;
            return Model.findOne({
              raw: true,
              where: {
                id: id
              }
            });
          case 7:
            existed = _context8.sent;
            if (existed) {
              _context8.next = 10;
              break;
            }
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Option not found."
            });
          case 10:
            _context8.next = 12;
            return getCatalogUsageCount(type, existed);
          case 12:
            usageCount = _context8.sent;
            if (!(usageCount > 0)) {
              _context8.next = 15;
              break;
            }
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.VALIDATION_ERROR,
              message: "Option is being used by products."
            });
          case 15:
            _context8.next = 17;
            return Model.destroy({
              where: {
                id: id
              }
            });
          case 17:
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete option successfully."
            });
          case 20:
            _context8.prev = 20;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 20]]);
  }));
  return function handleDeleteCatalogOption(_x6) {
    return _ref1.apply(this, arguments);
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
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var _yield$Promise$all7, _yield$Promise$all8, categories, materials, colors, products;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return Promise.all([_models["default"].Category.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].Material.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].Color.findAll({
              raw: true,
              order: [["id", "ASC"]]
            }), _models["default"].Product.findAll({
              attributes: ["category", "material", "color"],
              raw: true
            })]);
          case 3:
            _yield$Promise$all7 = _context9.sent;
            _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 4);
            categories = _yield$Promise$all8[0];
            materials = _yield$Promise$all8[1];
            colors = _yield$Promise$all8[2];
            products = _yield$Promise$all8[3];
            return _context9.abrupt("return", {
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
          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 12]]);
  }));
  return function handleCountProducts() {
    return _ref10.apply(this, arguments);
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
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(Model, slugs) {
    var rows;
    return _regeneratorRuntime().wrap(function _callee0$(_context0) {
      while (1) {
        switch (_context0.prev = _context0.next) {
          case 0:
            if (!_lodash["default"].isEmpty(slugs)) {
              _context0.next = 2;
              break;
            }
            return _context0.abrupt("return", []);
          case 2:
            _context0.next = 4;
            return Model.findAll({
              raw: true,
              where: {
                slug: slugs
              }
            });
          case 4:
            rows = _context0.sent;
            return _context0.abrupt("return", rows.flatMap(function (item) {
              return [String(item.id), item.name, item.slug];
            }));
          case 6:
          case "end":
            return _context0.stop();
        }
      }
    }, _callee0);
  }));
  return function getOptionValues(_x7, _x8) {
    return _ref11.apply(this, arguments);
  };
}();
var handleGetProducts = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(_ref12) {
    var _ref12$categories, categories, materials, colors, page, currentPage, _yield$Promise$all9, _yield$Promise$all0, categoryValues, materialValues, colorValues, where, _yield$db$Product$fin, count, rows;
    return _regeneratorRuntime().wrap(function _callee1$(_context1) {
      while (1) {
        switch (_context1.prev = _context1.next) {
          case 0:
            _ref12$categories = _ref12.categories, categories = _ref12$categories === void 0 ? "all" : _ref12$categories, materials = _ref12.materials, colors = _ref12.colors, page = _ref12.page;
            _context1.prev = 1;
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            _context1.next = 5;
            return Promise.all([getOptionValues(_models["default"].Category, getQueryValues(categories)), getOptionValues(_models["default"].Material, getQueryValues(materials)), getOptionValues(_models["default"].Color, getQueryValues(colors))]);
          case 5:
            _yield$Promise$all9 = _context1.sent;
            _yield$Promise$all0 = _slicedToArray(_yield$Promise$all9, 3);
            categoryValues = _yield$Promise$all0[0];
            materialValues = _yield$Promise$all0[1];
            colorValues = _yield$Promise$all0[2];
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
            _context1.next = 16;
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
            _yield$db$Product$fin = _context1.sent;
            count = _yield$db$Product$fin.count;
            rows = _yield$db$Product$fin.rows;
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get products successfully.",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: rows
            });
          case 22:
            _context1.prev = 22;
            _context1.t0 = _context1["catch"](1);
            console.log(_context1.t0);
            return _context1.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 26:
          case "end":
            return _context1.stop();
        }
      }
    }, _callee1, null, [[1, 22]]);
  }));
  return function handleGetProducts(_x9) {
    return _ref13.apply(this, arguments);
  };
}();
var handleGetProductBy = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref14) {
    var slug, id, where, product, productData, _yield$Promise$all1, _yield$Promise$all10, images, category, material, color;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            slug = _ref14.slug, id = _ref14.id;
            _context10.prev = 1;
            where = id ? {
              id: id
            } : {
              slug: slug
            };
            _context10.next = 5;
            return _models["default"].Product.findOne({
              attributes: {
                exclude: ["image_url"]
              },
              where: where
            });
          case 5:
            product = _context10.sent;
            if (!product) {
              _context10.next = 17;
              break;
            }
            productData = toPlainObject(product);
            _context10.next = 10;
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
            }), _models["default"].Color.findOne({
              raw: true,
              where: _defineProperty({}, Op.or, [{
                id: Number(productData.color) || 0
              }, {
                name: productData.color
              }, {
                slug: productData.color
              }])
            })]);
          case 10:
            _yield$Promise$all1 = _context10.sent;
            _yield$Promise$all10 = _slicedToArray(_yield$Promise$all1, 4);
            images = _yield$Promise$all10[0];
            category = _yield$Promise$all10[1];
            material = _yield$Promise$all10[2];
            color = _yield$Promise$all10[3];
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get product successfully",
              result: _objectSpread(_objectSpread({}, productData), {}, {
                category_name: (category === null || category === void 0 ? void 0 : category.name) || productData.category,
                material_name: (material === null || material === void 0 ? void 0 : material.name) || productData.material,
                color_name: (color === null || color === void 0 ? void 0 : color.name) || productData.color,
                images: images
              })
            });
          case 17:
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get product failure"
            });
          case 20:
            _context10.prev = 20;
            _context10.t0 = _context10["catch"](1);
            console.log(_context10.t0);
            return _context10.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 24:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 20]]);
  }));
  return function handleGetProductBy(_x0) {
    return _ref15.apply(this, arguments);
  };
}();
var handleSearchProducts = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(keyword, page) {
    var currentPage, _yield$db$Product$fin2, count, rows;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            if (!keyword) {
              _context11.next = 11;
              break;
            }
            _context11.next = 5;
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
            _yield$db$Product$fin2 = _context11.sent;
            count = _yield$db$Product$fin2.count;
            rows = _yield$db$Product$fin2.rows;
            if (!rows) {
              _context11.next = 10;
              break;
            }
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved search products successfully",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: rows
            });
          case 10:
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "No product match, check again."
            });
          case 11:
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Get products failure."
            });
          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            return _context11.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function handleSearchProducts(_x1, _x10) {
    return _ref16.apply(this, arguments);
  };
}();
var handleCreateProduct = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(product) {
    var transaction, _product$images, images, productFields, productToInsert, createdProduct, imagesToInsert;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return sequelize.transaction();
          case 3:
            transaction = _context12.sent;
            _product$images = product.images, images = _product$images === void 0 ? [] : _product$images, productFields = _objectWithoutProperties(product, _excluded);
            productToInsert = _objectSpread(_objectSpread({}, productFields), {}, {
              sold: 0
            });
            _context12.next = 8;
            return _models["default"].Product.create(productToInsert, {
              transaction: transaction
            });
          case 8:
            createdProduct = _context12.sent;
            imagesToInsert = images.filter(function (image) {
              return (image === null || image === void 0 ? void 0 : image.public_id) && (image === null || image === void 0 ? void 0 : image.secure_url);
            }).map(function (image) {
              return {
                target_id: createdProduct.id,
                target_type: "product",
                public_id: image.public_id,
                secure_url: image.secure_url,
                thumbnail_url: image.thumbnail_url
              };
            });
            if (!(imagesToInsert.length > 0)) {
              _context12.next = 13;
              break;
            }
            _context12.next = 13;
            return _models["default"].Image.bulkCreate(imagesToInsert, {
              transaction: transaction
            });
          case 13:
            _context12.next = 15;
            return transaction.commit();
          case 15:
            return _context12.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create product successfully."
            });
          case 18:
            _context12.prev = 18;
            _context12.t0 = _context12["catch"](0);
            _context12.next = 22;
            return (0, _transaction.rollbackTransaction)(transaction);
          case 22:
            _context12.next = 24;
            return _imageService["default"].handleRemoveImagesFromCloud(product.images || []);
          case 24:
            console.log(_context12.t0);
            return _context12.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 26:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 18]]);
  }));
  return function handleCreateProduct(_x11) {
    return _ref17.apply(this, arguments);
  };
}();
var handleUpdateProduct = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(product) {
    var t, _product$images2, images, productFields, existed, lastVersionImages, normalizedImages, removedImages, uploadedImages, _where8;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return sequelize.transaction();
          case 3:
            t = _context13.sent;
            _product$images2 = product.images, images = _product$images2 === void 0 ? [] : _product$images2, productFields = _objectWithoutProperties(product, _excluded2);
            _context13.next = 7;
            return _models["default"].Product.findOne({
              where: {
                id: productFields.id
              },
              transaction: t
            });
          case 7:
            existed = _context13.sent;
            if (existed) {
              _context13.next = 12;
              break;
            }
            _context13.next = 11;
            return t.rollback();
          case 11:
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid product."
            });
          case 12:
            _context13.next = 14;
            return _models["default"].Image.findAll({
              raw: true,
              where: {
                target_id: productFields.id,
                target_type: "product"
              },
              transaction: t
            });
          case 14:
            lastVersionImages = _context13.sent;
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
            if (!(removedImages.length > 0)) {
              _context13.next = 21;
              break;
            }
            _context13.next = 21;
            return _models["default"].Image.destroy({
              where: (_where8 = {}, _defineProperty(_where8, Op.or, [{
                id: removedImages.map(function (image) {
                  return image.id;
                }).filter(Boolean)
              }, {
                public_id: removedImages.map(function (image) {
                  return image.public_id;
                }).filter(Boolean)
              }]), _defineProperty(_where8, "target_id", productFields.id), _defineProperty(_where8, "target_type", "product"), _where8),
              transaction: t
            });
          case 21:
            if (!(uploadedImages.length > 0)) {
              _context13.next = 24;
              break;
            }
            _context13.next = 24;
            return _models["default"].Image.bulkCreate(uploadedImages.map(function (image) {
              return {
                target_id: productFields.id,
                target_type: "product",
                public_id: image.public_id,
                secure_url: image.secure_url,
                thumbnail_url: image.thumbnail_url
              };
            }), {
              transaction: t
            });
          case 24:
            _context13.next = 26;
            return _models["default"].Product.update(_objectSpread({}, productFields), {
              where: {
                id: productFields.id
              },
              transaction: t
            });
          case 26:
            _context13.next = 28;
            return t.commit();
          case 28:
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update product successfully."
            });
          case 31:
            _context13.prev = 31;
            _context13.t0 = _context13["catch"](0);
            _context13.next = 35;
            return (0, _transaction.rollbackTransaction)(t);
          case 35:
            console.log(_context13.t0);
            return _context13.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 37:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 31]]);
  }));
  return function handleUpdateProduct(_x12) {
    return _ref18.apply(this, arguments);
  };
}();
var handleDeleteProduct = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(product) {
    var t, existed, images;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return sequelize.transaction();
          case 3:
            t = _context14.sent;
            _context14.next = 6;
            return _models["default"].Product.findOne({
              where: {
                id: product.id,
                name: product.name,
                price: product.price
              },
              transaction: t
            });
          case 6:
            existed = _context14.sent;
            if (existed) {
              _context14.next = 11;
              break;
            }
            _context14.next = 10;
            return t.rollback();
          case 10:
            return _context14.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid product."
            });
          case 11:
            _context14.next = 13;
            return _models["default"].Image.findAll({
              where: {
                target_id: product.id,
                target_type: "product"
              },
              transaction: t
            });
          case 13:
            images = _context14.sent;
            _context14.next = 16;
            return _models["default"].Image.destroy({
              where: {
                target_id: product.id,
                target_type: "product"
              },
              transaction: t
            });
          case 16:
            _context14.next = 18;
            return _models["default"].Product.destroy({
              where: {
                id: product.id
              },
              transaction: t
            });
          case 18:
            _context14.next = 20;
            return t.commit();
          case 20:
            _context14.prev = 20;
            _context14.next = 23;
            return _imageService["default"].handleRemoveImagesFromCloud(images);
          case 23:
            _context14.next = 28;
            break;
          case 25:
            _context14.prev = 25;
            _context14.t0 = _context14["catch"](20);
            console.warn("Product deleted, but Cloudinary cleanup failed:", _context14.t0);
          case 28:
            return _context14.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete product successfully."
            });
          case 31:
            _context14.prev = 31;
            _context14.t1 = _context14["catch"](0);
            _context14.next = 35;
            return (0, _transaction.rollbackTransaction)(t);
          case 35:
            console.log(_context14.t1);
            return _context14.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 37:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 31], [20, 25]]);
  }));
  return function handleDeleteProduct(_x13) {
    return _ref19.apply(this, arguments);
  };
}();

/** SUPPORT METHODS */

var getDifference = function getDifference(originArray, newArray) {
  var difference = [];
  var _iterator = _createForOfIteratorHelper(newArray),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      if (!originArray.includes(element)) {
        difference.push(element);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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