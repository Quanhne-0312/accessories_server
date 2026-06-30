"use strict";

var _test, _production;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var dotenv = require("dotenv");
dotenv.config();
module.exports = {
  development: {
    username: process.env.NODE_DATABASE_USERNAME,
    password: process.env.NODE_DATABASE_PASSWORD,
    database: process.env.NODE_DATABASE_NAME,
    host: process.env.NODE_DATABASE_HOST,
    port: process.env.NODE_DATABASE_PORT,
    dialect: process.env.NODE_DATABASE_DIALECT,
    query: {
      raw: true
    },
    timezone: "+07:00"
  },
  test: (_test = {
    database: "database_test",
    username: process.env.NODE_DATABASE_USERNAME,
    password: process.env.NODE_DATABASE_PASSWORD
  }, _defineProperty(_test, "database", process.env.NODE_DATABASE_NAME), _defineProperty(_test, "host", process.env.NODE_DATABASE_HOST), _defineProperty(_test, "port", process.env.NODE_DATABASE_PORT), _defineProperty(_test, "dialect", process.env.NODE_DATABASE_DIALECT), _defineProperty(_test, "query", {
    raw: true
  }), _defineProperty(_test, "timezone", "+07:00"), _test),
  production: (_production = {
    database: "database_production",
    username: process.env.NODE_DATABASE_USERNAME,
    password: process.env.NODE_DATABASE_PASSWORD
  }, _defineProperty(_production, "database", process.env.NODE_DATABASE_NAME), _defineProperty(_production, "host", process.env.NODE_DATABASE_HOST), _defineProperty(_production, "port", process.env.NODE_DATABASE_PORT), _defineProperty(_production, "dialect", process.env.NODE_DATABASE_DIALECT), _defineProperty(_production, "query", {
    raw: true
  }), _defineProperty(_production, "timezone", "+07:00"), _production)
};