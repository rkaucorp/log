"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const log_1 = require("./log");
const routes = [...log_1.routes];
let router = express_1.default.Router();
routes.forEach(route => {
    router[route.http](route.path, [...route === null || route === void 0 ? void 0 : route.middleware], route.handler);
});
exports.default = router;
//# sourceMappingURL=index.js.map