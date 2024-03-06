"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = void 0;
const createError_1 = require("../utils/createError");
const mongodb_1 = require("mongodb");
const del = async ({ req, collectionName, db }) => {
    const requestBody = req.body;
    const query = { _id: mongodb_1.ObjectId.createFromHexString(requestBody._id.toString()) };
    try {
        const response = await db.collection(collectionName).deleteOne(query);
        return response;
    }
    catch (error) {
        return (0, createError_1.createError)({ data: error });
    }
};
exports.del = del;
