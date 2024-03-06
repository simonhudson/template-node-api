"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const delete_1 = require("../../users/controllers/delete");
const get_1 = require("../../users/controllers/get");
const patch_1 = require("../../users/controllers/patch");
const post_1 = require("../../users/controllers/post");
exports.UsersController = {
    del: delete_1.del,
    get: get_1.get,
    patch: patch_1.patch,
    post: post_1.post,
};
