import UserInteractionController from "@controllers/UserInteractionController";

import { Router } from "express";

class ApiRoutes {
  router = Router()
  controller = new UserInteractionController();

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
