import { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';
import Title from '../components/atoms/Title';
import InputWithDropDown from '../components/molecules/InputWithDropDown';
import ListElement from '../components/molecules/ListElement';
import { usePost } from '../hooks/usePosts';
import { useSaveInteractions } from '../hooks/useSaveInteractions';
import { Post } from '../models/Post';
import { UserInteraction } from '../models/UserInteraction';
import { MetricsSections } from '../sections/MetricsSections';

const PostList = () => {
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<{ limit?: string; type?: string }>({});
  const { data, isFetching: isFetchingPosts } = usePost(page, filters);
  const { mutate } = useSaveInteractions();
  const posts = data?.data || [];

  const previousPage = (page: number | undefined) =>
    page && page > 1 && setPage(page - 1);

  useEffect(() => {
    const interaction: UserInteraction = {
      pageNumber: page ? page.toString() : '1',
    };
    if (!filters?.limit || !filters?.type) return mutate(interaction);
    interaction.titleWords = filters.limit;
    interaction.filterType = filters?.type;
    mutate(interaction);
  }, [filters, page, mutate]);

  return (
    <div className="flex flex-col items-center">
      <Title text="Posts" />
      <MetricsSections />
      <div className="m-4 w-[90%]">
        <InputWithDropDown
          options={[
            { name: 'None', value: 'None' },
            { name: 'Less Than', value: 'lessThan' },
            { name: 'More Than', value: 'moreThan' },
          ]}
          keyOption="name"
          valueOption="value"
          onUserSelect={(limit, type) => {
            if (limit && type) setFilters({ limit, type });
          }}
        />
        {!isFetchingPosts ? (
          <ul className="divide-y divide-gray-100">
            {posts.map(({ id, title, points, quantityOfComments }: Post) => (
              <ListElement
                key={`post_${id}`}
                title={`${id}. ${title}`}
                subtitle={`points: ${points} | comments: ${quantityOfComments}`}
              />
            ))}
          </ul>
        ) : (
          <p>Loading ....</p>
        )}
        <div className="flex justify-around">
          <Button type="button" onClick={() => previousPage(page)}>
            Previous Page
          </Button>
          <p>Page:{page || '1'}</p>
          <Button type="button" onClick={() => setPage(page + 1)}>
            Next Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
