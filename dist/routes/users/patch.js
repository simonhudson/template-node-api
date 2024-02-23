"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = void 0;
const constants_1 = require("./constants");
const makeRequest_1 = require("../../utils/makeRequest");
const patch = async (req, res) => {
    res.json(await (0, makeRequest_1.makeRequest)({ req, res, collectionName: constants_1.COLLECTION_NAME }));
};
exports.patch = patch;
