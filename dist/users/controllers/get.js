"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const slugify_1 = require("../../utils/slugify");
const dayjs_1 = __importDefault(require("dayjs"));
const transform = (data) => {
    data?.data.forEach((item) => {
        item.age = (0, dayjs_1.default)().diff((0, dayjs_1.default)(item.dateOfBirth), 'year');
        item.slug = (0, slugify_1.slugify)(`${item.firstName} ${item.lastName}`);
    });
    return data;
};
const get = (res, data) => {
    res.json(transform(data));
};
exports.get = get;
