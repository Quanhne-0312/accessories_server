import _ from "lodash";
import sequelize from "../config/database";
import { ResponseCode } from "../constant";
import db from "../models";
import imageService from "./imageService";
const { Op } = require("sequelize");

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

const ensureColorsTable = async () => {
    await db.sequelize.query(`
        create table if not exists colors (
            id serial primary key,
            slug varchar(255) unique,
            name varchar(255) unique,
            "createdAt" timestamp with time zone not null default now(),
            "updatedAt" timestamp with time zone not null default now()
        )
    `);

    await db.sequelize.query(`
        insert into colors (slug, name, "createdAt", "updatedAt")
        select distinct
            lower(regexp_replace(unaccent(color), '[^a-zA-Z0-9]+', '-', 'g')) as slug,
            color as name,
            now(),
            now()
        from products
        where color is not null and trim(color) <> ''
        on conflict do nothing
    `).catch(async () => {
        const products = await db.Product.findAll({
            raw: true,
            attributes: ["color"],
        });

        const colors = [
            ...new Set(products.map((product) => product.color).filter(Boolean)),
        ].map((color) => ({
            slug: slugifyFilterOption(color),
            name: color,
        }));

        for (const color of colors) {
            await db.sequelize.query(
                `
                insert into colors (slug, name, "createdAt", "updatedAt")
                values (:slug, :name, now(), now())
                on conflict do nothing
                `,
                {
                    replacements: color,
                },
            );
        }
    });
};

