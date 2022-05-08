import * as variables from "../config/variable";

export function generateUpdateParams(inputs: any = {}) {
  if (!Object.keys(inputs).length) {
    return {};
  }

  return {
    ExpressionAttributeNames: Object.keys(inputs).reduce(
      (reduced, item) => Object.assign(reduced, { [`#n_${item}`]: item }),
      {}
    ),
    ExpressionAttributeValues: Object.keys(inputs).reduce(
      (reduced, item) =>
        Object.assign(reduced, { [`:v_${item}`]: inputs[item] }),
      {}
    ),
    UpdateExpression: `SET ${String(
      Object.keys(inputs).reduce(
        (reduced, item) => `${reduced}#n_${item} = :v_${item},`,
        ""
      )
    ).slice(0, -1)}`,
  };
}

export function getSerilizedData(data: any) {
  let result: string[] = [];

  if (Array.isArray(data)) {
    result = [...data];
    result = result.map((item: any) => {
      const resultItem: any = { ...item };
      Object.values(variables.dbIndexes).forEach((value: any) => {
        delete resultItem[value];
      });

      return resultItem;
    });

    return result;
  }

  result = { ...data };

  Object.values(variables.dbIndexes).forEach((value: any) => {
    delete result[value];
  });

  return result;
}
