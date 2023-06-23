"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.loginUserHandler = exports.deleteUserHandler = exports.updateUserHandler = exports.getUserHandler = exports.createUserHandler = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils/utils");
/**
 * for create read  a single user in users collection
 * @param {Request} req
 * @param {Response} res
 * @return  {void}
 */
const createUserHandler = async (req, res) => {
    try {
        await models_1.User.create(req.body);
        res.status(200).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Some error is occurred' });
    }
};
exports.createUserHandler = createUserHandler;
// For get a single user
const getUserHandler = async (req, res) => {
    try {
        const user = await models_1.User.findOne({ email: req.locals.email }, { password: 0 });
        res.status(200).json({ message: 'User found successfully', user });
    }
    catch (error) {
        res
            .status(403)
            .json({ message: 'Please do login to access the data', user: null });
    }
};
exports.getUserHandler = getUserHandler;
// For update the user
const updateUserHandler = (req, res) => { };
exports.updateUserHandler = updateUserHandler;
// For delete a user
const deleteUserHandler = (req, res) => { };
exports.deleteUserHandler = deleteUserHandler;
// For login
const loginUserHandler = (req, res) => {
    const { body, locals } = req;
    const refreshToken = jsonwebtoken_1.default.sign(body, process.env.REFRESH_TOKEN);
    const accessToken = (0, utils_1.generateAccessToken)(body);
    if (locals && locals?.isAuthenticated) {
        req.session.refreshToken = refreshToken;
        return res
            .status(200)
            .cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        })
            .json({
            message: 'Please enter the email and password',
            refreshToken: refreshToken,
            accessToken: accessToken,
        });
    }
    else {
        return res.status(403).json({
            message: 'Please enter the email and password',
            refreshToken: null,
            accessToken: null,
        });
    }
};
exports.loginUserHandler = loginUserHandler;
const logoutHandler = (req, res) => {
    req.session.destroy();
    res
        .status(200)
        .cookie('accessToken', null)
        .json({ message: 'Logout done successfully' });
};
exports.logoutHandler = logoutHandler;
