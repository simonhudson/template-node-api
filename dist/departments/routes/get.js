"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const constants_1 = require("../../departments/constants");
const makeRequest_1 = require("../../utils/makeRequest");
const transform = (data) => {
    return data;
};
const get = async (req, res) => {
    let query = {};
    const { slug } = req.params;
    if (slug) {
        query = {
            name: { $regex: new RegExp(slug, 'i') },
        };
    }
    res.json(transform(await (0, makeRequest_1.makeRequest)({
        req,
        res,
        collectionName: constants_1.COLLECTION_NAME,
        sortBy: 'name',
        sortDirection: 'asc',
        query,
    })));
};
exports.get = get;
