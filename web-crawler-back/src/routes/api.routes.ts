import StartController from "@controllers/StartController";

import { Router } from "express";

class ApiRoutes {
  router = Router()
  controller = new StartController();

  constructor(){
    this.initializedRoutes()
  }

  initializedRoutes(){
    this.router.get("/",this.controller.getPage);

  }
}

export default new ApiRoutes().router;
