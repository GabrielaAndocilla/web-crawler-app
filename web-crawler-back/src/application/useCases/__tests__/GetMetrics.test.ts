import IUserInteractionRepository from '@domains/repositories/IUserInteractionRepository';
import { GetMetrics } from '@useCases/GetMetrics';

describe('Get Metrics', () => {
  let getMetrics: GetMetrics;
  let userInteractionRepoMock: jest.Mocked<IUserInteractionRepository>;

  beforeEach(() => {
    userInteractionRepoMock = {
      getByPageMetrics: jest.fn(),
      getLimitWordMetrics: jest.fn(),
      getTypeMetrics: jest.fn(),
    } as unknown as jest.Mocked<IUserInteractionRepository>

    getMetrics = new GetMetrics(userInteractionRepoMock);
  });

  it('should get metrics of user interactions', async () => {
    const metrics = {
      pageMetrics: [
          {
              page_number: "1",
              quantity: 1
          }
      ],
      limitWordMetrics: [
          {
              "title_words_limit": "5",
              "quantity": 2
          }
      ],
      typeMetrics: [
          {
              "filter_type": "lessThan",
              "quantity": 3
          }
      ]
  }

    userInteractionRepoMock.getByPageMetrics.mockResolvedValue(metrics.pageMetrics);
    userInteractionRepoMock.getLimitWordMetrics.mockResolvedValue(metrics.limitWordMetrics);
    userInteractionRepoMock.getTypeMetrics.mockResolvedValue(metrics.typeMetrics);

    const result = await getMetrics.execute();

    expect(result).toEqual(metrics);
    expect(userInteractionRepoMock.getByPageMetrics).toHaveBeenCalledTimes(1);
    expect(userInteractionRepoMock.getLimitWordMetrics).toHaveBeenCalledTimes(1);
    expect(userInteractionRepoMock.getTypeMetrics).toHaveBeenCalledTimes(1);

  });
});
