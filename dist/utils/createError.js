"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = ({ message, data }) => {
    return { error: { message, data } };
};
exports.createError = createError;
