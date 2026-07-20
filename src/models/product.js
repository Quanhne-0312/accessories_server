"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: "category",
                targetKey: "name",
            });
            Product.belongsTo(models.Material, {
                foreignKey: "material",
                targetKey: "name",
            });
            Product.belongsTo(models.Color, {
                foreignKey: "color",
                targetKey: "name",
            });
            Product.hasMany(models.OrderDetail, {
                foreignKey: "product_id",
                onDelete: "SET NULL",
            });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            material: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            brand: DataTypes.STRING,
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: DataTypes.DOUBLE,
            feature_image_url: DataTypes.TEXT,
            description: DataTypes.TEXT,
            quantity: DataTypes.INTEGER,
            sold: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
        },
    );
    return Product;
};
