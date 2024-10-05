import { Request, Response } from 'express';
import { Builder } from 'selenium-webdriver';
import PostsController from '../PostsController';

const originalEnv = process.env;
jest.mock('selenium-webdriver', () => ({
  Builder: jest.fn().mockReturnValue({
    forBrowser: jest.fn().mockReturnThis(),
    setChromeOptions: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnThis(),
    get: jest.fn(),
    findElements: jest.fn(),
    quit: jest.fn(),
  }),
  By: {
    css: jest.fn(),
  },
}));

describe('Post Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let postController: PostsController;

  beforeEach(() => {
    postController = new PostsController();
    process.env = {
      ...originalEnv,
      NEWS_URL: 'https//localhost:3000',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(()=>{
    jest.clearAllMocks()
  })

  it('should get all posts', async () => {
    req = { query: {} };
    const driver = new Builder().build();
    driver.findElements = jest
      .fn()
      .mockReturnValue([
        { getText: () => '1. Magic is real' },
        {
          getText: () => '77 points by test 23 hours ago | hide | 62 comments',
        },
        { getText: () => '2. Magic is in the air' },
        { getText: () => '13 points by ee 23 hours ago | hide | 6 comments' },
      ]);

    await postController.getPostInfo(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith( [
      {
        id: '1',
        title: 'Magic is real',
        points: '77',
        quantityOfComments: '62'
      },
      {
        id: '2',
        title: 'Magic is in the air',
        points: '13',
        quantityOfComments: '6'
      }
    ])
    expect(driver.quit).toHaveBeenCalledTimes(1)

  });

  it('should return error message when getting info from the page fails', async () => {
    req = { query: {} };
    const driver = new Builder().build();
    driver.findElements = jest
      .fn()
      .mockRejectedValue(new Error('Error Page'))

    await postController.getPostInfo(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(503)
    expect(res.json).toHaveBeenCalledWith({message:'There was an error getting elements'})
    expect(driver.quit).toHaveBeenCalledTimes(1)
  });

  it('should get all posts from page 2', async () => {
    req = { query: {page:"2"} };
    const driver = new Builder().build();
    driver.findElements = jest
      .fn()
      .mockReturnValue([
        { getText: () => '1. Magic is real' },
        {
          getText: () => '77 points by test 23 hours ago | hide | 62 comments',
        },
        { getText: () => '2. Magic is in the air' },
        { getText: () => '13 points by ee 23 hours ago | hide | 6 comments' },
      ]);

    await postController.getPostInfo(req as Request, res as Response);
    expect(driver.get).toHaveBeenCalledWith(`${process.env.NEWS_URL}?p=2`)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith( [
      {
        id: '1',
        title: 'Magic is real',
        points: '77',
        quantityOfComments: '62'
      },
      {
        id: '2',
        title: 'Magic is in the air',
        points: '13',
        quantityOfComments: '6'
      }
    ])
  });

  describe('should filter -- type: lessThan', () => {
    it('should filter for limit title words - 3 words', async () => {
      req = { query: {type:"lessThan", limit:"3"} };
      const driver = new Builder().build();
      driver.findElements = jest
        .fn()
        .mockReturnValue([
          { getText: () => '1. Magic is real' },
          {
            getText: () => '77 points by test 23 hours ago | hide | 62 comments',
          },
          { getText: () => '2. Magic is in the air' },
          { getText: () => '13 points by ee 23 hours ago | hide | 6 comments' },
        ]);

      await postController.getPostInfo(req as Request, res as Response);
      expect(driver.get).toHaveBeenCalledWith(process.env.NEWS_URL)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith( [
        {
          id: '1',
          title: 'Magic is real',
          points: '77',
          quantityOfComments: '62'
        }
      ])
    });
    it('should filter for limit title words - 5 words', async () => {
      req = { query: {type:"lessThan", limit:"5"} };
      const driver = new Builder().build();
      driver.findElements = jest
        .fn()
        .mockReturnValue([
          { getText: () => '1. Magic is real' },
          {
            getText: () => '77 points by test 23 hours ago | hide | 62 comments',
          },
          { getText: () => '2. Magic is in the air' },
          { getText: () => '13 points by ee 23 hours ago | hide | 6 comments' },
        ]);

      await postController.getPostInfo(req as Request, res as Response);
      expect(driver.get).toHaveBeenCalledWith(process.env.NEWS_URL)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith( [
        {
          id: '2',
          title: 'Magic is in the air',
          points: '13',
          quantityOfComments: '6'
        },
        {
          id: '1',
          title: 'Magic is real',
          points: '77',
          quantityOfComments: '62'
        }
      ])
    });
  })

  describe('should filter -- type: moreThan', () => {

    it('should filter for limit title words - 3 words', async () => {
      req = { query: {type:"moreThan", limit:"3"} };
      const driver = new Builder().build();
      driver.findElements = jest
        .fn()
        .mockReturnValue([
          { getText: () => '1. Magic is real' },
          {
            getText: () => '77 points by test 23 hours ago | hide | 62 comments',
          },
          { getText: () => '2. Magic is in the air' },
          { getText: () => '13 points by ee 23 hours ago | hide | 6 comments' },
        ]);

      await postController.getPostInfo(req as Request, res as Response);
      expect(driver.get).toHaveBeenCalledWith(process.env.NEWS_URL)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith( [
        {
          id: '2',
          title: 'Magic is in the air',
          points: '13',
          quantityOfComments: '6'
        },
      ])
    });

    it('should filter for limit title words - 5 words', async () => {
      req = { query: {type:"moreThan", limit:"5"} };
      const driver = new Builder().build();
      driver.findElements = jest
        .fn()
        .mockReturnValue([
          { getText: () => '1. Magic is real' },
          {
            getText: () => '77 points by test 23 hours ago | hide | 62 comments',
          },
          { getText: () => '2. Magic is in the air' },
          { getText: () => '13 points by ee 23 hours ago | hide | 6 comments' },
        ]);

      await postController.getPostInfo(req as Request, res as Response);
      expect(driver.get).toHaveBeenCalledWith(process.env.NEWS_URL)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([])
    });
  })

});
