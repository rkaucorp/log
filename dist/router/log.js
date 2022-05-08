"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const log_1 = require("../controller/log");
const middleware_1 = require("../middleware");
exports.routes = [
    {
        http: "get",
        path: "/posts",
        middleware: [],
        handler: log_1.list,
    },
    {
        http: "post",
        path: "/posts",
        middleware: [middleware_1.checkAuthRequest, middleware_1.checkEmptyRequestBody],
        handler: log_1.create,
    },
    {
        http: "put",
        path: "/posts",
        middleware: [middleware_1.checkAuthRequest, middleware_1.checkEmptyRequestBody],
        handler: log_1.update,
    },
    {
        http: "get",
        path: "/logs/:id",
        middleware: [],
        handler: log_1.getByID,
    },
];
//# sourceMappingURL=log.js.map