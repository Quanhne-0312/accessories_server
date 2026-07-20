"use strict";

var _models = _interopRequireDefault(require("../models"));
var _constant = require("../constant");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BLOG_PAYLOAD_VERSION = 1;
var encodePostText = function encodePostText(post) {
  return JSON.stringify({
    version: BLOG_PAYLOAD_VERSION,
    overview: typeof post.overview === "string" ? post.overview : "",
    content: typeof post.content === "string" ? post.content : typeof post.text === "string" ? post.text : "",
    imageUrl: typeof post.imageUrl === "string" ? post.imageUrl : null
  });
};
var decodePostText = function decodePostText(text) {
  try {
    var value = JSON.parse(text);
    if (value && value.version === BLOG_PAYLOAD_VERSION) {
      return {
        overview: value.overview || "",
        content: value.content || "",
        imageUrl: value.imageUrl || null
      };
    }
  } catch (error) {
    // Rows created by the original schema contain plain text, not JSON.
  }
  return {
    overview: "",
    content: text || "",
    imageUrl: null
  };
};
var toPostResponse = function toPostResponse(blog) {
  var plainBlog = typeof (blog === null || blog === void 0 ? void 0 : blog.get) === "function" ? blog.get({
    plain: true
  }) : _objectSpread({}, blog);
  var decodedText = decodePostText(plainBlog.text);
  return _objectSpread(_objectSpread({}, plainBlog), decodedText);
};
var handleGetPost = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(paramId) {
    var posts, postId, post;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            if (!(paramId === "all")) {
              _context.next = 6;
              break;
            }
            _context.next = 4;
            return _models["default"].Blog.findAll({
              order: [["id", "DESC"]]
            });
          case 4:
            posts = _context.sent;
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get posts successfully.",
              result: posts.map(toPostResponse)
            });
          case 6:
            postId = Number(paramId);
            if (!(!Number.isSafeInteger(postId) || postId <= 0)) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Invalid post identifier."
            });
          case 9:
            _context.next = 11;
            return _models["default"].Blog.findOne({
              where: {
                id: postId
              }
            });
          case 11:
            post = _context.sent;
            if (post) {
              _context.next = 14;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Post not found."
            });
          case 14:
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get post successfully.",
              result: toPostResponse(post)
            });
          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred while retrieving posts."
            });
          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function handleGetPost(_x) {
    return _ref.apply(this, arguments);
  };
}();
var handleCreatePost = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(post) {
    var title, created;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            title = typeof post.title === "string" ? post.title.trim() : "";
            if (title) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Post title is required."
            });
          case 4:
            _context2.next = 6;
            return _models["default"].Blog.create({
              title: title,
              text: encodePostText(post),
              author: typeof post.author === "string" ? post.author.trim() : ""
            });
          case 6:
            created = _context2.sent;
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create post successfully.",
              result: toPostResponse(created)
            });
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred while creating the post."
            });
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function handleCreatePost(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var handleUpdatePost = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(post) {
    var postId, title, _yield$db$Blog$update, _yield$db$Blog$update2, updatedRows, updated;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            postId = Number(post.id);
            title = typeof post.title === "string" ? post.title.trim() : "";
            if (!(!Number.isSafeInteger(postId) || postId <= 0 || !title)) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Post identifier and title are required."
            });
          case 5:
            _context3.next = 7;
            return _models["default"].Blog.update({
              title: title,
              text: encodePostText(post),
              author: typeof post.author === "string" ? post.author.trim() : ""
            }, {
              where: {
                id: postId
              }
            });
          case 7:
            _yield$db$Blog$update = _context3.sent;
            _yield$db$Blog$update2 = _slicedToArray(_yield$db$Blog$update, 1);
            updatedRows = _yield$db$Blog$update2[0];
            if (!(updatedRows !== 1)) {
              _context3.next = 12;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Post not found."
            });
          case 12:
            _context3.next = 14;
            return _models["default"].Blog.findOne({
              where: {
                id: postId
              }
            });
          case 14:
            updated = _context3.sent;
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update post successfully.",
              result: toPostResponse(updated)
            });
          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred while updating the post."
            });
          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function handleUpdatePost(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var handleDeletePost = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(postId) {
    var normalizedPostId, deletedRows;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            normalizedPostId = Number(postId);
            if (!(!Number.isSafeInteger(normalizedPostId) || normalizedPostId <= 0)) {
              _context4.next = 4;
              break;
            }
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.MISSING_PARAMETER,
              message: "Invalid post identifier."
            });
          case 4:
            _context4.next = 6;
            return _models["default"].Blog.destroy({
              where: {
                id: normalizedPostId
              }
            });
          case 6:
            deletedRows = _context4.sent;
            return _context4.abrupt("return", deletedRows === 1 ? {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete post successfully."
            } : {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Post not found."
            });
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred while deleting the post."
            });
          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function handleDeletePost(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
module.exports = {
  handleGetPost: handleGetPost,
  handleCreatePost: handleCreatePost,
  handleUpdatePost: handleUpdatePost,
  handleDeletePost: handleDeletePost
};