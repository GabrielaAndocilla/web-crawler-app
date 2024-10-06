import { GetPosts } from '@useCases/GetPosts';

describe('Get Post', () => {
  const getPost = new GetPosts();
  const postMocks = [
    {
      id: '2',
      title: 'Magic is in the air',
      points: '13',
      quantityOfComments: '6',
    },
    {
      id: '1',
      title: 'Magic is real',
      points: '77',
      quantityOfComments: '62',
    },
    {
      id: '3',
      title: 'The Magic was never real for me like $ sorry $$',
      points: '34',
      quantityOfComments: '25',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should filter -- type: lessThan', () => {
    it('should filter for limit title words - 9 words and order by points', () => {
      const posts = getPost.execute(postMocks, {
        type: 'lessThan',
        limit: '9',
      });
      expect(posts).toStrictEqual([
        {
          id: '2',
          points: '13',
          quantityOfComments: '6',
          title: 'Magic is in the air',
        },
        {
          id: '3',
          points: '34',
          quantityOfComments: '25',
          title: 'The Magic was never real for me like $ sorry $$',
        },
        {
          id: '1',
          points: '77',
          quantityOfComments: '62',
          title: 'Magic is real',
        },
      ]);
    });
    it('should filter for limit title words - 2 words', () => {
      const posts = getPost.execute(postMocks, {
        type: 'lessThan',
        limit: '2',
      });
      expect(posts).toStrictEqual([]);
    });
  });

  describe('should filter -- type: MoreThan', () => {
    it('should filter for limit title words - 2 words and order by number of comments', () => {
      const posts = getPost.execute(postMocks, {
        type: 'moreThan',
        limit: '2',
      });
      expect(posts).toStrictEqual([
        {
          id: '2',
          points: '13',
          quantityOfComments: '6',
          title: 'Magic is in the air',
        },
        {
          id: '3',
          points: '34',
          quantityOfComments: '25',
          title: 'The Magic was never real for me like $ sorry $$',
        },
        {
          id: '1',
          points: '77',
          quantityOfComments: '62',
          title: 'Magic is real',
        },
      ]);
    });
    it('should filter for limit title words - 15 words', () => {
      const posts = getPost.execute(postMocks, {
        type: 'moreThan',
        limit: '15',
      });
      expect(posts).toStrictEqual([]);
    });
  });
});
