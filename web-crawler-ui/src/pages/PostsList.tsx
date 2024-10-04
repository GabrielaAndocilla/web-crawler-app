import { useState } from 'react';
import Button from '../components/atoms/Button';
import Title from '../components/atoms/Title';
import ListElement from '../components/molecules/ListElement';
import { usePost } from '../hooks/usePosts';
import { Post } from '../models/Post';

const PostList = () => {
  const [page, setPage] = useState<number | undefined>(undefined);
  const { data } = usePost(page);
  const posts = data?.data || [];

  const previousPage = (page: number | undefined) =>
    page && page > 1 && setPage(page - 1);
  return (
    <>
      <Title text="Posts" />
      <div className="m-4">
        <ul role="list" className="divide-y divide-gray-100">
          {posts.map(({ id, title, points, quantityOfComments }: Post) => (
            <ListElement
              key={`post_${id}`}
              title={`${id}. ${title}`}
              subtitle={`points: ${points} | comments: ${quantityOfComments}`}
            />
          ))}
        </ul>
        <div className="flex justify-around">
          <Button type="button" onClick={() => previousPage(page)}>
            Previous
          </Button>
          <Button type="button" onClick={() => setPage((page || 1) + 1)}>
            Nexts
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostList;
