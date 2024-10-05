
import { UserInteraction } from "@domains/entities/UserInteraction";
import UserInteractionDB, { PageMetrics, UserInteractionAttributes } from "@infrastructure/db/models/userInteraction";
import UserInteractionMySql from "@repositories/UserInteractionRepository";

jest.mock("@infrastructure/db/models/userInteraction");

describe('User Interaction Repository', () =>{
  const userInteractionMock : UserInteractionAttributes[] = [{
        id: 1,
        page_number: "1",
        title_words_limit: "5",
        filter_type: "lessThan",
        createdAt: new Date()
    },
    {
        id: 2,
        page_number: "2",
        title_words_limit: "3",
        filter_type: "lessThan",
        createdAt: new Date()
    }]

  const pagesMetrics: {page_number:string,quantity:number}[] = [      {
      page_number:'1',
      quantity:2
    },
    {
      page_number:'2',
      quantity:1
    }]

  const limitMetrics: {title_words_limit:string,quantity:number}[] = [      {
    title_words_limit:'7',
      quantity:2
    },
    {
      title_words_limit:'5',
      quantity:1
    }]

  const typeMetrics:{filter_type:string,quantity:number}[] = [
    {
      filter_type: "lessThan",
      quantity: 3
  }
  ]

  it('should get all interaction in DB',async () =>{
    (UserInteractionDB.findAll as jest.Mock).mockReturnValue(userInteractionMock)
    const repo = new UserInteractionMySql()
    const result = await repo.getAll()
    expect(result).toBe(userInteractionMock)
  })

  it('should insert the new interaction in DB',async () =>{
    const saveMock = jest.fn().mockResolvedValue(true);

    (UserInteractionDB.build as jest.Mock).mockReturnValue({save: saveMock})
    const repo = new UserInteractionMySql()

    const userInteraction:UserInteraction = {
      pageNumber: "1",
      titleWords: "5",
      filterType: "lessThan"
    }

    await repo.insertValue(userInteraction)
    const interactionToModel:UserInteractionAttributes = {...userInteractionMock[0]}

    delete interactionToModel.id
    delete interactionToModel.createdAt

    expect(UserInteractionDB.build).toHaveBeenLastCalledWith(interactionToModel)
    expect(saveMock).toHaveBeenCalledTimes(1)
  })

  it('should get Metrics based on Pages',async () =>{

    (PageMetrics.findAll as jest.Mock).mockReturnValue(pagesMetrics)
    const repo = new UserInteractionMySql()

    const result = await repo.getByPageMetrics()

    expect(result).toBe(pagesMetrics)
  })

  it('should get Metrics based on limit title words',async () =>{

    (PageMetrics.findAll as jest.Mock).mockReturnValue(limitMetrics)
    const repo = new UserInteractionMySql()

    const result = await repo.getLimitWordMetrics()

    expect(result).toBe(limitMetrics)
  })

  it('should get Metrics based on filter type',async () =>{

    (PageMetrics.findAll as jest.Mock).mockReturnValue(typeMetrics)
    const repo = new UserInteractionMySql()

    const result = await repo.getTypeMetrics()

    expect(result).toBe(typeMetrics)
  })
})
