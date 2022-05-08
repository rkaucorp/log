"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverRespnose = void 0;
const serverRespnose = (res, statusCode, payload) => {
    res.status(statusCode).send(payload);
};
exports.serverRespnose = serverRespnose;
//# sourceMappingURL=serverResponse.js.map