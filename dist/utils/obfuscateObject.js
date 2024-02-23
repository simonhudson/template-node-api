"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obfuscateObject = void 0;
const traverse_1 = __importDefault(require("traverse"));
const DEFAULT_ALLOW_LIST = ['_id', 'count', 'data', 'endpoint', 'error', 'message', 'metadata', 'method', 'status'];
const obfuscateObject = (obj, allowList = DEFAULT_ALLOW_LIST, replacementValue = '[OBFUSCATED]') => {
    if (process.env.NODE_ENV !== 'production')
        return obj;
    const allow = Array.from(new Set([...DEFAULT_ALLOW_LIST, ...allowList]));
    (0, traverse_1.default)(obj).forEach(function (item) {
        if (['string'].includes(typeof item) && !allow?.includes(this.key))
            this.update(replacementValue);
    });
    return obj;
};
exports.obfuscateObject = obfuscateObject;
