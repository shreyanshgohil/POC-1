"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAccessToken = exports.authenticateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// For authenticate the refresh token
const authenticateRefreshToken = (refreshToken) => {
    if (!refreshToken)
        return {
            email: null,
            newAccessToken: null,
        };
    return jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
            return {
                email: null,
                newAccessToken: null,
            };
        }
        else {
            return {
                email: user.email,
                newAccessToken: generateAccessToken(user),
            };
        }
    });
};
exports.authenticateRefreshToken = authenticateRefreshToken;
// For authenticate the access token
const authenticateAccessToken = (accessToken) => {
    if (!accessToken)
        return { isAuthenticated: false, email: null };
    return jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
        console.log(err);
        if (err) {
            return {
                isAuthenticated: false,
                email: null,
            };
        }
        else {
            return {
                isAuthenticated: true,
                email: user.email,
            };
        }
    });
};
exports.authenticateAccessToken = authenticateAccessToken;
// For generate the access token
const generateAccessToken = (user) => {
    const { iat, ...others } = user;
    const token = jsonwebtoken_1.default.sign(others, process.env.ACCESS_TOKEN, {
        expiresIn: '1h',
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
