"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderDetail.belongsTo(models.Order, {
                foreignKey: "order_uuid",
                targetKey: "order_uuid",
            });
            OrderDetail.belongsTo(models.Product, {
                foreignKey: "product_id",
            });
        }
    }
    OrderDetail.init(
        {
            order_uuid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_id: DataTypes.INTEGER,
            slug: DataTypes.STRING,
            name: DataTypes.STRING,
            feature_image_url: DataTypes.TEXT,
            price: DataTypes.DOUBLE,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "OrderDetail",
            tableName: "order_details",
            timestamps: false,
        },
    );
    return OrderDetail;
};
