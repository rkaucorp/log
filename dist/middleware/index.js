"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmptyRequestBody = exports.checkAuthRequest = void 0;
const variable_1 = require("../config/variable");
const serverResponse_1 = require("../utils/serverResponse");
const checkAuthRequest = (req, res, next) => {
    if (!req.body.userName) {
        (0, serverResponse_1.serverRespnose)(res, variable_1.UN_AUTHORIZED_STATUS_CODE, "Unauthentic Request");
    }
    else {
        next();
    }
};
exports.checkAuthRequest = checkAuthRequest;
const checkEmptyRequestBody = (req, res, next) => {
    if (Object.keys(req.body).length <= 1) {
        (0, serverResponse_1.serverRespnose)(res, variable_1.EMPTY_BODY_STATUS_CODE, "Body Should Not Be Empty");
    }
    else {
        next();
    }
};
exports.checkEmptyRequestBody = checkEmptyRequestBody;
//# sourceMappingURL=index.js.map