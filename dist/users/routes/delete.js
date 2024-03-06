"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = void 0;
const constants_1 = require("../../users/constants");
const makeRequest_1 = require("../../utils/makeRequest");
const controllers_1 = require("../../users/controllers");
const del = async (req, res) => {
    const data = await (0, makeRequest_1.makeRequest)({ req, res, collectionName: constants_1.COLLECTION_NAME });
    controllers_1.UsersController.del(res, data);
};
exports.del = del;
