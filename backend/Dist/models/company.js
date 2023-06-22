"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CompanySchema = new mongoose_1.default.Schema({
    companyName: String,
    createdBy: { required: true, type: mongoose_1.default.Types.ObjectId },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Company', CompanySchema);
