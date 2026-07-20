import db from "../models";
import { ResponseCode } from "../constant";

const BLOG_PAYLOAD_VERSION = 1;

const encodePostText = (post) =>
    JSON.stringify({
        version: BLOG_PAYLOAD_VERSION,
        overview: typeof post.overview === "string" ? post.overview : "",
        content: typeof post.content === "string" ? post.content : typeof post.text === "string" ? post.text : "",
        imageUrl: typeof post.imageUrl === "string" ? post.imageUrl : null,
    });

const decodePostText = (text) => {
    try {
        const value = JSON.parse(text);
        if (value && value.version === BLOG_PAYLOAD_VERSION) {
            return {
                overview: value.overview || "",
                content: value.content || "",
                imageUrl: value.imageUrl || null,
            };
        }
    } catch (error) {
        // Rows created by the original schema contain plain text, not JSON.
    }

    return {
        overview: "",
        content: text || "",
        imageUrl: null,
    };
};

const toPostResponse = (blog) => {
    const plainBlog = typeof blog?.get === "function" ? blog.get({ plain: true }) : { ...blog };
    const decodedText = decodePostText(plainBlog.text);

    return {
        ...plainBlog,
        ...decodedText,
    };
};

const handleGetPost = async (paramId) => {
    try {
        if (paramId === "all") {
            const posts = await db.Blog.findAll({ order: [["id", "DESC"]] });
            return {
                code: ResponseCode.SUCCESS,
                message: "Get posts successfully.",
                result: posts.map(toPostResponse),
            };
        }

        const postId = Number(paramId);
        if (!Number.isSafeInteger(postId) || postId <= 0) {
            return {
                code: ResponseCode.MISSING_PARAMETER,
                message: "Invalid post identifier.",
            };
        }

        const post = await db.Blog.findOne({ where: { id: postId } });
        if (!post) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Post not found.",
            };
        }

        return {
            code: ResponseCode.SUCCESS,
            message: "Get post successfully.",
            result: toPostResponse(post),
        };
    } catch (error) {
        console.error(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "An error occurred while retrieving posts.",
        };
    }
};

const handleCreatePost = async (post) => {
    try {
        const title = typeof post.title === "string" ? post.title.trim() : "";
        if (!title) {
            return {
                code: ResponseCode.MISSING_PARAMETER,
                message: "Post title is required.",
            };
        }

        const created = await db.Blog.create({
            title,
            text: encodePostText(post),
            author: typeof post.author === "string" ? post.author.trim() : "",
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Create post successfully.",
            result: toPostResponse(created),
        };
    } catch (error) {
        console.error(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "An error occurred while creating the post.",
        };
    }
};

const handleUpdatePost = async (post) => {
    try {
        const postId = Number(post.id);
        const title = typeof post.title === "string" ? post.title.trim() : "";
        if (!Number.isSafeInteger(postId) || postId <= 0 || !title) {
            return {
                code: ResponseCode.MISSING_PARAMETER,
                message: "Post identifier and title are required.",
            };
        }

        const [updatedRows] = await db.Blog.update(
            {
                title,
                text: encodePostText(post),
                author: typeof post.author === "string" ? post.author.trim() : "",
            },
            { where: { id: postId } },
        );

        if (updatedRows !== 1) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Post not found.",
            };
        }

        const updated = await db.Blog.findOne({ where: { id: postId } });
        return {
            code: ResponseCode.SUCCESS,
            message: "Update post successfully.",
            result: toPostResponse(updated),
        };
    } catch (error) {
        console.error(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "An error occurred while updating the post.",
        };
    }
};

const handleDeletePost = async (postId) => {
    try {
        const normalizedPostId = Number(postId);
        if (!Number.isSafeInteger(normalizedPostId) || normalizedPostId <= 0) {
            return {
                code: ResponseCode.MISSING_PARAMETER,
                message: "Invalid post identifier.",
            };
        }

        const deletedRows = await db.Blog.destroy({ where: { id: normalizedPostId } });
        return deletedRows === 1
            ? {
                  code: ResponseCode.SUCCESS,
                  message: "Delete post successfully.",
              }
            : {
                  code: ResponseCode.FILE_NOT_FOUND,
                  message: "Post not found.",
              };
    } catch (error) {
        console.error(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "An error occurred while deleting the post.",
        };
    }
};

module.exports = {
    handleGetPost,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
};
