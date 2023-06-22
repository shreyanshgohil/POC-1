"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCompanies = exports.createCompanyHandler = void 0;
const index_1 = require("../models/index");
const createCompanyHandler = async (req, res) => {
    try {
        await index_1.Company.create(req.body);
        res.status(200).json({ message: 'Company created successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.createCompanyHandler = createCompanyHandler;
const getAllCompanies = async (req, res) => {
    try {
        const Companies = await index_1.Company.find({});
        res
            .status(200)
            .json({ message: 'Companies found successfully', Companies });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', Companies: null });
    }
};
exports.getAllCompanies = getAllCompanies;
