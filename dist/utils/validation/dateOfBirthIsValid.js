"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateOfBirthIsValid = void 0;
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const dayjs_1 = __importDefault(require("dayjs"));
dayjs_1.default.extend(customParseFormat_1.default);
const dateOfBirthIsValid = (value) => (0, dayjs_1.default)(value, 'YYYY-MM-DD', true).isValid();
exports.dateOfBirthIsValid = dateOfBirthIsValid;
