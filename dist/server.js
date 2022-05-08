"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = require("./utils/connection");
const init = () => {
    let app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use("/api", router_1.default);
    return app;
};
const app = init();
connection_1.AppConnection.connection(app);
//# sourceMappingURL=server.js.map