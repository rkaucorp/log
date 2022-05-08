const AWS = require("aws-sdk");
import * as variables from "../config/variable";

AWS.config.update({
  region: variables.AWS_DYNAMODB_REGION,
  endpoint: variables.AWS_DYNAMODB_END_POINT,
});

export const dynamoClient = new AWS.DynamoDB.DocumentClient(
  variables.AWS_DYNAMODB_END_POINT
    ? { endpoint: variables.AWS_DYNAMODB_END_POINT, convertEmptyValues: true }
    : { convertEmptyValues: true }
);
