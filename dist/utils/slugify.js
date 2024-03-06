"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-{2,}/g, '-');
exports.slugify = slugify;
