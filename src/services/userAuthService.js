import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResponseCode } from "../constant";
import db from "../models";
const { Op } = require("sequelize");
import sequelize from "../config/database";

/** USER */

const handleLogin = async (username, password) => {
    try {
        const normalizedUsername = typeof username === "string" ? username.trim() : username;
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        phone_number: normalizedUsername,
                        role_id: {
                            [Op.in]: [1, 2, 4],
                        },
                    },
                    {
                        email: normalizedUsername,
                        role_id: {
                            [Op.in]: [1, 2, 4],
                        },
                    },
                ],
            },
        });

        if (!user) {
            const anyRoleUser = await db.User.findOne({
                attributes: ["role_id"],
                where: {
                    [Op.or]: [
                        {
                            phone_number: normalizedUsername,
                        },
                        {
                            email: normalizedUsername,
                        },
                    ],
                },
                raw: true,
            });

            if (anyRoleUser && Number(anyRoleUser.role_id) === 3) {
                return {
                    code: ResponseCode.AUTHENTICATION_ERROR,
                    message: "Tài khoản này thuộc trang cửa hàng, vui lòng đăng nhập ở store.",
                };
            }

            return {
                code: ResponseCode.AUTHENTICATION_ERROR,
                message: "Incorrect Username or Password",
            };
        }

        const isValidPassword = await verifyPasswordAndUpgrade(user, password);

        if (!isValidPassword) {
            return {
                code: ResponseCode.AUTHENTICATION_ERROR,
                message: "Incorrect Username or Password",
            };
        }

        const avatar = await db.Image.findOne({
            attributes: {
                exclude: ["id", "target_id", "target_type"],
            },
            where: {
                target_id: user.id,
                target_type: "avatar",
            },
        });

        const accessToken = handleGenerateAccessToken(user);

        const refreshToken = await handleGenerateRefreshToken(user);

        const userData = toPlainObject(user);
        delete userData.password;

        return {
            code: ResponseCode.SUCCESS,
            message: "Authentication successfully",
            result: {
                ...userData,
                avatar,
            },
            accessToken,
            refreshToken,
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleLogout = async (phone_number) => {
    const t = await sequelize.transaction();
    try {
        await Promise.all([
            db.User.update(
                {
                    last_login: Date.now(),
                },
                {
                    where: {
                        phone_number: phone_number,
                    },
                    transaction: t,
                },
            ),

            db.RefreshToken.destroy({
                where: {
                    phone_number: phone_number,
                },
                transaction: t,
            }),
        ]);

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Logout successfully.",
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

const handleRefreshTokens = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, async (error, data) => {
            if (error) {
                reject({
                    code: ResponseCode.AUTHORIZATION_ERROR,
                    message: "Forbidden. Invalid refresh token.",
                });
            } else {
                try {
                    const existedRefreshToken = await db.RefreshToken.findOne({
                        where: {
                            phone_number: data.phone_number,
                        },
                    });

                    if (existedRefreshToken && existedRefreshToken.token === refreshToken) {
                        const newAccessToken = handleGenerateAccessToken(data);
                        const newRefreshToken = await handleGenerateRefreshToken(data);

                        resolve({
                            code: ResponseCode.SUCCESS,
                            message: "Refresh successfully.",
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                        });
                    } else {
                        reject({
                            code: ResponseCode.AUTHORIZATION_ERROR,
                            message: "Forbidden. Invalid refresh token.",
                        });
                    }
                } catch (err1) {
                    console.error(err1);
                    reject({
                        code: ResponseCode.INTERNAL_SERVER_ERROR,
                        message: "An error occurred.",
                    });
                }
            }
        });
    }).catch((err2) => {
        console.log(err2);
        return err2;
    });
};

const handleGenerateAccessToken = (user) => {
    const accessToken = jwt.sign(
        {
            time: Date(),
            email: user.email,
            phone_number: user.phone_number,
            role_id: user.role_id,
        },
        process.env.NODE_ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.NODE_ACCESS_TOKEN_EXPIRES_IN,
        },
    );

    return accessToken;
};

const handleGenerateRefreshToken = async (user) => {
    try {
        const newRefreshToken = jwt.sign(
            {
                time: Date(),
                email: user.email,
                phone_number: user.phone_number,
                role_id: user.role_id,
            },
            process.env.NODE_REFRESH_TOKEN_SECRET_KEY,
            {
                expiresIn: process.env.NODE_REFRESH_TOKEN_EXPIRES_IN,
            },
        );
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const newRecords = {
            phone_number: user.phone_number,
            token: newRefreshToken,
            expirationDate,
        };

        const [refreshToken, created] = await db.RefreshToken.findOrCreate({
            where: {
                phone_number: user.phone_number,
            },
            defaults: newRecords,
        });

        if (!created) {
            await db.RefreshToken.update(
                {
                    token: newRefreshToken,
                    expirationDate: expirationDate,
                },
                {
                    where: {
                        phone_number: user.phone_number,
                    },
                },
            );
        }

        return newRefreshToken;
    } catch (error) {
        throw error;
    }
};

