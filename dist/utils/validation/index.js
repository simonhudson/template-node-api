"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const dateOfBirthIsValid_1 = require("./dateOfBirthIsValid");
const missingRequiredFields_1 = require("./missingRequiredFields");
exports.Validation = {
    dateOfBirthIsValid: dateOfBirthIsValid_1.dateOfBirthIsValid,
    missingRequiredFields: missingRequiredFields_1.missingRequiredFields,
};
