"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delete_1 = require("./delete");
const get_1 = require("./get");
const patch_1 = require("./patch");
const post_1 = require("./post");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get(['/', '/:slug'], async (req, res) => (0, get_1.get)(req, res));
router.post('/', async (req, res) => (0, post_1.post)(req, res));
router.patch('/', async (req, res) => (0, patch_1.patch)(req, res));
router.delete('/', async (req, res) => (0, delete_1.del)(req, res));
exports.default = router;
