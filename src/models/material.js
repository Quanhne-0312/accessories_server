"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Material extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Material.init(
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
            modelName: "Material",
            tableName: "materials",
            timestamps: false,
        },
    );
    return Material;
};
