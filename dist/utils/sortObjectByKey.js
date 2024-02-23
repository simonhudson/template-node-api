"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObjectByKey = void 0;
const sortObjectByKey = (obj) => {
    const newKeys = Object.keys(obj).sort();
    const sortedObj = {};
    newKeys.forEach((key) => {
        sortedObj[key] = obj[key];
    });
    return sortedObj;
};
exports.sortObjectByKey = sortObjectByKey;
