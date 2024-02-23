"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const constants_1 = require("./constants");
const makeRequest_1 = require("../../utils/makeRequest");
const dayjs_1 = __importDefault(require("dayjs"));
const transform = async (data) => {
    data?.data.forEach((item) => {
        item.age = (0, dayjs_1.default)().diff((0, dayjs_1.default)(item.date_of_birth), 'year');
    });
    return data;
};
const get = async (req, res) => {
    let query = {};
    const userSlug = req.params.slug;
    if (userSlug) {
        const nameSplit = userSlug.split('-');
        const firstName = nameSplit[0];
        const lastName = nameSplit[1];
        if (firstName && lastName) {
            query = {
                first_name: { $regex: new RegExp(firstName, 'i') },
                last_name: { $regex: new RegExp(lastName, 'i') },
            };
        }
    }
    res.json(await transform(await (0, makeRequest_1.makeRequest)({
        req,
        res,
        collectionName: constants_1.COLLECTION_NAME,
        sortBy: 'last_name',
        sortDirection: 'asc',
        query,
    })));
};
exports.get = get;
