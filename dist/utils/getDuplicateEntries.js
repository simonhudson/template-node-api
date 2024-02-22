"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDuplicateEntries = void 0;
const mongoClient_1 = __importDefault(require("@/utils/mongoClient"));
const getDuplicateEntries = async (collectionName, body, keysToCheck = Object.keys(body)) => {
    const client = mongoClient_1.default;
    const db = client.db(process.env.DB_NAME);
    const objectToCheck = {};
    keysToCheck.forEach((key) => {
        objectToCheck[key] = body[key];
    });
    const duplicateEntries = await db.collection(collectionName).find(objectToCheck).toArray();
    return duplicateEntries;
};
exports.getDuplicateEntries = getDuplicateEntries;
