"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
var slugify = function slugify(value) {
  return String(value || "").replace(/\u0111/g, "d").replace(/\u0110/g, "D").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};
var assertEmpty = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(sequelize, label, sql, transaction) {
    var _yield$sequelize$quer, _yield$sequelize$quer2, rows;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sequelize.query(sql, {
              transaction: transaction
            });
          case 2:
            _yield$sequelize$quer = _context.sent;
            _yield$sequelize$quer2 = _slicedToArray(_yield$sequelize$quer, 1);
            rows = _yield$sequelize$quer2[0];
            if (!(rows.length > 0)) {
              _context.next = 7;
              break;
            }
            throw new Error("Integrity preflight failed: ".concat(label, ". Clean the conflicting rows before migrating."));
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function assertEmpty(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var constraintExists = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sequelize, name, transaction) {
    var _yield$sequelize$quer3, _yield$sequelize$quer4, rows;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return sequelize.query("\n        select 1\n        from pg_constraint\n        where conname = :name\n          and connamespace = current_schema()::regnamespace\n        limit 1\n        ", {
              replacements: {
                name: name
              },
              transaction: transaction
            });
          case 2:
            _yield$sequelize$quer3 = _context2.sent;
            _yield$sequelize$quer4 = _slicedToArray(_yield$sequelize$quer3, 1);
            rows = _yield$sequelize$quer4[0];
            return _context2.abrupt("return", rows.length > 0);
          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function constraintExists(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var addForeignKey = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(queryInterface, _ref3, transaction) {
    var name, table, field, referencesTable, _ref3$referencesField, referencesField, onDelete, _ref3$onUpdate, onUpdate;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = _ref3.name, table = _ref3.table, field = _ref3.field, referencesTable = _ref3.referencesTable, _ref3$referencesField = _ref3.referencesField, referencesField = _ref3$referencesField === void 0 ? "id" : _ref3$referencesField, onDelete = _ref3.onDelete, _ref3$onUpdate = _ref3.onUpdate, onUpdate = _ref3$onUpdate === void 0 ? "CASCADE" : _ref3$onUpdate;
            _context3.next = 3;
            return constraintExists(queryInterface.sequelize, name, transaction);
          case 3:
            if (!_context3.sent) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return");
          case 5:
            _context3.next = 7;
            return queryInterface.addConstraint(table, {
              fields: [field],
              type: "foreign key",
              name: name,
              references: {
                table: referencesTable,
                field: referencesField
              },
              onDelete: onDelete,
              onUpdate: onUpdate,
              transaction: transaction
            });
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function addForeignKey(_x8, _x9, _x0) {
    return _ref4.apply(this, arguments);
  };
}();
var removeConstraintIfExists = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(queryInterface, table, name, transaction) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return constraintExists(queryInterface.sequelize, name, transaction);
          case 2:
            if (!_context4.sent) {
              _context4.next = 5;
              break;
            }
            _context4.next = 5;
            return queryInterface.removeConstraint(table, name, {
              transaction: transaction
            });
          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function removeConstraintIfExists(_x1, _x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
var ensureColors = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(queryInterface, Sequelize, transaction) {
    var _yield$queryInterface, _yield$queryInterface2, existingRows, usedSlugs, _iterator, _step, row, baseSlug, candidate, suffix, _yield$queryInterface3, _yield$queryInterface4, productColors, knownNames, _iterator2, _step2, name, _baseSlug, _candidate, _suffix;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return queryInterface.sequelize.query("\n        create table if not exists colors (\n            id serial primary key,\n            slug varchar(255),\n            name varchar(255),\n            \"createdAt\" timestamp with time zone not null default now(),\n            \"updatedAt\" timestamp with time zone not null default now()\n        )\n        ", {
              transaction: transaction
            });
          case 2:
            _context5.next = 4;
            return queryInterface.sequelize.query("\n        alter table colors add column if not exists slug varchar(255);\n        alter table colors add column if not exists name varchar(255);\n        alter table colors add column if not exists \"createdAt\" timestamp with time zone not null default now();\n        alter table colors add column if not exists \"updatedAt\" timestamp with time zone not null default now();\n        ", {
              transaction: transaction
            });
          case 4:
            _context5.next = 6;
            return queryInterface.sequelize.query("select id, slug, name from colors order by id", {
              transaction: transaction
            });
          case 6:
            _yield$queryInterface = _context5.sent;
            _yield$queryInterface2 = _slicedToArray(_yield$queryInterface, 1);
            existingRows = _yield$queryInterface2[0];
            usedSlugs = new Set(existingRows.map(function (row) {
              return row.slug;
            }).filter(Boolean));
            _iterator = _createForOfIteratorHelper(existingRows);
            _context5.prev = 11;
            _iterator.s();
          case 13:
            if ((_step = _iterator.n()).done) {
              _context5.next = 26;
              break;
            }
            row = _step.value;
            if (!(row.slug || !row.name)) {
              _context5.next = 17;
              break;
            }
            return _context5.abrupt("continue", 24);
          case 17:
            baseSlug = slugify(row.name) || "color-".concat(row.id);
            candidate = baseSlug;
            suffix = 2;
            while (usedSlugs.has(candidate)) {
              candidate = "".concat(baseSlug, "-").concat(suffix);
              suffix += 1;
            }
            _context5.next = 23;
            return queryInterface.sequelize.query("update colors set slug = :slug where id = :id", {
              replacements: {
                id: row.id,
                slug: candidate
              },
              transaction: transaction
            });
          case 23:
            usedSlugs.add(candidate);
          case 24:
            _context5.next = 13;
            break;
          case 26:
            _context5.next = 31;
            break;
          case 28:
            _context5.prev = 28;
            _context5.t0 = _context5["catch"](11);
            _iterator.e(_context5.t0);
          case 31:
            _context5.prev = 31;
            _iterator.f();
            return _context5.finish(31);
          case 34:
            _context5.next = 36;
            return queryInterface.sequelize.query("\n        select distinct color as name\n        from products\n        where color is not null and trim(color) <> ''\n        order by color\n        ", {
              transaction: transaction
            });
          case 36:
            _yield$queryInterface3 = _context5.sent;
            _yield$queryInterface4 = _slicedToArray(_yield$queryInterface3, 1);
            productColors = _yield$queryInterface4[0];
            knownNames = new Set(existingRows.map(function (row) {
              return row.name;
            }).filter(Boolean));
            _iterator2 = _createForOfIteratorHelper(productColors);
            _context5.prev = 41;
            _iterator2.s();
          case 43:
            if ((_step2 = _iterator2.n()).done) {
              _context5.next = 57;
              break;
            }
            name = _step2.value.name;
            if (!knownNames.has(name)) {
              _context5.next = 47;
              break;
            }
            return _context5.abrupt("continue", 55);
          case 47:
            _baseSlug = slugify(name) || "color";
            _candidate = _baseSlug;
            _suffix = 2;
            while (usedSlugs.has(_candidate)) {
              _candidate = "".concat(_baseSlug, "-").concat(_suffix);
              _suffix += 1;
            }
            _context5.next = 53;
            return queryInterface.sequelize.query("\n            insert into colors (slug, name, \"createdAt\", \"updatedAt\")\n            values (:slug, :name, now(), now())\n            ", {
              replacements: {
                name: name,
                slug: _candidate
              },
              transaction: transaction
            });
          case 53:
            knownNames.add(name);
            usedSlugs.add(_candidate);
          case 55:
            _context5.next = 43;
            break;
          case 57:
            _context5.next = 62;
            break;
          case 59:
            _context5.prev = 59;
            _context5.t1 = _context5["catch"](41);
            _iterator2.e(_context5.t1);
          case 62:
            _context5.prev = 62;
            _iterator2.f();
            return _context5.finish(62);
          case 65:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[11, 28, 31, 34], [41, 59, 62, 65]]);
  }));
  return function ensureColors(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  up: function () {
    var _up = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(queryInterface, Sequelize) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return queryInterface.sequelize.transaction(/*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(transaction) {
                  var duplicateChecks, _i, _duplicateChecks, _duplicateChecks$_i, label, sql, requiredValueChecks, _i2, _requiredValueChecks, _requiredValueChecks$, _label, _sql, orphanChecks, _i3, _orphanChecks, _orphanChecks$_i, _label2, _sql2, foreignKeys, _i4, _foreignKeys, foreignKey;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return ensureColors(queryInterface, Sequelize, transaction);
                        case 2:
                          _context6.next = 4;
                          return queryInterface.sequelize.query("\n                alter table customers add column if not exists \"createdAt\" timestamp with time zone not null default now();\n                alter table customers add column if not exists \"updatedAt\" timestamp with time zone not null default now();\n                alter table employees add column if not exists \"createdAt\" timestamp with time zone not null default now();\n                alter table employees add column if not exists \"updatedAt\" timestamp with time zone not null default now();\n                ", {
                            transaction: transaction
                          });
                        case 4:
                          duplicateChecks = [["duplicate user phone numbers", "select 1 from users where phone_number is not null group by phone_number having count(*) > 1 limit 1"], ["duplicate user emails (case-insensitive)", "select 1 from users where email is not null group by lower(email) having count(*) > 1 limit 1"], ["duplicate product slugs", "select 1 from products where slug is not null group by slug having count(*) > 1 limit 1"], ["duplicate order UUIDs", "select 1 from orders where order_uuid is not null group by order_uuid having count(*) > 1 limit 1"], ["duplicate refresh-token owners", "select 1 from refresh_tokens where phone_number is not null group by phone_number having count(*) > 1 limit 1"], ["duplicate cart items", "select 1 from carts where user_id is not null and product_id is not null group by user_id, product_id having count(*) > 1 limit 1"], ["duplicate category slugs or names", "select 1 from (select slug from categories group by slug having count(*) > 1 union all select name from categories group by name having count(*) > 1) duplicates limit 1"], ["duplicate material slugs or names", "select 1 from (select slug from materials group by slug having count(*) > 1 union all select name from materials group by name having count(*) > 1) duplicates limit 1"], ["duplicate color slugs or names", "select 1 from (select slug from colors group by slug having count(*) > 1 union all select name from colors group by name having count(*) > 1) duplicates limit 1"], ["duplicate role slugs", "select 1 from roles where slug is not null group by slug having count(*) > 1 limit 1"], ["duplicate status codes", "select 1 from status where code is not null group by code having count(*) > 1 limit 1"], ["duplicate payment-method slugs", "select 1 from payment_methods where slug is not null group by slug having count(*) > 1 limit 1"], ["multiple avatars for one user", "select 1 from images where target_type = 'avatar' group by target_id having count(*) > 1 limit 1"]];
                          _i = 0, _duplicateChecks = duplicateChecks;
                        case 6:
                          if (!(_i < _duplicateChecks.length)) {
                            _context6.next = 13;
                            break;
                          }
                          _duplicateChecks$_i = _slicedToArray(_duplicateChecks[_i], 2), label = _duplicateChecks$_i[0], sql = _duplicateChecks$_i[1];
                          _context6.next = 10;
                          return assertEmpty(queryInterface.sequelize, label, sql, transaction);
                        case 10:
                          _i++;
                          _context6.next = 6;
                          break;
                        case 13:
                          _context6.next = 15;
                          return queryInterface.sequelize.query("\n                update products p\n                set category = c.name\n                from categories c\n                where p.category is not null\n                  and p.category <> c.name\n                  and (p.category = c.slug or p.category = c.id::text)\n                  and not exists (select 1 from categories current_value where current_value.name = p.category);\n\n                update products p\n                set material = m.name\n                from materials m\n                where p.material is not null\n                  and p.material <> m.name\n                  and (p.material = m.slug or p.material = m.id::text)\n                  and not exists (select 1 from materials current_value where current_value.name = p.material);\n\n                update products p\n                set color = c.name\n                from colors c\n                where p.color is not null\n                  and p.color <> c.name\n                  and (p.color = c.slug or p.color = c.id::text)\n                  and not exists (select 1 from colors current_value where current_value.name = p.color);\n                ", {
                            transaction: transaction
                          });
                        case 15:
                          requiredValueChecks = [["products without a slug", "select 1 from products where slug is null or trim(slug) = '' limit 1"], ["products without a catalog value", "select 1 from products where category is null or material is null or color is null or trim(category) = '' or trim(material) = '' or trim(color) = '' limit 1"], ["orders without a UUID", "select 1 from orders where order_uuid is null or trim(order_uuid) = '' limit 1"], ["order details without an order UUID", "select 1 from order_details where order_uuid is null or trim(order_uuid) = '' limit 1"], ["order history without an order UUID", "select 1 from history_order_update where order_uuid is null or trim(order_uuid) = '' limit 1"], ["catalog rows with missing slugs or names", "select 1 from categories where slug is null or name is null or trim(slug) = '' or trim(name) = '' union all select 1 from materials where slug is null or name is null or trim(slug) = '' or trim(name) = '' union all select 1 from colors where slug is null or name is null or trim(slug) = '' or trim(name) = '' limit 1"]];
                          _i2 = 0, _requiredValueChecks = requiredValueChecks;
                        case 17:
                          if (!(_i2 < _requiredValueChecks.length)) {
                            _context6.next = 24;
                            break;
                          }
                          _requiredValueChecks$ = _slicedToArray(_requiredValueChecks[_i2], 2), _label = _requiredValueChecks$[0], _sql = _requiredValueChecks$[1];
                          _context6.next = 21;
                          return assertEmpty(queryInterface.sequelize, _label, _sql, transaction);
                        case 21:
                          _i2++;
                          _context6.next = 17;
                          break;
                        case 24:
                          orphanChecks = [["users referencing missing roles", "select 1 from users u left join roles r on r.id = u.role_id where u.role_id is not null and r.id is null limit 1"], ["employees referencing missing users", "select 1 from employees e left join users u on u.id = e.user_id where e.user_id is not null and u.id is null limit 1"], ["cart rows referencing missing users or products", "select 1 from carts c left join users u on u.id = c.user_id left join products p on p.id = c.product_id where (c.user_id is not null and u.id is null) or (c.product_id is not null and p.id is null) limit 1"], ["products referencing unknown catalog values", "select 1 from products p left join categories c on c.name = p.category left join materials m on m.name = p.material left join colors co on co.name = p.color where c.id is null or m.id is null or co.id is null limit 1"], ["orders referencing missing related rows", "select 1 from orders o left join users u on u.id = o.employee_id left join shipping_addresses a on a.id = o.shipping_address_id left join payment_methods p on p.id = o.payment_method_id left join status s on s.id = o.status_id where (o.employee_id is not null and u.id is null) or (o.shipping_address_id is not null and a.id is null) or (o.payment_method_id is not null and p.id is null) or (o.status_id is not null and s.id is null) limit 1"], ["order details referencing missing orders or products", "select 1 from order_details d left join orders o on o.order_uuid = d.order_uuid left join products p on p.id = d.product_id where o.id is null or (d.product_id is not null and p.id is null) limit 1"], ["order history referencing missing rows", "select 1 from history_order_update h left join orders o on o.order_uuid = h.order_uuid left join users u on u.id = h.employee_id left join status s on s.id = h.status_id where o.id is null or (h.employee_id is not null and u.id is null) or (h.status_id is not null and s.id is null) limit 1"], ["reviews referencing missing users or products", "select 1 from reviews r left join users u on u.id = r.user_id left join products p on p.id = r.product_id where (r.user_id is not null and u.id is null) or (r.product_id is not null and p.id is null) limit 1"], ["refresh tokens referencing missing users", "select 1 from refresh_tokens t left join users u on u.phone_number = t.phone_number where t.phone_number is not null and u.id is null limit 1"]];
                          _i3 = 0, _orphanChecks = orphanChecks;
                        case 26:
                          if (!(_i3 < _orphanChecks.length)) {
                            _context6.next = 33;
                            break;
                          }
                          _orphanChecks$_i = _slicedToArray(_orphanChecks[_i3], 2), _label2 = _orphanChecks$_i[0], _sql2 = _orphanChecks$_i[1];
                          _context6.next = 30;
                          return assertEmpty(queryInterface.sequelize, _label2, _sql2, transaction);
                        case 30:
                          _i3++;
                          _context6.next = 26;
                          break;
                        case 33:
                          _context6.next = 35;
                          return queryInterface.sequelize.query("\n                alter table products alter column slug set not null;\n                alter table products alter column category set not null;\n                alter table products alter column material set not null;\n                alter table products alter column color set not null;\n                alter table orders alter column order_uuid set not null;\n                alter table order_details alter column order_uuid set not null;\n                alter table history_order_update alter column order_uuid set not null;\n                alter table categories alter column slug set not null;\n                alter table categories alter column name set not null;\n                alter table materials alter column slug set not null;\n                alter table materials alter column name set not null;\n                alter table colors alter column slug set not null;\n                alter table colors alter column name set not null;\n\n                create unique index if not exists users_phone_number_key on users (phone_number);\n                create unique index if not exists users_email_lower_key on users (lower(email)) where email is not null;\n                create unique index if not exists products_slug_key on products (slug);\n                create unique index if not exists orders_order_uuid_key on orders (order_uuid);\n                create unique index if not exists refresh_tokens_phone_number_key on refresh_tokens (phone_number);\n                create unique index if not exists carts_user_product_key on carts (user_id, product_id) where user_id is not null and product_id is not null;\n                create unique index if not exists categories_slug_key on categories (slug);\n                create unique index if not exists categories_name_key on categories (name);\n                create unique index if not exists materials_slug_key on materials (slug);\n                create unique index if not exists materials_name_key on materials (name);\n                create unique index if not exists colors_slug_key on colors (slug);\n                create unique index if not exists colors_name_key on colors (name);\n                create unique index if not exists roles_slug_key on roles (slug);\n                create unique index if not exists status_code_key on status (code);\n                create unique index if not exists payment_methods_slug_key on payment_methods (slug);\n                create unique index if not exists images_one_avatar_per_user_key on images (target_id, target_type) where target_type = 'avatar';\n\n                create index if not exists images_target_idx on images (target_type, target_id);\n                create index if not exists products_catalog_idx on products (category, material, color);\n                create index if not exists orders_customer_phone_idx on orders (customer_phone_number);\n                create index if not exists orders_status_idx on orders (status_id);\n                create index if not exists order_details_order_uuid_idx on order_details (order_uuid);\n                create index if not exists history_order_update_order_uuid_idx on history_order_update (order_uuid);\n                ", {
                            transaction: transaction
                          });
                        case 35:
                          foreignKeys = [{
                            name: "users_role_id_fkey",
                            table: "users",
                            field: "role_id",
                            referencesTable: "roles",
                            onDelete: "RESTRICT"
                          }, {
                            name: "employees_user_id_fkey",
                            table: "employees",
                            field: "user_id",
                            referencesTable: "users",
                            onDelete: "CASCADE"
                          }, {
                            name: "carts_user_id_fkey",
                            table: "carts",
                            field: "user_id",
                            referencesTable: "users",
                            onDelete: "CASCADE"
                          }, {
                            name: "carts_product_id_fkey",
                            table: "carts",
                            field: "product_id",
                            referencesTable: "products",
                            onDelete: "CASCADE"
                          }, {
                            name: "products_category_fkey",
                            table: "products",
                            field: "category",
                            referencesTable: "categories",
                            referencesField: "name",
                            onDelete: "RESTRICT"
                          }, {
                            name: "products_material_fkey",
                            table: "products",
                            field: "material",
                            referencesTable: "materials",
                            referencesField: "name",
                            onDelete: "RESTRICT"
                          }, {
                            name: "products_color_fkey",
                            table: "products",
                            field: "color",
                            referencesTable: "colors",
                            referencesField: "name",
                            onDelete: "RESTRICT"
                          }, {
                            name: "orders_employee_id_fkey",
                            table: "orders",
                            field: "employee_id",
                            referencesTable: "users",
                            onDelete: "SET NULL"
                          }, {
                            name: "orders_shipping_address_id_fkey",
                            table: "orders",
                            field: "shipping_address_id",
                            referencesTable: "shipping_addresses",
                            onDelete: "RESTRICT"
                          }, {
                            name: "orders_payment_method_id_fkey",
                            table: "orders",
                            field: "payment_method_id",
                            referencesTable: "payment_methods",
                            onDelete: "RESTRICT"
                          }, {
                            name: "orders_status_id_fkey",
                            table: "orders",
                            field: "status_id",
                            referencesTable: "status",
                            onDelete: "RESTRICT"
                          }, {
                            name: "order_details_order_uuid_fkey",
                            table: "order_details",
                            field: "order_uuid",
                            referencesTable: "orders",
                            referencesField: "order_uuid",
                            onDelete: "CASCADE"
                          }, {
                            name: "order_details_product_id_fkey",
                            table: "order_details",
                            field: "product_id",
                            referencesTable: "products",
                            onDelete: "SET NULL"
                          }, {
                            name: "history_order_update_order_uuid_fkey",
                            table: "history_order_update",
                            field: "order_uuid",
                            referencesTable: "orders",
                            referencesField: "order_uuid",
                            onDelete: "CASCADE"
                          }, {
                            name: "history_order_update_employee_id_fkey",
                            table: "history_order_update",
                            field: "employee_id",
                            referencesTable: "users",
                            onDelete: "SET NULL"
                          }, {
                            name: "history_order_update_status_id_fkey",
                            table: "history_order_update",
                            field: "status_id",
                            referencesTable: "status",
                            onDelete: "RESTRICT"
                          }, {
                            name: "reviews_user_id_fkey",
                            table: "reviews",
                            field: "user_id",
                            referencesTable: "users",
                            onDelete: "SET NULL"
                          }, {
                            name: "reviews_product_id_fkey",
                            table: "reviews",
                            field: "product_id",
                            referencesTable: "products",
                            onDelete: "CASCADE"
                          }, {
                            name: "refresh_tokens_phone_number_fkey",
                            table: "refresh_tokens",
                            field: "phone_number",
                            referencesTable: "users",
                            referencesField: "phone_number",
                            onDelete: "CASCADE"
                          }];
                          _i4 = 0, _foreignKeys = foreignKeys;
                        case 37:
                          if (!(_i4 < _foreignKeys.length)) {
                            _context6.next = 44;
                            break;
                          }
                          foreignKey = _foreignKeys[_i4];
                          _context6.next = 41;
                          return addForeignKey(queryInterface, foreignKey, transaction);
                        case 41:
                          _i4++;
                          _context6.next = 37;
                          break;
                        case 44:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));
                return function (_x18) {
                  return _ref7.apply(this, arguments);
                };
              }());
            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    function up(_x16, _x17) {
      return _up.apply(this, arguments);
    }
    return up;
  }(),
  down: function () {
    var _down = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(queryInterface) {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return queryInterface.sequelize.transaction(/*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(transaction) {
                  var foreignKeys, _i5, _foreignKeys2, _foreignKeys2$_i, table, name;
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          foreignKeys = [["refresh_tokens", "refresh_tokens_phone_number_fkey"], ["reviews", "reviews_product_id_fkey"], ["reviews", "reviews_user_id_fkey"], ["history_order_update", "history_order_update_status_id_fkey"], ["history_order_update", "history_order_update_employee_id_fkey"], ["history_order_update", "history_order_update_order_uuid_fkey"], ["order_details", "order_details_product_id_fkey"], ["order_details", "order_details_order_uuid_fkey"], ["orders", "orders_status_id_fkey"], ["orders", "orders_payment_method_id_fkey"], ["orders", "orders_shipping_address_id_fkey"], ["orders", "orders_employee_id_fkey"], ["products", "products_color_fkey"], ["products", "products_material_fkey"], ["products", "products_category_fkey"], ["carts", "carts_product_id_fkey"], ["carts", "carts_user_id_fkey"], ["employees", "employees_user_id_fkey"], ["users", "users_role_id_fkey"]];
                          _i5 = 0, _foreignKeys2 = foreignKeys;
                        case 2:
                          if (!(_i5 < _foreignKeys2.length)) {
                            _context8.next = 9;
                            break;
                          }
                          _foreignKeys2$_i = _slicedToArray(_foreignKeys2[_i5], 2), table = _foreignKeys2$_i[0], name = _foreignKeys2$_i[1];
                          _context8.next = 6;
                          return removeConstraintIfExists(queryInterface, table, name, transaction);
                        case 6:
                          _i5++;
                          _context8.next = 2;
                          break;
                        case 9:
                          _context8.next = 11;
                          return queryInterface.sequelize.query("\n                drop index if exists images_one_avatar_per_user_key;\n                drop index if exists payment_methods_slug_key;\n                drop index if exists status_code_key;\n                drop index if exists roles_slug_key;\n                drop index if exists materials_name_key;\n                drop index if exists materials_slug_key;\n                drop index if exists categories_name_key;\n                drop index if exists categories_slug_key;\n                drop index if exists carts_user_product_key;\n                drop index if exists refresh_tokens_phone_number_key;\n                drop index if exists orders_order_uuid_key;\n                drop index if exists products_slug_key;\n                drop index if exists users_email_lower_key;\n                drop index if exists users_phone_number_key;\n                drop index if exists history_order_update_order_uuid_idx;\n                drop index if exists order_details_order_uuid_idx;\n                drop index if exists orders_status_idx;\n                drop index if exists orders_customer_phone_idx;\n                drop index if exists products_catalog_idx;\n                drop index if exists images_target_idx;\n\n                alter table history_order_update alter column order_uuid drop not null;\n                alter table order_details alter column order_uuid drop not null;\n                alter table orders alter column order_uuid drop not null;\n                alter table products alter column color drop not null;\n                alter table products alter column material drop not null;\n                alter table products alter column category drop not null;\n                alter table products alter column slug drop not null;\n                alter table materials alter column name drop not null;\n                alter table materials alter column slug drop not null;\n                alter table categories alter column name drop not null;\n                alter table categories alter column slug drop not null;\n\n                drop table if exists colors;\n                ", {
                            transaction: transaction
                          });
                        case 11:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));
                return function (_x20) {
                  return _ref8.apply(this, arguments);
                };
              }());
            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
    function down(_x19) {
      return _down.apply(this, arguments);
    }
    return down;
  }()
};