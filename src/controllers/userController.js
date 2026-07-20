import { ResponseCode } from "../constant";
import userService from "../services/userService";

const getActor = (req) => ({
    phone_number: req.user?.phone_number,
    role_id: Number(req.user?.role_id),
});

const sendServiceResponse = (res, data) => {
    const status =
        data.code === ResponseCode.AUTHORIZATION_ERROR
            ? 403
            : data.code === ResponseCode.FILE_NOT_FOUND
              ? 404
              : data.code === ResponseCode.SUCCESS
                ? 200
                : 400;
    return res.status(status).json(data);
};

const getRoles = async (req, res) => {
    const data = await userService.handleGetRoles(getActor(req));
    return sendServiceResponse(res, data);
};

const countUsers = async (req, res) => {
    const data = await userService.handleCountUsers(getActor(req));
    return sendServiceResponse(res, data);
};

const getUser = async (req, res) => {
    const { username, role_id, slug, page, keyword } = req.query;

    if (username) {
        const data = await userService.handleGetUserByUsername(username, getActor(req));
        return sendServiceResponse(res, data);
    }
    const data = await userService.handleGetUsers(role_id, slug, page, keyword, getActor(req));
    return sendServiceResponse(res, data);
};

const createUser = async (req, res) => {
    const { password, name, phone_number, email, avatar, address, role_id, birth, bio } = req.body;

    if (password && phone_number && email && address && role_id) {
        const data = await userService.handleCreateUser(
            {
                password,
                name,
                phone_number,
                email,
                avatar,
                address,
                role_id,
                birth,
                bio,
            },
            getActor(req),
        );
        return sendServiceResponse(res, data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

const updateUser = async (req, res) => {
    const { name, phone_number, email, password, avatar, address, role_id, birth, bio } = req.body;

    if (name && phone_number && email && role_id) {
        const data = await userService.handleUpdateUser(
            {
                name,
                phone_number,
                email,
                password,
                avatar,
                address,
                role_id,
                birth,
                bio,
            },
            getActor(req),
        );
        return sendServiceResponse(res, data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

let deleteUser = async (req, res) => {
    const { id, phone_number, email } = req.body;

    if (id && phone_number && email) {
        const data = await userService.handleDeleteUser(
            {
                id,
                phone_number,
                email,
            },
            getActor(req),
        );
        return sendServiceResponse(res, data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s). Check again.",
    });
};

export default {
    getRoles,
    countUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
