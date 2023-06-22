"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = require("../controllers/company");
const userAuthentication_1 = require("../middleware/userAuthentication");
const companiesRoutes = (0, express_1.Router)();
companiesRoutes.post('/create-company', userAuthentication_1.authenticateUser, company_1.createCompanyHandler);
companiesRoutes.get('/all-companies', userAuthentication_1.authenticateUser, company_1.getAllCompanies);
exports.default = companiesRoutes;
