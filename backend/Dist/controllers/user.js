"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserHandler = exports.deleteUserHandler = exports.updateUserHandler = exports.getUserHandler = exports.createUserHandler = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        res.status(500).json({ message: 'Some error is occurred' });
    }
};
exports.createUserHandler = createUserHandler;
// For get a single user
const getUserHandler = (req, res) => { };
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
    const accessToken = jsonwebtoken_1.default.sign(body, process.env.ACCESS_TOKEN);
    if (locals && locals?.isAuthenticated) {
        req.session.jwtToken = accessToken;
        return res.status(200).json({
            message: 'Please enter the email and password',
            jwt: accessToken,
        });
    }
    else {
        return res
            .status(403)
            .json({ message: 'Please enter the email and password', jwt: null });
    }
};
exports.loginUserHandler = loginUserHandler;
