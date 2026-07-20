import postService from "../services/postService.js";
import { ResponseCode } from "../constant";

const responseStatus = (data) => {
    if (data.code === ResponseCode.SUCCESS) return 200;
    if (data.code === ResponseCode.FILE_NOT_FOUND) return 404;
    return 400;
};

let getPost = async (req, res) => {
    if (req.query.id) {
        let data = await postService.handleGetPost(req.query.id);
        return res.status(responseStatus(data)).json(data);
    }
    return res.status(400).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let createPost = async (req, res) => {
    let post = {};
    post.title = req.body.title;
    post.overview = req.body.overview;
    post.content = req.body.content;
    post.text = req.body.text;
    post.imageUrl = req.body.imageUrl;
    post.author = req.body.author;

    let data = await postService.handleCreatePost(post);

    return res.status(responseStatus(data)).json(data);
};

let updatePost = async (req, res) => {
    let post = {};
    post.id = req.body.id;
    post.title = req.body.title;
    post.overview = req.body.overview;
    post.content = req.body.content;
    post.text = req.body.text;
    post.imageUrl = req.body.imageUrl;
    post.author = req.body.author;

    let data = await postService.handleUpdatePost(post);

    return res.status(responseStatus(data)).json(data);
};

let deletePost = async (req, res) => {
    if (req.body.id) {
        let data = await postService.handleDeletePost(req.body.id);
        return res.status(responseStatus(data)).json(data);
    }
    return res.status(400).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

export default {
    getPost,
    createPost,
    updatePost,
    deletePost,
};
