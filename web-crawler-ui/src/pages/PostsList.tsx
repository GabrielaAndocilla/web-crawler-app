import { usePost } from '../hooks/usePosts';

const PostList = () => {
  const { data } = usePost();
  const posts = data?.data || [];
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {posts.map((post: any) => (
        <p>{post.title}</p>
      ))}
    </>
  );
};

export default PostList;
