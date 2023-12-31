"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReportSchema = new mongoose_1.default.Schema({
    reportName: {
        type: String,
    },
    reportType: {
        type: String,
    },
    selectedCompanies: {
        type: [mongoose_1.default.Types.ObjectId],
        default: [],
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Report', ReportSchema);
