"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReportHandler = exports.deleteReportHandler = exports.getAllReportHandler = exports.createReportHandler = void 0;
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
        const reports = await index_1.Report.find({});
        res.status(200).json({ message: 'Reports found successfully', reports });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', reports: null });
    }
};
exports.getAllReportHandler = getAllReportHandler;
const updateReportHandler = async (req, res) => {
    try {
        const reports = await index_1.Report.find({});
        res.status(200).json({ message: 'Reports found successfully', reports });
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
        const reports = await index_1.Report.deleteOne({ _id: id });
        res.status(200).json({ message: 'Report deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.deleteReportHandler = deleteReportHandler;
