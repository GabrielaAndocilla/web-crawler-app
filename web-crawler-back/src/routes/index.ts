import { Application } from "express";
import postRoutes from "./posts.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", postRoutes);

  }
}
