"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_1 = require("../controllers/report");
const reportRoutes = (0, express_1.Router)();
reportRoutes.get('/all-report', report_1.getAllReportHandler);
reportRoutes.delete('/delete-report', report_1.deleteReportHandler);
reportRoutes.post('/create-report', report_1.createReportHandler);
reportRoutes.put('/update-report', report_1.updateReportHandler);
exports.default = reportRoutes;