import { UserInteraction } from "@domains/entities/UserInteraction";
import { Request, Response } from "express";
import sequelize from "infrastructure/db";
import UserInteractionDB, { UserInteractionAttributes } from "infrastructure/db/models/userInteraction";


export default class PostsController {

  constructor() {
  }

  getInteractions = async (req: Request, res: Response) =>{
    res.send(await UserInteractionDB.findAll())
  }

  getMetrics = async (req: Request, res: Response) =>{
    const pageMetrics = await UserInteractionDB.findAll({
      attributes: ['UserInteraction.page_number', [sequelize.fn('COUNT', sequelize.col('UserInteraction.id')), 'quantity']],
      group: ['UserInteraction.page_number'],
      raw:true
    })
    const limitWordsMetrics = await UserInteractionDB.findAll({
      attributes: ['UserInteraction.title_words_limit', [sequelize.fn('COUNT', sequelize.col('UserInteraction.id')), 'quantity']],
      group: ['UserInteraction.title_words_limit'],
      raw:true
    })
    const typeMetrics = await UserInteractionDB.findAll({
      attributes: ['UserInteraction.filter_type', [sequelize.fn('COUNT', sequelize.col('UserInteraction.id')), 'quantity']],
      group: ['UserInteraction.filter_type'],
      raw:true
    })

    res.status(200).json({pageMetrics,limitWordsMetrics,typeMetrics})
  }

  insertInteraction = async (req: Request, res: Response) =>{
    const { id, pageNumber, titleWords, filterType } = req.body
    const interaction: UserInteractionAttributes = {
      id,
      page_number:pageNumber,
      title_words_limit:titleWords,
      filter_type: filterType
    }
    const userInteraction = UserInteractionDB.build(interaction)
    await userInteraction.save()
    const newUserInteraction = new UserInteraction(userInteraction.id,userInteraction.page_number,userInteraction.title_words_limit,userInteraction.filter_type)
    res.status(200).json(newUserInteraction)
  }


}
