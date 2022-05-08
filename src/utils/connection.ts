import * as variables from "../config/variable";
import { DB } from "../db";

export class AppConnection {
  static connection(app: any) {
    return app.listen(variables.APP_PORT, () => {
      console.log(`Application Running on port ${variables.APP_PORT}`);
      this.dbConnection();
    });
  }
  static async dbConnection() {
    try {
      const params = {
        TableName: variables.AWS_DYNAMODB_TABLE_NAME,
        KeyConditionExpression: `PK = :hashKey`,
        ExpressionAttributeValues: {
          ":hashKey": `${variables.COMPANY_ID}`,
        },
      };
      await DB.getData(params);
      console.log("DynamoDB Successfully Connected...");
    } catch (error) {
      console.log(error);
      console.log("DynamoDB Connection Failed!!!");
    }
  }
}
