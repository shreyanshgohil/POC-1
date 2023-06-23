"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userAuthentication_1 = require("../middleware/userAuthentication");
// Inits
const userRoutes = (0, express_1.Router)();
// For get single user from the users collection
userRoutes.get('/get-user', userAuthentication_1.authenticateUser, user_1.getUserHandler);
// For create a single user in user collection
userRoutes.post('/register', userAuthentication_1.passwordHashingHandler, user_1.createUserHandler);
// For update the user in user collection
userRoutes.put('/update-user', user_1.updateUserHandler);
// For do hard delete in user collection
userRoutes.delete('/delete-user', user_1.deleteUserHandler);
// For do login
userRoutes.post('/login', userAuthentication_1.comparePassword, user_1.loginUserHandler);
// For do login
userRoutes.post('/logout', user_1.logoutHandler);
exports.default = userRoutes;
