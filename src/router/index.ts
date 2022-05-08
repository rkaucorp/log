import express, {
  Application,
  Request,
  Response,
  Router,
  NextFunction,
} from "express";
import { routes as logs } from "./log";

export type Handler = (req: Request, res: Response) => void;
export type MiddlwareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface RouteType {
  http: string;
  path: string;
  middleware: Partial<MiddlwareType[]>;
  handler: Handler;
}

const routes: RouteType[] = [...logs];

let router: Router = express.Router();

routes.forEach(route => {
  (router as any)[route.http](
    route.path,
    [...route?.middleware],
    route.handler
  );
});

export default router;
