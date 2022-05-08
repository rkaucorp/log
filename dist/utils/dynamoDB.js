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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerilizedData = exports.generateUpdateParams = void 0;
const variables = __importStar(require("../config/variable"));
function generateUpdateParams(inputs = {}) {
    if (!Object.keys(inputs).length) {
        return {};
    }
    return {
        ExpressionAttributeNames: Object.keys(inputs).reduce((reduced, item) => Object.assign(reduced, { [`#n_${item}`]: item }), {}),
        ExpressionAttributeValues: Object.keys(inputs).reduce((reduced, item) => Object.assign(reduced, { [`:v_${item}`]: inputs[item] }), {}),
        UpdateExpression: `SET ${String(Object.keys(inputs).reduce((reduced, item) => `${reduced}#n_${item} = :v_${item},`, "")).slice(0, -1)}`,
    };
}
exports.generateUpdateParams = generateUpdateParams;
function getSerilizedData(data) {
    let result = [];
    if (Array.isArray(data)) {
        result = [...data];
        result = result.map((item) => {
            const resultItem = Object.assign({}, item);
            Object.values(variables.dbIndexes).forEach((value) => {
                delete resultItem[value];
            });
            return resultItem;
        });
        return result;
    }
    result = Object.assign({}, data);
    Object.values(variables.dbIndexes).forEach((value) => {
        delete result[value];
    });
    return result;
}
exports.getSerilizedData = getSerilizedData;
//# sourceMappingURL=dynamoDB.js.map