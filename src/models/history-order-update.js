"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class HistoryOrderUpdate extends Model {
        static associate(models) {
            // Define associations here
            HistoryOrderUpdate.belongsTo(models.User, {
                foreignKey: "employee_id",
            });
            HistoryOrderUpdate.belongsTo(models.Order, {
                foreignKey: "order_uuid",
                targetKey: "order_uuid",
            });
            HistoryOrderUpdate.belongsTo(models.Status, {
                foreignKey: "status_id",
            });
        }
    }

    HistoryOrderUpdate.init(
        {
            order_uuid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            employee_id: DataTypes.INTEGER,
            status_id: DataTypes.INTEGER,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "HistoryOrderUpdate",
            tableName: "history_order_update",
        },
    );

    return HistoryOrderUpdate;
};
