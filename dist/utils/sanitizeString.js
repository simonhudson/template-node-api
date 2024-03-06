"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeString = void 0;
const xss_1 = __importDefault(require("xss"));
const sanitizeString = (value) => (value ? (0, xss_1.default)(value) : undefined);
exports.sanitizeString = sanitizeString;
