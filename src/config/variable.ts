require("dotenv").config();

export const APP_PORT = process.env.PORT;
export const AWS_DYNAMODB_REGION = process.env.AWS_REGION;
export const AWS_DYNAMODB_END_POINT = process.env.AWS_END_POINT;
export const AWS_DYNAMODB_TABLE_NAME = process.env.DYNAMO_DB_TABLE;
export const AWS_DYNAMODB_TABLE_NAME_FOR_LOG =
  process.env.DYNAMO_DB_TABLE_FOR_LOG;
export const SUCCESS_STATUS_CODE = 202;
export const FAILED_STATUS_CODE = 503;
export const UN_AUTHORIZED_STATUS_CODE = 401;
export const EMPTY_BODY_STATUS_CODE = 403;
export const COMPANY_ID = process.env.COMPANY_ID;
export const dbIndexes = {
  PK: "PK",
  SK: "SK",
};
