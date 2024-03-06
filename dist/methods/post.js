"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const createError_1 = require("../utils/createError");
const handleResponse_1 = require("../utils/handleResponse");
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const preparePayloadForInsertion_1 = require("../utils/preparePayloadForInsertion");
const post = async ({ req, res, collectionName, db, }) => {
    const requestBody = req.body;
    if (!Object.keys(requestBody).length) {
        res.status(httpStatusCodes_1.httpStatusCodes.BAD_REQUEST);
        return (0, handleResponse_1.handleResponse)(req, res, (0, createError_1.createError)({ message: 'No request body provided' }));
    }
    requestBody.createdAt = new Date();
    requestBody.updatedAt = requestBody.createdAt;
    try {
        const response = await db
            .collection(collectionName)
            .insertOne((0, preparePayloadForInsertion_1.preparePayloadForInsertion)(requestBody));
        return response;
    }
    catch (error) {
        return (0, createError_1.createError)({ data: error });
    }
};
exports.post = post;
