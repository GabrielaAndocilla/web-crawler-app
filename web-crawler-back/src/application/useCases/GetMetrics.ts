import IUserInteractionRepository from '@domains/repositories/IUserInteractionRepository';

interface UserInteractionMetrics {
  pageMetrics: {
    page_number: string;
    quantity: number;
  }[];
  limitWordMetrics: {
    title_words_limit: string;
    quantity: number;
  }[];
  typeMetrics: {
    filter_type: string;
    quantity: number;
  }[];
}

export class GetMetrics {
  private userInteractionRepo: IUserInteractionRepository;

  constructor(userInteractionRepo: IUserInteractionRepository) {
    this.userInteractionRepo = userInteractionRepo;
  }

  async execute():Promise<UserInteractionMetrics> {
    const pageMetrics = await this.userInteractionRepo.getByPageMetrics();
    const limitWordMetrics =
      await this.userInteractionRepo.getLimitWordMetrics();
    const typeMetrics = await this.userInteractionRepo.getTypeMetrics();
    return { pageMetrics, limitWordMetrics, typeMetrics };
  }
}
