"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = exports.companiesRoutes = exports.userRoutes = void 0;
const user_1 = __importDefault(require("./user"));
exports.userRoutes = user_1.default;
const company_1 = __importDefault(require("./company"));
exports.companiesRoutes = company_1.default;
const report_1 = __importDefault(require("./report"));
exports.reportRoutes = report_1.default;
