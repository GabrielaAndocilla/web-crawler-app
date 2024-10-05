import { UserInteraction } from "@domains/entities/UserInteraction";
import IUserInteractionRepository from "@domains/repositories/IUserInteractionRepository";
import sequelize from "@infrastructure/db";
import UserInteractionDB, { LimitWordMetric, PageMetrics, TypeMetrics, UserInteractionAttributes } from "@infrastructure/db/models/userInteraction";
import { Op } from "sequelize";



class UserInteractionMySql implements IUserInteractionRepository{

  constructor(){ }

  async getAll() {
    return await UserInteractionDB.findAll()
  }

  async insertValue(interaction:UserInteraction) {
    const newRegister: UserInteractionAttributes = {
      page_number:interaction.pageNumber!,
      title_words_limit:interaction.titleWords!,
      filter_type: interaction.filterType!
    }

    const userInteraction = UserInteractionDB.build(newRegister)
    await userInteraction.save()

    const {id, page_number,title_words_limit,filter_type} = userInteraction
    return new UserInteraction(id,page_number,title_words_limit, filter_type)
  }

  async getByPageMetrics() {
    const metrics = await PageMetrics.findAll({
      attributes: ['page_number', [sequelize.fn('COUNT', sequelize.col('id')), 'quantity']],
      group: ['page_number'],
      raw:true
    })
    return metrics
  }

  async getLimitWordMetrics() {
    return await LimitWordMetric.findAll({
      attributes: ['title_words_limit', [sequelize.fn('COUNT', sequelize.col('id')), 'quantity']],
      group: ['title_words_limit'],
      where: {
          title_words_limit:{
            [Op.not]: 'null'
          }
      },
      raw:true
    })
  }

  async getTypeMetrics() {
    return await TypeMetrics.findAll({
      attributes: ['filter_type', [sequelize.fn('COUNT', sequelize.col('id')), 'quantity']],
      group: ['filter_type'],
      where: {
        filter_type:{
          [Op.not]: 'null'
        }
    },
      raw:true
    })
  }




}

export default UserInteractionMySql;
