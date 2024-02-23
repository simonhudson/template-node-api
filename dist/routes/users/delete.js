"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = void 0;
const constants_1 = require("./constants");
const makeRequest_1 = require("../../utils/makeRequest");
const del = async (req, res) => {
    res.json(await (0, makeRequest_1.makeRequest)({ req, res, collectionName: constants_1.COLLECTION_NAME }));
};
exports.del = del;
