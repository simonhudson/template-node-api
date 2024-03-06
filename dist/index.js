"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./departments/routes"));
const routes_2 = __importDefault(require("./users/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));
app.use('/departments', routes_1.default);
app.use('/users', routes_2.default);
module.exports = app;
