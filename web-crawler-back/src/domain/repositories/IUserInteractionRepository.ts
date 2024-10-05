import { UserInteraction } from "@domains/entities/UserInteraction";

export default interface IUserInteractionRepository {
  getAll(): Promise<UserInteraction[]>;
  insertValue(interaction:UserInteraction): Promise<UserInteraction>;
  getByPageMetrics():Promise<{page_number:string,quantity:number}[]>;
  getLimitWordMetrics():Promise<{title_words_limit:string,quantity:number}[]>;
  getTypeMetrics():Promise<{filter_type:string,quantity:number}[]>;
}
