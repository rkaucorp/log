"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByID = exports.update = exports.create = exports.list = void 0;
const serverResponse_1 = require("../utils/serverResponse");
const logs_1 = require("../model/logs");
const variable_1 = require("../config/variable");
const list = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = (yield logs_1.Log.logListFromDynamoDB()) || [];
        (0, serverResponse_1.serverRespnose)(res, variable_1.SUCCESS_STATUS_CODE, logs);
    }
    catch (error) {
        console.log(error);
        (0, serverResponse_1.serverRespnose)(res, variable_1.FAILED_STATUS_CODE, error);
    }
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield logs_1.Log.storeLogReportToDynamoDB(req.body);
        (0, serverResponse_1.serverRespnose)(res, variable_1.SUCCESS_STATUS_CODE, "Report Created Successfully");
    }
    catch (error) {
        (0, serverResponse_1.serverRespnose)(res, variable_1.FAILED_STATUS_CODE, error);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield logs_1.Log.updateLogList(req.body);
        (0, serverResponse_1.serverRespnose)(res, variable_1.SUCCESS_STATUS_CODE, "Report Created Successfully");
    }
    catch (error) {
        (0, serverResponse_1.serverRespnose)(res, variable_1.FAILED_STATUS_CODE, error);
    }
});
exports.update = update;
const getByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const logs = (yield logs_1.Log.getLogByID(id)) || [];
        (0, serverResponse_1.serverRespnose)(res, variable_1.SUCCESS_STATUS_CODE, logs);
    }
    catch (error) {
        (0, serverResponse_1.serverRespnose)(res, variable_1.FAILED_STATUS_CODE, error);
    }
});
exports.getByID = getByID;
//# sourceMappingURL=log.js.map