const handleUpdateProfile = async (profile) => {
    const t = await sequelize.transaction();
    try {
        const user = await db.User.findOne({
            where: {
                phone_number: profile.phone_number,
            },
        });

        if (!user) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid account.",
            };
        }

        if (profile.email && profile.email !== user.email) {
            const duplicatedEmail = await db.User.findOne({
                where: {
                    email: profile.email,
                    id: {
                        [Op.ne]: user.id,
                    },
                },
            });

            if (duplicatedEmail) {
                await t.rollback();
                return {
                    code: ResponseCode.DATABASE_ERROR,
                    message: "Email already in use.",
                };
            }
        }

        const convertedAddress = handleConvertAddressType(profile.address);
        const updatedProfile = {
            name: profile.name,
            email: profile.email,
            birth: profile.birth || null,
            bio: profile.bio,
            address: convertedAddress,
        };

        if (profile.password && profile.password.trim()) {
            updatedProfile.password = hashPassword(profile.password);
        }

        await db.User.update(updatedProfile, {
            where: {
                phone_number: profile.phone_number,
            },
            transaction: t,
        });

        if (profile.avatar) {
            const [, created] = await db.Image.findOrCreate({
                where: {
                    target_id: user.id,
                    target_type: "avatar",
                },
                defaults: {
                    target_id: user.id,
                    target_type: "avatar",
                    ...profile.avatar,
                },
                transaction: t,
            });

            if (!created) {
                await db.Image.update(
                    {
                        public_id: profile.avatar.public_id,
                        secure_url: profile.avatar.secure_url,
                        thumbnail_url: profile.avatar.thumbnail_url,
                    },
                    {
                        where: {
                            target_id: user.id,
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
            message: "Update profile successfully.",
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

let handleChangePassword = async (username, password, newPassword) => {
    try {
        const normalizedUsername = typeof username === "string" ? username.trim() : username;
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        phone_number: normalizedUsername,
                    },
                    {
                        email: normalizedUsername,
                    },
                ],
            },
        });

        if (!user || !(await verifyPasswordAndUpgrade(user, password))) {
            return {
                code: ResponseCode.AUTHENTICATION_ERROR,
                message: "Incorrect username or password",
            };
        }

        await db.User.update(
            {
                password: hashPassword(newPassword),
            },
            {
                where: {
                    id: user.id,
                },
            },
        );

        return {
            code: ResponseCode.SUCCESS,
            message: "Password has been changed.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleRegister = async (user) => {
    try {
        const existedUser = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        phone_number: user.phone_number,
                    },
                    {
                        email: user.email,
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
            phone_number: user.phone_number,
            email: user.email,
            password: hashedPassword,
            name: user.name ?? user.phone_number,
            address: convertedAddress,
            last_login: null,
            birth: null,
            role_id: 3,
            bio: null,
        });

        delete createdUser.password;

        if (createdUser) {
            return {
                code: ResponseCode.SUCCESS,
                message: "Register successfully.",
                result: createdUser,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

/** SUPPORTER METHODS */

let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const isBcryptHash = (password) => {
    return typeof password === "string" && /^\$2[aby]\$\d{2}\$/.test(password);
};

const verifyPasswordAndUpgrade = async (user, password) => {
    if (isBcryptHash(user.password)) {
        return bcrypt.compareSync(password, user.password);
    }

    if (user.password !== password) {
        return false;
    }

    await db.User.update(
        {
            password: hashPassword(password),
        },
        {
            where: {
                id: user.id,
            },
        },
    );

    return true;
};

const handleConvertAddressType = (address) => {
    if (!address) {
        return "";
    }

    // Nếu frontend gửi chuỗi thì trả luôn
    if (typeof address === "string") {
        return address;
    }

    return [
        address.location,
        address.ward,
        address.district,
        address.province,
    ]
        .filter(Boolean)
        .join(" - ");
};

const toPlainObject = (data) => {
    return typeof data.get === "function" ? data.get({ plain: true }) : { ...data };
};

module.exports = {
    handleLogin,
    handleLogout,
    handleRegister,
    handleRefreshTokens,
    handleUpdateProfile,
    handleChangePassword,
};
