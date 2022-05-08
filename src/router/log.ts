import { RouteType } from "./index";
import { list, create, update, getByID } from "../controller/log";
import { checkAuthRequest, checkEmptyRequestBody } from "../middleware";

export const routes: RouteType[] = [
  {
    http: "get" as any,
    path: "/posts",
    middleware: [],
    handler: list,
  },
  {
    http: "post" as any,
    path: "/posts",
    middleware: [checkAuthRequest, checkEmptyRequestBody],
    handler: create,
  },
  {
    http: "put" as any,
    path: "/posts",
    middleware: [checkAuthRequest, checkEmptyRequestBody],
    handler: update,
  },
  {
    http: "get" as any,
    path: "/logs/:id",
    middleware: [],
    handler: getByID,
  },
];
