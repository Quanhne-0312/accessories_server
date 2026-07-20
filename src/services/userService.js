import bcrypt from "bcryptjs";
import db from "../models";
import { ResponseCode } from "../constant";
import _ from "lodash";
const { Op } = require("sequelize");
import { rollbackTransaction } from "../utils/transaction";
const sequelize = db.sequelize;

const MANAGEABLE_ROLE_IDS = new Map([
    [1, [2, 3, 4]],
    [4, [2, 3]],
]);

const authorizationError = (message = "You are not allowed to manage this account.") => ({
    code: ResponseCode.AUTHORIZATION_ERROR,
    message,
});

const resolveActor = async (actor, transaction) => {
    const roleId = Number(actor?.role_id);
    const manageableRoleIds = MANAGEABLE_ROLE_IDS.get(roleId);

    if (!actor?.phone_number || !manageableRoleIds) return null;

    const user = await db.User.findOne({
        attributes: ["id", "phone_number", "role_id"],
        where: {
            phone_number: actor.phone_number,
            role_id: roleId,
        },
        transaction,
    });

    return user ? { user, manageableRoleIds } : null;
};

const handleGetRoles = async (actor) => {
    try {
        const actorContext = await resolveActor(actor);
        if (!actorContext) return authorizationError();

        const roles = await db.Role.findAll({
            where: {
                id: actorContext.manageableRoleIds,
            },
            order: [["id", "ASC"]],
        });

        if (roles.length > 0) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get roles successfully",
                result: roles,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get roles failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleCountUsers = async (actor) => {
    try {
        const actorContext = await resolveActor(actor);
        if (!actorContext) return authorizationError();

        const roleCounts = await db.User.findAll({
            attributes: [
                "role_id",
                [sequelize.fn("COUNT", sequelize.col("id")), "user_count"],
            ],
            where: {
                role_id: actorContext.manageableRoleIds,
            },
            group: ["role_id"],
            raw: true,
        });

        const roles = await db.Role.findAll({
            where: { id: actorContext.manageableRoleIds },
            raw: true,
        });
        const countByRole = roleCounts
            .map((item) => {
                const role = roles.find((role) => role.id === item.role_id);
                return {
                    id: item.role_id,
                    name: role?.name || "Unknown",
                    slug: role?.slug || "unknown",
                    user_count: Number(item.user_count),
                };
            })
            .sort((a, b) => a.id - b.id);

        if (countByRole) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get users count by role successfully",
                result: countByRole,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get users count by role failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetUsers = async (role_id, slug, page, keyword, actor) => {
    try {
        const actorContext = await resolveActor(actor);
        if (!actorContext) return authorizationError();

        const currentPage = page && !_.isNaN(page) ? Number(page) : 1;
        const pageSize = 12;
        const where = {
            role_id: actorContext.manageableRoleIds,
        };
        const searchKeyword = keyword?.trim();

        if (role_id && role_id !== "all") {
            const requestedRoleId = Number(role_id);
            if (!actorContext.manageableRoleIds.includes(requestedRoleId)) {
                return buildUserListResponse([], 0, currentPage, pageSize);
            }
            where.role_id = requestedRoleId;
        }

        if (slug && slug !== "all") {
            const role = await db.Role.findOne({
                where: {
                    slug,
                },
                raw: true,
            });

            if (!role) {
                return buildUserListResponse([], 0, currentPage, pageSize);
            }

            if (!actorContext.manageableRoleIds.includes(Number(role.id))) {
                return buildUserListResponse([], 0, currentPage, pageSize);
            }

            where.role_id = role.id;
        }

        if (searchKeyword) {
            where[Op.or] = [
                {
                    name: {
                        [Op.iLike]: `%${searchKeyword}%`,
                    },
                },
                {
                    phone_number: {
                        [Op.iLike]: `%${searchKeyword}%`,
                    },
                },
                {
                    email: {
                        [Op.iLike]: `%${searchKeyword}%`,
                    },
                },
                {
                    address: {
                        [Op.iLike]: `%${searchKeyword}%`,
                    },
                },
            ];
        }

        const { count, rows } = await db.User.findAndCountAll({
            where,
            attributes: {
                exclude: ["password"],
            },
            order: [["id", "DESC"]],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
        });

        if (rows) {
            const result = await appendUserDisplayData(rows);
            return buildUserListResponse(result, count, currentPage, pageSize);
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "Get user(s) failure.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetUserByUsername = async (username, actor) => {
    try {
        const actorContext = await resolveActor(actor);
        if (!actorContext) return authorizationError();

        const user = await db.User.findOne({
            attributes: {
                exclude: ["password"],
            },
            where: {
                [Op.or]: [
                    {
                        phone_number: username,
                    },
                    {
                        email: username,
                    },
                ],
            },
        });

        if (user) {
            if (!actorContext.manageableRoleIds.includes(Number(user.role_id))) {
                return authorizationError();
            }

            const [result] = await appendUserDisplayData([user]);
            const avatar = await db.Image.findOne({
                attributes: {
                    exclude: ["id", "target_id", "target_type"],
                },
                where: {
                    target_id: user.id,
                    target_type: "avatar",
                },
            });

            return {
                code: ResponseCode.SUCCESS,
                message: "Get user successfully.",
                result: {
                    ...result,
                    avatar,
                },
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "Invalid user.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleCreateUser = async (user, actor) => {
    try {
        const actorContext = await resolveActor(actor);
        if (!actorContext) return authorizationError();

        const phoneNumber = typeof user.phone_number === "string" ? user.phone_number.trim() : "";
        const email = typeof user.email === "string" ? user.email.trim().toLowerCase() : "";
        const name = typeof user.name === "string" ? user.name.trim() : "";

        if (!phoneNumber || !email) {
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Phone number and email are required.",
            };
        }

        const requestedRoleId = Number(user.role_id);
        if (!Number.isSafeInteger(requestedRoleId) || !actorContext.manageableRoleIds.includes(requestedRoleId)) {
            return authorizationError("You are not allowed to assign that role.");
        }

        if (!isValidPassword(user.password)) {
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number.",
            };
        }

        const existedUser = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        phone_number: phoneNumber,
                    },
                    {
                        email,
                    },
                ],
            },
        });

        if (existedUser) {
            return {
                code: ResponseCode.DATABASE_ERROR,
                message: "Phone number or email already in use.",
            };
        }

        const hashedPassword = hashPassword(user.password);
        const convertedAddress = handleConvertAddressType(user.address);
        const createdUser = await db.User.create({
            phone_number: phoneNumber,
            email,
            password: hashedPassword,
            name: name || phoneNumber,
            birth: user.birth || null,
            bio: user.bio ?? null,
            address: convertedAddress,
            last_login: null,
            role_id: requestedRoleId,
        });

        if (createdUser) {
            if (user.avatar) {
                await db.Image.create({
                    target_id: createdUser.id,
                    target_type: "avatar",
                    public_id: user.avatar.public_id,
                    secure_url: user.avatar.secure_url,
                    thumbnail_url: user.avatar.thumbnail_url,
                });
            }
            return {
                code: ResponseCode.SUCCESS,
                message: "Create user successfully.",
            };
        }
        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "Create user failure.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleUpdateUser = async (user, actor) => {
    let t;
    try {
        t = await sequelize.transaction();
        const actorContext = await resolveActor(actor, t);
        if (!actorContext) {
            await t.rollback();
            return authorizationError();
        }

        const existedUser = await db.User.findOne({
            where: {
                phone_number: user.phone_number,
            },
            transaction: t,
        });

        if (!existedUser) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid user account.",
            };
        }

        const requestedRoleId = Number(user.role_id);
        if (
            existedUser.phone_number === actorContext.user.phone_number ||
            !actorContext.manageableRoleIds.includes(Number(existedUser.role_id)) ||
            !Number.isSafeInteger(requestedRoleId) ||
            !actorContext.manageableRoleIds.includes(requestedRoleId)
        ) {
            await t.rollback();
            return authorizationError();
        }

        if (user.email && user.email !== existedUser.email) {
            const duplicatedEmail = await db.User.findOne({
                where: {
                    email: user.email,
                    id: {
                        [Op.ne]: existedUser.id,
                    },
                },
                transaction: t,
            });

            if (duplicatedEmail) {
                await t.rollback();
                return {
                    code: ResponseCode.DATABASE_ERROR,
                    message: "Email already in use.",
                };
            }
        }

        const convertedAddress = handleConvertAddressType(user.address);
        const updatedUser = {
            name: user.name,
            email: user.email,
            role_id: requestedRoleId,
            birth: user.birth || null,
            bio: user.bio,
            address: convertedAddress,
        };

        const passwordChanged = Boolean(user.password && user.password.trim());
        const roleChanged = Number(existedUser.role_id) !== requestedRoleId;

        if (passwordChanged) {
            if (!isValidPassword(user.password)) {
                await t.rollback();
                return {
                    code: ResponseCode.VALIDATION_ERROR,
                    message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number.",
                };
            }

            updatedUser.password = hashPassword(user.password);
        }

        await db.User.update(updatedUser, {
            where: {
                phone_number: user.phone_number,
            },
            transaction: t,
        });

        if (passwordChanged || roleChanged) {
            await db.RefreshToken.destroy({
                where: { phone_number: existedUser.phone_number },
                transaction: t,
            });
        }

        if (user.avatar) {
            const [, created] = await db.Image.findOrCreate({
                where: {
                    target_id: existedUser.id,
                    target_type: "avatar",
                },
                defaults: {
                    target_id: existedUser.id,
                    target_type: "avatar",
                    ...user.avatar,
                },
                transaction: t,
            });

            if (!created) {
                await db.Image.update(
                    {
                        public_id: user.avatar.public_id,
                        secure_url: user.avatar.secure_url,
                        thumbnail_url: user.avatar.thumbnail_url,
                    },
                    {
                        where: {
                            target_id: existedUser.id,
                            target_type: "avatar",
                        },
                        transaction: t,
                    },
                );
            }
        }

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Update user successfully.",
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

const handleDeleteUser = async (user, actor) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const actorContext = await resolveActor(actor, transaction);
        if (!actorContext) {
            await transaction.rollback();
            return authorizationError();
        }

        const existed = await db.User.findOne({
            where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email,
            },
            transaction,
        });

        if (!existed) {
            await transaction.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid user account.",
            };
        }

        if (
            existed.phone_number === actorContext.user.phone_number ||
            !actorContext.manageableRoleIds.includes(Number(existed.role_id))
        ) {
            await transaction.rollback();
            return authorizationError();
        }

        await db.RefreshToken.destroy({
            where: { phone_number: existed.phone_number },
            transaction,
        });

        await db.User.destroy({
            where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email,
            },
            transaction,
        });
        await transaction.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete user successfully.",
        };
    } catch (error) {
        await rollbackTransaction(transaction);
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

/** SUPPORTER METHODS */

let isNumeric = (input) => {
    return !isNaN(input);
};

const handleConvertAddressType = (address) => {
    if (!address) {
        return "";
    }

    if (typeof address === "string") {
        return address;
    }

    const values = [address.location, address.ward, address.district, address.province];
    return values.filter(Boolean).join(" - ");
};

const appendUserDisplayData = async (users) => {
    const plainUsers = users.map((user) => toPlainObject(user));
    const userIds = plainUsers.map((user) => user.id);
    const roleIds = [...new Set(plainUsers.map((user) => user.role_id).filter(Boolean))];

    const [roles, avatars] = await Promise.all([
        db.Role.findAll({
            where: {
                id: {
                    [Op.in]: roleIds.length > 0 ? roleIds : [0],
                },
            },
            raw: true,
        }),
        db.Image.findAll({
            where: {
                target_id: {
                    [Op.in]: userIds.length > 0 ? userIds : [0],
                },
                target_type: "avatar",
            },
            raw: true,
        }),
    ]);

    return plainUsers.map((user) => {
        const role = roles.find((role) => role.id === user.role_id);
        const avatar = avatars.find((image) => image.target_id === user.id);

        return {
            ...user,
            role: role?.name || "",
            role_slug: role?.slug || "",
            avatar_url: avatar?.secure_url || null,
        };
    });
};

const buildUserListResponse = (result, count, currentPage, pageSize) => ({
    code: ResponseCode.SUCCESS,
    message: "Get user(s) successfully.",
    page: currentPage,
    total_pages: Math.max(Math.ceil(count / pageSize), 1),
    total_results: count,
    result,
});

const toPlainObject = (data) => {
    return typeof data.get === "function" ? data.get({ plain: true }) : { ...data };
};

let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const isValidPassword = (password) => {
    return typeof password === "string" && /^(?=.*\d)[A-Z].{6,}$/.test(password);
};

module.exports = {
    handleGetRoles,
    handleCountUsers,
    handleGetUsers,
    handleGetUserByUsername,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
};
