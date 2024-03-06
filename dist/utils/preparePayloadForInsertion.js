"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparePayloadForInsertion = void 0;
const sanitizeObject_1 = require("../utils/sanitizeObject");
const sortObjectByKey_1 = require("../utils/sortObjectByKey");
const preparePayloadForInsertion = (payload) => {
    let finalPayload = (0, sortObjectByKey_1.sortObjectByKey)(payload);
    finalPayload = (0, sanitizeObject_1.sanitizeObject)(finalPayload);
    return finalPayload;
};
exports.preparePayloadForInsertion = preparePayloadForInsertion;
