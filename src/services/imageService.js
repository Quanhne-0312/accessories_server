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
        const requestedPublicIds = [...new Set(images
            .map((image) => image?.public_id)
            .filter((publicId) => {
                const value = String(publicId || "");
                return value && !value.startsWith("seed-products/") && !value.startsWith("local-products/");
            }))];

        if (requestedPublicIds.length === 0 || !process.env.NODE_CLOUDINARY_NAME) {
            return true;
        }

        // Rollback is only allowed for uploads which are not referenced by the
        // application database. Persisted avatars/products must be removed by
        // their owning update/delete workflow, not by a generic endpoint.
        const referencedImages = await db.Image.findAll({
            attributes: ["public_id"],
            where: {
                public_id: requestedPublicIds,
            },
            raw: true,
        });
        const referencedPublicIds = new Set(referencedImages.map((image) => image.public_id));
        const publicIds = requestedPublicIds.filter((publicId) => !referencedPublicIds.has(publicId));

        if (publicIds.length === 0) {
            return false;
        }

        const deleteResult = await cloudinary.api.delete_resources(publicIds);

        if (deleteResult) {
            const deletedPublicIds = Object.keys(deleteResult.deleted);

            if (deletedPublicIds.length === publicIds.length && publicIds.length === requestedPublicIds.length) {
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
