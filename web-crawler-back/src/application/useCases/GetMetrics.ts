import IUserInteractionRepository from "@domains/repositories/IUserInteractionRepository";

export class GetMetrics {
  private userInteractionRepo: IUserInteractionRepository;

  constructor(userInteractionRepo: IUserInteractionRepository) {
    this.userInteractionRepo = userInteractionRepo;
  }

  async execute(): Promise<any> {
    const pageMetrics = await this.userInteractionRepo.getByPageMetrics()
    const limitWordMetrics = await this.userInteractionRepo.getLimitWordMetrics()
    const typeMetrics = await this.userInteractionRepo.getTypeMetrics()
    return {pageMetrics,limitWordMetrics,typeMetrics}
  }
}
