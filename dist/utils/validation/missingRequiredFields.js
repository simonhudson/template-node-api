"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingRequiredFields = void 0;
const missingRequiredFields = (requestBody, required) => {
    const invalidFields = [];
    required.forEach((field) => {
        if (!requestBody[field])
            invalidFields.push(field);
    });
    return invalidFields;
};
exports.missingRequiredFields = missingRequiredFields;
