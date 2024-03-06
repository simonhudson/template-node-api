"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const constants_1 = require("../../users/constants");
const createError_1 = require("../../utils/createError");
const validation_1 = require("../../utils/validation");
const getDuplicateEntries_1 = require("../../utils/getDuplicateEntries");
const handleResponse_1 = require("../../utils/handleResponse");
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const makeRequest_1 = require("../../utils/makeRequest");
const controllers_1 = require("../../users/controllers");
const post = async (req, res) => {
    const requestBody = req.body;
    // Check if required fields are present
    const missingRequiredFields = validation_1.Validation.missingRequiredFields(requestBody, [
        'firstName',
        'lastName',
        'dateOfBirth',
    ]);
    if (missingRequiredFields.length) {
        res.status(httpStatusCodes_1.httpStatusCodes.BAD_REQUEST);
        return res.json((0, handleResponse_1.handleResponse)(req, res, (0, createError_1.createError)({ message: `Missing required field(s)`, data: missingRequiredFields })));
    }
    // Check if date of birth is valid
    if (!validation_1.Validation.dateOfBirthIsValid(requestBody.dateOfBirth)) {
        res.status(httpStatusCodes_1.httpStatusCodes.BAD_REQUEST);
        return res.json((0, handleResponse_1.handleResponse)(req, res, (0, createError_1.createError)({
            message: `Invalid field(s)`,
            data: [{ field: 'dateOfBirth', attemptedValue: requestBody.dateOfBirth }],
        })));
    }
    // Check if duplicate entries exist
    const duplicateEntries = await (0, getDuplicateEntries_1.getDuplicateEntries)(constants_1.COLLECTION_NAME, requestBody);
    if (duplicateEntries.length) {
        res.status(httpStatusCodes_1.httpStatusCodes.CONFLICT);
        return res.json((0, handleResponse_1.handleResponse)(req, res, (0, createError_1.createError)({
            message: `Duplicate entry found`,
            data: duplicateEntries,
        })));
    }
    // Make the request
    const data = await (0, makeRequest_1.makeRequest)({ req, res, collectionName: constants_1.COLLECTION_NAME });
    controllers_1.UsersController.post(res, data);
};
exports.post = post;
