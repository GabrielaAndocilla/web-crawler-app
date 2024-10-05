import { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';
import Title from '../components/atoms/Title';
import InputWithDropDown from '../components/molecules/InputWithDropDown';
import ListElement from '../components/molecules/ListElement';
import { useInteractionMetrics } from '../hooks/useInteractionsMetrics';
import { usePost } from '../hooks/usePosts';
import { useSaveInteractions } from '../hooks/useSaveInteractions';
import {
  FilterTypeMetrics,
  InteractionMetric,
  LimitWordMetrics,
  PageMetrics,
} from '../models/InteractionMetrics';
import { Post } from '../models/Post';
import { UserInteraction } from '../models/UserInteraction';

const PostList = () => {
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<{ limit?: string; type?: string }>({});
  const { data, isFetching: isFetchingPosts } = usePost(page, filters);
  const { mutate } = useSaveInteractions();
  const { data: metricsData } = useInteractionMetrics();
  const posts = data?.data || [];
  const metrics: InteractionMetric = metricsData?.data;

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
      <div className="border border-gray-100 w-2/3">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Application Metrics
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            This section shows the metrics of the filters, how the usr has been
            interacting with post data
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Metric By Page
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  {metrics?.pageMetrics.map(
                    ({ page_number, quantity }: PageMetrics) => (
                      <ListElement
                        subtitle={`# of times that Page ${page_number} has been visited : ${quantity}`}
                      />
                    )
                  )}
                </ul>
              </dd>
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Metrics of Title Words
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  {metrics?.limitWordMetrics.map(
                    ({ title_words_limit, quantity }: LimitWordMetrics) => (
                      <ListElement
                        subtitle={`# of times filter by ${title_words_limit} words in title has been used: ${quantity}`}
                      />
                    )
                  )}
                </ul>
              </dd>
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Metrics of Filter Type (more than - less than)
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  {metrics?.typeMetrics.map(
                    ({ filter_type, quantity }: FilterTypeMetrics) => (
                      <ListElement
                        subtitle={`# of times filter type ${filter_type} has been used: ${quantity}`}
                      />
                    )
                  )}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
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
