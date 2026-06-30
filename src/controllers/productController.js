import productService from "../services/productService.js";
import imageService from "../services/imageService.js";
import { ResponseCode } from "../constant";
import _ from "lodash";

const getCategories = async (req, res) => {
    const data = await productService.handleGetCategories();
    return res.status(200).json(data);
};
const getMaterials = async (req, res) => {
    const data = await productService.handleGetMaterials();
    return res.status(200).json(data);
};
const getColors = async (req, res) => {
    const data = await productService.handleGetColors();
    return res.status(200).json(data);
};

const countProducts = async (req, res) => {
    const data = await productService.handleCountProducts();
    return res.status(200).json(data);
};

const createCatalogOption = async (req, res) => {
    const data = await productService.handleCreateCatalogOption(req.body);
    return res.status(data.code === ResponseCode.SUCCESS ? 200 : 400).json(data);
};

const updateCatalogOption = async (req, res) => {
    const data = await productService.handleUpdateCatalogOption(req.body);
    return res.status(data.code === ResponseCode.SUCCESS ? 200 : 400).json(data);
};

const deleteCatalogOption = async (req, res) => {
    const data = await productService.handleDeleteCatalogOption(req.body);
    return res.status(data.code === ResponseCode.SUCCESS ? 200 : 400).json(data);
};
// PRODUCT
const getProduct = async (req, res) => {
    const { slug, product_id, id, categories, materials, colors, page } = req.query;

    if (slug || product_id || id) {
        const data = await productService.handleGetProductBy({ slug, id: product_id || id });
        return res.status(200).json(data);
    }
    const data = await productService.handleGetProducts({ categories, materials, colors, page });
    return res.status(200).json(data);
};

const searchProduct = async (req, res) => {
    const { keyword, page } = req.query;

    if (keyword) {
        const data = await productService.handleSearchProducts(keyword, page);
        return res.status(200).json(data);
    }
    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const createProduct = async (req, res) => {
    const { name, slug, price, brand, category, material, color, quantity, feature_image_url, description, images } =
        req.body;

    if (
        name &&
        slug &&
        price &&
        brand &&
        category &&
        material &&
        color &&
        quantity &&
        feature_image_url &&
        Array.isArray(images)
    ) {
        const data = await productService.handleCreateProduct({
            name,
            slug,
            price,
            brand,
            category,
            material,
            color,
            quantity,
            feature_image_url,
            description: description || "",
            images,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const updateProduct = async (req, res) => {
    const {
        id,
        name,
        slug,
        price,
        brand,
        category,
        material,
        color,
        quantity,
        description,
        feature_image_url,
        images,
    } = req.body;

    if (
        id &&
        name &&
        slug &&
        price &&
        brand &&
        category &&
        material &&
        color &&
        quantity &&
        feature_image_url &&
        Array.isArray(images)
    ) {
        const data = await productService.handleUpdateProduct({
            id,
            name,
            slug,
            price,
            brand,
            category,
            material,
            color,
            quantity,
            feature_image_url,
            description: description || "",
            images,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const deleteProduct = async (req, res) => {
    const { id, name, price } = req.body;

    if (id && name && price) {
        const data = await productService.handleDeleteProduct({
            id,
            name,
            price,
        });
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const rollbackImages = async (req, res) => {
    const { images } = req.body;

    if (images && !_.isEmpty(images)) {
        const result = await imageService.handleRemoveImagesFromCloud(images);
        if (result) {
            return res.status(200).json({
                code: ResponseCode.SUCCESS,
                message: "Delete images successfully.",
            });
        }

        return res.status(200).json({
            code: ResponseCode.DATABASE_ERROR,
            message: "Delete images failure.",
        });
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

export default {
    getCategories,
    getMaterials,
    getColors,
    countProducts,
    createCatalogOption,
    updateCatalogOption,
    deleteCatalogOption,
    getProduct,
    searchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    rollbackImages,
};
