"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Color extends Model {}

    Color.init(
        {
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: "Color",
            tableName: "colors",
        },
    );

    return Color;
};
