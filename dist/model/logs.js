"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Log = void 0;
const db_1 = require("../db");
const variables = __importStar(require("../config/variable"));
const dynamoDB_1 = require("../utils/dynamoDB");
class Log {
    static storeLogReportToDynamoDB(payLoad = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date().toISOString();
                const params = {
                    TableName: variables.AWS_DYNAMODB_TABLE_NAME,
                    Item: Object.assign(Object.assign({}, payLoad), { createdAt: now, PK: variables.COMPANY_ID, SK: payLoad === null || payLoad === void 0 ? void 0 : payLoad.postID }),
                };
                (_a = params === null || params === void 0 ? void 0 : params.Item) === null || _a === void 0 ? true : delete _a.postID;
                yield db_1.DB.storeData(params);
                const data = {
                    postID: payLoad === null || payLoad === void 0 ? void 0 : payLoad.postID,
                    userName: payLoad === null || payLoad === void 0 ? void 0 : payLoad.userName,
                    createdAt: now,
                };
                yield this.storeUpdatedLogReport(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static storeUpdatedLogReport(payLoad = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(payLoad, "updated log report");
                const now = new Date().toISOString();
                const params = {
                    TableName: variables.AWS_DYNAMODB_TABLE_NAME_FOR_LOG,
                    Item: Object.assign(Object.assign({}, payLoad), { PK: payLoad === null || payLoad === void 0 ? void 0 : payLoad.postID, SK: now }),
                };
                yield db_1.DB.storeData(params);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static logListFromDynamoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    TableName: variables.AWS_DYNAMODB_TABLE_NAME,
                    KeyConditionExpression: `PK = :hashKey`,
                    ExpressionAttributeValues: {
                        ":hashKey": `${variables.COMPANY_ID}`,
                    },
                };
                const logs = yield db_1.DB.getData(params);
                return logs;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateLogList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAt = new Date().toISOString();
            const updatedBy = data === null || data === void 0 ? void 0 : data.userName;
            delete data.userName;
            const updateData = Object.assign({}, data);
            const params = Object.assign(Object.assign({ TableName: variables.AWS_DYNAMODB_TABLE_NAME, Key: {
                    PK: `${variables.COMPANY_ID}`,
                    SK: `${data === null || data === void 0 ? void 0 : data.postID}`,
                } }, (0, dynamoDB_1.generateUpdateParams)(updateData)), { ReturnValues: "ALL_NEW" });
            const result = yield db_1.DB.update(params);
            const updateLog = {
                postID: data === null || data === void 0 ? void 0 : data.postID,
                userName: updatedBy,
                updatedAt,
            };
            yield Log.storeUpdatedLogReport(updateLog);
            console.log("here comes");
            return (0, dynamoDB_1.getSerilizedData)(result.Attributes);
        });
    }
    static getLogByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: variables.AWS_DYNAMODB_TABLE_NAME_FOR_LOG,
                KeyConditionExpression: `PK = :hashKey`,
                ExpressionAttributeValues: {
                    ":hashKey": `${id}`,
                },
            };
            const logs = yield db_1.DB.getData(params);
            return logs;
        });
    }
}
exports.Log = Log;
//# sourceMappingURL=logs.js.map