import db from "../models";
import { ResponseCode } from "../constant";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.NODE_CLOUDINARY_NAME,
    api_key: process.env.NODE_CLOUDINARY_API_KEY,
    api_secret: process.env.NODE_CLOUDINARY_API_SECRET,
});

const handleRemoveImagesFromCloud = async (images) => {
    try {
        const publicIds = images
            .map((image) => image.public_id)
            .filter((publicId) => {
                const value = String(publicId || "");
                return value && !value.startsWith("seed-products/") && !value.startsWith("local-products/");
            });

        if (publicIds.length === 0 || !process.env.NODE_CLOUDINARY_NAME) {
            return true;
        }

        const deleteResult = await cloudinary.api.delete_resources(publicIds);

        if (deleteResult) {
            const deletedPublicIds = Object.keys(deleteResult.deleted);

            if (deletedPublicIds.length === publicIds.length) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    handleRemoveImagesFromCloud,
};
