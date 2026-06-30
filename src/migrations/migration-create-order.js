"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            order_uuid: {
                type: Sequelize.STRING,
            },
            note: {
                type: Sequelize.TEXT,
            },
            subtotal: {
                type: Sequelize.DOUBLE,
            },
            discount: {
                type: Sequelize.DOUBLE,
            },
            shipping_fee: {
                type: Sequelize.DOUBLE,
            },
            total: {
                type: Sequelize.DECIMAL,
            },
            customer_phone_number: {
                type: Sequelize.STRING,
            },
            employee_id: {
                type: Sequelize.INTEGER,
            },
            shipping_address_id: {
                type: Sequelize.INTEGER,
            },
            payment_method_id: {
                type: Sequelize.INTEGER,
            },
            status_id: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("orders");
    },
};
