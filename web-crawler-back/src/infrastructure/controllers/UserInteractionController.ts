import { UserInteraction } from "@domains/entities/UserInteraction";
import IUserInteractionRepository from "@domains/repositories/IUserInteractionRepository";
import { CreateInteraction } from "@useCases/CreateInteraction";
import { GetAllInteractions } from "@useCases/GetAllInteractions";
import { GetMetrics } from "@useCases/GetMetrics";
import { Request, Response } from "express";

export default class UserInteractionController {
  private userInteractionRepo: IUserInteractionRepository;

  constructor(userInteractionRepo: IUserInteractionRepository) {
    this.userInteractionRepo = userInteractionRepo;
  }

  getInteractions = async (_req: Request, res: Response) =>{
    try {
      const getAll = new GetAllInteractions(this.userInteractionRepo)
      const values : UserInteraction[] = await getAll.execute()
      res.status(200).json(values)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  getMetrics = async (_req: Request, res: Response) =>{
    try {
      const getMetrics = new GetMetrics(this.userInteractionRepo)
      const metrics = await getMetrics.execute()
      res.status(200).json(metrics)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  insertInteraction = async (req: Request, res: Response) =>{
    try {
      const { id, pageNumber, titleWords, filterType } = req.body
      const create = new CreateInteraction(this.userInteractionRepo);
      const interaction = await create.execute({ id, pageNumber, titleWords, filterType })
      res.status(200).json(interaction)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }

  }


}
