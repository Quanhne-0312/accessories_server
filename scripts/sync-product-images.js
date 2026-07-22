"use strict";

const path = require("path");
const db = require("../src/models");
const { getProductImageSet } = require("./product-image-catalog");

db.sequelize.options.logging = false;

const CATEGORY_SLUGS = ["vong-tay", "day-chuyen", "khuyen-tai", "nhan"];
const EXPECTED_PRODUCTS_PER_CATEGORY = 10;

const loadAssignments = async () => {
    const categories = await db.Category.findAll({
        raw: true,
        where: { slug: { [db.Sequelize.Op.in]: CATEGORY_SLUGS } },
    });
    const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
    const assignments = [];

    for (const categorySlug of CATEGORY_SLUGS) {
        const category = categoryBySlug.get(categorySlug);

        if (!category) {
            throw new Error(`Khong tim thay danh muc ${categorySlug} trong database.`);
        }

        const products = await db.Product.findAll({
            order: [["id", "ASC"]],
            where: {
                category: {
                    [db.Sequelize.Op.in]: [String(category.id), category.name, category.slug],
                },
            },
        });

        if (products.length !== EXPECTED_PRODUCTS_PER_CATEGORY) {
            throw new Error(
                `Danh muc ${categorySlug} co ${products.length} san pham, can ${EXPECTED_PRODUCTS_PER_CATEGORY}.`,
            );
        }

        products.forEach((product, productIndex) => {
            assignments.push({
                product,
                categorySlug,
                imageSet: getProductImageSet(categorySlug, productIndex),
            });
        });
    }

    return assignments;
};

const syncProductImages = async () => {
    // Kiem tra du 5 anh cho toan bo 40 san pham truoc khi bat dau transaction.
    const assignments = await loadAssignments();
    const transaction = await db.sequelize.transaction();

    try {
        for (const { product, imageSet } of assignments) {
            await db.Product.update(
                {
                    feature_image_url: imageSet.urls[0],
                    updatedAt: new Date(),
                },
                { where: { id: product.id }, transaction },
            );

            await db.Image.destroy({
                where: { target_id: product.id, target_type: "product" },
                transaction,
            });

            await db.Image.bulkCreate(
                imageSet.urls.map((imageUrl, imageIndex) => ({
                    target_id: product.id,
                    target_type: "product",
                    public_id: `local-products/${product.slug}/${path.parse(imageSet.fileNames[imageIndex]).name}`,
                    secure_url: imageUrl,
                    thumbnail_url: imageUrl,
                })),
                { transaction },
            );
        }

        await transaction.commit();

        return {
            products_updated: assignments.length,
            images_created: assignments.length * 5,
            categories: CATEGORY_SLUGS,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

syncProductImages()
    .then(async (result) => {
        console.log(JSON.stringify(result, null, 2));
        await db.sequelize.close();
    })
    .catch(async (error) => {
        console.error({
            message: error.message,
            databaseMessage: error.parent?.message,
            detail: error.parent?.detail,
            code: error.parent?.code,
        });
        await db.sequelize.close();
        process.exit(1);
    });
