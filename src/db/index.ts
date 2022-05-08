import { dynamoClient } from "../config/db";

export class DB {
  static storeData = (payload: any) => dynamoClient.put(payload).promise();
  static getData = (param: any) => dynamoClient.query(param).promise();
  static update = (params: any) => dynamoClient.update(params).promise();
}
