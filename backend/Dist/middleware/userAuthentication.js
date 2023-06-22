"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHashingHandler = exports.comparePassword = exports.authenticateUser = void 0;
const bcrypt_1 = require("bcrypt");
const models_1 = require("../models");
const utils_1 = require("../utils/utils");
// For generate the hashed password
const passwordHashingHandler = async (req, res, next) => {
    try {
        const { password } = req.body;
        const salt = await (0, bcrypt_1.genSalt)(10);
        const hashedPassword = await (0, bcrypt_1.hash)(password, salt);
        req.body.password = hashedPassword;
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.passwordHashingHandler = passwordHashingHandler;
// For check the user password
const comparePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                message: 'Please enter the email and password',
                refreshToken: null,
                accessToken: null,
            });
        }
        const user = await models_1.User.findOne({ email });
        const isAuthenticated = await (0, bcrypt_1.compare)(password, user?.password);
        req.locals = {
            isAuthenticated,
        };
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.comparePassword = comparePassword;
// middle ware for authenticate an user
const authenticateUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        const { refreshToken } = req.session;
        const { isAuthenticated, email } = (0, utils_1.authenticateAccessToken)(accessToken);
        if (isAuthenticated) {
            req.locals = { email };
            next();
        }
        else {
            const { email, newAccessToken } = (0, utils_1.authenticateRefreshToken)(refreshToken);
            if (newAccessToken) {
                req.locals = { email };
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                });
                next();
            }
            else {
                res
                    .status(403)
                    .json({ message: 'Please do login to access the data', user: null });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.authenticateUser = authenticateUser;
