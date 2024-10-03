import { Application } from "express";
import routes from "./api.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", routes);

  }
}
