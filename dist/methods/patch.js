"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = void 0;
const createError_1 = require("../utils/createError");
const mongodb_1 = require("mongodb");
const preparePayloadForInsertion_1 = require("../utils/preparePayloadForInsertion");
const patch = async ({ req, collectionName, db, }) => {
    const requestBody = req.body;
    const query = { _id: new mongodb_1.ObjectId(requestBody._id) };
    delete requestBody._id;
    requestBody.updated_at = new Date();
    const payload = {
        $set: (0, preparePayloadForInsertion_1.preparePayloadForInsertion)(requestBody),
    };
    try {
        const response = await db.collection(collectionName).updateOne(query, payload);
        return response;
    }
    catch (error) {
        return (0, createError_1.createError)({ data: error });
    }
};
exports.patch = patch;
