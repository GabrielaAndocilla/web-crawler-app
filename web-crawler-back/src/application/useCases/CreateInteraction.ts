import { UserInteraction } from "@domains/entities/UserInteraction";
import IUserInteractionRepository from "@domains/repositories/IUserInteractionRepository";

export class CreateInteraction {
  private userInteractionRepo: IUserInteractionRepository;

  constructor(userInteractionRepo: IUserInteractionRepository) {
    this.userInteractionRepo = userInteractionRepo;
  }

  async execute(interaction:UserInteraction): Promise<UserInteraction> {
    return await this.userInteractionRepo.insertValue(interaction);
  }
}
