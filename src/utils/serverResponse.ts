import { Response } from "express";

export const serverRespnose = (
  res: Response,
  statusCode: number,
  payload: any
) => {
  res.status(statusCode).send(payload);
};
