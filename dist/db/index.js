"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const db_1 = require("../config/db");
class DB {
}
exports.DB = DB;
DB.storeData = (payload) => db_1.dynamoClient.put(payload).promise();
DB.getData = (param) => db_1.dynamoClient.query(param).promise();
DB.update = (params) => db_1.dynamoClient.update(params).promise();
//# sourceMappingURL=index.js.map