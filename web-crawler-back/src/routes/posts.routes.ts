import PostsController from "@controllers/PostsController";

import { Router } from "express";

class ApiRoutes {
  router = Router()
  controller = new PostsController();

  constructor(){
    this.initializedRoutes()
  }

  initializedRoutes(){
    this.router.get("/posts",this.controller.getPostInfo);

  }
}

export default new ApiRoutes().router;
