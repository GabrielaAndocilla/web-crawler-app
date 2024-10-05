import { UserInteraction } from "@domains/entities/UserInteraction";
import IUserInteractionRepository from "@domains/repositories/IUserInteractionRepository";

export class GetAllInteractions {
  private userInteractionRepo: IUserInteractionRepository;

  constructor(userInteractionRepo: IUserInteractionRepository) {
    this.userInteractionRepo = userInteractionRepo;
  }

  async execute(): Promise<UserInteraction[]> {
    return await this.userInteractionRepo.getAll();
  }
}
