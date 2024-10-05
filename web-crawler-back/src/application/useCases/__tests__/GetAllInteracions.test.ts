import { UserInteraction } from '@domains/entities/UserInteraction';
import IUserInteractionRepository from '@domains/repositories/IUserInteractionRepository';
import { GetAllInteractions } from '@useCases/GetAllInteractions';

describe('Get All Interactions', () => {
  let getAllInteractions: GetAllInteractions;
  let userInteractionRepoMock: jest.Mocked<IUserInteractionRepository>;

  beforeEach(() => {
    userInteractionRepoMock = {
      getAll: jest.fn(),
    } as unknown as jest.Mocked<IUserInteractionRepository>

    getAllInteractions = new GetAllInteractions(userInteractionRepoMock);
  });

  it('should get all user interactions', async () => {
    const interactions: UserInteraction[] = [{
      id:1,
      pageNumber: '1',
      titleWords: '5',
      filterType: 'moreThan',
    }]

    userInteractionRepoMock.getAll.mockResolvedValue(interactions);

    const result = await getAllInteractions.execute();

    expect(result).toEqual(interactions);
    expect(userInteractionRepoMock.getAll).toHaveBeenCalledTimes(1);
  });
});
