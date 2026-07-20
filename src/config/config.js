const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    development: {
        username: process.env.NODE_DATABASE_USERNAME,
        password: process.env.NODE_DATABASE_PASSWORD,
        database: process.env.NODE_DATABASE_NAME,
        host: process.env.NODE_DATABASE_HOST,
        port: process.env.NODE_DATABASE_PORT,
        dialect: process.env.NODE_DATABASE_DIALECT,
        seederStorage: "sequelize",
        query: {
            raw: true,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 15000,
            idle: 10000,
        },
        timezone: "+07:00",
    },
    test: {
        username: process.env.NODE_DATABASE_USERNAME,
        password: process.env.NODE_DATABASE_PASSWORD,
        database:
            process.env.NODE_TEST_DATABASE_NAME ||
            (process.env.NODE_DATABASE_NAME ? `${process.env.NODE_DATABASE_NAME}_test` : undefined),
        host: process.env.NODE_DATABASE_HOST,
        port: process.env.NODE_DATABASE_PORT,
        dialect: process.env.NODE_DATABASE_DIALECT,
        seederStorage: "sequelize",
        query: {
            raw: true,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 15000,
            idle: 10000,
        },
        timezone: "+07:00",
    },
    production: {
        username: process.env.NODE_DATABASE_USERNAME,
        password: process.env.NODE_DATABASE_PASSWORD,
        database: process.env.NODE_PRODUCTION_DATABASE_NAME || process.env.NODE_DATABASE_NAME,
        host: process.env.NODE_DATABASE_HOST,
        port: process.env.NODE_DATABASE_PORT,
        dialect: process.env.NODE_DATABASE_DIALECT,
        seederStorage: "sequelize",
        query: {
            raw: true,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 15000,
            idle: 10000,
        },
        timezone: "+07:00",
    },
};
