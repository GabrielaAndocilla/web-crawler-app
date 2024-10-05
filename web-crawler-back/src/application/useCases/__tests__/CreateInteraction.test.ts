import { UserInteraction } from '@domains/entities/UserInteraction';
import IUserInteractionRepository from '@domains/repositories/IUserInteractionRepository';
import { CreateInteraction } from '@useCases/CreateInteraction';

describe('Create Interaction', () => {
  let createInteraction: CreateInteraction;
  let userInteractionRepoMock: jest.Mocked<IUserInteractionRepository>;

  beforeEach(() => {
    userInteractionRepoMock = {
      insertValue: jest.fn(),
    } as unknown as jest.Mocked<IUserInteractionRepository>

    createInteraction = new CreateInteraction(userInteractionRepoMock);
  });

  it('should insert a user interaction', async () => {
    const interaction: UserInteraction = {
      pageNumber: '1',
      titleWords: '5',
      filterType: 'moreThan',
    }

    userInteractionRepoMock.insertValue.mockResolvedValue({id:1,...interaction});

    const result = await createInteraction.execute({
      pageNumber: '1',
      titleWords: '5',
      filterType: 'moreThan',
    });

    expect(result).toEqual({id:1,...interaction});
    expect(userInteractionRepoMock.insertValue).toHaveBeenCalledTimes(1);
  });
});
