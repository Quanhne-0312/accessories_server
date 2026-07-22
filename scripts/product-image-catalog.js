"use strict";

const fs = require("fs");
const path = require("path");

const PRODUCT_IMAGE_ROOT = path.resolve(__dirname, "..", "public", "product-images");

const PRODUCT_IMAGE_CONFIG = {
    "vong-tay": { directory: "vongtay", prefix: "vong", availableSets: 10 },
    "day-chuyen": { directory: "daychuyen", prefix: "daychuyen", availableSets: 10 },
    "khuyen-tai": { directory: "bongtai", prefix: "bongtai", availableSets: 10 },
    nhan: { directory: "nhan", prefix: "nhan", availableSets: 8 },
};

const getPublicServerUrl = () =>
    (process.env.NODE_PUBLIC_SERVER_URL || `http://localhost:${process.env.NODE_SERVER_PORT || 8000}`).replace(
        /\/+$/,
        "",
    );

const getProductImageSet = (categorySlug, productIndex) => {
    const config = PRODUCT_IMAGE_CONFIG[categorySlug];

    if (!config) {
        throw new Error(`Khong co cau hinh anh cho danh muc ${categorySlug}.`);
    }

    if (!Number.isInteger(productIndex) || productIndex < 0) {
        throw new Error(`Thu tu san pham khong hop le: ${productIndex}.`);
    }

    // Thu muc nguon chi co 8 bo anh nhan. Hai san pham nhan cuoi dung lai
    // nhan01 va nhan02 de khong gan nham anh bong tai sang danh muc nhan.
    const sourceNumber = (productIndex % config.availableSets) + 1;
    const sourceName = `${config.prefix}${String(sourceNumber).padStart(2, "0")}`;
    const fileNames = [
        `${sourceName}_main.jpg`,
        `${sourceName}_detail1.jpg`,
        `${sourceName}_detail2.jpg`,
        `${sourceName}_detail3.jpg`,
        `${sourceName}_detail4.jpg`,
    ];
    const relativePaths = fileNames.map((fileName) =>
        [config.directory, sourceName, fileName].join("/"),
    );
    const absolutePaths = relativePaths.map((relativePath) =>
        path.join(PRODUCT_IMAGE_ROOT, ...relativePath.split("/")),
    );
    const missingFiles = absolutePaths.filter((absolutePath) => !fs.existsSync(absolutePath));

    if (missingFiles.length > 0) {
        throw new Error(`Thieu anh san pham: ${missingFiles.join(", ")}`);
    }

    const publicServerUrl = getPublicServerUrl();

    return {
        sourceName,
        fileNames,
        relativePaths,
        urls: relativePaths.map((relativePath) => `${publicServerUrl}/product-images/${relativePath}`),
    };
};

module.exports = {
    PRODUCT_IMAGE_CONFIG,
    PRODUCT_IMAGE_ROOT,
    getProductImageSet,
    getPublicServerUrl,
};
