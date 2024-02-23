"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[ ]{1,}/g, '-');
exports.slugify = slugify;
