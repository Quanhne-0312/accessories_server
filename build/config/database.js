"use strict";

// Backward-compatible export. Models and services must share one Sequelize pool.
module.exports = require("../models").sequelize;