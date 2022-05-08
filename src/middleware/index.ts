import { Request, Response, NextFunction } from "express";
import {
  EMPTY_BODY_STATUS_CODE,
  UN_AUTHORIZED_STATUS_CODE,
} from "../config/variable";
import { serverRespnose } from "../utils/serverResponse";

export const checkAuthRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.userName) {
    serverRespnose(res, UN_AUTHORIZED_STATUS_CODE, "Unauthentic Request");
  } else {
    next();
  }
};

export const checkEmptyRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.keys(req.body).length <= 1) {
    serverRespnose(res, EMPTY_BODY_STATUS_CODE, "Body Should Not Be Empty");
  } else {
    next();
  }
};
