import express, { Application } from "express";
import router from "./router";
import cors from "cors";
import bodyParser from "body-parser";
import { AppConnection } from "./utils/connection";

const init = (): Application => {
  let app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api", router);

  return app;
};

const app = init();

AppConnection.connection(app);
