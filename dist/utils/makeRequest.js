"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = void 0;
const createError_1 = require("../utils/createError");
const delete_1 = require("../methods/delete");
const methods_1 = require("../constants/methods");
const get_1 = require("../methods/get");
const handleResponse_1 = require("../utils/handleResponse");
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const patch_1 = require("../methods/patch");
const post_1 = require("../methods/post");
const mongoClient_1 = __importDefault(require("../utils/mongoClient"));
const makeRequest = async ({ req, res, collectionName, query, sortBy, sortDirection, }) => {
    const METHOD = req?.method?.toUpperCase();
    if (!methods_1.validMethods.includes(METHOD)) {
        res.status(httpStatusCodes_1.httpStatusCodes.METHOD_NOT_ALLOWED);
        const errorResponse = (0, createError_1.createError)({
            message: `Invalid method (${METHOD}). Valid methods are ${methods_1.validMethods.join(', ')}`,
        });
        return (0, handleResponse_1.handleResponse)(req, res, errorResponse);
    }
    else {
        const client = mongoClient_1.default;
        const db = client.db(process.env.DB_NAME);
        let response;
        switch (METHOD) {
            case methods_1.GET:
                response = await (0, get_1.get)({ req, res, collectionName, db, query, sortBy, sortDirection });
                break;
            case methods_1.POST:
                response = await (0, post_1.post)({ req, res, collectionName, db });
                break;
            case methods_1.PATCH:
                response = await (0, patch_1.patch)({ req, collectionName, db });
                break;
            case methods_1.DELETE:
                response = await (0, delete_1.del)({ req, collectionName, db });
                break;
        }
        return (0, handleResponse_1.handleResponse)(req, res, response);
    }
};
exports.makeRequest = makeRequest;
