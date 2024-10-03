import { Request, Response } from "express";


export default class StartController {

  constructor() {
  }

  getPage = async (req: Request, res: Response) =>{

    res.status(200).json([]);
  }


}