const handleGetColors = async () => {
    try {
        await ensureColorsTable();

        const [colors, products] = await Promise.all([
            db.sequelize.query(
                `
                select id, slug, name
                from colors
                order by id asc
                `,
                { type: db.sequelize.QueryTypes.SELECT },
            ),
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
    return null;
};

const getCatalogTableName = (type) => {
    if (type === "category") return "categories";
    if (type === "material") return "materials";
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

const getCatalogUsageCount = async (type, option) => {
    if (type === "category") {
        return db.Product.count({
            where: {
                category: [String(option.id), option.slug, option.name],
            },
        });
    }

    if (type === "material") {
        return db.Product.count({
            where: {
                material: [String(option.id), option.slug, option.name],
            },
        });
    }

    if (type === "color") {
        const rows = await db.sequelize.query(
            `
            select count(*)::int as count
            from products
            where color in (:values)
            `,
            {
                replacements: {
                    values: [String(option.id), option.slug, option.name],
                },
                type: db.sequelize.QueryTypes.SELECT,
            },
        );

        return Number(rows[0]?.count || 0);
    }

    return 0;
};

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

        if (type === "color") {
            await ensureColorsTable();
            const existed = await db.sequelize.query(
                `
                select id from colors where slug = :slug or name = :name limit 1
                `,
                {
                    replacements: normalizedOption,
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );

            if (existed.length > 0) {
                return {
                    code: ResponseCode.VALIDATION_ERROR,
                    message: "Option already exists.",
                };
            }

            const created = await db.sequelize.query(
                `
                insert into colors (slug, name, "createdAt", "updatedAt")
                values (:slug, :name, now(), now())
                returning id, slug, name
                `,
                {
                    replacements: normalizedOption,
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );

            return {
                code: ResponseCode.SUCCESS,
                message: "Create option successfully.",
                result: created[0],
            };
        }

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

        if (type === "color") {
            await ensureColorsTable();
            const rows = await db.sequelize.query(
                "select id, slug, name from colors where id = :id",
                {
                    replacements: { id },
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            const existed = rows[0];

            if (!existed) {
                return {
                    code: ResponseCode.FILE_NOT_FOUND,
                    message: "Option not found.",
                };
            }

            await db.sequelize.transaction(async (transaction) => {
                await db.sequelize.query(
                    `
                    update colors
                    set slug = :slug, name = :name, "updatedAt" = now()
                    where id = :id
                    `,
                    {
                        replacements: { ...normalizedOption, id },
                        transaction,
                    },
                );
                await db.Product.update(
                    { color: normalizedOption.name },
                    {
                        where: {
                            color: [String(existed.id), existed.slug, existed.name],
                        },
                        transaction,
                    },
                );
            });

            return {
                code: ResponseCode.SUCCESS,
                message: "Update option successfully.",
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

        if (type === "color") {
            await ensureColorsTable();
            const rows = await db.sequelize.query(
                "select id, slug, name from colors where id = :id",
                {
                    replacements: { id },
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            const existed = rows[0];

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

            await db.sequelize.query("delete from colors where id = :id", {
                replacements: { id },
            });

            return {
                code: ResponseCode.SUCCESS,
                message: "Delete option successfully.",
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
        await ensureColorsTable();

        const [categories, materials, colors, products] = await Promise.all([
            db.Category.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.Material.findAll({ raw: true, order: [["id", "ASC"]] }),
            db.sequelize.query(
                `
                select id, slug, name
                from colors
                order by id asc
                `,
                { type: db.sequelize.QueryTypes.SELECT },
            ),
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

const getColorValues = async (slugs) => {
    if (_.isEmpty(slugs)) {
        return [];
    }

    const products = await db.Product.findAll({
        raw: true,
        attributes: ["color"],
    });

    return [
        ...new Set(
            products
                .map((product) => product.color)
                .filter((color) => color && (slugs.includes(color) || slugs.includes(slugifyFilterOption(color)))),
        ),
    ];
};

const handleGetProducts = async ({ categories = "all", materials, colors, page }) => {
    try {
        const currentPage = page && !_.isNaN(page) ? page : 1;
        const [categoryValues, materialValues, colorValues] = await Promise.all([
            getOptionValues(db.Category, getQueryValues(categories)),
            getOptionValues(db.Material, getQueryValues(materials)),
            getColorValues(getQueryValues(colors)),
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
            await ensureColorsTable();

            const [images, category, material, color] = await Promise.all([
                db.Image.findAll({
                    raw: true,
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
                db.sequelize
                    .query(
                        `
                        select id, slug, name
                        from colors
                        where id::text = :color or slug = :color or name = :color
                        limit 1
                        `,
                        {
                            replacements: { color: productData.color },
                            type: db.sequelize.QueryTypes.SELECT,
                        },
                    )
                    .then((rows) => rows[0]),
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
    try {
        const productToInsert = {
            ...product,
            sold: 0,
        };

        const createdProduct = await db.Product.create(productToInsert);
        // if success store uploaded images to database
        if (createdProduct) {
            const imagesToInsert = product.images.map((image) => ({
                target_id: createdProduct.id,
                target_type: "product",
                public_id: image.public_id,
                secure_url: image.secure_url,
                thumbnail_url: image.thumbnail_url,
            }));
            await db.Image.bulkCreate(imagesToInsert);

            return {
                code: ResponseCode.SUCCESS,
                message: "Create product successfully.",
            };
        }
        // if not rollback uploaded images in cloud
        await imageService.handleRemoveImagesFromCloud(product.images);

        return {
            code: ResponseCode.SUCCESS,
            message: "Create product successfully.",
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleUpdateProduct = async (product) => {
    const t = await sequelize.transaction();
    try {
        const { images = [], ...productFields } = product;
        const existed = await db.Product.findOne({
            where: { id: productFields.id },
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
        });

        const normalizedImages = images.filter((image) => image && image.secure_url && image.public_id);
        const removedImages = lastVersionImages.filter(
            (image) => !normalizedImages.some((item) => item.id === image.id || item.public_id === image.public_id),
        );
        const uploadedImages = normalizedImages.filter(
            (image) =>
                !lastVersionImages.some((item) => item.id === image.id || item.public_id === image.public_id),
        );

        await Promise.all([
            removedImages.length > 0 &&
                db.Image.destroy({
                    where: {
                        [Op.or]: [
                            { id: removedImages.map((image) => image.id).filter(Boolean) },
                            { public_id: removedImages.map((image) => image.public_id).filter(Boolean) },
                        ],
                        target_id: productFields.id,
                        target_type: "product",
                    },
                    transaction: t,
                }),

            uploadedImages.length > 0 &&
                db.Image.bulkCreate(
                    uploadedImages.map((image) => ({
                        target_id: productFields.id,
                        target_type: "product",
                        public_id: image.public_id,
                        secure_url: image.secure_url,
                        thumbnail_url: image.thumbnail_url,
                    })),
                    { transaction: t },
                ),

            db.Product.update(
                {
                    ...productFields,
                },
                {
                    where: {
                        id: productFields.id,
                    },
                    transaction: t,
                },
            ),
        ]);

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Update product successfully.",
        };
    } catch (error) {
        await t.rollback();
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleDeleteProduct = async (product) => {
    const t = await sequelize.transaction();
    try {
        const existed = await db.Product.findOne({
            where: {
                id: product.id,
                name: product.name,
                price: product.price,
            },
        });

        if (!existed) {
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
        });

        await Promise.all([
            db.Product.destroy({
                where: { id: product.id },
                transaction: t,
            }),
            db.Image.destroy({
                where: {
                    target_id: product.id,
                    target_type: "product",
                },
                transaction: t,
            }),
        ]);

        await t.commit();

        await imageService.handleRemoveImagesFromCloud(images);

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete product successfully.",
        };
    } catch (error) {
        await t.rollback();
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
