"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleReport = exports.updateReportHandler = exports.deleteReportHandler = exports.getAllReportHandler = exports.createReportHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../models/index");
const createReportHandler = async (req, res) => {
    try {
        await index_1.Report.create(req.body);
        res.status(200).json({ message: 'Report created successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.createReportHandler = createReportHandler;
const getAllReportHandler = async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const searchQuery = req.query.search;
        const skip = (page - 1) * 5;
        const totalRecords = await index_1.Report.find().count();
        const searchRegex = new RegExp(searchQuery, 'i');
        if (searchQuery) {
            const reports = await index_1.Report.aggregate([
                { $match: { reportName: { $regex: searchRegex } } },
                {
                    $lookup: {
                        from: 'companies',
                        as: 'companyData',
                        localField: 'selectedCompanies',
                        foreignField: '_id',
                    },
                },
                {
                    $skip: skip,
                },
                { $limit: 5 },
            ]);
            return res.status(200).json({
                message: 'Reports found successfully',
                reports,
                totalRecords: reports.length,
            });
        }
        else {
            const reports = await index_1.Report.aggregate([
                {
                    $lookup: {
                        from: 'companies',
                        as: 'companyData',
                        localField: 'selectedCompanies',
                        foreignField: '_id',
                    },
                },
                {
                    $skip: skip,
                },
                { $limit: 5 },
            ]);
            return res
                .status(200)
                .json({ message: 'Reports found successfully', reports, totalRecords });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            reports: null,
            totalRecords: 0,
        });
    }
};
exports.getAllReportHandler = getAllReportHandler;
const getSingleReport = async (req, res) => {
    try {
        const { id } = req.params;
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const report = await index_1.Report.aggregate([
            { $match: { _id: objectId } },
            {
                $lookup: {
                    from: 'companies',
                    as: 'companyData',
                    localField: 'selectedCompanies',
                    foreignField: '_id',
                },
            },
        ]);
        return res.status(200).json({
            message: 'Report found successfully',
            report: report[0],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.getSingleReport = getSingleReport;
const updateReportHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await index_1.Report.replaceOne({ _id: id }, req.body);
        res.status(200).json({ message: 'Reports found successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', reports: null });
    }
};
exports.updateReportHandler = updateReportHandler;
const deleteReportHandler = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        await index_1.Report.deleteOne({ _id: id });
        res.status(200).json({ message: 'Report deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.deleteReportHandler = deleteReportHandler;
