"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbIndexes = exports.COMPANY_ID = exports.EMPTY_BODY_STATUS_CODE = exports.UN_AUTHORIZED_STATUS_CODE = exports.FAILED_STATUS_CODE = exports.SUCCESS_STATUS_CODE = exports.AWS_DYNAMODB_TABLE_NAME_FOR_LOG = exports.AWS_DYNAMODB_TABLE_NAME = exports.AWS_DYNAMODB_END_POINT = exports.AWS_DYNAMODB_REGION = exports.APP_PORT = void 0;
require("dotenv").config();
exports.APP_PORT = process.env.PORT;
exports.AWS_DYNAMODB_REGION = process.env.AWS_REGION;
exports.AWS_DYNAMODB_END_POINT = process.env.AWS_END_POINT;
exports.AWS_DYNAMODB_TABLE_NAME = process.env.DYNAMO_DB_TABLE;
exports.AWS_DYNAMODB_TABLE_NAME_FOR_LOG = process.env.DYNAMO_DB_TABLE_FOR_LOG;
exports.SUCCESS_STATUS_CODE = 202;
exports.FAILED_STATUS_CODE = 503;
exports.UN_AUTHORIZED_STATUS_CODE = 401;
exports.EMPTY_BODY_STATUS_CODE = 403;
exports.COMPANY_ID = process.env.COMPANY_ID;
exports.dbIndexes = {
    PK: "PK",
    SK: "SK",
};
//# sourceMappingURL=variable.js.map