"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeObject = void 0;
const sanitizeString_1 = require("./sanitizeString");
const traverse_1 = __importDefault(require("traverse"));
const sanitizeObject = (obj) => {
    (0, traverse_1.default)(obj).forEach(function (item) {
        if (typeof item === 'string')
            this.update((0, sanitizeString_1.sanitizeString)(item));
    });
    return obj;
};
exports.sanitizeObject = sanitizeObject;
