"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const constants_1 = require("../../users/constants");
const makeRequest_1 = require("../../utils/makeRequest");
const controllers_1 = require("../../users/controllers");
const get = async (req, res) => {
    let query = {};
    const { slug } = req.params;
    if (slug) {
        const slugSplit = slug.split('-');
        const firstName = slugSplit[0];
        const lastName = slugSplit[1];
        if (firstName && lastName) {
            query = {
                firstName: { $regex: new RegExp(firstName, 'i') },
                lastName: { $regex: new RegExp(lastName, 'i') },
            };
        }
    }
    const data = await (0, makeRequest_1.makeRequest)({
        req,
        res,
        collectionName: constants_1.COLLECTION_NAME,
        sortBy: 'lastName',
        sortDirection: 'asc',
        query,
    });
    controllers_1.UsersController.get(res, data);
};
exports.get = get;
