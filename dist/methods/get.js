"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const createError_1 = require("../utils/createError");
const get = async ({ collectionName, db, query, sortBy, sortDirection, }) => {
    let queryObj = query || {};
    let sortQuery = {};
    if (sortBy)
        sortQuery = { [sortBy]: sortDirection === 'asc' ? 1 : -1 };
    try {
        const response = await db.collection(collectionName).find(queryObj).sort(sortQuery).toArray();
        return response;
    }
    catch (error) {
        return (0, createError_1.createError)({ data: error });
    }
};
exports.get = get;
