"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const constants_1 = require("../../departments/constants");
const createError_1 = require("../../utils/createError");
const getDuplicateEntries_1 = require("../../utils/getDuplicateEntries");
const handleResponse_1 = require("../../utils/handleResponse");
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const makeRequest_1 = require("../../utils/makeRequest");
const getInvalidFields = (requestBody) => {
    const invalidFields = [];
    ['name'].forEach((field) => {
        if (!requestBody[field])
            invalidFields.push(field);
    });
    return invalidFields;
};
const post = async (req, res) => {
    const requestBody = req.body;
    // Check if required fields are present
    const invalidFields = getInvalidFields(requestBody);
    if (invalidFields.length) {
        res.status(httpStatusCodes_1.httpStatusCodes.BAD_REQUEST);
        return res.json((0, handleResponse_1.handleResponse)(req, res, (0, createError_1.createError)({ message: `Invalid field(s)`, data: invalidFields })));
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
    res.json(await (0, makeRequest_1.makeRequest)({ req, res, collectionName: constants_1.COLLECTION_NAME }));
};
exports.post = post;
