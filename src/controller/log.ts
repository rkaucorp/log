import { Request, Response } from "express";
import { serverRespnose } from "../utils/serverResponse";
import { Log } from "../model/logs";
import { FAILED_STATUS_CODE, SUCCESS_STATUS_CODE } from "../config/variable";

export const list = async (_: Request, res: Response) => {
  try {
    const logs = (await Log.logListFromDynamoDB()) || [];
    serverRespnose(res, SUCCESS_STATUS_CODE, logs);
  } catch (error) {
    console.log(error);
    serverRespnose(res, FAILED_STATUS_CODE, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    await Log.storeLogReportToDynamoDB(req.body);
    serverRespnose(res, SUCCESS_STATUS_CODE, "Report Created Successfully");
  } catch (error) {
    serverRespnose(res, FAILED_STATUS_CODE, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await Log.updateLogList(req.body);
    serverRespnose(res, SUCCESS_STATUS_CODE, "Report Created Successfully");
  } catch (error) {
    serverRespnose(res, FAILED_STATUS_CODE, error);
  }
};

export const getByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const logs = (await Log.getLogByID(id)) || [];
    serverRespnose(res, SUCCESS_STATUS_CODE, logs);
  } catch (error) {
    serverRespnose(res, FAILED_STATUS_CODE, error);
  }
};
