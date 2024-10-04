import { Application } from "express";
import postRoutes from "./posts.routes";
import userInteractionsRoutes from "./userInteractions.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", postRoutes);
    app.use("/api", userInteractionsRoutes);

  }
}
