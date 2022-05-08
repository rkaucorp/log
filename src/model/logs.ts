import { DB } from "../db";
import * as variables from "../config/variable";
import { generateUpdateParams, getSerilizedData } from "../utils/dynamoDB";

export class Log {
  static async storeLogReportToDynamoDB(payLoad: any = {}): Promise<void> {
    try {
      const now = new Date().toISOString();
      const params = {
        TableName: variables.AWS_DYNAMODB_TABLE_NAME,
        Item: {
          ...payLoad,
          createdAt: now,
          PK: variables.COMPANY_ID,
          SK: payLoad?.postID,
        },
      };
      delete params?.Item?.postID;
      await DB.storeData(params);
      const data = {
        postID: payLoad?.postID,
        userName: payLoad?.userName,
        createdAt: now,
      };
      await this.storeUpdatedLogReport(data);
    } catch (error) {
      throw error;
    }
  }

  static async storeUpdatedLogReport(payLoad: any = {}): Promise<void> {
    try {
      console.log(payLoad, "updated log report");
      const now = new Date().toISOString();
      const params = {
        TableName: variables.AWS_DYNAMODB_TABLE_NAME_FOR_LOG,
        Item: {
          ...payLoad,
          PK: payLoad?.postID,
          SK: now,
        },
      };

      await DB.storeData(params);
    } catch (error) {
      throw error;
    }
  }

  static async logListFromDynamoDB() {
    try {
      const params = {
        TableName: variables.AWS_DYNAMODB_TABLE_NAME,
        KeyConditionExpression: `PK = :hashKey`,
        ExpressionAttributeValues: {
          ":hashKey": `${variables.COMPANY_ID}`,
        },
      };
      const logs = await DB.getData(params);
      return logs;
    } catch (error) {
      throw error;
    }
  }

  static async updateLogList(data: any) {
    const updatedAt = new Date().toISOString();
    const updatedBy = data?.userName;
    delete data.userName;
    const updateData = {
      ...data,
    };

    const params = {
      TableName: variables.AWS_DYNAMODB_TABLE_NAME,
      Key: {
        PK: `${variables.COMPANY_ID}`,
        SK: `${data?.postID}`,
      },
      ...generateUpdateParams(updateData),
      ReturnValues: "ALL_NEW",
    };

    const result = await DB.update(params);
    const updateLog = {
      postID: data?.postID,
      userName: updatedBy,
      updatedAt,
    };
    await Log.storeUpdatedLogReport(updateLog);
    console.log("here comes");

    return getSerilizedData(result.Attributes);
  }
  static async getLogByID(id: string) {
    const params = {
      TableName: variables.AWS_DYNAMODB_TABLE_NAME_FOR_LOG,
      KeyConditionExpression: `PK = :hashKey`,
      ExpressionAttributeValues: {
        ":hashKey": `${id}`,
      },
    };
    const logs = await DB.getData(params);
    return logs;
  }
}
