import StartController from "@controllers/PostsController";

import { Router } from "express";

class ApiRoutes {
  router = Router()
  controller = new StartController();

  constructor(){
    this.initializedRoutes()
  }

  initializedRoutes(){
    this.router.get("/posts",this.controller.getPage);

  }
}

export default new ApiRoutes().router;
