import _ from "lodash";
import { ResponseCode } from "../constant";
import db from "../models";
import imageService from "./imageService";
const { Op } = require("sequelize");
import { rollbackTransaction } from "../utils/transaction";
const sequelize = db.sequelize;

const normalizeCatalogValue = (value) => slugifyFilterOption(String(value || "").trim());

const isSameCatalogValue = (productValue, option) => {
    const normalizedProductValue = normalizeCatalogValue(productValue);
    const candidates = [option.id, option.slug, option.name]
        .filter((value) => value !== null && value !== undefined)
        .map((value) => normalizeCatalogValue(value));

    return candidates.includes(normalizedProductValue);
};

const addProductCountToOptions = (options, products, field) =>
    options.map((option) => ({
        ...option,
        product_count: products.filter((product) => isSameCatalogValue(product[field], option)).length,
    }));

const handleGetCategories = async () => {
    try {
        const [categories, products] = await Promise.all([
            db.Category.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.Product.findAll({ raw: true, attributes: ["category"] }),
        ]);

        if (categories) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get categories successfully",
                result: addProductCountToOptions(categories, products, "category"),
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get categories failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetMaterials = async () => {
    try {
        const [materials, products] = await Promise.all([
            db.Material.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.Product.findAll({ raw: true, attributes: ["material"] }),
        ]);

        if (materials) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get materials successfully",
                result: addProductCountToOptions(materials, products, "material"),
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get materials failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetColors = async () => {
    try {
        const [colors, products] = await Promise.all([
            db.Color.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.Product.findAll({ raw: true, attributes: ["color"] }),
        ]);

        return {
            code: ResponseCode.SUCCESS,
            message: "get colors successfully",
            result: addProductCountToOptions(colors, products, "color"),
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const getCatalogModel = (type) => {
    if (type === "category") return db.Category;
    if (type === "material") return db.Material;
    if (type === "color") return db.Color;
    return null;
};

const getCatalogTableName = (type) => {
    if (type === "category") return "categories";
    if (type === "material") return "materials";
    if (type === "color") return "colors";
    return null;
};

const ensureCatalogSequence = async (type) => {
    const tableName = getCatalogTableName(type);
    if (!tableName) return;

    await db.sequelize.query(`
        select setval(
            pg_get_serial_sequence('${tableName}', 'id'),
            coalesce((select max(id) from ${tableName}), 0) + 1,
            false
        )
    `);
};

const getCatalogUsageCount = async (type, option) =>
    db.Product.count({
        where: {
            [type]: [String(option.id), option.slug, option.name],
        },
    });

const handleCreateCatalogOption = async ({ type, name, slug }) => {
    try {
        if (!name || !["category", "material", "color"].includes(type)) {
            return {
                code: ResponseCode.MISSING_PARAMETER,
                message: "Missing parameter(s). Check again.",
            };
        }

        const normalizedOption = {
            name: name.trim(),
            slug: slug?.trim() || slugifyFilterOption(name),
        };

        const Model = getCatalogModel(type);
        await ensureCatalogSequence(type);

        const existed = await Model.findOne({
            raw: true,
            where: {
                [Op.or]: [{ slug: normalizedOption.slug }, { name: normalizedOption.name }],
            },
        });

        if (existed) {
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Option already exists.",
            };
        }

        const created = await Model.create(normalizedOption);

        return {
            code: ResponseCode.SUCCESS,
            message: "Create option successfully.",
            result: toPlainObject(created),
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleUpdateCatalogOption = async ({ type, id, name, slug }) => {
    try {
        if (!id || !name || !["category", "material", "color"].includes(type)) {
            return {
                code: ResponseCode.MISSING_PARAMETER,
                message: "Missing parameter(s). Check again.",
            };
        }

        const normalizedOption = {
            name: name.trim(),
            slug: slug?.trim() || slugifyFilterOption(name),
        };

        const Model = getCatalogModel(type);
        const existed = await Model.findOne({ raw: true, where: { id } });

        if (!existed) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Option not found.",
            };
        }

        const duplicate = await Model.findOne({
            raw: true,
            where: {
                id: { [Op.ne]: id },
                [Op.or]: [{ slug: normalizedOption.slug }, { name: normalizedOption.name }],
            },
        });

        if (duplicate) {
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Option already exists.",
            };
        }

        await Model.update(normalizedOption, { where: { id } });

        return {
            code: ResponseCode.SUCCESS,
            message: "Update option successfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleDeleteCatalogOption = async ({ type, id }) => {
    try {
        if (!id || !["category", "material", "color"].includes(type)) {
            return {
                code: ResponseCode.MISSING_PARAMETER,
                message: "Missing parameter(s). Check again.",
            };
        }

        const Model = getCatalogModel(type);
        const existed = await Model.findOne({ raw: true, where: { id } });

        if (!existed) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Option not found.",
            };
        }

        const usageCount = await getCatalogUsageCount(type, existed);
        if (usageCount > 0) {
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Option is being used by products.",
            };
        }

        await Model.destroy({ where: { id } });

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete option successfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const slugifyOption = (text) =>
    String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const slugifyFilterOption = (text) => {
    const normalizedText = String(text)
        .replace(/\u0111/g, "d")
        .replace(/\u0110/g, "D")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    return normalizedText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const handleCountProducts = async () => {
    try {
        const [categories, materials, colors, products] = await Promise.all([
            db.Category.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.Material.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.Color.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.Product.findAll({
                attributes: ["category", "material", "color"],
                raw: true,
            }),
        ]);

        return {
            code: ResponseCode.SUCCESS,
            message: "get products count by category successfully",
            result: [
                {
                    count_by: "category",
                    data: addProductCountToOptions(categories, products, "category"),
                },
                {
                    count_by: "material",
                    data: addProductCountToOptions(materials, products, "material"),
                },
                {
                    count_by: "color",
                    data: addProductCountToOptions(colors, products, "color"),
                },
            ],
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const getQueryValues = (value) => {
    if (!value || value === "all") {
        return [];
    }

    return decodeURIComponent(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

const getOptionValues = async (Model, slugs) => {
    if (_.isEmpty(slugs)) {
        return [];
    }

    const rows = await Model.findAll({
        raw: true,
        where: {
            slug: slugs,
        },
    });

    return rows.flatMap((item) => [String(item.id), item.name, item.slug]);
};

const handleGetProducts = async ({ categories = "all", materials, colors, page }) => {
    try {
        const currentPage = page && !_.isNaN(page) ? page : 1;
        const [categoryValues, materialValues, colorValues] = await Promise.all([
            getOptionValues(db.Category, getQueryValues(categories)),
            getOptionValues(db.Material, getQueryValues(materials)),
            getOptionValues(db.Color, getQueryValues(colors)),
        ]);
        const where = {};

        if (!_.isEmpty(categoryValues)) {
            where.category = categoryValues;
        }

        if (!_.isEmpty(materialValues)) {
            where.material = materialValues;
        }

        if (!_.isEmpty(colorValues)) {
            where.color = colorValues;
        }

        const { count, rows } = await db.Product.findAndCountAll({
            where,
            attributes: {
                exclude: ["description", "color"],
            },
            order: [["id", "DESC"]],
            limit: 12,
            offset: (currentPage - 1) * 12,
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Get products successfully.",
            page: currentPage,
            total_pages: Math.ceil(count / 12),
            total_results: count,
            result: rows,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetProductBy = async ({ slug, id }) => {
    try {
        const where = id ? { id } : { slug };
        const product = await db.Product.findOne({
            attributes: {
                exclude: ["image_url"],
            },
            where,
        });
        if (product) {
            const productData = toPlainObject(product);

            const [images, category, material, color] = await Promise.all([
                db.Image.findAll({
                    raw: true,
                    order: [["id", "ASC"]],
                    where: {
                        target_id: productData.id,
                        target_type: "product",
                    },
                }),
                db.Category.findOne({
                    raw: true,
                    where: {
                        [Op.or]: [
                            { id: Number(productData.category) || 0 },
                            { name: productData.category },
                            { slug: productData.category },
                        ],
                    },
                }),
                db.Material.findOne({
                    raw: true,
                    where: {
                        [Op.or]: [
                            { id: Number(productData.material) || 0 },
                            { name: productData.material },
                            { slug: productData.material },
                        ],
                    },
                }),
                db.Color.findOne({
                    raw: true,
                    where: {
                        [Op.or]: [
                            { id: Number(productData.color) || 0 },
                            { name: productData.color },
                            { slug: productData.color },
                        ],
                    },
                }),
            ]);

            return {
                code: ResponseCode.SUCCESS,
                message: "get product successfully",
                result: {
                    ...productData,
                    category_name: category?.name || productData.category,
                    material_name: material?.name || productData.material,
                    color_name: color?.name || productData.color,
                    images,
                },
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get product failure",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleSearchProducts = async (keyword, page) => {
    try {
        const currentPage = page && !_.isNaN(page) ? page : 1;

        if (keyword) {
            const { count, rows } = await db.Product.findAndCountAll({
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${keyword}%`,
                            },
                        },
                        {
                            slug: {
                                [Op.iLike]: `%${keyword}%`,
                            },
                        },
                        {
                            description: {
                                [Op.iLike]: `%${keyword}%`,
                            },
                        },
                    ],
                },
                order: [["id", "DESC"]],
                limit: 12,
                offset: (currentPage - 1) * 12,
            });

            if (rows) {
                return {
                    code: ResponseCode.SUCCESS,
                    message: "Retrieved search products successfully",
                    page: currentPage,
                    total_pages: Math.ceil(count / 12),
                    total_results: count,
                    result: rows,
                };
            }
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "No product match, check again.",
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "Get products failure.",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleCreateProduct = async (product) => {
    let transaction;

    try {
        transaction = await sequelize.transaction();
        const { images = [], ...productFields } = product;
        const productToInsert = {
            ...productFields,
            sold: 0,
        };

        const createdProduct = await db.Product.create(productToInsert, { transaction });
        const imagesToInsert = images
            .filter((image) => image?.public_id && image?.secure_url)
            .map((image) => ({
                target_id: createdProduct.id,
                target_type: "product",
                public_id: image.public_id,
                secure_url: image.secure_url,
                thumbnail_url: image.thumbnail_url,
            }));

        if (imagesToInsert.length > 0) {
            await db.Image.bulkCreate(imagesToInsert, { transaction });
        }

        await transaction.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Create product successfully.",
        };
    } catch (error) {
        await rollbackTransaction(transaction);
        await imageService.handleRemoveImagesFromCloud(product.images || []);
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleUpdateProduct = async (product) => {
    let t;
    try {
        t = await sequelize.transaction();
        const { images = [], ...productFields } = product;
        const existed = await db.Product.findOne({
            where: { id: productFields.id },
            transaction: t,
        });

        if (!existed) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid product.",
            };
        }

        const lastVersionImages = await db.Image.findAll({
            raw: true,
            where: {
                target_id: productFields.id,
                target_type: "product",
            },
            transaction: t,
        });

        const normalizedImages = images.filter((image) => image && image.secure_url && image.public_id);
        const removedImages = lastVersionImages.filter(
            (image) => !normalizedImages.some((item) => item.id === image.id || item.public_id === image.public_id),
        );
        const uploadedImages = normalizedImages.filter(
            (image) =>
                !lastVersionImages.some((item) => item.id === image.id || item.public_id === image.public_id),
        );

        if (removedImages.length > 0) {
            await db.Image.destroy({
                where: {
                    [Op.or]: [
                        { id: removedImages.map((image) => image.id).filter(Boolean) },
                        { public_id: removedImages.map((image) => image.public_id).filter(Boolean) },
                    ],
                    target_id: productFields.id,
                    target_type: "product",
                },
                transaction: t,
            });
        }

        if (uploadedImages.length > 0) {
            await db.Image.bulkCreate(
                uploadedImages.map((image) => ({
                    target_id: productFields.id,
                    target_type: "product",
                    public_id: image.public_id,
                    secure_url: image.secure_url,
                    thumbnail_url: image.thumbnail_url,
                })),
                { transaction: t },
            );
        }

        await db.Product.update(
            {
                ...productFields,
            },
            {
                where: {
                    id: productFields.id,
                },
                transaction: t,
            },
        );

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Update product successfully.",
        };
    } catch (error) {
        await rollbackTransaction(t);
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleDeleteProduct = async (product) => {
    let t;
    try {
        t = await sequelize.transaction();
        const existed = await db.Product.findOne({
            where: {
                id: product.id,
                name: product.name,
                price: product.price,
            },
            transaction: t,
        });

        if (!existed) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid product.",
            };
        }

        const images = await db.Image.findAll({
            where: {
                target_id: product.id,
                target_type: "product",
            },
            transaction: t,
        });

        await db.Image.destroy({
            where: {
                target_id: product.id,
                target_type: "product",
            },
            transaction: t,
        });
        await db.Product.destroy({
            where: { id: product.id },
            transaction: t,
        });

        await t.commit();

        try {
            await imageService.handleRemoveImagesFromCloud(images);
        } catch (cloudError) {
            console.warn("Product deleted, but Cloudinary cleanup failed:", cloudError);
        }

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete product successfully.",
        };
    } catch (error) {
        await rollbackTransaction(t);
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

/** SUPPORT METHODS */

const getDifference = (originArray, newArray) => {
    const difference = [];

    for (const element of newArray) {
        if (!originArray.includes(element)) {
            difference.push(element);
        }
    }

    return difference;
};

const toPlainObject = (data) => (typeof data?.get === "function" ? data.get({ plain: true }) : { ...data });

module.exports = {
    handleGetCategories,
    handleGetMaterials,
    handleGetColors,
    handleCountProducts,
    handleCreateCatalogOption,
    handleUpdateCatalogOption,
    handleDeleteCatalogOption,
    handleGetProducts,
    handleSearchProducts,
    handleGetProductBy,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
};
