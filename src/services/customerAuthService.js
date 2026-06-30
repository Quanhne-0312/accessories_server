import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResponseCode } from "../constant";
import db from "../models";
const { Op } = require("sequelize");
import sequelize from "../config/database";
import _ from "lodash";

/** CUSTOMER */

const handleLogin = async (username, password) => {
    try {
        const normalizedUsername = normalizeUsername(username);
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        phone_number: normalizedUsername,
                        role_id: 3,
                    },
                    {
                        email: normalizedUsername,
                        role_id: 3,
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

            if (anyRoleUser && Number(anyRoleUser.role_id) !== 3) {
                return {
                    code: ResponseCode.AUTHENTICATION_ERROR,
                    message: "Tài khoản này thuộc trang quản trị, vui lòng đăng nhập ở admin.",
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

const handleRegister = async (user) => {
    try {
        const normalizedUser = {
            ...user,
            phone_number: typeof user.phone_number === "string" ? user.phone_number.trim() : user.phone_number,
            email: typeof user.email === "string" ? user.email.trim().toLowerCase() : user.email,
        };

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
                        phone_number: normalizedUser.phone_number,
                    },
                    {
                        email: normalizedUser.email,
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

        if (!_.isEqual(user.password, user.confirm_password)) {
            return {
                code: ResponseCode.DATABASE_ERROR,
                message: "Confirm password do not match.",
            };
        }

        const hashedPassword = hashPassword(user.password);
        const createdUser = await db.User.create({
            phone_number: normalizedUser.phone_number,
            email: normalizedUser.email,
            password: hashedPassword,
            name: user.name ?? normalizedUser.phone_number,
            address: user.address,
            last_login: null,
            birth: null,
            role_id: 3,
            bio: null,
        });

        if (createdUser) {
            const createdUserData = toPlainObject(createdUser);
            delete createdUserData.password;

            const accessToken = handleGenerateAccessToken(createdUserData);
            const refreshToken = await handleGenerateRefreshToken(createdUserData);
            return {
                code: ResponseCode.SUCCESS,
                message: "Register successfully.",
                result: createdUserData,
                accessToken,
                refreshToken,
            };
        }

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "Register unsuccessfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

/** TOKEN */
const handleLogout = async (phone_number) => {
    try {
        await db.RefreshToken.destroy({
            where: {
                phone_number,
            },
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Logout successfully.",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleRefreshTokens = async (refreshToken) => {
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

const handleUpdateProfile = async (profile) => {
    const t = await sequelize.transaction();

    try {
        const user = await db.User.findOne({
            where: {
                phone_number: profile.phone_number,
                email: profile.email,
                role_id: 3,
            },
            transaction: t,
        });

        if (!user) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Invalid account.",
            };
        }

        const updates = {
            name: profile.name,
            birth: profile.birth ?? null,
            bio: profile.bio ?? null,
        };

        if (profile.address) {
            updates.address =
                typeof profile.address === "string" ? profile.address : handleConvertAddressType(profile.address);
        }

        await db.User.update(updates, {
            where: {
                id: user.id,
            },
            transaction: t,
        });

        if (profile.avatar) {
            const [image, created] = await db.Image.findOrCreate({
                where: {
                    target_id: user.id,
                    target_type: "avatar",
                },
                defaults: {
                    target_id: user.id,
                    target_type: "avatar",
                    public_id: profile.avatar.public_id,
                    secure_url: profile.avatar.secure_url,
                    thumbnail_url: profile.avatar.thumbnail_url,
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
                            id: image.id,
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

const handleChangePassword = async (phoneNumber, password, newPassword) => {
    try {
        const user = await db.User.findOne({
            where: {
                phone_number: phoneNumber,
                role_id: 3,
            },
        });

        if (!user || !(await verifyPasswordAndUpgrade(user, password))) {
            return {
                code: ResponseCode.AUTHENTICATION_ERROR,
                message: "Incorrect phone number or password.",
            };
        }

        if (!isValidPassword(newPassword)) {
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Password must be longer than 6 characters, start with an uppercase letter and contain a number.",
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

/** SUPPORTER METHODS */

let isExistPhone = (currentPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: {
                    phoneNumber: currentPhone,
                },
            });
            if (customer) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

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

const isValidPassword = (password) => {
    return typeof password === "string" && /^(?=.*\d)[A-Z].{6,}$/.test(password);
};

const normalizeUsername = (username) => {
    const value = typeof username === "string" ? username.trim() : username;
    return typeof value === "string" && value.includes("@") ? value.toLowerCase() : value;
};

const toPlainObject = (data) => {
    return typeof data.get === "function" ? data.get({ plain: true }) : { ...data };
};

const handleConvertAddressType = (address) => {
    const values = [address.location, address.ward, address.district, address.province];
    return values.filter(Boolean).join(" - ");
};

module.exports = {
    handleLogin,
    handleLogout,
    handleRegister,
    handleRefreshTokens,
    handleUpdateProfile,
    handleChangePassword,
};
