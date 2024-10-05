import UserInteractionController from "@controllers/UserInteractionController";
import UserInteractionMySql from "@repositories/UserInteractionRepository";

import { Router } from "express";

class ApiRoutes {
  router = Router()
  repository = new UserInteractionMySql()
  controller = new UserInteractionController(this.repository);

  constructor(){
    this.initializedRoutes()
  }

  initializedRoutes(){
    this.router.get("/interactions",this.controller.getInteractions);
    this.router.get("/interactions/metrics",this.controller.getMetrics);
    this.router.post("/interactions",this.controller.insertInteraction);

  }
}

export default new ApiRoutes().router;
